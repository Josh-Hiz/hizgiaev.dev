import { Suspense, lazy, useEffect, useRef, useState, type ComponentType, type CSSProperties, type LazyExoticComponent } from 'react';
import { type BackgroundVariant, backgroundFallbacks } from './presets';
import { variantLoaders } from './variants/registry';
import type { VariantProps } from './variants/types';
import {
  type BackgroundSettings,
  type ShaderQuality,
  readSettings,
  subscribe,
} from '@lib/background-settings';

const QUALITY: Record<
  ShaderQuality,
  { minPixelRatio: number; maxPixelCount: number; powerPreference: WebGLPowerPreference }
> = {
  high: { minPixelRatio: 2, maxPixelCount: 5_000_000, powerPreference: 'high-performance' },
  balanced: { minPixelRatio: 1.5, maxPixelCount: 2_500_000, powerPreference: 'default' },
  low: { minPixelRatio: 1, maxPixelCount: 1_200_000, powerPreference: 'low-power' },
};

/** lazy() must be called once per variant, not once per render. */
const lazyCache = new Map<BackgroundVariant, LazyExoticComponent<ComponentType<VariantProps>>>();
function getVariantComponent(variant: BackgroundVariant) {
  let component = lazyCache.get(variant);
  if (!component) {
    component = lazy(variantLoaders[variant]);
    lazyCache.set(variant, component);
  }
  return component;
}

/**
 * Astro's view-transition swap parks every persisted island on <html> — outside
 * <body> — before reinserting it into the new page. While parked it has no
 * layout box, so IntersectionObserver reports it as offscreen. Pausing on that
 * signal immediately would set speed to 0, which halts the library's rAF loop,
 * and whether it ever restarts depends on a racy second IO callback. That is
 * why shaders were "sometimes just stopping" on navigation.
 *
 * So: pausing is delayed and cancellable, resuming is instant, and a swap
 * cancels any pending pause outright.
 */
const OFFSCREEN_PAUSE_DELAY_MS = 700;

export interface ShaderBackgroundProps {
  /** Pin to one variant, ignoring user settings (gallery tiles). */
  override?: BackgroundVariant | undefined;
  quality?: ShaderQuality | undefined;
  fadeMs?: number;
  pauseWhenOffscreen?: boolean;
}

export default function ShaderBackground({
  override,
  quality,
  fadeMs = 900,
  pauseWhenOffscreen = true,
}: ShaderBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<number | null>(null);
  const [onscreen, setOnscreen] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<BackgroundSettings | null>(null);

  useEffect(() => {
    if (override) return;
    setSettings(readSettings());
    return subscribe(setSettings);
  }, [override]);

  // Astro wipes every <html> attribute on swap, taking --shader-fallback with
  // it, and won't re-run the head script. Put it back after each navigation.
  useEffect(() => {
    if (override) return;
    const reapply = () => {
      const current = readSettings();
      document.documentElement.style.setProperty(
        '--shader-fallback',
        backgroundFallbacks[current.variant],
      );
    };
    reapply();
    document.addEventListener('astro:after-swap', reapply);
    return () => document.removeEventListener('astro:after-swap', reapply);
  }, [override]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!pauseWhenOffscreen || !el) return;

    const clearPending = () => {
      if (pauseTimer.current !== null) {
        clearTimeout(pauseTimer.current);
        pauseTimer.current = null;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting ?? true) {
        clearPending();
        setOnscreen(true);
        return;
      }
      // Only a sustained absence counts. A transient one is just a page swap.
      clearPending();
      pauseTimer.current = window.setTimeout(
        () => setOnscreen(false),
        OFFSCREEN_PAUSE_DELAY_MS,
      );
    });
    io.observe(el);

    // Belt and braces: a swap always resumes, whatever the observer thinks.
    const onSwap = () => {
      clearPending();
      setOnscreen(true);
    };
    document.addEventListener('astro:after-swap', onSwap);
    document.addEventListener('astro:page-load', onSwap);

    return () => {
      clearPending();
      io.disconnect();
      document.removeEventListener('astro:after-swap', onSwap);
      document.removeEventListener('astro:page-load', onSwap);
    };
  }, [pauseWhenOffscreen]);

  const variant: BackgroundVariant | null = override ?? settings?.variant ?? null;
  const enabledSetting = override !== undefined || (settings?.enabled ?? false);

  // The library computes `renderScale = canvasWidth / parentWidth`. A zero-width
  // parent therefore divides by zero and corrupts the mount for good — the only
  // cure being a full remount, which is why re-picking a variant "fixed" it.
  // A zero box happens in two places: while Astro parks the island on <html>
  // mid-swap, and on mobile where the rail is display:none. So: absolute
  // positioning (which falls back to the viewport, never zero) plus this guard,
  // which keeps the shader unmounted until the box is real.
  const [hasBox, setHasBox] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry?.contentRect;
      setHasBox(!!box && box.width > 0 && box.height > 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const enabled = enabledSetting && hasBox;

  useEffect(() => {
    if (!variant || !enabled) return;
    setReady(false);
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [variant, enabled]);

  const running = !reduceMotion && onscreen;
  const speed = running ? (override ? 1 : (settings?.speed ?? 1)) : 0;
  const q = QUALITY[quality ?? settings?.quality ?? 'high'];

  const Variant = variant && enabled ? getVariantComponent(variant) : null;

  // Astro's swapRootAttributes strips every <html> attribute on navigation,
  // including the inline style holding --shader-fallback, and the head script
  // that set it does not re-run. So once we know the variant we inline the real
  // gradient; the var is only the pre-hydration stand-in.
  const fallback = variant ? backgroundFallbacks[variant] : 'var(--shader-fallback)';

  // Absolute, not width/height:100%. Inside a positioned wrapper it fills it;
  // when Astro orphans it onto <html> it falls back to the initial containing
  // block (the viewport) rather than collapsing to zero.
  const surface: CSSProperties = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    background: fallback,
  };

  return (
    <div ref={ref} style={surface}>
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: ready && Variant ? 1 : 0,
          transition: `opacity ${fadeMs}ms ease-out`,
        }}
      >
        {Variant && (
          <Suspense fallback={null}>
            <Variant
              speed={speed}
              minPixelRatio={q.minPixelRatio}
              maxPixelCount={q.maxPixelCount}
              webGlContextAttributes={{
                antialias: false,
                powerPreference: q.powerPreference,
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

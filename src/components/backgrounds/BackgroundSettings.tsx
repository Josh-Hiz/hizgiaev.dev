import { useEffect, useRef, useState } from 'react';
import {
  backgroundFallbacks,
  backgroundGroups,
  backgroundLabels,
  type BackgroundGroup,
} from './presets';
import {
  type BackgroundSettings,
  type ShaderQuality,
  DEFAULT_SETTINGS,
  readSettings,
  resetSettings,
  subscribe,
  writeSettings,
} from '@lib/background-settings';

const QUALITIES: ShaderQuality[] = ['low', 'balanced', 'high'];
const GROUPS = Object.keys(backgroundGroups) as BackgroundGroup[];

export default function BackgroundSettings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<BackgroundSettings>(DEFAULT_SETTINGS);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSettings(readSettings());
    return subscribe(setSettings);
  }, []);

  // This island is persisted, so it outlives every page swap — unlike the shader,
  // which now remounts per page. Astro strips <html>'s attributes on swap, taking
  // --shader-fallback with it, and won't re-run the head script. Restoring it here
  // (on astro:after-swap, before paint) stops the incoming shader from flashing the
  // default gradient while it fades in.
  useEffect(() => {
    const apply = () => {
      const current = readSettings();
      document.documentElement.style.setProperty(
        '--shader-fallback',
        backgroundFallbacks[current.variant],
      );
    };
    apply();
    document.addEventListener('astro:after-swap', apply);
    return () => document.removeEventListener('astro:after-swap', apply);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const set = (patch: Partial<BackgroundSettings>) => setSettings(writeSettings(patch));

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-16 z-50 flex justify-end px-4 sm:px-6">
      <div className="pointer-events-auto flex w-full max-w-sm flex-col items-end gap-3">
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-label="Background settings"
            className="flex max-h-[min(70vh,32rem)] w-full flex-col rounded-2xl border
                       border-zinc-700/70 bg-zinc-900/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-baseline justify-between border-b border-zinc-800 px-4 py-3">
              <h2 className="text-sm font-semibold text-zinc-100">Background</h2>
              <button
                type="button"
                onClick={() => setSettings(resetSettings())}
                className="text-xs text-zinc-500 underline-offset-2 hover:text-zinc-200 hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-zinc-300">Animation</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.enabled}
                  aria-label="Toggle shader animation"
                  onClick={() => set({ enabled: !settings.enabled })}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    settings.enabled ? 'bg-zinc-100' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-zinc-900 transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {GROUPS.map((group) => (
                <fieldset key={group} className="mt-4">
                  <legend className="text-[0.7rem] uppercase tracking-wide text-zinc-500">
                    {group}
                  </legend>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {backgroundGroups[group].map((variant) => {
                      const active = settings.variant === variant;
                      return (
                        <button
                          key={variant}
                          type="button"
                          title={`${variant} — ${backgroundLabels[variant]}`}
                          aria-label={`${variant}, ${backgroundLabels[variant]}`}
                          aria-pressed={active}
                          onClick={() => set({ variant, enabled: true })}
                          className={`h-10 rounded-lg border transition-all ${
                            active
                              ? 'border-zinc-100 ring-2 ring-zinc-100/60'
                              : 'border-zinc-700 hover:border-zinc-400'
                          }`}
                          style={{ background: backgroundFallbacks[variant] }}
                        />
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <p className="mt-3 font-mono text-xs text-zinc-400">
                {settings.variant}
                <span className="ml-2 text-zinc-600">{backgroundLabels[settings.variant]}</span>
              </p>

              <fieldset className="mt-4">
                <legend className="text-[0.7rem] uppercase tracking-wide text-zinc-500">
                  Quality
                </legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {QUALITIES.map((q) => {
                    const active = settings.quality === q;
                    return (
                      <button
                        key={q}
                        type="button"
                        aria-pressed={active}
                        onClick={() => set({ quality: q })}
                        className={`rounded-lg border px-2 py-1.5 text-xs capitalize transition-colors ${
                          active
                            ? 'border-zinc-100 bg-zinc-100 text-zinc-900'
                            : 'border-zinc-700 text-zinc-300 hover:border-zinc-400'
                        }`}
                      >
                        {q}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="mt-4 block">
                <span className="flex items-baseline justify-between text-[0.7rem] uppercase tracking-wide text-zinc-500">
                  Speed
                  <span className="font-mono normal-case text-zinc-400">
                    {settings.speed.toFixed(2)}&times;
                  </span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.05"
                  value={settings.speed}
                  onChange={(e) => set({ speed: Number(e.target.value) })}
                  className="mt-2 w-full accent-zinc-100"
                />
              </label>

              <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                Saved in this browser. Reduced-motion always wins.
              </p>
            </div>
          </div>
        )}

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Background settings"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700
                     bg-zinc-900/90 text-zinc-300 shadow-lg backdrop-blur-md transition-colors
                     hover:border-zinc-500 hover:text-zinc-100
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
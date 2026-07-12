import { useEffect, useRef, useState } from 'react';
import { Warp, type WarpProps } from '@paper-design/shaders-react';

export interface WarpBackgroundProps extends Omit<WarpProps, 'style'> {
  style?: React.CSSProperties;
  /** Stop rendering when the canvas scrolls fully out of view. */
  pauseWhenOffscreen?: boolean;
}

/**
 * WebGL warp background tuned for low cost:
 * - caps render resolution (maxPixelCount / minPixelRatio) so high-DPI and large
 *   screens don't render millions of extra fragments for a blurred backdrop
 * - honors prefers-reduced-motion by freezing to a static frame (speed 0 halts
 *   the render loop entirely)
 * - pauses while scrolled offscreen; the library already pauses on tab-hidden
 */
export default function WarpBackground({
  style,
  speed = 0.4,
  swirl = 0.8,
  swirlIterations = 6,
  proportion = 0.45,
  softness = 1,
  distortion = 0.25,
  pauseWhenOffscreen = true,
  ...props
}: WarpBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [onscreen, setOnscreen] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

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
    const io = new IntersectionObserver(
      ([entry]) => setOnscreen(entry?.isIntersecting ?? true),
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pauseWhenOffscreen]);

  const effectiveSpeed = reduceMotion || !onscreen ? 0 : speed;

  return (
    <div ref={ref} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <Warp
        speed={effectiveSpeed}
        swirl={swirl}
        swirlIterations={swirlIterations}
        proportion={proportion}
        softness={softness}
        distortion={distortion}
        minPixelRatio={1}
        maxPixelCount={1_200_000}
        webGlContextAttributes={{ antialias: false, powerPreference: 'low-power' }}
        style={{ display: 'block', width: '100%', height: '100%' }}
        {...props}
      />
    </div>
  );
}

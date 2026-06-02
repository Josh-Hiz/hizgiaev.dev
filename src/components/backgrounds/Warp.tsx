import { Warp, type WarpProps } from '@paper-design/shaders-react';

// API changed in 0.0.76:
//   color1/color2/color3  →  colors: string[]   (up to 4 colors)
//   New props: proportion, softness, shape, distortion
//   Removed: color1, color2, color3, shapeScale (now just scale inside sizing)
//
// Docs: https://paper-design-shaders-16.mintlify.app/shaders/warp

export interface WarpBackgroundProps extends Omit<WarpProps, 'style'> {
  style?: React.CSSProperties;
}

export default function WarpBackground({ style, ...props }: WarpBackgroundProps) {
  return (
    <Warp
      // Sensible defaults — all overridable by the caller via spread.
      speed={0.4}
      swirl={0.8}
      swirlIterations={10}
      proportion={0.45}
      softness={1}
      distortion={0.25}
      // display:block removes the ~4px inline-block gap beneath the canvas.
      style={{
        display: 'block',
        width:   '100%',
        height:  '100%',
        ...style,
      }}
      {...props}
    />
  );
}
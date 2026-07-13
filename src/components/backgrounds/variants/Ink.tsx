import { Warp } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Ink({ speed, ...gl }: VariantProps) {
  return (
    <Warp
      {...gl}
      style={fill}
      colors={['#111314', '#9faeab', '#f3fee7']}
      scale={1.2}
      rotation={44}
      offsetY={-0.3}
      proportion={0.08}
      softness={0}
      distortion={0.25}
      swirl={0.8}
      swirlIterations={10}
      shape="checks"
      shapeScale={0.28}
      speed={speed * 1}
    />
  );
}

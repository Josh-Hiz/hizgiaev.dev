import { Warp } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Verdant({ speed, ...gl }: VariantProps) {
  return (
    <Warp
      {...gl}
      style={fill}
      colors={['#a7e58b', '#2c4a35', '#0a180d']}
      scale={0.9}
      rotation={160}
      proportion={0.64}
      softness={1.5}
      distortion={0.2}
      swirl={0.86}
      swirlIterations={8}
      shape="edge"
      shapeScale={0.6}
      speed={speed * 1.2}
    />
  );
}

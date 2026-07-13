import { Metaballs } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Blobs({ speed, ...gl }: VariantProps) {
  return (
    <Metaballs
      {...gl}
      style={fill}
      fit="cover"
      scale={3}
      offsetX={-0.3}
      colorBack="#14120f"
      colors={['#d07a01', '#ffc105', '#f0edea']}
      count={12}
      size={0.8}
      speed={speed * 0.5}
    />
  );
}

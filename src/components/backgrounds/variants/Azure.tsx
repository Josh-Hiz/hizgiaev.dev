import { MeshGradient } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Azure({ speed, ...gl }: VariantProps) {
  return (
    <MeshGradient
      {...gl}
      style={fill}
      fit="cover"
      colors={['#05070f', '#1e5fbf', '#7fb2ff', '#e0eaff']}
      distortion={0.85}
      swirl={0.25}
      grainOverlay={0.08}
      speed={speed * 0.5}
    />
  );
}

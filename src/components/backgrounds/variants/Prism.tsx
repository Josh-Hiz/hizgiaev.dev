import { MeshGradient } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Prism({ speed, ...gl }: VariantProps) {
  return (
    <MeshGradient
      {...gl}
      style={fill}
      fit="cover"
      colors={['#0a0a0a', '#d07a01', '#2f6fe0', '#12a150', '#f0edea']}
      distortion={0.9}
      swirl={0.35}
      grainOverlay={0.12}
      speed={speed * 0.4}
    />
  );
}

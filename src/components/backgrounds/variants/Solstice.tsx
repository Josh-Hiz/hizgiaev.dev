import { GodRays } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Solstice({ speed, ...gl }: VariantProps) {
  return (
    <GodRays
      {...gl}
      style={fill}
      fit="cover"
      offsetY={-0.55}
      colorBack="#0a0a0a"
      colorBloom="#d07a01"
      colors={['#d07a01', '#ffc085', '#f0edea']}
      density={0.45}
      spotty={0.15}
      midSize={0.33}
      midIntensity={0.4}
      intensity={0.79}
      bloom={0.4}
      speed={speed * 0.8}
    />
  );
}

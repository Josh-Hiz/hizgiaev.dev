import { GodRays } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Aurora({ speed, ...gl }: VariantProps) {
  return (
    <GodRays
      {...gl}
      style={fill}
      fit="cover"
      offsetY={-0.4}
      colorBack="#05070f"
      colorBloom="#1e5fbf"
      colors={['#33fff5', '#6200ff', '#ffffff']}
      density={0.35}
      spotty={0.3}
      midSize={0.2}
      midIntensity={0.4}
      intensity={0.8}
      bloom={0.5}
      speed={speed * 0.6}
    />
  );
}

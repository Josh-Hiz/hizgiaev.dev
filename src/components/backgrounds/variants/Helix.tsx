import { Swirl } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Helix({ speed, ...gl }: VariantProps) {
  return (
    <Swirl
      {...gl}
      style={fill}
      fit="cover"
      colorBack="#14120f"
      colors={['#f0edea', '#d07a01', '#7a3f00']}
      bandCount={4}
      twist={0.2}
      center={0.2}
      proportion={0.5}
      softness={0.4}
      noiseFrequency={0.4}
      noise={0.15}
      speed={speed * 0.35}
    />
  );
}

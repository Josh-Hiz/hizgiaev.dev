import { Spiral } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Spiralis({ speed, ...gl }: VariantProps) {
  return (
    <Spiral
      {...gl}
      style={fill}
      scale={1}
      colorBack="#001429"
      colorFront="#79d1ff"
      density={0.8}
      distortion={0.25}
      strokeWidth={0.5}
      strokeTaper={0.2}
      strokeCap={0.3}
      noise={0.15}
      noiseFrequency={0.3}
      softness={0.2}
      speed={speed * 0.4}
    />
  );
}

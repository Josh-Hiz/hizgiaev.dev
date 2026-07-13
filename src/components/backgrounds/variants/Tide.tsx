import { Water } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Tide({ speed, ...gl }: VariantProps) {
  return (
    <Water
      {...gl}
      style={fill}
      fit="cover"
      scale={1}
      colorBack="#123a6b"
      colorHighlight="#cfe6ff"
      highlights={0.35}
      layering={0.4}
      edges={0.5}
      caustic={0.3}
      waves={0.4}
      size={0.7}
      speed={speed * 0.6}
    />
  );
}

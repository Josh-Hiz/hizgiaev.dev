import { ColorPanels } from '@paper-design/shaders-react';
import { fill, type VariantProps } from './types';

export default function Panels({ speed, ...gl }: VariantProps) {
  return (
    <ColorPanels
      {...gl}
      style={fill}
      fit="cover"
      scale={1}
      colorBack="#0a0a0a"
      colors={['#d07a01', '#2f6fe0', '#12a150', '#f0edea', '#6200ff']}
      angle1={0.3}
      angle2={-0.4}
      length={1.1}
      edges={false}
      blur={0.15}
      fadeIn={0.4}
      fadeOut={0.4}
      density={0.9}
      gradient={0.3}
      speed={speed * 0.5}
    />
  );
}

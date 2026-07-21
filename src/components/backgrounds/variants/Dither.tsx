import { Dithering } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Dither({ speed, ...gl }: VariantProps) {
  return (
    <Dithering
      {...gl}
      style={fill}
      fit="cover"
      scale={1}
      colorBack="#0a0b0d"
      colorFront="#9faeab"
      shape="swirl"
      type="8x8"
      size={2}
      speed={speed * 0.7}
    />
  );
}

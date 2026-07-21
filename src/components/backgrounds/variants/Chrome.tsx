import { LiquidMetal } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Chrome({ speed, ...gl }: VariantProps) {
  return (
    <LiquidMetal
      {...gl}
      style={fill}
      fit="cover"
      scale={0.8}
      colorBack="#0a0a0a"
      colorTint="#c8ccd4"
      shape="metaballs"
      repetition={2}
      shiftRed={0.3}
      shiftBlue={0.3}
      contour={0.4}
      softness={0.3}
      distortion={0.1}
      angle={70}
      speed={speed * 0.8}
    />
  );
}

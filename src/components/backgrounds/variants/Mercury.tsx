import { LiquidMetal } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Mercury({ speed, ...gl }: VariantProps) {
  return (
    <LiquidMetal
      {...gl}
      style={fill}
      fit="cover"
      scale={1}
      colorBack="#05070f"
      colorTint="#2c5d72"
      shape="circle"
      repetition={6}
      shiftRed={1}
      shiftBlue={-1}
      contour={0.4}
      softness={0.8}
      distortion={0.4}
      angle={0}
      speed={speed * 0.7}
    />
  );
}

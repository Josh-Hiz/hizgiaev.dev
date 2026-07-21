import { GrainGradient } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Ripple({ speed, ...gl }: VariantProps) {
  return (
    <GrainGradient
      {...gl}
      style={fill}
      fit="cover"
      scale={0.6}
      colorBack="#140a00"
      colors={["#d07a01", "#88ddae", "#2c0b1d"]}
      shape="ripple"
      softness={0.5}
      intensity={0.5}
      noise={0.5}
      speed={speed * 0.8}
    />
  );
}

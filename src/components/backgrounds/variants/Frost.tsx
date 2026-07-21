import { GrainGradient } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Frost({ speed, ...gl }: VariantProps) {
  return (
    <GrainGradient
      {...gl}
      style={fill}
      fit="cover"
      colorBack="#0a0b0d"
      colors={["#8f949c", "#d8d4d0", "#f0edea"]}
      shape="wave"
      softness={0.7}
      intensity={0.18}
      noise={0.45}
      speed={speed * 0.6}
    />
  );
}

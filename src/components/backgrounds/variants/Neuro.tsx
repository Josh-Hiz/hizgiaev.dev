import { NeuroNoise } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Neuro({ speed, ...gl }: VariantProps) {
  return (
    <NeuroNoise
      {...gl}
      style={fill}
      scale={1.2}
      colorFront="#38d39f"
      colorMid="#1e5fbf"
      colorBack="#05100d"
      brightness={0.08}
      contrast={0.35}
      speed={speed * 0.8}
    />
  );
}

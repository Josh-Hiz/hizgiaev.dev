import { SmokeRing } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Halo({ speed, ...gl }: VariantProps) {
  return (
    <SmokeRing
      {...gl}
      style={fill}
      fit="cover"
      scale={1.4}
      colorBack="#05070f"
      colors={["#7fb2ff", "#e0eaff", "#1e5fbf"]}
      noiseScale={1.6}
      noiseIterations={6}
      radius={0.35}
      thickness={0.55}
      innerShape={1}
      speed={speed * 0.6}
    />
  );
}

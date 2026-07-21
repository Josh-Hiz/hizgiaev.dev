import { Voronoi } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Cells({ speed, ...gl }: VariantProps) {
  return (
    <Voronoi
      {...gl}
      style={fill}
      scale={0.6}
      colors={["#a7e58b", "#12a150"]}
      stepsPerColor={3}
      colorGlow="#f0edea"
      colorGap="#0a180d"
      distortion={0.35}
      gap={0.04}
      glow={0.4}
      speed={speed * 0.5}
    />
  );
}

import { Warp } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Nectar({ speed, ...gl }: VariantProps) {
  return (
    <Warp
      {...gl}
      style={fill}
      colors={["#151310", "#d3a86b", "#f0edea"]}
      scale={2}
      offsetY={0.6}
      proportion={0.24}
      softness={1}
      distortion={0.21}
      swirl={0.57}
      swirlIterations={10}
      shape="edge"
      shapeScale={0.75}
      speed={speed * 1.4}
    />
  );
}

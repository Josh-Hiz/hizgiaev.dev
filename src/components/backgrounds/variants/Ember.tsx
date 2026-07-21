import { Warp } from "@paper-design/shaders-react";
import { fill, type VariantProps } from "./types";

export default function Ember({ speed, ...gl }: VariantProps) {
  return (
    <Warp
      {...gl}
      style={fill}
      colors={["#14120f", "#d07a01", "#f0edea"]}
      proportion={0.45}
      softness={1}
      distortion={0.25}
      swirl={0.5}
      swirlIterations={10}
      shape="checks"
      shapeScale={0.1}
      speed={speed * 0.6}
    />
  );
}

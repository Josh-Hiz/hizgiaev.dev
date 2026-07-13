export interface VariantProps {
  /** Already multiplied by the user's speed setting. */
  speed: number;
  minPixelRatio: number;
  maxPixelCount: number;
  webGlContextAttributes: WebGLContextAttributes;
}

export const fill = { display: 'block', width: '100%', height: '100%' } as const;

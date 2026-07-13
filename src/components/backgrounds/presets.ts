export const backgroundVariants = [
  'ember', 'nectar', 'blobs', 'solstice', 'helix',
  'azure', 'tide', 'halo', 'spiralis', 'mercury',
  'verdant', 'cells', 'neuro',
  'frost', 'ripple',
  'ink', 'dither',
  'chrome',
  'prism', 'aurora', 'panels',
] as const;

export type BackgroundVariant = (typeof backgroundVariants)[number];

export type BackgroundGroup =
  | 'Orange' | 'Blue' | 'Green' | 'White' | 'Monochrome' | 'Metallic' | 'Colorful';

export const backgroundGroups: Record<BackgroundGroup, readonly BackgroundVariant[]> = {
  Orange: ['ember', 'nectar', 'blobs', 'solstice', 'helix'],
  Blue: ['azure', 'tide', 'halo', 'spiralis'],
  Green: ['verdant', 'cells', 'neuro'],
  White: ['frost', 'ripple'],
  Monochrome: ['ink', 'dither'],
  Metallic: ['chrome', 'mercury'],
  Colorful: ['prism', 'aurora', 'panels'],
};

export const backgroundLabels: Record<BackgroundVariant, string> = {
  ember: 'Warp',
  nectar: 'Warp, amber',
  blobs: 'Metaballs',
  solstice: 'God rays',
  helix: 'Swirl bands',
  azure: 'Mesh gradient',
  tide: 'Water',
  halo: 'Smoke ring',
  spiralis: 'Spiral',
  mercury: 'Liquid metal, steel',
  verdant: 'Warp, kelp',
  cells: 'Voronoi',
  neuro: 'Neuro noise',
  frost: 'Grain gradient',
  ripple: 'Grain ripple',
  ink: 'Warp, ink',
  dither: 'Dithering',
  chrome: 'Liquid metal',
  prism: 'Mesh gradient',
  aurora: 'God rays',
  panels: 'Color panels',
};

/**
 * Painted server-side beneath each shader: it covers the pre-hydration frames,
 * reduced-motion, and the animation-off setting. Keep each roughly in the key
 * of its shader, or the cross-fade will be visible.
 */
export const backgroundFallbacks: Record<BackgroundVariant, string> = {
  ember: 'radial-gradient(125% 125% at 30% 15%, #d07a01 0%, #14120f 55%, #0a0a0a 100%)',
  nectar: 'radial-gradient(125% 125% at 40% 80%, #f0edea 0%, #d3a86b 40%, #151310 100%)',
  blobs: 'radial-gradient(100% 100% at 25% 30%, #ffc105 0%, #d07a01 40%, #14120f 100%)',
  solstice: 'radial-gradient(120% 120% at 50% 0%, #ffc085 0%, #d07a01 35%, #0a0a0a 100%)',
  helix: 'conic-gradient(from 200deg at 50% 50%, #14120f 0%, #d07a01 35%, #f0edea 60%, #14120f 100%)',
  azure: 'radial-gradient(125% 125% at 30% 15%, #7fb2ff 0%, #1e5fbf 45%, #05070f 100%)',
  tide: 'radial-gradient(125% 125% at 35% 20%, #cfe6ff 0%, #123a6b 50%, #05070f 100%)',
  halo: 'radial-gradient(60% 60% at 50% 45%, #e0eaff 0%, #1e5fbf 45%, #05070f 100%)',
  spiralis: 'conic-gradient(from 90deg at 50% 50%, #001429 0%, #79d1ff 40%, #001429 80%)',
  mercury: 'linear-gradient(140deg, #05070f 0%, #2c5d72 45%, #cfe6ff 100%)',
  verdant: 'radial-gradient(125% 125% at 30% 15%, #a7e58b 0%, #2c4a35 55%, #0a180d 100%)',
  cells: 'radial-gradient(125% 125% at 30% 20%, #a7e58b 0%, #12a150 45%, #0a180d 100%)',
  neuro: 'radial-gradient(125% 125% at 35% 25%, #38d39f 0%, #1e5fbf 50%, #05100d 100%)',
  frost: 'radial-gradient(125% 125% at 30% 15%, #f0edea 0%, #8f949c 45%, #0a0b0d 100%)',
  ripple: 'radial-gradient(80% 80% at 50% 50%, #88ddae 0%, #d07a01 45%, #140a00 100%)',
  ink: 'radial-gradient(125% 125% at 30% 15%, #f3fee7 0%, #9faeab 35%, #111314 100%)',
  dither: 'radial-gradient(120% 120% at 40% 30%, #9faeab 0%, #4a5250 45%, #0a0b0d 100%)',
  chrome: 'radial-gradient(125% 125% at 30% 15%, #e6e8ec 0%, #7c828c 40%, #0a0a0a 100%)',
  prism: 'radial-gradient(125% 125% at 25% 10%, #d07a01 0%, #2f6fe0 40%, #12a150 70%, #0a0a0a 100%)',
  aurora: 'radial-gradient(125% 125% at 35% 20%, #33fff5 0%, #4318b8 50%, #05070f 100%)',
  panels: 'linear-gradient(135deg, #0a0a0a 0%, #6200ff 25%, #2f6fe0 50%, #12a150 72%, #d07a01 100%)',
};

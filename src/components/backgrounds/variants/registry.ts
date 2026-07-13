import type { ComponentType } from 'react';
import type { BackgroundVariant } from '../presets';
import type { VariantProps } from './types';

type Loader = () => Promise<{ default: ComponentType<VariantProps> }>;

/**
 * Static import specifiers so Vite can code-split each shader into its own
 * chunk. Only the variant the visitor actually picked is downloaded.
 */
export const variantLoaders: Record<BackgroundVariant, Loader> = {
  ember: () => import('./Ember'),
  nectar: () => import('./Nectar'),
  blobs: () => import('./Blobs'),
  solstice: () => import('./Solstice'),
  helix: () => import('./Helix'),
  azure: () => import('./Azure'),
  tide: () => import('./Tide'),
  halo: () => import('./Halo'),
  spiralis: () => import('./Spiralis'),
  mercury: () => import('./Mercury'),
  verdant: () => import('./Verdant'),
  cells: () => import('./Cells'),
  neuro: () => import('./Neuro'),
  frost: () => import('./Frost'),
  ripple: () => import('./Ripple'),
  ink: () => import('./Ink'),
  dither: () => import('./Dither'),
  chrome: () => import('./Chrome'),
  prism: () => import('./Prism'),
  aurora: () => import('./Aurora'),
  panels: () => import('./Panels'),
};

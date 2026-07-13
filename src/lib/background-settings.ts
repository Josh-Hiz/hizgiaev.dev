import {
  backgroundFallbacks,
  backgroundVariants,
  type BackgroundVariant,
} from '@components/backgrounds/presets';

export type ShaderQuality = 'high' | 'balanced' | 'low';

export interface BackgroundSettings {
  variant: BackgroundVariant;
  quality: ShaderQuality;
  /** Multiplies each variant's base speed. */
  speed: number;
  /** When false, only the CSS gradient renders and no WebGL context is created. */
  enabled: boolean;
}

export const STORAGE_KEY = 'hz:bg';
export const CHANGE_EVENT = 'hz:bg-change';

export const DEFAULT_SETTINGS: BackgroundSettings = {
  variant: 'ember',
  quality: 'high',
  speed: 1,
  enabled: true,
};

const isVariant = (v: unknown): v is BackgroundVariant =>
  typeof v === 'string' && (backgroundVariants as readonly string[]).includes(v);

const isQuality = (v: unknown): v is ShaderQuality =>
  v === 'high' || v === 'balanced' || v === 'low';

/** Never throws: bad or absent storage falls back to defaults. */
export function readSettings(): BackgroundSettings {
  if (typeof localStorage === 'undefined') return DEFAULT_SETTINGS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return DEFAULT_SETTINGS;

    const p = parsed as Partial<Record<keyof BackgroundSettings, unknown>>;
    return {
      variant: isVariant(p.variant) ? p.variant : DEFAULT_SETTINGS.variant,
      quality: isQuality(p.quality) ? p.quality : DEFAULT_SETTINGS.quality,
      speed:
        typeof p.speed === 'number' && p.speed >= 0 && p.speed <= 3
          ? p.speed
          : DEFAULT_SETTINGS.speed,
      enabled: typeof p.enabled === 'boolean' ? p.enabled : DEFAULT_SETTINGS.enabled,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Keeps the pre-paint CSS fallback in sync with the chosen variant. */
function applyToDocument(settings: BackgroundSettings): void {
  const root = document.documentElement;
  root.dataset.bg = settings.variant;
  root.style.setProperty('--shader-fallback', backgroundFallbacks[settings.variant]);
}

export function writeSettings(patch: Partial<BackgroundSettings>): BackgroundSettings {
  const next: BackgroundSettings = { ...readSettings(), ...patch };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode / quota: the setting still applies for this session.
  }

  applyToDocument(next);
  window.dispatchEvent(new CustomEvent<BackgroundSettings>(CHANGE_EVENT, { detail: next }));
  return next;
}

export function resetSettings(): BackgroundSettings {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  applyToDocument(DEFAULT_SETTINGS);
  window.dispatchEvent(
    new CustomEvent<BackgroundSettings>(CHANGE_EVENT, { detail: DEFAULT_SETTINGS }),
  );
  return DEFAULT_SETTINGS;
}

/** Returns an unsubscribe function. Also syncs across browser tabs. */
export function subscribe(onChange: (settings: BackgroundSettings) => void): () => void {
  const onCustom = (e: Event) => onChange((e as CustomEvent<BackgroundSettings>).detail);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange(readSettings());
  };

  window.addEventListener(CHANGE_EVENT, onCustom);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustom);
    window.removeEventListener('storage', onStorage);
  };
}

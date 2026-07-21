import { useEffect, useState } from "react";
import type { BackgroundVariant } from "./presets";
import {
  type BackgroundSettings,
  readSettings,
  subscribe,
  writeSettings,
} from "@lib/background-settings";

export default function ApplyVariant({
  variant,
}: {
  variant: BackgroundVariant;
}) {
  const [settings, setSettings] = useState<BackgroundSettings | null>(null);

  useEffect(() => {
    setSettings(readSettings());
    return subscribe(setSettings);
  }, []);

  const active = settings?.variant === variant;

  return (
    <button
      type="button"
      onClick={() => writeSettings({ variant, enabled: true })}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-zinc-100 bg-zinc-100 text-zinc-900"
          : "border-zinc-700 text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
      }`}
    >
      {active ? "Active" : "Use this"}
    </button>
  );
}

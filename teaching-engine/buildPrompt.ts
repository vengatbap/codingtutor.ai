import { SignalSnapshot } from "./types";
import { decidePromptModifiers } from "./decideModifiers";
import { modifierTextMap } from "./modifierText";

export function buildTeachingPrompt(
  basePrompt: string,
  signals: SignalSnapshot
): string {
  const modifiers = decidePromptModifiers(signals);

  const modifierText = modifiers
    .map((m) => modifierTextMap[m])
    .join("\n");

  return `
${basePrompt}

${modifierText}
`.trim();
}

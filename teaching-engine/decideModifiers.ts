import { SignalSnapshot, PromptModifier } from "./types";

export function decidePromptModifiers(
  signals: SignalSnapshot
): PromptModifier[] {
  const modifiers: PromptModifier[] = [];

  const {
    idleSeconds,
    wrongAttempts,
    correctAttempts,
    messageLength,
    totalAttempts,
  } = signals;

  // Case B — silent / hesitant
  if (idleSeconds > 60 && totalAttempts === 0) {
    modifiers.push("ASK_GUIDING_QUESTION", "ENCOURAGE");
    return modifiers;
  }

  // Case A — stuck but trying
  if (idleSeconds > 60 && wrongAttempts >= 1) {
    modifiers.push("SIMPLIFY", "GIVE_EXAMPLE");
    return modifiers;
  }

  // Case C — repeated confusion
  if (wrongAttempts >= 2 && messageLength < 20) {
    modifiers.push("SIMPLIFY", "ENCOURAGE");
    return modifiers;
  }

  // Case D — quick correct understanding
  if (correctAttempts === 1 && totalAttempts === 1) {
    modifiers.push("CONFIRM_AND_MOVE_FORWARD");
    return modifiers;
  }

  // Case E — strong engagement
  if (correctAttempts >= 2 && messageLength > 80) {
    modifiers.push("CHALLENGE_GENTLY");
    return modifiers;
  }

  // Default — neutral teaching
  return modifiers;
}

import { PromptModifier } from "./types";

export const modifierTextMap: Record<PromptModifier, string> = {
  SIMPLIFY:
    "Explain using simpler words. Focus on one idea at a time.",

  GIVE_EXAMPLE:
    "Give a clear, real-world example and relate it to the concept.",

  ASK_GUIDING_QUESTION:
    "Ask one guiding question without giving the answer.",

  CONFIRM_AND_MOVE_FORWARD:
    "Confirm briefly and introduce the next idea naturally.",

  ENCOURAGE:
    "Encourage the student and normalize confusion.",

  CHALLENGE_GENTLY:
    "Ask a slightly deeper follow-up question.",
};

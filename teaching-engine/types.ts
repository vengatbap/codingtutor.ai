// Observable facts only

export type SignalSnapshot = {
  idleSeconds: number;
  wrongAttempts: number;
  correctAttempts: number;
  messageLength: number; // last student message length
  totalAttempts: number;
};

export type PromptModifier =
  | "SIMPLIFY"
  | "GIVE_EXAMPLE"
  | "ASK_GUIDING_QUESTION"
  | "CONFIRM_AND_MOVE_FORWARD"
  | "ENCOURAGE"
  | "CHALLENGE_GENTLY";

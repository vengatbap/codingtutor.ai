import { SignalSnapshot } from "./types";

let lastInteractionAt = Date.now();

export function initSignals(): SignalSnapshot {
  lastInteractionAt = Date.now();
  return {
    idleSeconds: 0,
    wrongAttempts: 0,
    correctAttempts: 0,
    messageLength: 0,
    totalAttempts: 0,
  };
}

export function updateIdle(signals: SignalSnapshot): SignalSnapshot {
  const now = Date.now();
  return {
    ...signals,
    idleSeconds: Math.floor((now - lastInteractionAt) / 1000),
  };
}

export function updateOnStudentMessage(
  signals: SignalSnapshot,
  message: string
): SignalSnapshot {
  lastInteractionAt = Date.now();
  return {
    ...signals,
    messageLength: message.length,
    idleSeconds: 0,
  };
}

export function updateOnPracticeResult(
  signals: SignalSnapshot,
  correct: boolean
): SignalSnapshot {
  lastInteractionAt = Date.now();
  return {
    ...signals,
    totalAttempts: signals.totalAttempts + 1,
    correctAttempts: correct
      ? signals.correctAttempts + 1
      : signals.correctAttempts,
    wrongAttempts: !correct
      ? signals.wrongAttempts + 1
      : signals.wrongAttempts,
  };
}

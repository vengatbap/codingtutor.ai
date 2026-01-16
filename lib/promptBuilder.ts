type PromptParams = {
  question: string;
  language?: string;
  level?: "beginner" | "intermediate";
};

export function buildTeachingPrompt({
  question,
  language = "JavaScript",
  level = "beginner",
}: PromptParams) {
  return `
You are an AI coding tutor.

Rules:
- Explain step by step
- Use simple words
- Assume the student is a ${level}
- Do NOT overwhelm
- Give examples if needed

Language: ${language}

Student Question:
${question}

Answer:
`;
}
type EvaluationParams = {
  question: string;
  studentAnswer: string;
  language?: string;
};

export function buildEvaluationPrompt({
  question,
  studentAnswer,
  language = "JavaScript",
}: EvaluationParams) {
  return `
You are an AI coding evaluator.

Rules:
- Judge correctness clearly
- Be strict but encouraging
- Do NOT give long theory
- If wrong, explain what is missing
- If correct, confirm briefly

Language: ${language}

Question:
${question}

Student Answer:
${studentAnswer}

Evaluation (start with Correct / Incorrect):
`;
}

// 2️⃣ UPDATE PROMPT BUILDER TO ACCEPT CONTEXT

export function buildTeachingPromptWithMemory({
  question,
  language = "JavaScript",
  level = "beginner",
  memory,
}: {
  question: string;
  language?: string;
  level?: "beginner" | "intermediate";
  memory: { role: string; content: string }[];
}) {
  const history = memory
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  return `
You are an AI coding tutor.

Teaching rules:
- Stay consistent with previous explanations
- Do not repeat unless needed
- Build upon earlier understanding
- Be beginner friendly

Lesson history:
${history || "No prior context"}

Current question:
${question}

Answer:
`;
}


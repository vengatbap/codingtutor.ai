import { buildTeachingPrompt } from "./buildPrompt";

// 🔹 Mock lesson content (acts like DB / API response)
const lessonPrompt = `
Goal:
Understand HTML document structure.

Concepts:
- HTML has a fixed structure
- <head> is metadata
- <body> is visible content

Teaching instructions:
Explain slowly and ask questions.
`;

const basePrompt = `
You are a patient human teacher.

Lesson context:
${lessonPrompt}

Rules:
- Teach step by step
- Adapt based on student responses
- Do not overwhelm
`;

const signals = {
  idleSeconds: 75,
  wrongAttempts: 1,
  correctAttempts: 0,
  messageLength: 10,
  totalAttempts: 1,
};

const prompt = buildTeachingPrompt(basePrompt, signals);

console.log(prompt);

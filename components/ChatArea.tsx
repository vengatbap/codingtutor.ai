"use client";

import { useEffect, useState } from "react";
import { buildTeachingPrompt } from "@/teaching-engine/buildPrompt";
import {
  initSignals,
  updateOnStudentMessage,
} from "@/teaching-engine/signalTracker";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatArea({ lessonId }: { lessonId: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [signals, setSignals] = useState(initSignals());
  const [lessonContext, setLessonContext] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [starterPrompt, setStarterPrompt] = useState<string>("");
useEffect(() => {
  if (!lessonId) return;

  async function loadLesson() {
    const res = await fetch(`/api/lesson/${lessonId}`);
    const lesson = await res.json();

    // Teacher's internal lesson notes
    setLessonContext(lesson.content);
    setStarterPrompt(lesson.starterPrompt ?? "");

    // Reset signals
    setSignals(initSignals());

    // Initialize messages ONCE
    if (lesson.starterPrompt) {
      setMessages([
        {
          role: "assistant",
          content: lesson.starterPrompt,
        },
      ]);
    } else {
      setMessages([]);
    }
  }

  loadLesson();
}, [lessonId]);


  if (!lessonId) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500">
        Select a lesson to start learning
      </div>
    );
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const updatedSignals = updateOnStudentMessage(signals, input);
    setSignals(updatedSignals);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);

    setInput("");
    setLoading(true);

    const basePrompt = `
You are a patient human teacher.

Lesson context (internal notes, do not repeat verbatim):
${lessonContext}

Rules:
- Teach step by step
- Adapt based on student responses
- Do not overwhelm
`;

    const finalPrompt = buildTeachingPrompt(
      basePrompt,
      updatedSignals
    );

    const res = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: finalPrompt,
        message: input,
        lessonId,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

    setLoading(false);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role === "user" ? "You" : "Teacher"}:</strong>{" "}
            {m.content}
          </div>
        ))}
        {loading && <div>Teacher is thinking…</div>}
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Ask or answer…"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

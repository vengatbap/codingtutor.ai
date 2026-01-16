import { NextRequest, NextResponse } from "next/server";
import {
  buildTeachingPromptWithMemory,
  buildEvaluationPrompt,
} from "@/lib/promptBuilder";
import { runHFModel } from "@/lib/hfClient";
import {
  getLessonMemory,
  addLessonMemory,
} from "@/lib/lessonMemory";

export async function POST(req: NextRequest) {
  try {
    const {
      task,
      lessonId,
      question,
      answer,
      language,
      level,
    } = await req.json();

    if (!lessonId || !task || !question) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    let prompt = "";
    const memory = getLessonMemory(lessonId);

    if (task === "explain") {
      prompt = buildTeachingPromptWithMemory({
        question,
        language,
        level,
        memory,
      });
    }

    if (task === "evaluate") {
      prompt = buildEvaluationPrompt({
        question,
        studentAnswer: answer,
        language,
      });
    }

    const aiResponse = await runHFModel(prompt);

    // store memory
    addLessonMemory(lessonId, {
      role: "student",
      content: question,
    });

    addLessonMemory(lessonId, {
      role: "ai",
      content: aiResponse,
    });

    return NextResponse.json({
      content: aiResponse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI processing failed" },
      { status: 500 }
    );
  }
}

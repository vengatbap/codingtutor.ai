
import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  context: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await context.params;
  const result = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, lessonId))
    .limit(1);

  const lesson = result[0];

  if (!lesson) {
    return NextResponse.json(
      { error: "Lesson not found" },
      { status: 404 }
    );
  }

  // return NextResponse.json(lesson);
  return NextResponse.json({
  id: lesson.id,
  title: lesson.title,
  content: lesson.content,
  starterPrompt: lesson.starterPrompt,
});

}

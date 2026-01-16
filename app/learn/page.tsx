import { db } from "@/db/drizzle";
import { courses, lessons } from "@/db/schema";
import LearnClient from "./LearnClient";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  try {
    const courseList = await db
      .select()
      .from(courses)
      .orderBy(courses.sortOrder);

    const lessonList = await db
      .select()
      .from(lessons)
      .orderBy(lessons.sortOrder);

    return (
      <LearnClient
        courses={courseList}
        lessons={lessonList}
      />
    );
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

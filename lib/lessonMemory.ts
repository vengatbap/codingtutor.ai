type LessonMessage = {
  role: "student" | "ai";
  content: string;
};

const lessonMemory = new Map<string, LessonMessage[]>();

export function getLessonMemory(lessonId: string) {
  return lessonMemory.get(lessonId) || [];
}

export function addLessonMemory(
  lessonId: string,
  message: LessonMessage
) {
  const history = lessonMemory.get(lessonId) || [];
  history.push(message);

  // limit memory (prevent token explosion)
  if (history.length > 10) {
    history.shift();
  }

  lessonMemory.set(lessonId, history);
}

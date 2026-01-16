"use client";

type Course = {
  id: string;
  title: string;
};

type Lesson = {
  id: string;
  courseId: string;
  title: string;
};

export default function LearnSidebar({
  courses,
  lessons,
  activeCourseId,
  activeLessonId,
  onSelectCourse,
  onSelectLesson,
}: {
  courses: Course[];
  lessons: Lesson[];
  activeCourseId: string | null;
  activeLessonId: string | null;
  onSelectCourse: (id: string) => void;
  onSelectLesson: (id: string) => void;
}) {
  const filteredLessons = lessons.filter(
    (l) => l.courseId === activeCourseId
  );

  return (
    <aside className="w-64 border-r bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b text-sm font-semibold">
        Learning Path
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Courses */}
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-2">COURSES</p>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`w-full text-left px-2 py-1.5 rounded text-sm mb-1 ${
                course.id === activeCourseId
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {course.title}
            </button>
          ))}
        </div>

        {/* Lessons */}
        {activeCourseId && (
          <div className="px-3 pb-4">
            <p className="text-xs text-gray-500 mb-2">LESSONS</p>

            {filteredLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm mb-1 ${
                  lesson.id === activeLessonId
                    ? "bg-white shadow"
                    : "hover:bg-gray-200"
                }`}
              >
                {/* Progress dot (UI only) */}
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="truncate">{lesson.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

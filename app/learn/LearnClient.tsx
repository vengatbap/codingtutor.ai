"use client";

import { useState } from "react";
import ChatArea from "@/components/ChatArea";
import LearnSidebar from "@/components/LearnSidebar";

type Course = {
    id: string;
    title: string;
    description?: string | null;
};

type Lesson = {
    id: string;
    courseId: string;
    title: string;
};

export default function LearnClient({
    courses,
    lessons,
}: {
    courses: Course[];
    lessons: Lesson[];
}) {
    const [activeCourseId, setActiveCourseId] = useState<string | null>(
        courses[0]?.id ?? null
    );
    const [activeLessonId, setActiveLessonId] = useState<string | null>(
        null
    );

    const filteredLessons = lessons.filter(
        (l) => l.courseId === activeCourseId
    );

    return (
        <div className="flex h-[calc(100vh-64px)]">
            <LearnSidebar
                courses={courses}
                lessons={lessons}
                activeCourseId={activeCourseId}
                activeLessonId={activeLessonId}
                onSelectCourse={(id) => {
                    setActiveCourseId(id);
                    setActiveLessonId(null);
                }}
                onSelectLesson={setActiveLessonId}
            />
            <div className="w-64 border-r p-4 space-y-4">
                <div>
                    <h3 className="text-sm font-semibold mb-2">Courses</h3>
                    {courses.map((course) => (
                        <button
                            key={course.id}
                            onClick={() => {
                                setActiveCourseId(course.id);
                                setActiveLessonId(null);
                            }}
                            className={`block w-full text-left text-sm px-2 py-1 rounded ${course.id === activeCourseId
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {course.title}
                        </button>
                    ))}
                </div>

                <div>
                    <h3 className="text-sm font-semibold mb-2">Lessons</h3>
                    {filteredLessons.map((lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`block w-full text-left text-sm px-2 py-1 rounded ${lesson.id === activeLessonId
                                    ? "bg-gray-200"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {lesson.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main chat canvas */}
            <div className="flex-1">
                <ChatArea lessonId={activeLessonId} />
            </div>
        </div>
    );
}

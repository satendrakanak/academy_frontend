"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course";

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  return (
    <div className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div>
          <h1 className="text-xl font-semibold">{course.title}</h1>
          <p className="text-sm text-muted-foreground">
            Manage your course settings
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Draft</Badge>

          <Button variant="outline" size="sm">
            Save
          </Button>

          <Button size="sm">Publish</Button>
        </div>
      </div>
    </div>
  );
};

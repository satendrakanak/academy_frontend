"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import { courseClientService } from "@/services/courses/course.client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/error-handler";
import { userClientService } from "@/services/users/user.client";
import { User } from "@/types/user";

interface AssignFacultyFormProps {
  course: Course;
}

export const AssignFacultyForm = ({ course }: AssignFacultyFormProps) => {
  const [faculties, setFaculties] = useState<User[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const router = useRouter();
  // 🔥 Load faculties + preselect
  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const response = await userClientService.getAllFaculties();
        setFaculties(response.data as User[]);

        // prefill from course
        const existing = course.faculties?.map((f) => f.id) || [];
        setSelected(existing);
      } catch (error: unknown) {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    };

    loadFaculties();
  }, [course]);

  // 🔥 Auto Save
  const saveFaculties = async (updated: number[]) => {
    try {
      await courseClientService.update(course.id, {
        facultyIds: updated,
      });
      router.refresh();
      toast.success("Faculties assigned successfully");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };
  const toggleFaculty = (id: number) => {
    let updated: number[];

    if (selected.includes(id)) {
      updated = selected.filter((item) => item !== id);
    } else {
      updated = [...selected, id];
    }

    setSelected(updated);
    saveFaculties(updated);
  };

  return (
    <div className="rounded-lg border bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-medium">Assign Faculties</h3>
      </div>

      <div className="p-3 space-y-3">
        {/* Gray Panel (no shadow, clean) */}
        <div className="max-h-50 overflow-y-auto ">
          <div className="space-y-2">
            {faculties.map((faculty) => {
              const isChecked = selected.includes(faculty.id);

              return (
                <label
                  key={faculty.id}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFaculty(faculty.id)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                  />
                  {faculty.firstName} {faculty.lastName}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

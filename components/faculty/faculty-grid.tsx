import { FacultyCard } from "./faculty-card";
import { User } from "@/types/user";

export function FacultyGrid({ faculties }: { faculties: User[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {faculties.map((faculty) => (
        <FacultyCard key={faculty.id} faculty={faculty} />
      ))}
    </div>
  );
}

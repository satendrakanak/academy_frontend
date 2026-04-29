import { FacultyCard } from "./faculty-card";
import { User } from "@/types/user";

export function FacultyGrid({ faculties }: { faculties: User[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {faculties.map((faculty) => (
        <FacultyCard key={faculty.id} faculty={faculty} />
      ))}
    </div>
  );
}

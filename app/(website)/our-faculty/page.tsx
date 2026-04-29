import Container from "@/components/container";
import { FacultyHero } from "@/components/faculty/faculty-hero";
import { FacultyGrid } from "@/components/faculty/faculty-grid";
import { userServerService } from "@/services/users/user.server";
import { User } from "@/types/user";

export default async function FacultiesPage() {
  let faculties: User[] = [];

  try {
    const response = await userServerService.getFaculties();
    faculties = response.data;
  } catch (error) {
    console.error("Failed to load faculties");
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <FacultyHero />

      <Container>
        <div className="py-16">
          <FacultyGrid faculties={faculties} />
        </div>
      </Container>
    </div>
  );
}

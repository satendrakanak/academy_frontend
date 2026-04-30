import Container from "@/components/container";
import { FacultyGrid } from "@/components/faculty/faculty-grid";
import { userServerService } from "@/services/users/user.server";
import { User } from "@/types/user";
import { PageHero } from "@/components/sliders/page-hero";

export default async function FacultiesPage() {
  let faculties: User[] = [];

  try {
    const response = await userServerService.getFaculties();
    faculties = response.data;
  } catch {
    console.error("Failed to load faculties");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,var(--brand-50)_100%)]">
      <PageHero
        pageTitle="Faculty Network"
        pageHeadline="Meet the minds behind the learning experience."
        pageDescription="Learn from experienced faculty across nutrition, wellness, and
          lifestyle sciences who bring both depth and real practice into every
          session."
      />

      <Container>
        <div className="py-16">
          <FacultyGrid faculties={faculties} />
        </div>
      </Container>
    </div>
  );
}

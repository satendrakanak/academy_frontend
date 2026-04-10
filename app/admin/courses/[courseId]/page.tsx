import { CourseHeader } from "@/components/admin/courses/course-header";
import { RightSidebar } from "@/components/admin/courses/right-sidebar";
import { BasicInfoForm } from "@/components/admin/courses/basic-info-form";
import { PricingForm } from "@/components/admin/courses/pricing-form";
import { DetailsForm } from "@/components/admin/courses/details-form";
import { FeaturesForm } from "@/components/admin/courses/features-form";
import { RequirementsForm } from "@/components/admin/courses/requirements-form";
import { MediaForm } from "@/components/admin/courses/media-form";
import { MetaForm } from "@/components/admin/courses/meta-form";
import { courseServerService } from "@/services/courses/course.server";

export default async function CourseIdPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const { data } = await courseServerService.getById(courseId);
  return (
    <div>
      <CourseHeader course={data} />

      <div className="grid grid-cols-5 gap-6 py-6">
        {/* LEFT - MAIN CONTENT */}
        <div className="col-span-4 space-y-6">
          <BasicInfoForm course={data} />
          <PricingForm />
          <DetailsForm />
          <FeaturesForm />
          <RequirementsForm />
          <MediaForm />
          <MetaForm />
        </div>

        {/* RIGHT - SIDEBAR */}
        <div className="col-span-1">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

import Container from "@/components/container";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sliders/page-hero";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Unitus Health Academy for course guidance, support, and academy enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="academy-surface min-h-screen">
      <PageHero
        pageTitle="Contact Us"
        pageHeadline="Talk to the academy team with context, not confusion."
        pageDescription="Ask about admissions, course fit, faculty, support, or next steps and we will guide you clearly."
      />

      <Container>
        <div className="grid gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <ContactForm />
          <ContactInfo />
        </div>
      </Container>
    </div>
  );
}

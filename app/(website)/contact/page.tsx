import Container from "@/components/container";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { PageHero } from "@/components/sliders/page-hero";

export default function ContactPage() {
  return (
    <div className="academy-surface min-h-screen">
      <PageHero
        pageTitle="Contact Us"
        pageHeadline="We usually reply within one working day"
        pageDescription="Have questions or need help? Our team is here to assist you."
      />

      <Container>
        <div className="py-16 grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <ContactForm />

          {/* RIGHT */}
          <ContactInfo />
        </div>
      </Container>
    </div>
  );
}

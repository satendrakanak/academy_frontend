import Container from "@/components/container";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export default function ContactPage() {
  return (
    <div className="academy-surface min-h-screen">
      <ContactHero />

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

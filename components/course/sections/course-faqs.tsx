import { CourseFaqItem } from "@/types/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CourseFaqsProps {
  faqs?: CourseFaqItem[];
}

export function CourseFaqs({ faqs = [] }: CourseFaqsProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)]">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
          Course FAQs
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950">
          Common questions before you enroll
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Clear answers to the practical doubts learners usually have about
          this program.
        </p>
      </div>

      {faqs.length ? (
        <Accordion
          type="single"
          collapsible
          className="mt-6 space-y-3"
          defaultValue="faq-0"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={`${faq.question}-${index}`}
              value={`faq-${index}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-5"
            >
              <AccordionTrigger className="py-5 text-base font-semibold text-slate-950 hover:no-underline">
                <span className="pr-4 text-left leading-7">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          FAQs will appear here once the admin adds them for this course.
        </div>
      )}
    </section>
  );
}

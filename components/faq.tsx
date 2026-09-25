import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/content"

export function Faq() {
  return (
    <section className="bg-card/40 py-16 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div>
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2
            id="faq"
            className="mt-2 scroll-mt-24 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl"
          >
            Questions teams ask before they switch
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

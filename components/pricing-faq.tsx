import Balancer from "react-wrap-balancer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingFaqData = [
  {
    id: "item-1",
    question: "How does Projectx's AI improve the real estate listing process?",
    answer:
      "Projectx utilizes AI to analyze property details and generate compelling descriptions that highlight unique features, optimize for search engines, and attract potential buyers more effectively than standard listings.",
  },
  {
    id: "item-2",
    question: "Can I integrate Projectx with my existing real estate tools?",
    answer:
      "Not yet... But soon we can say this - Absolutely! Projectx is built with integration in mind. Our comprehensive API allows you to seamlessly connect with a range of real estate tools and platforms, ensuring a smooth addition to your current workflow.",
  },
  {
    id: "item-3",
    question: "What kind of support can I expect with Projectx?",
    answer:
      "We offer dedicated support for all our users. Whether you're on a free or paid plan, our team is ready to assist you with any questions or issues you may encounter. Premium support options are available for our Pro plan subscribers.",
  },
  {
    id: "item-4",
    question: "Is my data secure with Projectx?",
    answer:
      "Data security is our top priority. We employ SSL encryption and adhere to industry best practices to ensure that all your data, from property listings to client information, is securely stored and protected.",
  },
  {
    id: "item-5",
    question: "How does the free plan differ from the paid plans?",
    answer:
      "The free plan offers basic features that allow you to experience the advantages of AI-driven listings. Our paid plans provide access to more advanced features, including detailed analytics, priority support, and increased listing volumes.",
  },
  {
    id: "item-6",
    question: "What additional features does the Pro plan include?",
    answer:
      "The Pro plan includes everything in the Basic plan plus advanced analytics, priority support, higher volume of listings, custom API integrations, and access to new features before they're publicly released.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <div className="mb-14 space-y-6 text-center">
        <h1 className="text-center font-heading text-3xl md:text-5xl">
          <Balancer>Frequently Asked Questions</Balancer>
        </h1>
        <p className="text-md text-muted-foreground">
          <Balancer>
            Explore our comprehensive FAQ to find quick answers to common
            inquiries. If you need further assistance, don&apos;t hesitate to
            contact us for personalized help.
          </Balancer>
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent>{faqItem.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

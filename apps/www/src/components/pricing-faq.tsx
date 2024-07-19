import Balancer from "react-wrap-balancer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@dingify/ui/components/accordion";

const pricingFaqData = [
  {
    id: "item-1",
    question: "How does Dingify help with real-time monitoring and analytics?",
    answer:
      "Dingify provides comprehensive real-time monitoring and analytics by capturing critical business events, tracking user journeys, and offering detailed KPIs and insights. Make data-driven decisions to optimize your business performance.",
  },
  {
    id: "item-2",
    question: "Can I integrate Dingify with my existing business tools?",
    answer:
      "Absolutely! Dingify is built with integration in mind. Our comprehensive API allows you to seamlessly connect with your existing business tools, ensuring a smooth addition to your current workflow.",
  },
  {
    id: "item-3",
    question: "What kind of support can I expect with Dingify?",
    answer:
      "We offer dedicated support for all our users. Whether you're on a free or paid plan, our team is ready to assist you with any questions or issues you may encounter. Premium support options are available for our Pro plan subscribers.",
  },
  {
    id: "item-4",
    question: "Is my data secure with Dingify?",
    answer:
      "Data security is our top priority. We employ SSL encryption and adhere to industry best practices to ensure that all your data, from event tracking to customer information, is securely stored and protected.",
  },
  {
    id: "item-5",
    question: "How does the free plan differ from the paid plans?",
    answer:
      "The free plan offers basic features that allow you to experience the advantages of Dingify's real-time monitoring. Our paid plans provide access to more advanced features, including detailed analytics, priority support, and increased event volume.",
  },
  {
    id: "item-6",
    question: "What additional features does the Pro plan include?",
    answer:
      "The Pro plan includes everything in the Basic plan plus advanced analytics, priority support, higher event volume, custom API integrations, and access to new features before they're publicly released.",
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

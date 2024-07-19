import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

import EmailButton from "./EmailButton"; // Adjust the import path as necessary

export default function UserEmailCard({ customerDetails }) {
  const email = customerDetails.email || "example@example.com";
  const name = customerDetails.name || "[Customer Name]";
  const subject = "Checking In: How's Your Experience with [Your Product]?";
  const body = `
  Hi ${name},
  
  How is it going with [Your Product]?
  
  Just wanted to hear how the experience with [Your Product] has been. Would love to have a chat about how I can make the product better for you.
  
  Looking forward to hearing from you.
  
  Best regards,
  [Your Name]
  
  [Your Contact Information]
  `;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow up a customer</CardTitle>
        <CardDescription>
          Stay in touch with your customers. Send them an email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
        <EmailButton email={email} subject={subject} body={body} />
      </CardContent>
    </Card>
  );
}

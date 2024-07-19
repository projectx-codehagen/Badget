"use client";

import { Button } from "@dingify/ui/components/button";

interface EmailButtonProps {
  email: string;
  subject: string;
  body: string;
}

const EmailButton: React.FC<EmailButtonProps> = ({ email, subject, body }) => {
  const handleClick = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Button size="sm" variant="secondary" onClick={handleClick}>
      Send Email
    </Button>
  );
};

export default EmailButton;

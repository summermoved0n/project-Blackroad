import { Button, Heading, Text } from "react-email";
import EmailLayout from "./components/EmailLayout";

type VerifyEmailProps = {
  verificationUrl: string;
};

export default function VerifyEmail({ verificationUrl }: VerifyEmailProps) {
  return (
    <EmailLayout>
      <Heading>Verify your email</Heading>

      <Text>Thank you for registering.</Text>

      <Button href={verificationUrl} target="_blank">
        Verify Email
      </Button>
    </EmailLayout>
  );
}

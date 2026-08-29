import {
  Button,
  Container,
  Heading,
  Hr,
  Preview,
  Section,
  Text,
} from "react-email";
import EmailLayout from "./components/EmailLayout";

type SubscribeEmailProps = {
  confirmationUrl: string;
};

export default function SubscribeEmail({
  confirmationUrl,
}: SubscribeEmailProps) {
  return (
    <EmailLayout>
      <Preview>Confirm your Blackroad newsletter subscription</Preview>

      <Container
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily: "Arial, sans-serif",

          maxWidth: "600px",
          margin: "40px auto",
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Section style={{ padding: "40px" }}>
          <Heading
            style={{
              textAlign: "center",
              fontSize: "30px",
              marginBottom: "24px",
            }}
          >
            Welcome to Blackroad! 🌍
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "26px",
              color: "#444",
            }}
          >
            Thanks for subscribing to the Blackroad newsletter.
          </Text>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "26px",
              color: "#444",
            }}
          >
            You&apos;ll receive:
          </Text>

          <Text>✈️ New tour destinations</Text>
          <Text>🔥 Exclusive travel deals</Text>
          <Text>🗺️ Travel inspiration and tips</Text>

          <Section style={{ textAlign: "center", margin: "40px 0" }}>
            <Button
              href={confirmationUrl}
              target="_blank"
              style={{
                backgroundColor: "#ff7a00",
                color: "#ffffff",
                padding: "16px 32px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Confirm Subscription
            </Button>
          </Section>

          <Text
            style={{
              color: "#666",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            If you didn&apos;t request this subscription, you can safely ignore
            this email.
          </Text>

          <Hr />

          <Text
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: "13px",
            }}
          >
            © 2026 Blackroad. All rights reserved.
          </Text>
        </Section>
      </Container>
    </EmailLayout>
  );
}

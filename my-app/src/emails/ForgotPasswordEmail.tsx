import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";

type ForgotPasswordEmailProps = {
  name: string | null;
  resetUrl: string;
};

export default function ForgotPasswordEmail({
  name,
  resetUrl,
}: ForgotPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Blackroad password</Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
          margin: 0,
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            maxWidth: "600px",
            padding: "40px",
          }}
        >
          <Heading
            style={{
              color: "#111827",
              fontSize: "28px",
              margin: "0 0 24px",
            }}
          >
            Reset your password
          </Heading>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Hi {name ? name : "user"},
          </Text>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            We received a request to reset your Blackroad account password.
          </Text>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Click the button below to choose a new password.
          </Text>

          <Section
            style={{
              margin: "32px 0",
              textAlign: "center",
            }}
          >
            <Button
              href={resetUrl}
              target="_blank"
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "10px",
                color: "#ffffff",
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "600",
                padding: "14px 28px",
                textDecoration: "none",
              }}
            >
              Reset Password
            </Button>
          </Section>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            This link will expire in <strong>15 minutes</strong>.
          </Text>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            If you didn&apos;t request a password reset, you can safely ignore
            this email. Your password will remain unchanged.
          </Text>

          <Hr
            style={{
              borderColor: "#e5e7eb",
              margin: "32px 0",
            }}
          />

          <Text
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Blackroad. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

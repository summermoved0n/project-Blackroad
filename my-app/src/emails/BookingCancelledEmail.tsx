import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "react-email";

type BookingCancelledEmailProps = {
  customerName: string | null;
  tourTitle: string;
  departureDate: string;
  returnDate: string;
  guests: number;
  wasPaid: boolean;
  imageUrl: string;
  toursUrl: string;
};

export default function BookingCancelledEmail({
  customerName,
  tourTitle,
  departureDate,
  returnDate,
  guests,
  wasPaid,
  imageUrl,
  toursUrl,
}: BookingCancelledEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Blackroad booking cancellation is confirmed</Preview>

      <Body style={body}>
        <Container style={container}>
          <Img src={imageUrl} alt="Blackroad" width="600" height="600" />

          <Section style={content}>
            <Heading style={heading}>Cancellation Confirmed</Heading>

            <Text style={text}>
              Hi <strong>{customerName ? customerName : "user"}</strong>,
            </Text>

            <Text style={text}>
              Your booking has been successfully cancelled as requested. The
              reservation below is no longer active.
            </Text>

            <Section style={summary}>
              <Heading as="h2" style={summaryHeading}>
                Booking Summary
              </Heading>

              <Text style={detail}>
                <strong>Tour:</strong> {tourTitle}
              </Text>

              <Text style={detail}>
                <strong>Departure:</strong> {departureDate}
              </Text>

              <Text style={detail}>
                <strong>Return:</strong> {returnDate}
              </Text>

              <Text style={detail}>
                <strong>Guests:</strong> {guests}
              </Text>
            </Section>

            {wasPaid ? (
              <>
                <Heading as="h2" style={sectionHeading}>
                  Refund Information
                </Heading>

                <Text style={text}>
                  According to our Cancellation Policy, your refund will be
                  processed after deducting a cancellation fee equal to{" "}
                  <strong>25% of the total tour price</strong>.
                </Text>

                <Text style={text}>
                  The remaining balance will be returned to your original
                  payment method if applicable.
                </Text>

                <Text style={mutedText}>
                  Please allow several business days for the refund to appear in
                  your account, depending on your payment provider.
                </Text>
              </>
            ) : (
              <Text style={text}>
                No payment was charged for this booking, and no further action
                is required.
              </Text>
            )}

            <Hr style={divider} />

            <Text style={text}>
              Plans can change. Whenever you are ready for your next journey,
              Blackroad will be here to help you discover a new destination.
            </Text>

            <Section style={buttonSection}>
              <Button href={toursUrl} style={button}>
                Explore Other Tours
              </Button>
            </Section>

            <Text style={mutedText}>
              If you did not request this cancellation, please contact our
              support team as soon as possible.
            </Text>

            <Hr style={divider} />

            <Text style={footer}>© 2026 Blackroad. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f5f5f5",
  fontFamily: "Arial, sans-serif",
  margin: "0",
};

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden",
};

const content = {
  padding: "40px",
};

const heading = {
  color: "#1f2937",
  fontSize: "30px",
  lineHeight: "38px",
  textAlign: "center" as const,
  margin: "0 0 28px",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
};

const summary = {
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  padding: "24px",
  margin: "28px 0",
};

const summaryHeading = {
  color: "#1f2937",
  fontSize: "21px",
  margin: "0 0 18px",
};

const sectionHeading = {
  color: "#1f2937",
  fontSize: "20px",
  margin: "28px 0 10px",
};

const detail = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "8px 0",
};

const mutedText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "22px",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "28px 0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#f97316",
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const footer = {
  color: "#9ca3af",
  fontSize: "13px",
  textAlign: "center" as const,
};

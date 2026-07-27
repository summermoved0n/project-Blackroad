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

type BookingConfirmationEmailProps = {
  customerName: string | null;
  tourTitle: string;
  departureDate: string;
  returnDate: string;
  guests: number;
  room: string;
  totalPrice: string;
  bookingUrl: string;
  imageUrl: string;
};

export default function BookingConfirmationEmail({
  customerName,
  tourTitle,
  departureDate,
  returnDate,
  guests,
  room,
  totalPrice,
  bookingUrl,
  imageUrl,
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Blackroad booking request has been received</Preview>

      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
          margin: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Img src={imageUrl} alt="Blackroad" width="600" height="600" />

          <Section style={{ padding: "40px" }}>
            <Heading
              style={{
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Booking Request Received 🎉
            </Heading>

            <Text>
              Hi <strong>{customerName ? customerName : "user"}</strong>,
            </Text>

            <Text>
              Thank you for choosing <strong>Blackroad</strong>. We&apos;ve
              successfully received your booking request and our team will
              review it shortly.
            </Text>

            <Hr />

            <Heading as="h2" style={{ fontSize: "22px" }}>
              Booking Details
            </Heading>

            <Text>
              <strong>Tour:</strong> {tourTitle}
            </Text>

            <Text>
              <strong>Departure:</strong> {departureDate}
            </Text>

            <Text>
              <strong>Return:</strong> {returnDate}
            </Text>

            <Text>
              <strong>Guests:</strong> {guests}
            </Text>

            <Text>
              <strong>Room:</strong> {room}
            </Text>

            <Text>
              <strong>Total Price:</strong> {totalPrice}
            </Text>

            <Section
              style={{
                textAlign: "center",
                margin: "36px 0",
              }}
            >
              <Button
                href={bookingUrl}
                style={{
                  backgroundColor: "#f97316",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View Booking
              </Button>
            </Section>

            <Hr />

            <Heading
              as="h2"
              style={{
                fontSize: "20px",
              }}
            >
              What happens next?
            </Heading>

            <Text>• Our team will review your booking.</Text>

            <Text>
              • You&apos;ll receive another email once your booking is
              confirmed.
            </Text>

            <Text>
              • If additional information is required, we&apos;ll contact you
              using the email address provided during booking.
            </Text>

            <Hr />

            <Text
              style={{
                color: "#666",
                fontSize: "14px",
              }}
            >
              If you have any questions, simply reply to this email or contact
              our support team.
            </Text>

            <Text
              style={{
                textAlign: "center",
                marginTop: "40px",
                color: "#999",
                fontSize: "13px",
              }}
            >
              © 2026 Blackroad. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

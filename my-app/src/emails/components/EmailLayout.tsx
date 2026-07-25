import { Html, Body, Container } from "react-email";
import { Header } from "./Header";
import { Footer } from "./Footer";

type EmailLayoutProps = {
  children: React.ReactNode;
};

export default function EmailLayout({ children }: EmailLayoutProps) {
  return (
    <Html>
      <Body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>
      </Body>
    </Html>
  );
}

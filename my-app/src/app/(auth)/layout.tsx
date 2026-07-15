export default function AuthLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {authModal}
    </>
  );
}

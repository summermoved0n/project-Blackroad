export default function ProfileLayout({
  children,
  profileModal,
}: Readonly<{
  children: React.ReactNode;
  profileModal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {profileModal}
    </>
  );
}

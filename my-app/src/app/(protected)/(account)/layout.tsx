import React from "react";
import AccountHeader from "./AccountHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pt-17 md:pt-20 bg-primary">
      <main className="bg-secondary pt-4 md:pt-6.5 pb-7.5 md:pb-37.5 px-4 md:px-20">
        <AccountHeader />
        <div>{children}</div>
      </main>
    </div>
  );
}

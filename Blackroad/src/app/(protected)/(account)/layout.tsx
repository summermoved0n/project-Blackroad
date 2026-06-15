import React from "react";
import AccountHeader from "./AccountHeader";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pt-17 md:pt-20 bg-primary">
      <main className="bg-secondary pt-6.5 pb-37.5 px-20">
        <AccountHeader />
        <div>{children}</div>
      </main>
    </div>
  );
}

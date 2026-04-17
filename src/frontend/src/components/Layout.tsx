import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isHomePage && <Header showSearch />}
      <main className="flex-1 flex flex-col">{children ?? <Outlet />}</main>
      <Footer variant={isHomePage ? "home" : "inner"} />
    </div>
  );
}

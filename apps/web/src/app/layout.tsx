import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alchemist | DevSecOps Platform",
  description: "Vercel-like SaaS Platform with CI/CD DevSecOps on K3S",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased flex h-screen overflow-hidden selection:bg-amber-500/30 selection:text-amber-200`}>
        <Sidebar />
        <div className="flex flex-col flex-1 h-full min-w-0 relative">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 relative z-10 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-[20%] w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
        </div>
      </body>
    </html>
  );
}

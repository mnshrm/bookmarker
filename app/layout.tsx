import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmarker - Save Your Links",
  description: "Securely store and organize your bookmarks in the cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
export const metadata: Metadata = {
  title: "Reelo",
  description: "A Reel App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

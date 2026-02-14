import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Provider } from "@/components/ui/provider";

const manRope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excellent Care Clinics",
  description: "Excellent Care Clinics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manRope.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

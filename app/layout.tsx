import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
  metadataBase: new URL("https://carepulse.vercel.app"), // Update with your domain
  openGraph: {
    title: "CarePulse",
    description: "Healthcare Patient Management System",
    url: "https://carepulse.vercel.app", // Update with your domain
    siteName: "CarePulse",
    images: [
      {
        url: "/assets/icons/logo-icon.svg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/icons/logo-icon.svg" />
        <link rel="apple-touch-icon" href="/assets/icons/logo-icon.svg" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn(
        "min-h-screen bg-dark-300 font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
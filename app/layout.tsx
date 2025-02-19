// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

// Viewport configuration - separate from metadata
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "CarePulse",
    template: "%s | CarePulse",
  },
  description:
    "A healthcare patient management system designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  applicationName: "CarePulse",
  authors: [{ name: "Hassan Iqbal" }],
  keywords: [
    "healthcare",
    "patient management",
    "medical records",
    "appointment scheduling",
    "doctor consultation",
  ],
  creator: "Hassan Iqbal",
  publisher: "CarePulse",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: "/assets/icons/logo-icon.svg",
    shortcut: "/assets/icons/logo-icon.svg",
    apple: "/assets/icons/logo-icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "CarePulse",
    title: "CarePulse - Healthcare Patient Management System",
    description:
      "A modern healthcare patient management system for streamlined patient care and efficient medical record management.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    images: [
      {
        url: "/assets/icons/logo-icon.svg",
        width: 1200,
        height: 630,
        alt: "CarePulse Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarePulse - Healthcare Patient Management System",
    description:
      "A modern healthcare patient management system for streamlined patient care and efficient medical record management.",
    images: ["/assets/icons/logo-icon.svg"],
    creator: "@hassaniqbal23",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

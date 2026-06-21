import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackerrank-cse-gnit.vercel.app"),

  title: {
    default: "HackerRank Club CSE GNIT | Official Technical Club",
    template: "%s | HackerRank Club CSE GNIT",
  },

  description:
    "Official HackerRank Club of the Department of Computer Science & Engineering at Guru Nanak Institute of Technology (GNIT), Hyderabad. Empowering future innovators through coding competitions, hackathons, AI/ML workshops, technical events, and industry engagement.",

  keywords: [
    "HackerRank Club",
    "GNIT",
    "CSE GNIT",
    "Guru Nanak Institute of Technology",
    "Computer Science Engineering",
    "Coding Club",
    "Programming Club",
    "Technical Club",
    "Hackathon",
    "Meta Storm",
    "CreateX",
    "Competitive Programming",
    "AI ML Club",
    "Student Community",
    "Software Development",
    "Innovation Club",
    "Technical Events",
    "Technology Community",
    "Coding Competition",
    "Hyderabad Engineering College",
  ],

  authors: [
    {
      name: "HackerRank Club CSE GNIT",
      url: "https://hackerrank-cse-gnit.cc.cd",
    },
  ],

  creator: "HackerRank Club CSE GNIT",
  publisher: "Department of Computer Science & Engineering, GNIT",

  applicationName: "HackerRank Club CSE GNIT",

  category: "Education",

  alternates: {
    canonical: "https://hackerrank-cse-gnit.cc.cd",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "HackerRank Club CSE GNIT",
    description:
      "Official Technical Club of the Department of Computer Science & Engineering at Guru Nanak Institute of Technology.",

    url: "https://hackerrank-cse-gnit.cc.cd",

    siteName: "HackerRank Club CSE GNIT",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "HackerRank Club CSE GNIT",
      },
    ],
  },

  icons: {
    icon: [
      {
        url: "/logo.png",
      },
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",

    apple: "/logo.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "HackerRank Club CSE GNIT",

    url: "https://hackerrank-cse-gnit.cc.cd",

    logo: "https://hackerrank-cse-gnit.cc.cd/logo.png",

    description:
      "Official Technical Club of the Department of Computer Science & Engineering at Guru Nanak Institute of Technology.",

    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Guru Nanak Institute of Technology",
    },

    sameAs: [
      "https://www.linkedin.com/company/hackerrank-club-cse-gnit",
      "https://www.instagram.com/hackerrank.cse",
    ],
  };

  return (
  <html lang="en" suppressHydrationWarning className="dark">
    <body
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
    >
      <Script
        id="theme-script"
        strategy="beforeInteractive"
      >
        {`
          try {
            const theme = localStorage.getItem('theme');

            if (theme === 'light') {
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.add('light');
            } else {
              document.documentElement.classList.add('dark');
              document.documentElement.classList.remove('light');
            }
          } catch (e) {}
        `}
      </Script>

      <Script
        id="organization-schema"
        type="application/ld+json"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <ThemeProvider>
        {children}
      </ThemeProvider>

      <Toaster />
      <SonnerToaster position="top-right" />
    </body>
  </html>
)
}

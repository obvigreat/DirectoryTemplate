import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import SupabaseListener from "@/components/supabase-listener";
import AuthStateProvider from "@/components/auth-state-provider";
import AnalyticsTracker from "@/components/analytics/analytics-tracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Directory - Find Local Businesses",
  description:
    "Discover and connect with the best local businesses in your area",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <SupabaseListener serverAccessToken={session?.access_token} />
        <AuthStateProvider>
          <AnalyticsTracker />
          {children}
        </AuthStateProvider>
        <TempoInit />
      </body>
    </html>
  );
}

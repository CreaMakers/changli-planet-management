import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "长理星球后台管理",
  description: "长理星球后台管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}

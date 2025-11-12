import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Twitter, Github, Mail } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manga Clash - 만화 캐릭터 배틀 시뮬레이션",
  description:
    "AI 기반 만화 캐릭터 배틀 시뮬레이션 플랫폼. 투표하고, 배팅하고, 승리를 경험하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold text-xl">
                  MC
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Manga Clash
                </span>
              </Link>

              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard"
                        className="px-4 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        대시보드
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/ranking"
                        className="px-4 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        랭킹
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/mypage"
                        className="px-4 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        마이페이지
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">회원가입</Link>
                </Button>
              </div>
            </div>
          </header>

          {children}

          {/* Footer */}
          <footer className="border-t bg-background mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold text-xl">
                      MC
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Manga Clash
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI 기반 만화 캐릭터 배틀 시뮬레이션 플랫폼
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">서비스</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/dashboard"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        대시보드
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/ranking"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        랭킹
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/mypage"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        마이페이지
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">법적 고지</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/terms"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        이용약관
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        개인정보 처리방침
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">연락처</h3>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="mailto:contact@mangaclash.com">
                        <Mail className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                <p>© Manga Clash. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Trophy,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  BarChart3,
  ExternalLink,
} from "lucide-react";

// Mock data for battles
const popularBattles = [
  {
    id: 1,
    character1: "나루토",
    character2: "사스케",
    thumbnail1: "🔥",
    thumbnail2: "⚡",
    endTime: "2시간 30분",
    votes1: 1240,
    votes2: 980,
  },
  {
    id: 2,
    character1: "루피",
    character2: "조로",
    thumbnail1: "🍖",
    thumbnail2: "🗡️",
    endTime: "5시간 15분",
    votes1: 890,
    votes2: 1120,
  },
  {
    id: 3,
    character1: "이치고",
    character2: "렌지",
    thumbnail1: "⚔️",
    thumbnail2: "🔥",
    endTime: "1시간 45분",
    votes1: 1560,
    votes2: 1340,
  },
  {
    id: 4,
    character1: "곤",
    character2: "킬루아",
    thumbnail1: "🎯",
    thumbnail2: "⚡",
    endTime: "3시간 20분",
    votes1: 2100,
    votes2: 1980,
  },
  {
    id: 5,
    character1: "데쿠",
    character2: "바쿠고",
    thumbnail1: "💪",
    thumbnail2: "💥",
    endTime: "4시간 10분",
    votes1: 1750,
    votes2: 1890,
  },
  {
    id: 6,
    character1: "타니지로",
    character2: "젠이츠",
    thumbnail1: "🌊",
    thumbnail2: "⚡",
    endTime: "6시간 5분",
    votes1: 1420,
    votes2: 1280,
  },
];

const recentResults = [
  {
    winner: "가츠",
    loser: "그리피스",
    result: "승리",
    votes: "2,340 vs 1,890",
  },
  { winner: "에렌", loser: "라이너", result: "승리", votes: "3,120 vs 2,780" },
  { winner: "아스타", loser: "유노", result: "승리", votes: "1,980 vs 1,650" },
  {
    winner: "센고쿠",
    loser: "아카자",
    result: "승리",
    votes: "2,670 vs 2,340",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI 싸움 시뮬레이션",
    description:
      "최첨단 AI 기술로 만화 캐릭터들의 배틀을 실시간으로 시뮬레이션합니다.",
  },
  {
    icon: Users,
    title: "팬 참여형 투표",
    description:
      "좋아하는 캐릭터에 투표하고 배팅하여 커뮤니티와 함께 즐기세요.",
  },
  {
    icon: Trophy,
    title: "실시간 랭킹",
    description: "가장 강한 캐릭터는 누구? 실시간 랭킹으로 확인하세요.",
  },
  {
    icon: BarChart3,
    title: "상세 통계",
    description: "각 배틀의 상세 통계와 분석 데이터를 제공합니다.",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Banner */}
      <section className="py-12 md:py-20">
        <Card className="relative overflow-hidden border-2 border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-red-50 dark:from-zinc-900 dark:to-zinc-800">
          <CardContent className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <Badge className="mb-4 bg-orange-500 text-white hover:bg-orange-600">
                  <Zap className="w-3 h-3 mr-1" />
                  새로운 배틀 시작!
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  당신의 캐릭터가
                  <br />
                  최강이다!
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  AI 기반 만화 캐릭터 배틀 시뮬레이션 플랫폼
                  <br />
                  투표하고, 배팅하고, 승리를 경험하세요!
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg"
                  asChild
                >
                  <Link href="/dashboard">
                    지금 배틀 참여하기
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 p-8 flex items-center justify-center text-8xl shadow-2xl transform hover:scale-105 transition-transform">
                    ⚔️
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Popular Battles Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              인기 배틀
            </h2>
            <p className="text-muted-foreground">
              현재 진행 중인 뜨거운 배틀을 확인하세요
            </p>
          </div>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max md:grid md:grid-cols-2 lg:grid-cols-3 md:min-w-0">
            {popularBattles.map((battle) => (
              <Link key={battle.id} href={`/battle/${battle.id}`}>
                <Card className="w-80 md:w-auto hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-orange-300 dark:hover:border-orange-700">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        {battle.endTime}
                      </Badge>
                      <Badge variant="secondary">진행중</Badge>
                    </div>
                    <CardTitle className="text-xl mb-4">VS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{battle.thumbnail1}</div>
                          <div>
                            <div className="font-semibold">
                              {battle.character1}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {battle.votes1.toLocaleString("ko-KR")}표
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        VS
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-700">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{battle.thumbnail2}</div>
                          <div>
                            <div className="font-semibold">
                              {battle.character2}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {battle.votes2.toLocaleString("ko-KR")}표
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      투표하기
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              최근 결과
            </h2>
            <p className="text-muted-foreground">
              방금 끝난 배틀 결과를 확인하세요
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              더보기
              <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentResults.map((result, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {result.result}
                  </Badge>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                      {result.winner[0]}
                    </div>
                    <span className="font-semibold">{result.winner}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">vs</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {result.loser[0]}
                    </div>
                    <span className="font-semibold text-muted-foreground">
                      {result.loser}
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-muted-foreground border-t">
                    투표: {result.votes}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Manga Clash란?</h2>
          <p className="text-muted-foreground text-lg">
            만화 캐릭터 배틀의 새로운 경험을 제공합니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}

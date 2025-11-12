"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  TrendingUp,
  Users,
  Flame,
  Medal,
  Crown,
  Award,
  ArrowRight,
  Star,
  Zap,
  Target,
  Coins,
} from "lucide-react";

// Mock data types
interface CharacterRanking {
  id: number;
  name: string;
  series: string;
  thumbnail: string;
  rank: number;
  winRate: number;
  participationRate: number;
  totalBattles: number;
  wins: number;
  losses: number;
  points: number;
}

interface UserRanking {
  id: number;
  nickname: string;
  avatar?: string;
  rank: number;
  totalPoints: number;
  winBattles: number;
  totalBattles: number;
  winRate: number;
  correctVotes: number;
  totalVotes: number;
  accuracy: number;
}

type Period = "weekly" | "monthly";
type RankingType = "character" | "user";

// Mock data - Weekly Character Rankings
const mockWeeklyCharacterRankings: CharacterRanking[] = [
  {
    id: 1,
    name: "나루토",
    series: "나루토",
    thumbnail: "🔥",
    rank: 1,
    winRate: 78.5,
    participationRate: 92.3,
    totalBattles: 45,
    wins: 35,
    losses: 10,
    points: 12500,
  },
  {
    id: 2,
    name: "가츠",
    series: "베르세르크",
    thumbnail: "⚔️",
    rank: 2,
    winRate: 75.2,
    participationRate: 88.7,
    totalBattles: 42,
    wins: 32,
    losses: 10,
    points: 11800,
  },
  {
    id: 3,
    name: "루피",
    series: "원피스",
    thumbnail: "🍖",
    rank: 3,
    winRate: 72.8,
    participationRate: 85.4,
    totalBattles: 38,
    wins: 28,
    losses: 10,
    points: 11200,
  },
  {
    id: 4,
    name: "이치고",
    series: "블리치",
    thumbnail: "⚔️",
    rank: 4,
    winRate: 70.1,
    participationRate: 82.1,
    totalBattles: 35,
    wins: 25,
    losses: 10,
    points: 10500,
  },
  {
    id: 5,
    name: "곤",
    series: "헌터x헌터",
    thumbnail: "🎯",
    rank: 5,
    winRate: 68.9,
    participationRate: 79.6,
    totalBattles: 33,
    wins: 23,
    losses: 10,
    points: 9800,
  },
  {
    id: 6,
    name: "사스케",
    series: "나루토",
    thumbnail: "⚡",
    rank: 6,
    winRate: 67.3,
    participationRate: 76.8,
    totalBattles: 31,
    wins: 21,
    losses: 10,
    points: 9200,
  },
  {
    id: 7,
    name: "조로",
    series: "원피스",
    thumbnail: "🗡️",
    rank: 7,
    winRate: 65.7,
    participationRate: 74.2,
    totalBattles: 29,
    wins: 19,
    losses: 10,
    points: 8800,
  },
  {
    id: 8,
    name: "데쿠",
    series: "나의 히어로 아카데미아",
    thumbnail: "💪",
    rank: 8,
    winRate: 64.1,
    participationRate: 71.5,
    totalBattles: 27,
    wins: 17,
    losses: 10,
    points: 8400,
  },
];

// Mock data - Monthly Character Rankings
const mockMonthlyCharacterRankings: CharacterRanking[] = [
  {
    id: 1,
    name: "가츠",
    series: "베르세르크",
    thumbnail: "⚔️",
    rank: 1,
    winRate: 82.3,
    participationRate: 95.1,
    totalBattles: 156,
    wins: 128,
    losses: 28,
    points: 45200,
  },
  {
    id: 2,
    name: "나루토",
    series: "나루토",
    thumbnail: "🔥",
    rank: 2,
    winRate: 80.7,
    participationRate: 93.8,
    totalBattles: 152,
    wins: 123,
    losses: 29,
    points: 43800,
  },
  {
    id: 3,
    name: "그리피스",
    series: "베르세르크",
    thumbnail: "👑",
    rank: 3,
    winRate: 78.9,
    participationRate: 91.2,
    totalBattles: 148,
    wins: 117,
    losses: 31,
    points: 42500,
  },
  {
    id: 4,
    name: "루피",
    series: "원피스",
    thumbnail: "🍖",
    rank: 4,
    winRate: 76.5,
    participationRate: 89.4,
    totalBattles: 142,
    wins: 109,
    losses: 33,
    points: 41200,
  },
  {
    id: 5,
    name: "이치고",
    series: "블리치",
    thumbnail: "⚔️",
    rank: 5,
    winRate: 74.8,
    participationRate: 87.6,
    totalBattles: 138,
    wins: 103,
    losses: 35,
    points: 39800,
  },
];

// Mock data - Weekly User Rankings
const mockWeeklyUserRankings: UserRanking[] = [
  {
    id: 1,
    nickname: "배틀마스터",
    avatar: undefined,
    rank: 1,
    totalPoints: 18500,
    winBattles: 48,
    totalBattles: 52,
    winRate: 92.3,
    correctVotes: 45,
    totalVotes: 52,
    accuracy: 86.5,
  },
  {
    id: 2,
    nickname: "만화왕",
    avatar: undefined,
    rank: 2,
    totalPoints: 17200,
    winBattles: 44,
    totalBattles: 50,
    winRate: 88.0,
    correctVotes: 42,
    totalVotes: 50,
    accuracy: 84.0,
  },
  {
    id: 3,
    nickname: "승부사",
    avatar: undefined,
    rank: 3,
    totalPoints: 16800,
    winBattles: 42,
    totalBattles: 48,
    winRate: 87.5,
    correctVotes: 40,
    totalVotes: 48,
    accuracy: 83.3,
  },
  {
    id: 4,
    nickname: "전투의신",
    avatar: undefined,
    rank: 4,
    totalPoints: 16500,
    winBattles: 41,
    totalBattles: 47,
    winRate: 87.2,
    correctVotes: 39,
    totalVotes: 47,
    accuracy: 83.0,
  },
  {
    id: 5,
    nickname: "캐릭터러버",
    avatar: undefined,
    rank: 5,
    totalPoints: 16200,
    winBattles: 40,
    totalBattles: 46,
    winRate: 87.0,
    correctVotes: 38,
    totalVotes: 46,
    accuracy: 82.6,
  },
  {
    id: 6,
    nickname: "배틀킹",
    avatar: undefined,
    rank: 6,
    totalPoints: 15800,
    winBattles: 39,
    totalBattles: 45,
    winRate: 86.7,
    correctVotes: 37,
    totalVotes: 45,
    accuracy: 82.2,
  },
  {
    id: 7,
    nickname: "만화전문가",
    avatar: undefined,
    rank: 7,
    totalPoints: 15500,
    winBattles: 38,
    totalBattles: 44,
    winRate: 86.4,
    correctVotes: 36,
    totalVotes: 44,
    accuracy: 81.8,
  },
  {
    id: 8,
    nickname: "승리의여신",
    avatar: undefined,
    rank: 8,
    totalPoints: 15200,
    winBattles: 37,
    totalBattles: 43,
    winRate: 86.0,
    correctVotes: 35,
    totalVotes: 43,
    accuracy: 81.4,
  },
];

// Mock data - Monthly User Rankings
const mockMonthlyUserRankings: UserRanking[] = [
  {
    id: 1,
    nickname: "배틀마스터",
    avatar: undefined,
    rank: 1,
    totalPoints: 125000,
    winBattles: 312,
    totalBattles: 345,
    winRate: 90.4,
    correctVotes: 298,
    totalVotes: 345,
    accuracy: 86.4,
  },
  {
    id: 2,
    nickname: "만화왕",
    avatar: undefined,
    rank: 2,
    totalPoints: 118000,
    winBattles: 298,
    totalBattles: 332,
    winRate: 89.8,
    correctVotes: 285,
    totalVotes: 332,
    accuracy: 85.8,
  },
  {
    id: 3,
    nickname: "승부사",
    avatar: undefined,
    rank: 3,
    totalPoints: 115000,
    winBattles: 289,
    totalBattles: 325,
    winRate: 88.9,
    correctVotes: 276,
    totalVotes: 325,
    accuracy: 84.9,
  },
  {
    id: 4,
    nickname: "전투의신",
    avatar: undefined,
    rank: 4,
    totalPoints: 112000,
    winBattles: 281,
    totalBattles: 318,
    winRate: 88.4,
    correctVotes: 270,
    totalVotes: 318,
    accuracy: 84.9,
  },
  {
    id: 5,
    nickname: "캐릭터러버",
    avatar: undefined,
    rank: 5,
    totalPoints: 108000,
    winBattles: 275,
    totalBattles: 312,
    winRate: 88.1,
    correctVotes: 265,
    totalVotes: 312,
    accuracy: 84.9,
  },
];

export default function RankingPage() {
  const [period, setPeriod] = useState<Period>("weekly");
  const [rankingType, setRankingType] = useState<RankingType>("character");

  const characterRankings =
    period === "weekly"
      ? mockWeeklyCharacterRankings
      : mockMonthlyCharacterRankings;
  const userRankings =
    period === "weekly" ? mockWeeklyUserRankings : mockMonthlyUserRankings;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 hover:bg-yellow-600";
    if (rank === 2) return "bg-gray-400 hover:bg-gray-500";
    if (rank === 3) return "bg-orange-600 hover:bg-orange-700";
    return "bg-secondary";
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          랭킹
        </h1>
        <p className="text-muted-foreground text-lg">
          인기 캐릭터와 유저 순위를 확인하세요
        </p>
      </div>

      {/* Filter Section */}
      <section className="mb-8">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              랭킹 필터
            </CardTitle>
            <CardDescription>
              기간과 랭킹 타입을 선택하여 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  기간 선택
                </label>
                <Tabs
                  value={period}
                  onValueChange={(value) => setPeriod(value as Period)}
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="weekly" className="flex-1">
                      주간
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="flex-1">
                      월간
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  랭킹 타입
                </label>
                <Select
                  value={rankingType}
                  onValueChange={(value) =>
                    setRankingType(value as RankingType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="랭킹 타입 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="character">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        캐릭터 랭킹
                      </div>
                    </SelectItem>
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        유저 랭킹
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Character Ranking Section */}
      {rankingType === "character" && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                캐릭터 랭킹
              </h2>
              <p className="text-muted-foreground">
                {period === "weekly" ? "주간" : "월간"} 인기 캐릭터 순위
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/ranking/characters">
                더보기
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characterRankings.map((character) => (
              <Link
                key={character.id}
                href={`/character/${character.id}`}
                className="group"
              >
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-orange-300 dark:hover:border-orange-700 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={`${getRankBadgeColor(
                          character.rank
                        )} text-white flex items-center gap-1`}
                      >
                        {getRankIcon(character.rank)}
                        {character.rank}위
                      </Badge>
                      {character.rank <= 3 && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Flame className="w-3 h-3" />
                          인기
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{character.thumbnail}</div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">
                          {character.name}
                        </CardTitle>
                        <CardDescription>{character.series}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">승률</span>
                        <span className="font-semibold">
                          {character.winRate}%
                        </span>
                      </div>
                      <Progress value={character.winRate} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">참여율</span>
                        <span className="font-semibold">
                          {character.participationRate}%
                        </span>
                      </div>
                      <Progress
                        value={character.participationRate}
                        className="h-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          총 배틀
                        </div>
                        <div className="font-semibold">
                          {character.totalBattles}회
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          승리
                        </div>
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          {character.wins}승
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          포인트
                        </span>
                        <span className="font-bold text-yellow-600 dark:text-yellow-400">
                          {character.points.toLocaleString("ko-KR")}P
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* User Ranking Section */}
      {rankingType === "user" && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                유저 랭킹
              </h2>
              <p className="text-muted-foreground">
                {period === "weekly" ? "주간" : "월간"} 유저 순위
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/ranking/users">
                더보기
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <Card className="border-2">
            <CardContent className="p-0">
              <div className="divide-y">
                {userRankings.map((user, index) => (
                  <Link
                    key={user.id}
                    href={`/user/${user.id}`}
                    className="block group"
                  >
                    <div className="p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                          {user.rank <= 3 ? (
                            <div className="flex items-center justify-center">
                              {getRankIcon(user.rank)}
                            </div>
                          ) : (
                            <Badge
                              className={`${getRankBadgeColor(
                                user.rank
                              )} text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold`}
                            >
                              {user.rank}
                            </Badge>
                          )}
                        </div>

                        {/* Avatar */}
                        <Avatar
                          size="lg"
                          src={user.avatar}
                          alt={user.nickname}
                          fallback={user.nickname[0]}
                        />

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg truncate">
                              {user.nickname}
                            </h3>
                            {user.rank <= 3 && (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Star className="w-3 h-3" />
                                Top {user.rank}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Coins className="w-4 h-4" />
                              {user.totalPoints.toLocaleString("ko-KR")}P
                            </span>
                            <span className="flex items-center gap-1">
                              <Trophy className="w-4 h-4" />
                              {user.winBattles}승
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {user.accuracy.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">
                              승률
                            </div>
                            <div className="font-semibold">{user.winRate}%</div>
                          </div>
                          <div className="w-24">
                            <Progress value={user.winRate} className="h-2" />
                          </div>
                        </div>

                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}

"use client";

import { useState, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  TrendingUp,
  Trophy,
  Users,
  Flame,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

// Mock data types
type BattleStatus = "ongoing" | "ending_soon" | "popular";
type SortOption = "popular" | "ending_soon" | "character";

interface Battle {
  id: number;
  character1: string;
  character2: string;
  thumbnail1: string;
  thumbnail2: string;
  endTime: string;
  endTimeMinutes: number; // 정렬용
  votes1: number;
  votes2: number;
  totalVotes: number;
  status: BattleStatus;
  character1Series?: string;
  character2Series?: string;
}

interface BattleResult {
  id: number;
  winner: string;
  loser: string;
  winnerThumbnail: string;
  loserThumbnail: string;
  votes: string;
  endedAt: string;
}

// Mock data for ongoing battles
const mockBattles: Battle[] = [
  {
    id: 1,
    character1: "나루토",
    character2: "사스케",
    thumbnail1: "🔥",
    thumbnail2: "⚡",
    endTime: "2시간 30분",
    endTimeMinutes: 150,
    votes1: 1240,
    votes2: 980,
    totalVotes: 2220,
    status: "popular",
    character1Series: "나루토",
    character2Series: "나루토",
  },
  {
    id: 2,
    character1: "루피",
    character2: "조로",
    thumbnail1: "🍖",
    thumbnail2: "🗡️",
    endTime: "5시간 15분",
    endTimeMinutes: 315,
    votes1: 890,
    votes2: 1120,
    totalVotes: 2010,
    status: "ongoing",
    character1Series: "원피스",
    character2Series: "원피스",
  },
  {
    id: 3,
    character1: "이치고",
    character2: "렌지",
    thumbnail1: "⚔️",
    thumbnail2: "🔥",
    endTime: "1시간 45분",
    endTimeMinutes: 105,
    votes1: 1560,
    votes2: 1340,
    totalVotes: 2900,
    status: "ending_soon",
    character1Series: "블리치",
    character2Series: "블리치",
  },
  {
    id: 4,
    character1: "곤",
    character2: "킬루아",
    thumbnail1: "🎯",
    thumbnail2: "⚡",
    endTime: "3시간 20분",
    endTimeMinutes: 200,
    votes1: 2100,
    votes2: 1980,
    totalVotes: 4080,
    status: "popular",
    character1Series: "헌터x헌터",
    character2Series: "헌터x헌터",
  },
  {
    id: 5,
    character1: "데쿠",
    character2: "바쿠고",
    thumbnail1: "💪",
    thumbnail2: "💥",
    endTime: "4시간 10분",
    endTimeMinutes: 250,
    votes1: 1750,
    votes2: 1890,
    totalVotes: 3640,
    status: "popular",
    character1Series: "나의 히어로 아카데미아",
    character2Series: "나의 히어로 아카데미아",
  },
  {
    id: 6,
    character1: "타니지로",
    character2: "젠이츠",
    thumbnail1: "🌊",
    thumbnail2: "⚡",
    endTime: "6시간 5분",
    endTimeMinutes: 365,
    votes1: 1420,
    votes2: 1280,
    totalVotes: 2700,
    status: "ongoing",
    character1Series: "귀멸의 칼날",
    character2Series: "귀멸의 칼날",
  },
  {
    id: 7,
    character1: "가츠",
    character2: "그리피스",
    thumbnail1: "⚔️",
    thumbnail2: "👑",
    endTime: "45분",
    endTimeMinutes: 45,
    votes1: 3200,
    votes2: 2800,
    totalVotes: 6000,
    status: "ending_soon",
    character1Series: "베르세르크",
    character2Series: "베르세르크",
  },
  {
    id: 8,
    character1: "에렌",
    character2: "라이너",
    thumbnail1: "🔴",
    thumbnail2: "🛡️",
    endTime: "7시간 30분",
    endTimeMinutes: 450,
    votes1: 980,
    votes2: 1100,
    totalVotes: 2080,
    status: "ongoing",
    character1Series: "진격의 거인",
    character2Series: "진격의 거인",
  },
];

// Mock data for recent results
const mockResults: BattleResult[] = [
  {
    id: 1,
    winner: "가츠",
    loser: "그리피스",
    winnerThumbnail: "⚔️",
    loserThumbnail: "👑",
    votes: "2,340 vs 1,890",
    endedAt: "2시간 전",
  },
  {
    id: 2,
    winner: "에렌",
    loser: "라이너",
    winnerThumbnail: "🔴",
    loserThumbnail: "🛡️",
    votes: "3,120 vs 2,780",
    endedAt: "5시간 전",
  },
  {
    id: 3,
    winner: "아스타",
    loser: "유노",
    winnerThumbnail: "📖",
    loserThumbnail: "⚔️",
    votes: "1,980 vs 1,650",
    endedAt: "8시간 전",
  },
  {
    id: 4,
    winner: "센고쿠",
    loser: "아카자",
    winnerThumbnail: "👊",
    loserThumbnail: "🔥",
    votes: "2,670 vs 2,340",
    endedAt: "12시간 전",
  },
];

export default function DashboardPage() {
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [characterFilter, setCharacterFilter] = useState<string>("all");

  // Get unique character names for filter
  const allCharacters = useMemo(() => {
    const characters = new Set<string>();
    mockBattles.forEach((battle) => {
      characters.add(battle.character1);
      characters.add(battle.character2);
    });
    return Array.from(characters).sort();
  }, []);

  // Filter and sort battles
  const filteredAndSortedBattles = useMemo(() => {
    let filtered = [...mockBattles];

    // Filter by character
    if (characterFilter !== "all") {
      filtered = filtered.filter(
        (battle) =>
          battle.character1 === characterFilter ||
          battle.character2 === characterFilter
      );
    }

    // Sort battles
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.totalVotes - a.totalVotes);
      case "ending_soon":
        return filtered.sort((a, b) => a.endTimeMinutes - b.endTimeMinutes);
      case "character":
        return filtered.sort((a, b) =>
          a.character1.localeCompare(b.character1, "ko")
        );
      default:
        return filtered;
    }
  }, [sortBy, characterFilter]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          대시보드
        </h1>
        <p className="text-muted-foreground text-lg">
          현재 진행 중인 배틀과 최근 결과를 확인하세요
        </p>
      </div>

      {/* Filter and Sort Section */}
      <section className="mb-8">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              배틀 필터 및 정렬
            </CardTitle>
            <CardDescription>
              원하는 방식으로 배틀을 정렬하고 필터링하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  정렬 기준
                </label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="정렬 기준 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4" />
                        인기순
                      </div>
                    </SelectItem>
                    <SelectItem value="ending_soon">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        마감 임박순
                      </div>
                    </SelectItem>
                    <SelectItem value="character">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        캐릭터별
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  캐릭터 필터
                </label>
                <Select
                  value={characterFilter}
                  onValueChange={setCharacterFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="캐릭터 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {allCharacters.map((character) => (
                      <SelectItem key={character} value={character}>
                        {character}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ongoing Battles Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              현재 배팅 받고 있는 배틀
            </h2>
            <p className="text-muted-foreground">
              {filteredAndSortedBattles.length}개의 배틀이 진행 중입니다
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedBattles.map((battle) => {
            const isPopular = battle.status === "popular";
            const isEndingSoon = battle.status === "ending_soon";
            const isHighlighted = isPopular || isEndingSoon;

            return (
              <Link key={battle.id} href={`/battle/${battle.id}`}>
                <Card
                  className={`hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
                    isHighlighted
                      ? isPopular
                        ? "border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
                        : "border-red-400 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20"
                      : "hover:border-orange-300 dark:hover:border-orange-700"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={isEndingSoon ? "destructive" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        {battle.endTime}
                      </Badge>
                      {isPopular && (
                        <Badge
                          variant="default"
                          className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1"
                        >
                          <Flame className="w-3 h-3" />
                          인기
                        </Badge>
                      )}
                      {isEndingSoon && (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1 animate-pulse"
                        >
                          <Clock className="w-3 h-3" />
                          마감 임박
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-4 text-center">
                      VS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-800 dark:to-zinc-700">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-4xl">{battle.thumbnail1}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">
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
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-4xl">{battle.thumbnail2}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">
                              {battle.character2}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {battle.votes2.toLocaleString("ko-KR")}표
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 text-xs text-muted-foreground border-t text-center">
                        총 투표수: {battle.totalVotes.toLocaleString("ko-KR")}표
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      투표하기
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Results Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              최근 배틀 결과
            </h2>
            <p className="text-muted-foreground">
              놓친 배틀의 승패 결과를 확인하세요
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/results">
              더보기
              <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockResults.map((result) => (
            <Card
              key={result.id}
              className="hover:shadow-lg transition-shadow border-2"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {result.endedAt}
                  </Badge>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{result.winnerThumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate text-green-600 dark:text-green-400">
                        {result.winner}
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-500 hover:bg-green-600 text-xs mt-1"
                      >
                        승리
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    vs
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{result.loserThumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate text-muted-foreground">
                        {result.loser}
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 text-xs text-muted-foreground border-t text-center">
                    투표: {result.votes}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

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
  Trophy,
  Users,
  Flame,
  Medal,
  Crown,
  Award,
  ArrowRight,
  Star,
  Target,
  Coins,
} from "lucide-react";
import { RankingFilters } from "./RankingFilters";

type Period = "weekly" | "monthly";
type RankingType = "character" | "user";

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

interface RankingContentProps {
  weeklyCharacterRankings: CharacterRanking[];
  monthlyCharacterRankings: CharacterRanking[];
  weeklyUserRankings: UserRanking[];
  monthlyUserRankings: UserRanking[];
}

export function RankingContent({
  weeklyCharacterRankings,
  monthlyCharacterRankings,
  weeklyUserRankings,
  monthlyUserRankings,
}: RankingContentProps) {
  const [period, setPeriod] = useState<Period>("weekly");
  const [rankingType, setRankingType] = useState<RankingType>("character");

  const characterRankings =
    period === "weekly" ? weeklyCharacterRankings : monthlyCharacterRankings;
  const userRankings =
    period === "weekly" ? weeklyUserRankings : monthlyUserRankings;

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
    <>
      {/* Filter Section */}
      <section className="mb-8">
        <RankingFilters
          onPeriodChange={setPeriod}
          onRankingTypeChange={setRankingType}
        />
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
    </>
  );
}

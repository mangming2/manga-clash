"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, ArrowRight } from "lucide-react";
import { DashboardFilters } from "./DashboardFilters";

type BattleStatus = "ongoing" | "ending_soon" | "popular";

interface Battle {
  id: number;
  character1: string;
  character2: string;
  thumbnail1: string;
  thumbnail2: string;
  endTime: string;
  endTimeMinutes: number;
  votes1: number;
  votes2: number;
  totalVotes: number;
  status: BattleStatus;
  character1Series?: string;
  character2Series?: string;
}

interface DashboardBattlesProps {
  battles: Battle[];
}

export function DashboardBattles({ battles }: DashboardBattlesProps) {
  const [filteredBattles, setFilteredBattles] = useState<Battle[]>(battles);

  return (
    <>
      {/* Filter and Sort Section */}
      <section className="mb-8">
        <DashboardFilters
          battles={battles}
          onFilteredBattlesChange={setFilteredBattles}
        />
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
              {filteredBattles.length}개의 배틀이 진행 중입니다
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBattles.map((battle) => {
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
    </>
  );
}

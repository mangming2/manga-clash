"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Coins,
} from "lucide-react";

interface BattleHistory {
  id: number;
  character1: string;
  character2: string;
  thumbnail1: string;
  thumbnail2: string;
  status: "ongoing" | "ended";
  userVote?: "character1" | "character2";
  result?: "win" | "lose" | "pending";
  pointsEarned?: number;
  endTime?: string;
  endedAt?: string;
}

interface PointTransaction {
  id: number;
  type: "earn" | "spend";
  amount: number;
  description: string;
  date: string;
  battleId?: number;
}

interface MyPageTabsProps {
  ongoingBattles: BattleHistory[];
  endedBattles: BattleHistory[];
  pointTransactions: PointTransaction[];
}

export function MyPageTabs({
  ongoingBattles,
  endedBattles,
  pointTransactions,
}: MyPageTabsProps) {
  const [activeTab, setActiveTab] = useState<"battles" | "points">("battles");

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("battles")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "battles"
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          참여 배틀
        </button>
        <button
          onClick={() => setActiveTab("points")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "points"
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          포인트 내역
        </button>
      </div>

      {/* Battle History Tab */}
      {activeTab === "battles" && (
        <>
          {/* Ongoing Battles */}
          {ongoingBattles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-500" />
                진행 중인 배틀
              </h2>
              <div className="space-y-4">
                {ongoingBattles.map((battle) => (
                  <Link key={battle.id} href={`/battle/${battle.id}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-orange-300 dark:hover:border-orange-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-3xl">
                                {battle.thumbnail1}
                              </div>
                              <span className="font-semibold">
                                {battle.character1}
                              </span>
                            </div>
                            <span className="text-muted-foreground">VS</span>
                            <div className="flex items-center gap-2">
                              <div className="text-3xl">
                                {battle.thumbnail2}
                              </div>
                              <span className="font-semibold">
                                {battle.character2}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Clock className="w-3 h-3" />
                              {battle.endTime}
                            </Badge>
                            {battle.userVote && (
                              <Badge variant="secondary">투표 완료</Badge>
                            )}
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ended Battles */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              종료된 배틀
            </h2>
            <div className="space-y-4">
              {endedBattles.map((battle) => (
                <Link key={battle.id} href={`/battle/${battle.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-3xl">{battle.thumbnail1}</div>
                            <span className="font-semibold">
                              {battle.character1}
                            </span>
                          </div>
                          <span className="text-muted-foreground">VS</span>
                          <div className="flex items-center gap-2">
                            <div className="text-3xl">{battle.thumbnail2}</div>
                            <span className="font-semibold">
                              {battle.character2}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {battle.result === "win" && (
                            <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              승리
                            </Badge>
                          )}
                          {battle.result === "lose" && (
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <XCircle className="w-3 h-3" />
                              패배
                            </Badge>
                          )}
                          {battle.pointsEarned !== undefined &&
                            battle.pointsEarned > 0 && (
                              <Badge
                                variant="default"
                                className="bg-yellow-500 hover:bg-yellow-600"
                              >
                                +{battle.pointsEarned}P
                              </Badge>
                            )}
                          <span className="text-sm text-muted-foreground">
                            {battle.endedAt}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Point History Tab */}
      {activeTab === "points" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-500" />
            포인트 내역
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {pointTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "earn"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-red-100 dark:bg-red-900/30"
                          }`}
                        >
                          {transaction.type === "earn" ? (
                            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Coins className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          transaction.type === "earn"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "earn" ? "+" : "-"}
                        {transaction.amount.toLocaleString("ko-KR")}P
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

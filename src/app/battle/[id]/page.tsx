"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Trophy,
  Users,
  Flame,
  Share2,
  ArrowLeft,
  Zap,
  Shield,
  Swords,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Mock data types
interface Character {
  name: string;
  thumbnail: string;
  series: string;
  stats: {
    power: number;
    speed: number;
    defense: number;
    intelligence: number;
  };
  description: string;
}

interface Battle {
  id: number;
  character1: Character;
  character2: Character;
  location: string;
  specialConditions: string[];
  endTime: string;
  endTimeMinutes: number;
  votes1: number;
  votes2: number;
  totalVotes: number;
  status: "ongoing" | "ended";
  userVote?: "character1" | "character2" | null;
  userPoints?: number;
  userRank?: number;
}

interface AIResult {
  winner: "character1" | "character2";
  battleLog: string[];
  finalScore: {
    character1: number;
    character2: number;
  };
  highlights: string[];
}

// Mock battle data - 실제로는 API에서 가져올 데이터
const mockBattles: Record<number, Battle> = {
  1: {
    id: 1,
    character1: {
      name: "나루토",
      thumbnail: "🔥",
      series: "나루토",
      stats: {
        power: 95,
        speed: 90,
        defense: 85,
        intelligence: 75,
      },
      description:
        "구미의 힘을 다루는 닌자. 불굴의 의지와 강력한 차크라를 가진 인물.",
    },
    character2: {
      name: "사스케",
      thumbnail: "⚡",
      series: "나루토",
      stats: {
        power: 92,
        speed: 95,
        defense: 80,
        intelligence: 90,
      },
      description:
        "우치하 일족의 천재. 사륜안과 뇌둔을 사용하는 최강의 닌자 중 한 명.",
    },
    location: "종말의 계곡",
    specialConditions: ["차크라 무제한", "치명타 금지"],
    endTime: "2시간 30분",
    endTimeMinutes: 150,
    votes1: 1240,
    votes2: 980,
    totalVotes: 2220,
    status: "ongoing",
    userVote: null,
    userPoints: 0,
    userRank: 0,
  },
  2: {
    id: 2,
    character1: {
      name: "루피",
      thumbnail: "🍖",
      series: "원피스",
      stats: {
        power: 98,
        speed: 88,
        defense: 90,
        intelligence: 60,
      },
      description:
        "고무고무 열매 능력자. 해적왕을 꿈꾸는 밝고 긍정적인 해적 선장.",
    },
    character2: {
      name: "조로",
      thumbnail: "🗡️",
      series: "원피스",
      stats: {
        power: 95,
        speed: 92,
        defense: 88,
        intelligence: 85,
      },
      description:
        "삼도류 검사. 세계 최강의 검사가 되겠다는 목표를 가진 강인한 전사.",
    },
    location: "그랜드 라인",
    specialConditions: ["악마의 열매 사용 가능", "해루석 무효"],
    endTime: "5시간 15분",
    endTimeMinutes: 315,
    votes1: 890,
    votes2: 1120,
    totalVotes: 2010,
    status: "ongoing",
    userVote: null,
    userPoints: 0,
    userRank: 0,
  },
  3: {
    id: 3,
    character1: {
      name: "가츠",
      thumbnail: "⚔️",
      series: "베르세르크",
      stats: {
        power: 100,
        speed: 85,
        defense: 95,
        intelligence: 80,
      },
      description:
        "거대한 드래곤 슬레이어를 휘두르는 검은 검사. 복수에 불타는 전사.",
    },
    character2: {
      name: "그리피스",
      thumbnail: "👑",
      series: "베르세르크",
      stats: {
        power: 95,
        speed: 100,
        defense: 80,
        intelligence: 100,
      },
      description:
        "하얀 매의 단장. 전략과 무력 모두 뛰어난 카리스마 넘치는 지도자.",
    },
    location: "미드랜드 왕국",
    specialConditions: ["신의 손 개입 없음", "평등한 조건"],
    endTime: "종료됨",
    endTimeMinutes: 0,
    votes1: 3200,
    votes2: 2800,
    totalVotes: 6000,
    status: "ended",
    userVote: "character1",
    userPoints: 150,
    userRank: 1250,
  },
};

// Mock AI results for ended battles
const mockAIResults: Record<number, AIResult> = {
  3: {
    winner: "character1",
    battleLog: [
      "가츠가 드래곤 슬레이어를 휘두르며 전투를 시작합니다.",
      "그리피스가 빠른 속도로 회피하며 반격을 준비합니다.",
      "가츠의 강력한 일격이 그리피스의 방어를 뚫습니다.",
      "그리피스가 전략적으로 위치를 이동하며 공격 기회를 노립니다.",
      "가츠의 불굴의 의지가 승부를 결정짓습니다.",
      "최종적으로 가츠가 승리했습니다!",
    ],
    finalScore: {
      character1: 87,
      character2: 82,
    },
    highlights: [
      "가츠의 결정적 일격이 승부를 갈랐습니다",
      "그리피스의 전략적 움직임이 인상적이었습니다",
      "양쪽 모두 최선을 다한 명승부였습니다",
    ],
  },
};

export default function BattleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const battleId = Number(params.id);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const battle = mockBattles[battleId];
  const aiResult = mockAIResults[battleId];

  // 배틀이 종료되었거나 사용자가 투표한 경우 결과 표시
  useEffect(() => {
    if (battle?.status === "ended" || battle?.userVote) {
      setShowResult(true);
      setHasVoted(true);
    }
  }, [battle]);

  if (!battle) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>배틀을 찾을 수 없습니다</CardTitle>
            <CardDescription>
              요청하신 배틀이 존재하지 않거나 삭제되었습니다.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 w-4 h-4" />
                대시보드로 돌아가기
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  const votePercentage1 =
    battle.totalVotes > 0
      ? Math.round((battle.votes1 / battle.totalVotes) * 100)
      : 0;
  const votePercentage2 =
    battle.totalVotes > 0
      ? Math.round((battle.votes2 / battle.totalVotes) * 100)
      : 0;

  const handleVote = (character: "character1" | "character2") => {
    if (hasVoted || battle.status === "ended") return;
    setHasVoted(true);
    setShowResult(true);
    // 실제로는 API 호출
    console.log(`Voted for ${character}`);
  };

  const winner =
    battle.status === "ended" && aiResult
      ? aiResult.winner === "character1"
        ? battle.character1
        : battle.character2
      : null;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 w-4 h-4" />
            대시보드로 돌아가기
          </Link>
        </Button>
      </div>

      {/* Battle Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {battle.character1.name} VS {battle.character2.name}
        </h1>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-lg px-4 py-1">
            {battle.character1.series} vs {battle.character2.series}
          </Badge>
          {battle.status === "ongoing" ? (
            <Badge
              variant="destructive"
              className="flex items-center gap-1 text-lg px-4 py-1"
            >
              <Clock className="w-4 h-4" />
              {battle.endTime}
            </Badge>
          ) : (
            <Badge
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-lg px-4 py-1"
            >
              <Trophy className="w-4 h-4 mr-1" />
              종료됨
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Character 1 */}
        <div className="lg:col-span-1">
          <Card
            className={`h-full border-2 transition-all ${
              winner?.name === battle.character1.name
                ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
                : "hover:border-orange-300 dark:hover:border-orange-700"
            }`}
          >
            <CardHeader className="text-center">
              <div className="text-8xl mb-4">{battle.character1.thumbnail}</div>
              <CardTitle className="text-2xl">{battle.character1.name}</CardTitle>
              <CardDescription>{battle.character1.series}</CardDescription>
              {winner?.name === battle.character1.name && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 mt-2">
                  <Trophy className="w-3 h-3 mr-1" />
                  승리
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {battle.character1.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      파워
                    </span>
                    <span className="font-semibold">
                      {battle.character1.stats.power}
                    </span>
                  </div>
                  <Progress value={battle.character1.stats.power} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Swords className="w-4 h-4 text-blue-500" />
                      스피드
                    </span>
                    <span className="font-semibold">
                      {battle.character1.stats.speed}
                    </span>
                  </div>
                  <Progress value={battle.character1.stats.speed} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      방어력
                    </span>
                    <span className="font-semibold">
                      {battle.character1.stats.defense}
                    </span>
                  </div>
                  <Progress value={battle.character1.stats.defense} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      지능
                    </span>
                    <span className="font-semibold">
                      {battle.character1.stats.intelligence}
                    </span>
                  </div>
                  <Progress value={battle.character1.stats.intelligence} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Battle Info & Voting */}
        <div className="lg:col-span-1 space-y-6">
          {/* Battle Conditions */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-orange-500" />
                배틀 조건
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">장소</div>
                <Badge variant="outline">{battle.location}</Badge>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">특수 조건</div>
                <div className="flex flex-wrap gap-2">
                  {battle.specialConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voting Section */}
          {battle.status === "ongoing" && (
            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  투표 / 배팅
                </CardTitle>
                <CardDescription>
                  원하는 캐릭터를 선택하고 투표하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Character 1 Vote */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {battle.character1.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {votePercentage1}% ({battle.votes1.toLocaleString("ko-KR")}표)
                    </span>
                  </div>
                  <Progress value={votePercentage1} className="h-3" />
                  <Button
                    className="w-full"
                    variant={
                      hasVoted && battle.userVote === "character1"
                        ? "default"
                        : "outline"
                    }
                    disabled={hasVoted}
                    onClick={() => handleVote("character1")}
                  >
                    {hasVoted && battle.userVote === "character1" ? (
                      <>
                        <CheckCircle2 className="mr-2 w-4 h-4" />
                        투표 완료
                      </>
                    ) : (
                      <>
                        {battle.character1.thumbnail} {battle.character1.name}{" "}
                        선택
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center text-2xl font-bold text-muted-foreground">
                  VS
                </div>

                {/* Character 2 Vote */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {battle.character2.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {votePercentage2}% ({battle.votes2.toLocaleString("ko-KR")}표)
                    </span>
                  </div>
                  <Progress value={votePercentage2} className="h-3" />
                  <Button
                    className="w-full"
                    variant={
                      hasVoted && battle.userVote === "character2"
                        ? "default"
                        : "outline"
                    }
                    disabled={hasVoted}
                    onClick={() => handleVote("character2")}
                  >
                    {hasVoted && battle.userVote === "character2" ? (
                      <>
                        <CheckCircle2 className="mr-2 w-4 h-4" />
                        투표 완료
                      </>
                    ) : (
                      <>
                        {battle.character2.thumbnail} {battle.character2.name}{" "}
                        선택
                      </>
                    )}
                  </Button>
                </div>

                {hasVoted && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-center text-muted-foreground">
                      투표가 완료되었습니다! 배틀 종료 후 결과를 확인하세요.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Participation Info */}
          {(hasVoted || battle.userVote) && (
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  참여 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    투표한 캐릭터
                  </span>
                  <Badge variant="default">
                    {battle.userVote === "character1"
                      ? battle.character1.name
                      : battle.character2.name}
                  </Badge>
                </div>
                {battle.userPoints !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      획득 포인트
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      +{battle.userPoints}P
                    </span>
                  </div>
                )}
                {battle.userRank !== undefined && battle.userRank > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">랭킹</span>
                    <span className="font-semibold">
                      #{battle.userRank.toLocaleString("ko-KR")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Character 2 */}
        <div className="lg:col-span-1">
          <Card
            className={`h-full border-2 transition-all ${
              winner?.name === battle.character2.name
                ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
                : "hover:border-blue-300 dark:hover:border-blue-700"
            }`}
          >
            <CardHeader className="text-center">
              <div className="text-8xl mb-4">{battle.character2.thumbnail}</div>
              <CardTitle className="text-2xl">{battle.character2.name}</CardTitle>
              <CardDescription>{battle.character2.series}</CardDescription>
              {winner?.name === battle.character2.name && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 mt-2">
                  <Trophy className="w-3 h-3 mr-1" />
                  승리
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {battle.character2.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      파워
                    </span>
                    <span className="font-semibold">
                      {battle.character2.stats.power}
                    </span>
                  </div>
                  <Progress value={battle.character2.stats.power} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Swords className="w-4 h-4 text-blue-500" />
                      스피드
                    </span>
                    <span className="font-semibold">
                      {battle.character2.stats.speed}
                    </span>
                  </div>
                  <Progress value={battle.character2.stats.speed} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      방어력
                    </span>
                    <span className="font-semibold">
                      {battle.character2.stats.defense}
                    </span>
                  </div>
                  <Progress value={battle.character2.stats.defense} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      지능
                    </span>
                    <span className="font-semibold">
                      {battle.character2.stats.intelligence}
                    </span>
                  </div>
                  <Progress value={battle.character2.stats.intelligence} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Battle Result Section */}
      {showResult && battle.status === "ended" && aiResult && (
        <Card className="mt-8 border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-purple-500" />
              AI 전투 시뮬레이션 결과
            </CardTitle>
            <CardDescription>
              AI가 분석한 전투 시뮬레이션 결과입니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Winner Announcement */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-300 dark:border-yellow-700">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2">
                {winner?.name} 승리!
              </h3>
              <p className="text-muted-foreground">
                최종 점수: {aiResult.finalScore[aiResult.winner]} vs{" "}
                {aiResult.finalScore[
                  aiResult.winner === "character1" ? "character2" : "character1"
                ]}
              </p>
            </div>

            {/* Battle Log */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Swords className="w-5 h-5" />
                전투 로그
              </h4>
              <div className="space-y-2">
                {aiResult.battleLog.map((log, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-background border text-sm"
                  >
                    <span className="font-medium text-muted-foreground mr-2">
                      [{index + 1}]
                    </span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                하이라이트
              </h4>
              <div className="space-y-2">
                {aiResult.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-lg bg-background border"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <div className="pt-4 border-t">
              <Button className="w-full" size="lg" variant="outline">
                <Share2 className="mr-2 w-4 h-4" />
                결과 공유하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show Result Button (for ongoing battles after voting) */}
      {showResult && battle.status === "ongoing" && hasVoted && (
        <Card className="mt-8 border-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                투표가 완료되었습니다! 배틀이 종료되면 AI 시뮬레이션 결과를
                확인할 수 있습니다.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  마감까지 {battle.endTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}


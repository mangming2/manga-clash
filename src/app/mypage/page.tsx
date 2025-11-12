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
  Coins,
  Users,
  Settings,
  Bell,
  LogOut,
  Award,
  BarChart3,
  Edit,
  Flame,
} from "lucide-react";
import { MyPageTabs } from "@/components/MyPageTabs";

// Mock data types
interface UserProfile {
  id: number;
  nickname: string;
  avatar?: string;
  totalPoints: number;
  rank: number;
  totalBattles: number;
  winBattles: number;
  winRate: number;
  joinDate: string;
}

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

// Mock data
const mockUserProfile: UserProfile = {
  id: 1,
  nickname: "만화왕",
  avatar: undefined,
  totalPoints: 12500,
  rank: 42,
  totalBattles: 87,
  winBattles: 52,
  winRate: 59.8,
  joinDate: "2024-01-15",
};

const mockBattleHistory: BattleHistory[] = [
  {
    id: 1,
    character1: "나루토",
    character2: "사스케",
    thumbnail1: "🔥",
    thumbnail2: "⚡",
    status: "ongoing",
    userVote: "character1",
    result: "pending",
    endTime: "2시간 30분",
  },
  {
    id: 2,
    character1: "루피",
    character2: "조로",
    thumbnail1: "🍖",
    thumbnail2: "🗡️",
    status: "ongoing",
    userVote: "character2",
    result: "pending",
    endTime: "5시간 15분",
  },
  {
    id: 3,
    character1: "가츠",
    character2: "그리피스",
    thumbnail1: "⚔️",
    thumbnail2: "👑",
    status: "ended",
    userVote: "character1",
    result: "win",
    pointsEarned: 150,
    endedAt: "2시간 전",
  },
  {
    id: 4,
    character1: "이치고",
    character2: "렌지",
    thumbnail1: "⚔️",
    thumbnail2: "🔥",
    status: "ended",
    userVote: "character2",
    result: "lose",
    pointsEarned: 0,
    endedAt: "5시간 전",
  },
  {
    id: 5,
    character1: "곤",
    character2: "킬루아",
    thumbnail1: "🎯",
    thumbnail2: "⚡",
    status: "ended",
    userVote: "character1",
    result: "win",
    pointsEarned: 200,
    endedAt: "1일 전",
  },
  {
    id: 6,
    character1: "데쿠",
    character2: "바쿠고",
    thumbnail1: "💪",
    thumbnail2: "💥",
    status: "ended",
    userVote: "character1",
    result: "win",
    pointsEarned: 180,
    endedAt: "2일 전",
  },
];

const mockPointTransactions: PointTransaction[] = [
  {
    id: 1,
    type: "earn",
    amount: 150,
    description: "가츠 vs 그리피스 배틀 승리",
    date: "2시간 전",
    battleId: 3,
  },
  {
    id: 2,
    type: "earn",
    amount: 200,
    description: "곤 vs 킬루아 배틀 승리",
    date: "1일 전",
    battleId: 5,
  },
  {
    id: 3,
    type: "earn",
    amount: 180,
    description: "데쿠 vs 바쿠고 배틀 승리",
    date: "2일 전",
    battleId: 6,
  },
  {
    id: 4,
    type: "earn",
    amount: 120,
    description: "타니지로 vs 젠이츠 배틀 승리",
    date: "3일 전",
    battleId: 7,
  },
  {
    id: 5,
    type: "spend",
    amount: 50,
    description: "프리미엄 배틀 참여",
    date: "4일 전",
    battleId: 8,
  },
  {
    id: 6,
    type: "earn",
    amount: 100,
    description: "에렌 vs 라이너 배틀 승리",
    date: "5일 전",
    battleId: 9,
  },
];

export default function MyPage() {
  const ongoingBattles = mockBattleHistory.filter(
    (battle) => battle.status === "ongoing"
  );
  const endedBattles = mockBattleHistory.filter(
    (battle) => battle.status === "ended"
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          마이페이지
        </h1>
        <p className="text-muted-foreground text-lg">
          내 배틀 참여 내역과 통계를 확인하세요
        </p>
      </div>

      {/* User Summary Section */}
      <section className="mb-8">
        <Card className="border-2 border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-red-50 dark:from-zinc-900 dark:to-zinc-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar
                  size="xl"
                  src={mockUserProfile.avatar}
                  alt={mockUserProfile.nickname}
                  fallback={mockUserProfile.nickname[0]}
                />
                <div>
                  <CardTitle className="text-2xl mb-1">
                    {mockUserProfile.nickname}
                  </CardTitle>
                  <CardDescription className="text-base">
                    가입일: {mockUserProfile.joinDate}
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 w-4 h-4" />
                프로필 수정
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">포인트</span>
                </div>
                <div className="text-2xl font-bold">
                  {mockUserProfile.totalPoints.toLocaleString("ko-KR")}P
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">랭킹</span>
                </div>
                <div className="text-2xl font-bold">
                  #{mockUserProfile.rank.toLocaleString("ko-KR")}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    참여 배틀
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {mockUserProfile.totalBattles}회
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">승률</span>
                </div>
                <div className="text-2xl font-bold">
                  {mockUserProfile.winRate}%
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">승리 배틀</span>
                <span className="font-semibold">
                  {mockUserProfile.winBattles}승 /{" "}
                  {mockUserProfile.totalBattles}전
                </span>
              </div>
              <Progress value={mockUserProfile.winRate} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Battle History */}
        <MyPageTabs
          ongoingBattles={ongoingBattles}
          endedBattles={endedBattles}
          pointTransactions={mockPointTransactions}
        />

        {/* Right Column - Settings & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                통계 요약
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">이번 달 참여</span>
                  <span className="font-semibold">12회</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">이번 달 승리</span>
                  <span className="font-semibold">8회</span>
                </div>
                <Progress value={66.7} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">이번 달 포인트</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    +1,250P
                  </span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-500" />
                설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/profile/edit">
                  <Edit className="mr-2 w-4 h-4" />
                  프로필 수정
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 w-4 h-4" />
                알림 설정
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 w-4 h-4" />
                계정 관리
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <LogOut className="mr-2 w-4 h-4" />
                로그아웃
              </Button>
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          <Card className="border-2 border-yellow-200 dark:border-yellow-900 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                업적
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  <Trophy className="w-3 h-3 mr-1" />
                  배틀 마스터
                </Badge>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  <Flame className="w-3 h-3 mr-1" />
                  연승 5회
                </Badge>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  <Coins className="w-3 h-3 mr-1" />
                  포인트 10K 달성
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

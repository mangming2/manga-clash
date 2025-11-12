import { RankingContent } from "@/components/RankingContent";

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
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          랭킹
        </h1>
        <p className="text-muted-foreground text-lg">
          인기 캐릭터와 유저 순위를 확인하세요
        </p>
      </div>

      <RankingContent
        weeklyCharacterRankings={mockWeeklyCharacterRankings}
        monthlyCharacterRankings={mockMonthlyCharacterRankings}
        weeklyUserRankings={mockWeeklyUserRankings}
        monthlyUserRankings={mockMonthlyUserRankings}
      />
    </main>
  );
}

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Star, Users } from "lucide-react";

type Period = "weekly" | "monthly";
type RankingType = "character" | "user";

interface RankingFiltersProps {
  onPeriodChange: (period: Period) => void;
  onRankingTypeChange: (type: RankingType) => void;
}

export function RankingFilters({
  onPeriodChange,
  onRankingTypeChange,
}: RankingFiltersProps) {
  const [period, setPeriod] = useState<Period>("weekly");
  const [rankingType, setRankingType] = useState<RankingType>("character");

  const handlePeriodChange = (value: string) => {
    const newPeriod = value as Period;
    setPeriod(newPeriod);
    onPeriodChange(newPeriod);
  };

  const handleRankingTypeChange = (value: string) => {
    const newType = value as RankingType;
    setRankingType(newType);
    onRankingTypeChange(newType);
  };

  return (
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
            <label className="text-sm font-medium mb-2 block">기간 선택</label>
            <Tabs value={period} onValueChange={handlePeriodChange}>
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
            <label className="text-sm font-medium mb-2 block">랭킹 타입</label>
            <Select value={rankingType} onValueChange={handleRankingTypeChange}>
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
  );
}

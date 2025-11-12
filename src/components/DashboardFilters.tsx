"use client";

import React, { useState, useMemo } from "react";
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
import { TrendingUp, Clock, Users, Flame } from "lucide-react";

type BattleStatus = "ongoing" | "ending_soon" | "popular";
type SortOption = "popular" | "ending_soon" | "character";

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

interface DashboardFiltersProps {
  battles: Battle[];
  onFilteredBattlesChange: (battles: Battle[]) => void;
}

export function DashboardFilters({
  battles,
  onFilteredBattlesChange,
}: DashboardFiltersProps) {
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [characterFilter, setCharacterFilter] = useState<string>("all");

  // Get unique character names for filter
  const allCharacters = useMemo(() => {
    const characters = new Set<string>();
    battles.forEach((battle) => {
      characters.add(battle.character1);
      characters.add(battle.character2);
    });
    return Array.from(characters).sort();
  }, [battles]);

  // Filter and sort battles
  const filteredAndSortedBattles = useMemo(() => {
    let filtered = [...battles];

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
  }, [sortBy, characterFilter, battles]);

  // Notify parent of filtered battles
  React.useEffect(() => {
    onFilteredBattlesChange(filteredAndSortedBattles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAndSortedBattles]);

  return (
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
            <label className="text-sm font-medium mb-2 block">정렬 기준</label>
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
            <Select value={characterFilter} onValueChange={setCharacterFilter}>
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
  );
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useActor } from "./useActor";

const VISIT_RECORDED_KEY = "visit_recorded_today";

export function useVisitAnalytics() {
  const { actor, isFetching: isActorFetching } = useActor();

  const hasRecordedToday = useCallback(() => {
    const recorded = localStorage.getItem(VISIT_RECORDED_KEY);
    if (!recorded) return false;

    const recordedDate = new Date(recorded);
    const today = new Date();

    return (
      recordedDate.getDate() === today.getDate() &&
      recordedDate.getMonth() === today.getMonth() &&
      recordedDate.getFullYear() === today.getFullYear()
    );
  }, []);

  const { mutate: recordVisitMutation } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.recordVisit();
    },
    onSuccess: () => {
      localStorage.setItem(VISIT_RECORDED_KEY, new Date().toISOString());
    },
  });

  const recordVisit = useCallback(() => {
    if (!hasRecordedToday() && actor && !isActorFetching) {
      recordVisitMutation();
    }
  }, [actor, isActorFetching, recordVisitMutation, hasRecordedToday]);

  const { data: totalVisits = 0, isLoading: isLoadingTotal } = useQuery<number>(
    {
      queryKey: ["totalVisits"],
      queryFn: async () => {
        if (!actor) return 0;
        const result = await actor.getTotalVisits();
        return Number(result);
      },
      enabled: !!actor && !isActorFetching,
      refetchInterval: 60000,
    },
  );

  const { data: todayVisits = 0, isLoading: isLoadingToday } = useQuery<number>(
    {
      queryKey: ["todayVisits"],
      queryFn: async () => {
        if (!actor) return 0;
        const currentDay = BigInt(
          Math.floor(Date.now() / (24 * 60 * 60 * 1000)),
        );
        try {
          const result = await actor.getDailyVisits(currentDay);
          return Number(result);
        } catch (_error) {
          return 0;
        }
      },
      enabled: !!actor && !isActorFetching,
      refetchInterval: 60000,
    },
  );

  return {
    totalVisits,
    todayVisits,
    isLoading: isLoadingTotal || isLoadingToday,
    recordVisit,
  };
}

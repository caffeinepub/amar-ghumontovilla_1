import { useQuery } from "@tanstack/react-query";
import type { LiteraryContent } from "../backend";
import { useActor } from "./useActor";

export function usePublishedContent() {
  const { actor, isFetching } = useActor();

  return useQuery<LiteraryContent[]>({
    queryKey: ["publishedContent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublishedContentById(id: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<LiteraryContent | null>({
    queryKey: ["publishedContent", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getContentById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

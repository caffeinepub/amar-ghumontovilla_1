import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LiteraryContent } from "../backend";
import { useActor } from "./useActor";

export function useDrafts() {
  const { actor, isFetching } = useActor();

  return useQuery<LiteraryContent[]>({
    queryKey: ["drafts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDrafts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateDraft() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      content,
    }: { title: string; content: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createDraft(title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });
}

export function useUpdateDraft() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      content,
    }: { id: string; title: string; content: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDraft(id, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });
}

export function usePublishContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.publishContent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      queryClient.invalidateQueries({ queryKey: ["publishedContent"] });
    },
  });
}

export function useDeleteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteContent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      queryClient.invalidateQueries({ queryKey: ["publishedContent"] });
    },
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "../backend";
import { useActor } from "./useActor";

type Section = "home" | "poems" | "stories" | "essays";

export function useSectionComments(section: Section) {
  const { actor, isFetching: isActorFetching } = useActor();
  const queryClient = useQueryClient();

  const queryKey = ["comments", section];

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getComments(section);
    },
    enabled: !!actor && !isActorFetching,
  });

  const { mutateAsync: addComment, isPending: isAddingComment } = useMutation({
    mutationFn: async ({
      author,
      content,
    }: { author: string; content: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addComment(section, author, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    comments,
    isLoading,
    addComment,
    isAddingComment,
  };
}

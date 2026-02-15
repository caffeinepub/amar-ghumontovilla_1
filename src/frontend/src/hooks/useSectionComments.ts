import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Comment } from '../backend';

type Section = 'home' | 'poems' | 'stories' | 'essays';

export function useSectionComments(section: Section) {
  const { actor, isFetching: isActorFetching } = useActor();
  const queryClient = useQueryClient();

  const queryKey = [`${section}Comments`];

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey,
    queryFn: async () => {
      if (!actor) return [];
      
      switch (section) {
        case 'home':
          return actor.getHomeComments();
        case 'poems':
          return actor.getPoemsComments();
        case 'stories':
          return actor.getStoriesComments();
        case 'essays':
          return actor.getEssaysComments();
        default:
          return [];
      }
    },
    enabled: !!actor && !isActorFetching,
  });

  const { mutateAsync: addComment, isPending: isAddingComment } = useMutation({
    mutationFn: async ({ author, content }: { author: string; content: string }) => {
      if (!actor) throw new Error('Actor not initialized');

      switch (section) {
        case 'home':
          return actor.addHomeComment(author, content);
        case 'poems':
          return actor.addPoemsComment(author, content);
        case 'stories':
          return actor.addStoriesComment(author, content);
        case 'essays':
          return actor.addEssaysComment(author, content);
        default:
          throw new Error('Invalid section');
      }
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

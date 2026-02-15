import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MessageSquare } from 'lucide-react';
import { useSectionComments } from '../hooks/useSectionComments';

type Section = 'home' | 'poems' | 'stories' | 'essays';

interface CommentsSectionProps {
  section: Section;
}

export default function CommentsSection({ section }: CommentsSectionProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { comments, isLoading, addComment, isAddingComment } = useSectionComments(section);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      return;
    }

    try {
      await addComment({ author: author.trim(), content: content.trim() });
      setAuthor('');
      setContent('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <MessageSquare size={24} />
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`author-${section}`}>Name</Label>
              <Input
                id={`author-${section}`}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                required
                disabled={isAddingComment}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`comment-${section}`}>Comment</Label>
              <Textarea
                id={`comment-${section}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Leave a comment..."
                required
                disabled={isAddingComment}
                rows={4}
                className="bg-background/50 resize-none"
              />
            </div>

            {showSuccess && (
              <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Comment added successfully!
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              disabled={isAddingComment || !author.trim() || !content.trim()}
              className="w-full sm:w-auto"
            >
              {isAddingComment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Comment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h3>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="font-semibold text-primary">{comment.author}</p>
                    <time className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(comment.timestamp)}
                    </time>
                  </div>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

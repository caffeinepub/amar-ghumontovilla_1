import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { LiteraryContent } from "../backend";
import { useHashRoute } from "../hooks/useHashRoute";
import {
  usePublishedContent,
  usePublishedContentById,
} from "../hooks/usePublishedLiteraryContent";
import ShareActions from "./ShareActions";

interface ContentDetailProps {
  itemId: string;
  onBack: () => void;
}

export default function ContentDetail({ itemId, onBack }: ContentDetailProps) {
  const { navigateToItem } = useHashRoute();
  const { data: item, isLoading } = usePublishedContentById(itemId);
  const { data: allPublished = [] } = usePublishedContent();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading content...</span>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Content not found or not published yet.
            </p>
            <Button onClick={onBack} className="mt-4">
              <ArrowLeft className="mr-2" size={16} />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Simple navigation through all published items
  const currentIndex = allPublished.findIndex(
    (i: LiteraryContent) => i.id === itemId,
  );
  const prevItem = currentIndex > 0 ? allPublished[currentIndex - 1] : null;
  const nextItem =
    currentIndex < allPublished.length - 1
      ? allPublished[currentIndex + 1]
      : null;

  const handlePrevious = () => {
    if (prevItem) {
      navigateToItem(prevItem.id, "content");
    }
  };

  const handleNext = () => {
    if (nextItem) {
      navigateToItem(nextItem.id, "content");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" size={16} />
          Back to List
        </Button>
      </div>

      <article className="prose prose-lg dark:prose-invert mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4 text-primary">
                {item.title}
              </h1>
              <ShareActions
                title={item.title}
                itemId={item.id}
                type="content"
              />
            </div>

            <div
              className="space-y-4 text-foreground/90 leading-relaxed"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is admin-controlled
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </CardContent>
        </Card>
      </article>

      <div className="flex items-center justify-between mt-8 gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!prevItem}
          className="flex-1 max-w-xs"
        >
          <ChevronLeft className="mr-2" size={16} />
          {prevItem
            ? `Previous: ${prevItem.title.substring(0, 30)}...`
            : "No Previous"}
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={!nextItem}
          className="flex-1 max-w-xs"
        >
          {nextItem ? `Next: ${nextItem.title.substring(0, 30)}...` : "No Next"}
          <ChevronRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}

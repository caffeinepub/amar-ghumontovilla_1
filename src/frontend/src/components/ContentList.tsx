import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { LiteraryContent } from "../backend";
import { usePublishedContent } from "../hooks/usePublishedLiteraryContent";

interface ContentListProps {
  type: "poems" | "stories" | "essays";
  onItemSelect: (itemId: string, type: string) => void;
}

export default function ContentList({ type, onItemSelect }: ContentListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data: publishedContent = [], isLoading } = usePublishedContent();

  const items = publishedContent.filter((item: LiteraryContent) => {
    // Map backend content to section types
    const title = item.title.toLowerCase();
    const isPoem = title.includes("কবিতা") || title.includes("poem");
    const isEssay =
      title.includes("প্রবন্ধ") ||
      title.includes("essay") ||
      title.includes("শিক্ষা") ||
      title.includes("জীবন");

    if (type === "poems") return isPoem;
    if (type === "essays") return isEssay;
    if (type === "stories") {
      // Explicitly tagged as story
      if (
        title.includes("গল্প") ||
        title.includes("story") ||
        title.includes("আশ্রয়") ||
        title.includes("ভয়")
      )
        return true;
      // Not a poem or essay → treat as story
      if (!isPoem && !isEssay) return true;
      return false;
    }
    return false;
  });

  // For now, we don't have categories in backend, so show all
  const categories = ["all"];
  const filteredItems = items;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      <div className="grid gap-6">
        {filteredItems.map((item: LiteraryContent) => (
          <Card
            key={item.id}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onItemSelect(item.id, type)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-xl text-primary">
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="text-muted-foreground line-clamp-3"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: content is admin-controlled
                dangerouslySetInnerHTML={{
                  __html: `${item.content.substring(0, 200).replace(/<[^>]*>/g, "")}...`,
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="py-12 text-center text-muted-foreground">
            No {type} published yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

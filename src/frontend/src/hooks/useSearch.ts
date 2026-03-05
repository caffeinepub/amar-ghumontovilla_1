import { useMemo, useState } from "react";
import type { LiteraryContent } from "../backend";
import { usePublishedContent } from "./usePublishedLiteraryContent";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  excerpt?: string;
  score: number;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const { data: publishedContent = [] } = usePublishedContent();

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    for (const item of publishedContent) {
      let score = 0;

      if (item.title.toLowerCase().includes(lowerQuery)) {
        score += 10;
      }

      if (item.content.toLowerCase().includes(lowerQuery)) {
        score += 5;
      }

      if (score > 0) {
        searchResults.push({
          id: item.id,
          title: item.title,
          type: "content",
          excerpt: item.content.substring(0, 150),
          score,
        });
      }
    }

    return searchResults.sort((a, b) => b.score - a.score);
  }, [query, publishedContent]);

  const search = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return {
    results,
    search,
  };
}

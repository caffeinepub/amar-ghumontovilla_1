import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useHashRoute } from "../hooks/useHashRoute";
import { useSearch } from "../hooks/useSearch";

interface SearchBoxProps {
  onClose: () => void;
}

export default function SearchBox({ onClose }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const { results, search } = useSearch();
  const { navigateToItem } = useHashRoute();

  const handleSearch = (value: string) => {
    setQuery(value);
    search(value);
  };

  const handleResultClick = (itemId: string) => {
    navigateToItem(itemId, "content");
    onClose();
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search poems, stories, essays..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      {query && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto shadow-lg z-50">
          <CardContent className="p-2">
            {results.map((result) => (
              <button
                type="button"
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                className="w-full text-left p-3 rounded-md hover:bg-accent/50 transition-colors"
              >
                <div className="font-medium text-foreground">
                  {result.title}
                </div>
                {result.excerpt && (
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {result.excerpt.replace(/<[^>]*>/g, "")}
                  </div>
                )}
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {query && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg z-50">
          <CardContent className="p-4 text-center text-muted-foreground">
            No results found for "{query}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}

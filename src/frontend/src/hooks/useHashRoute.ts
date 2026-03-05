import { useEffect, useState } from "react";

export function useHashRoute() {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        setCurrentSection("home");
        setCurrentItemId(null);
        return;
      }

      const parts = hash.split("/");

      if (parts.length === 1) {
        setCurrentSection(parts[0]);
        setCurrentItemId(null);
      } else if (parts.length === 2) {
        setCurrentSection(parts[0]);
        setCurrentItemId(parts[1]);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateToSection = (section: string) => {
    window.location.hash = section;
    setCurrentSection(section);
    setCurrentItemId(null);
  };

  const navigateToItem = (itemId: string, type: string) => {
    window.location.hash = `${type}/${itemId}`;
    setCurrentSection(type);
    setCurrentItemId(itemId);
  };

  return {
    currentSection,
    currentItemId,
    navigateToSection,
    navigateToItem,
  };
}

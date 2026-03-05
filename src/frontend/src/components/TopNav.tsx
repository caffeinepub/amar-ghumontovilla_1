import { Button } from "@/components/ui/button";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useThemePreference } from "../hooks/useThemePreference";
import LoginButton from "./LoginButton";
import SearchBox from "./SearchBox";

type Section =
  | "home"
  | "poems"
  | "stories"
  | "essays"
  | "contact"
  | "about"
  | "admin";

interface TopNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function TopNav({
  activeSection,
  onSectionChange,
}: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useThemePreference();
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();

  const navItems: { id: Section; label: string; adminOnly?: boolean }[] = [
    { id: "home", label: "Home" },
    { id: "poems", label: "আমার কবিতা" },
    { id: "stories", label: "গল্প" },
    { id: "essays", label: "প্রবন্ধ" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    { id: "admin", label: "Admin", adminOnly: true },
  ];

  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  const handleNavClick = (section: Section) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors font-bengali"
          >
            আমার ঘুমন্ত ভিলা
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {visibleNavItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => handleNavClick(item.id)}
                    className={`font-medium transition-all ${
                      activeSection === item.id
                        ? "shadow-sm"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="ml-2"
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {!adminLoading && <LoginButton />}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {!adminLoading && <LoginButton />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <div className="py-4 border-t border-border/50 animate-in slide-in-from-top duration-200">
            <SearchBox onClose={() => setSearchOpen(false)} />
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200">
            <ul className="flex flex-col gap-2">
              {visibleNavItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full justify-start font-medium ${
                      activeSection === item.id ? "shadow-sm" : ""
                    }`}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

type Section = 'home' | 'poems' | 'stories' | 'essays' | 'contact';

interface TopNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function TopNav({ activeSection, onSectionChange }: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: Section; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'poems', label: 'আমার কবিতা' },
    { id: 'stories', label: 'গল্প' },
    { id: 'essays', label: 'প্রবন্ধ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (section: Section) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => handleNavClick('home')}
            className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors font-bengali"
          >
            আমার ঘুমন্ত ভিলা
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-medium transition-all ${
                    activeSection === item.id 
                      ? 'shadow-sm' 
                      : 'hover:bg-accent/50'
                  }`}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top duration-200">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full justify-start font-medium ${
                      activeSection === item.id ? 'shadow-sm' : ''
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

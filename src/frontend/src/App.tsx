import { Heart, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import CommentsSection from "./components/CommentsSection";
import ContactSection from "./components/ContactSection";
import ContentDetail from "./components/ContentDetail";
import ContentList from "./components/ContentList";
import SectionHero from "./components/SectionHero";
import TopNav from "./components/TopNav";
import TranslateWidget from "./components/TranslateWidget";
import VisitStats from "./components/VisitStats";
import AdminPage from "./components/admin/AdminPage";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useHashRoute } from "./hooks/useHashRoute";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { useSeedContent } from "./hooks/useSeedContent";
import { useThemePreference } from "./hooks/useThemePreference";
import { useVisitAnalytics } from "./hooks/useVisitAnalytics";

type Section =
  | "home"
  | "poems"
  | "stories"
  | "essays"
  | "contact"
  | "about"
  | "admin";

function App() {
  const { currentSection, currentItemId, navigateToSection, navigateToItem } =
    useHashRoute();
  const [activeSection, setActiveSection] = useState<Section>(
    (currentSection as Section) || "home",
  );
  const { recordVisit } = useVisitAnalytics();
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();
  useThemePreference();
  useSeedContent();

  useEffect(() => {
    recordVisit();
  }, [recordVisit]);

  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection as Section);
    }
  }, [currentSection]);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    navigateToSection(section);
  };

  const handleItemSelect = (itemId: string, type: string) => {
    navigateToItem(itemId, type);
    setActiveSection(type as Section);
  };

  const handleBackToList = () => {
    navigateToSection(activeSection);
  };

  // Access control for admin section
  const showAccessDenied =
    activeSection === "admin" && !adminLoading && !isAdmin;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="floral-bg-pattern" />

      <TopNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <main className="flex-1 relative z-10">
        {showAccessDenied && (
          <section className="animate-in fade-in duration-500">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <ShieldAlert
                    className="mx-auto mb-4 text-destructive"
                    size={48}
                  />
                  <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                  <p className="text-muted-foreground mb-6">
                    You need to be logged in as an administrator to access this
                    page.
                  </p>
                  <Button onClick={() => handleSectionChange("home")}>
                    Go to Home
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === "admin" && !showAccessDenied && !adminLoading && (
          <section className="animate-in fade-in duration-500">
            <AdminPage />
          </section>
        )}

        {activeSection === "home" && !currentItemId && (
          <section className="animate-in fade-in duration-500">
            <SectionHero
              title="আমার ঘুমন্ত ভিলা"
              subtitle="Welcome to Amar Ghumontovilla"
              description="A serene space for literary exploration amidst nature's beauty."
            />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <div className="prose prose-lg dark:prose-invert mx-auto mb-12">
                <p className="text-xl leading-relaxed text-center text-muted-foreground">
                  এখানে আপনি আমার কবিতা, গল্প এবং প্রবন্ধ পড়তে পারেন।
                </p>
                <p className="text-lg leading-relaxed text-center mt-6">
                  Welcome to my personal literary sanctuary where words bloom
                  like flowers in a garden. Explore poems, stories, and essays
                  that capture the essence of life, nature, and human emotion.
                </p>
              </div>
              <VisitStats />
              <div className="mt-12">
                <CommentsSection section="home" />
              </div>
            </div>
          </section>
        )}

        {activeSection === "poems" && !currentItemId && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="আমার কবিতা" subtitle="My Poems" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <ContentList type="poems" onItemSelect={handleItemSelect} />
              <div className="mt-12">
                <CommentsSection section="poems" />
              </div>
            </div>
          </section>
        )}

        {(activeSection === "poems" ||
          activeSection === "stories" ||
          activeSection === "essays") &&
          currentItemId && (
            <section className="animate-in fade-in duration-500">
              <ContentDetail itemId={currentItemId} onBack={handleBackToList} />
            </section>
          )}

        {activeSection === "stories" && !currentItemId && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="গল্প" subtitle="Stories" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <ContentList type="stories" onItemSelect={handleItemSelect} />
              <div className="mt-12">
                <CommentsSection section="stories" />
              </div>
            </div>
          </section>
        )}

        {activeSection === "essays" && !currentItemId && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="প্রবন্ধ" subtitle="Essays" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <ContentList type="essays" onItemSelect={handleItemSelect} />
              <div className="mt-12">
                <CommentsSection section="essays" />
              </div>
            </div>
          </section>
        )}

        {activeSection === "about" && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="About" subtitle="আমাদের সম্পর্কে" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <AboutSection />
            </div>
          </section>
        )}

        {activeSection === "contact" && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="Contact" subtitle="Get in Touch" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <ContactSection />
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 bg-card/30 backdrop-blur-sm border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p>
                &copy; {new Date().getFullYear()} Amar Ghumontovilla. All rights
                reserved.
              </p>
              <VisitStats compact />
            </div>
            <p className="flex items-center gap-2">
              Built with{" "}
              <Heart
                className="text-rose-500 inline-block fill-rose-500"
                size={14}
              />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "amarghumontovilla")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <TranslateWidget />
    </div>
  );
}

export default App;

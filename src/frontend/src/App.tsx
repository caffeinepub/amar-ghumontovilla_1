import { useState } from 'react';
import TopNav from './components/TopNav';
import SectionHero from './components/SectionHero';
import CommentsSection from './components/CommentsSection';
import ContactSection from './components/ContactSection';
import TranslateWidget from './components/TranslateWidget';
import { Heart } from 'lucide-react';

type Section = 'home' | 'poems' | 'stories' | 'essays' | 'contact';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="floral-bg-pattern" />
      
      <TopNav activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 relative z-10">
        {activeSection === 'home' && (
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
                  Welcome to my personal literary sanctuary where words bloom like flowers in a garden. 
                  Explore poems, stories, and essays that capture the essence of life, nature, and human emotion.
                </p>
              </div>
              <CommentsSection section="home" />
            </div>
          </section>
        )}

        {activeSection === 'poems' && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="আমার কবিতা" subtitle="My Poems" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <div className="prose prose-lg dark:prose-invert mx-auto mb-12">
                <article className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-border/50 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Sample Poem Title</h3>
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    <p>Poem content will appear here...</p>
                    <p className="italic">More verses to come...</p>
                  </div>
                </article>
              </div>
              <CommentsSection section="poems" />
            </div>
          </section>
        )}

        {activeSection === 'stories' && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="গল্প" subtitle="Stories" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <div className="prose prose-lg dark:prose-invert mx-auto mb-12">
                <article className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-border/50 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Sample Story Title</h3>
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    <p>Story content will appear here...</p>
                    <p>More narrative to unfold...</p>
                  </div>
                </article>
              </div>
              <CommentsSection section="stories" />
            </div>
          </section>
        )}

        {activeSection === 'essays' && (
          <section className="animate-in fade-in duration-500">
            <SectionHero title="প্রবন্ধ" subtitle="Essays" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <div className="prose prose-lg dark:prose-invert mx-auto mb-12">
                <article className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-border/50 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Sample Essay Title</h3>
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    <p>Essay content will appear here...</p>
                    <p>Thoughtful reflections to follow...</p>
                  </div>
                </article>
              </div>
              <CommentsSection section="essays" />
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
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
            <p>&copy; {new Date().getFullYear()} Amar Ghumontovilla. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built with <Heart className="text-rose-500 inline-block fill-rose-500" size={14} /> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'amarghumontovilla')}`}
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

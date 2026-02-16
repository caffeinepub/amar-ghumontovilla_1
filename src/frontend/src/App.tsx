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
                  <h3 className="text-2xl font-bold mb-6 text-primary">আশ্রয়হীন</h3>
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    <p>সন্ধ্যের সময়, অনিলবাবু বসে আছেন মাদুরের ওপর। রবি অঙ্কটা কি করতে পারলে, উঁহু! এভাবে হয় না, উত্তরটা তো মিলবে কি করে? দেখো এর সাথে একে জুড়ো, ব্যাস, মিলল! হ্যাঁ স্যার! এটা তো খুবই সহজ। পরেরগুলো করো, তাসমিনা তুমি কী করছো? সবাই অভ্যাস করো। স্যার! হুম, বলো।</p>
                    
                    <p>স্যার, আমার এই-খানটা বুঝতে অসুবিধা হচ্ছে। ওমা, দেখি! এই বলে অনিলবাবু প্রীতমের খাতাটা দেখলেন।</p>
                    
                    <p>এখন বলে রাখি অনিলবাবু, চুঁড়ুয়া সৎসঙ্ঘ প্রত্যুন্ন মহাদেবী বিদ্যালয়ের অঙ্কের শিক্ষক। শিক্ষকতায় তাঁর নাম আশেপাশের কয়েক গ্রাম ছড়িয়ে আছে। তিনি থাকেন আমাদের এই টুড়ুয়া গ্রামেই। ছোট থেকেই বাবা-মা বলতেন অঙ্কের জন্য তোকে অনিলবাবুর কাছে পাঠাবো, দেখি কেমন করে কম নম্বর পাস। এখন আমি অষ্টম শ্রেণীতে পড়ি, ভর্তি হয়েছি তাঁর কাছেই। অনিলবাবু আমাদের সাথে বেশি কথা না বললেও, তাঁর অঙ্কের মাথা বেশ। কী সুন্দর চটজলদি অঙ্কগুলি বুঝিয়ে দেন। আমার ক্লাসে আমি, রতন, রবি, তাসমিনা, সুতপা পড়ি। আমাদের সাথে আরও ক্লাসের ছেলেমেয়েরা পড়তে আসে। অনিলবাবুর আজ সন্ধ্যাতে অঙ্কের ক্লাস চলছে। দেখতে দেখতে বাড়ি যাবার সময় হয়ে এলো। আমাদের সবার রাত ৮ টার সময় ছুটি হয়। তখন আমরা সবাই লাইট জ্বেলে, স্যারদের বাড়িতে বসে থাকা চাটাইগুলি গুড়িয়ে, ধুয়ে একে একে বাইরে আসি। স্যারদের বাড়িটি পেরিয়ে একটু ছোট গলি, তারপর বড়ো রাস্তা। বড়ো রাস্তায় আমাদের সবার সাইকেল দাঁড় করানো থাকে। রোজ দেখতাম, সবাই বেরিয়ে এলে স্যার তাঁর দোর গোড়ায় দাঁড়িয়ে থেকে আমাদের চলে যাওয়া দেখতেন, যতক্ষণ না আমরা সকলে বড়ো রাস্তায় উঠছি। জানিনা কেন? এই ভাবেই চলতে থাকে আমাদের স্যারের বাড়িতে পড়াশোনা।</p>
                    
                    <p>ওমা বলতে তো ভুলেই গেছি, স্যারের স্ত্রী, মানে আমাদের ম্যাডাম, কিন্তু সপ্তাহের একদিন রান্না করতেন তাঁর হাতের স্পেশাল মুড়ি মাখা ও আদা চা। সেদিন কিন্তু সবাই মিলে উল্লাস আনন্দ হত না চলত কবিতা বলা, আর আমার বন্ধু রবির গল্প বলা। দেখতে দেখতে বছর শেষ হয়ে এলো। হ্যাঁ, অন্তিম পরীক্ষায় খুব ভালো না হলেও প্রথম বিভাগে উত্তীর্ণ হলাম। অঙ্কেও খুব ভালো নম্বরও পেলাম।</p>
                    
                    <p>এখন উঠেছি ক্লাস ৯-এ। সব স্যারেরা-ম্যাডামেরা বলেন ৯-এ উঠে নাকি লেজ বেড়েছে। কথাটা হয়েছিল সত্যিও, ৯-এ তে সেটুকু ভালো করে পড়াশোনা করা হয়নি। তাই অনিলবাবুর কাছে বকাও খেয়েছি। কিন্তু কোনোদিন, তিনি গায়ে হাত দেননি। যখন ৯-র অন্তিম ফলাফল বের হল, দেখলাম ওই টেনেটুনে পাস করেছি।</p>
                    
                    <p>বাস!</p>
                    
                    <p>এবারে আর ধরে কে? এরপরে নিত্য যাত্রীর মতো করে মাধ্যমিক, পরে উচ্চমাধ্যমিক অনিলবাবুর কাছে পাঠ নিয়ে জীবনের একটি চ্যাপ্টার শেষ করি। আজ হঠাৎ দেখা হলো, সেই বছর দশের আগে দেখা, অনিলবাবুর সাথে। আমি রাস্তা দিয়ে আসছিলাম একটি টিউশন পড়িয়ে, দেখি স্যার বসে আছেন মুক্ত-দীঘির দিকে পাড়ে। হঠাৎ চোখাচুখি হতে দাঁড়িয়ে, প্রনাম সেরে, স্যারকে জিজ্ঞাসা করলাম, স্যার ভালো আছেন?</p>
                    
                    <p className="font-semibold text-center my-6">আশ্রয়হীন</p>
                    
                    <p>"হ্যাঁ, তুমি কেমন আছো? কী করছো আজকাল।"</p>
                    
                    <p>হঠাৎই এই প্রশ্ন শুনে আমার মন, ভয়ে বলে উঠল, "এই তো স্যার স্নাতকোত্তর শেষ করলাম, এখন শিক্ষণীয় ট্রেনিং করছি।"</p>
                    
                    <p>"তা কোন বিষয়ে করছো?"</p>
                    
                    <p>"তা স্যার বাংলাতেই করছি।"</p>
                    
                    <p>বাহ্ ভালো, আমাদের সময়ে তো অনেক কম খরচে হয়ে যেত, তা এখন কত নিচ্ছে?"</p>
                    
                    <p>"তা স্যার এক লক্ষাধিক টাকার বেশি তো হয়েই যাবে।"</p>
                    
                    <p>ওরে বাবা! এতো, তা যাক ভালো, চালিয়ে যাও, খুশির খবর আসলে মিষ্টি খাওয়াতে হবে।"</p>
                    
                    <p>"তা স্যার অবশ্যই।" বলে সাইকেলের প্যাডেলে দিলাম টান। মনের মধ্যে চলছে উথাল-পাথাল। আমি বললাম! কি বেরিয়ে গেলো! আমি যে বর্তমানে একজন শিক্ষণীয় বেকার, আর কিনা, বলে এলাম এই সব মিথ্যা কথা।"</p>
                    
                    <p>"হ্যাঁ ঠিকই, আমি মিথ্যে বলেছি। কাকে? আমাকে যিনি শিখিয়েছেন জীবনের পাঠ তাকে। আমাকে যিনি শিখিয়েছেন সর্বদা সৎ থাকতে, তাকে। যিনি বলেছিলেন শেষ চেষ্টা করা তোমার হবে, তাকে। ছিঃ! ছিঃ! ছিঃ! ধিক্কার আমায়।"</p>
                    
                    <p>মনের মধ্যে চলতে থাকা এই দ্বন্দ্ব নিয়ে বাড়ি ফিরলাম। কোন মুখ নিয়ে দাঁড়াবো আমার শিক্ষার্থীদের সামনে? একজন, মিথ্যুক শিক্ষকের কাছ থেকে তারা কি শিখবে? মিথ্যে! এটা তবে কী! ভুল না কি অপরাধ? আমার হতাশা, চাপ এগুলো এতোই বড়ো যে আমি মিথ্যে বললাম। আমি তো নিজেকে বাঁচিয়েছি, সত্যিই কি তাই? বাঁচিয়েছ নিজেকে? আমার কি শাস্তি হবে?</p>
                    
                    <p>"তোমার! হ্যাঁ! তুমি এই অনুতাপ নিয়েই বাঁচো। ওটাই তোমার শাস্তি, এটাই তুমি।" তবে আমি শান্তি পেলাম, এবার শান্তি। এবার শান্তি। এবার শান্তি।</p>
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

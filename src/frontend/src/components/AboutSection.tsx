import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <div className="prose prose-lg dark:prose-invert mx-auto">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-primary font-bengali">
            আমার ঘুমন্ত ভিলা সম্পর্কে
          </h2>

          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p>
              আমার ঘুমন্ত ভিলা একটি সাহিত্যিক স্থান যেখানে শব্দগুলি বাগানের ফুলের মতো ফুটে ওঠে।
              এটি একটি ব্যক্তিগত সাহিত্যিক অভয়ারণ্য যেখানে জীবন, প্রকৃতি এবং মানুষের আবেগের
              সারমর্ম ধারণ করে কবিতা, গল্প এবং প্রবন্ধ অন্বেষণ করা যায়।
            </p>

            <p>
              এই ওয়েবসাইটটি তৈরি করা হয়েছে বাংলা সাহিত্যের প্রতি ভালোবাসা এবং শব্দের শক্তিতে
              বিশ্বাস থেকে। প্রতিটি কবিতা, প্রতিটি গল্প, এবং প্রতিটি প্রবন্ধ হৃদয় থেকে লেখা
              এবং পাঠকদের সাথে ভাগ করা হয়েছে।
            </p>

            <p>
              আমরা বিশ্বাস করি যে সাহিত্য মানুষকে সংযুক্ত করে, চিন্তাভাবনা জাগায় এবং আত্মাকে স্পর্শ
              করে। এই স্থানটি শুধুমাত্র পড়ার জন্য নয়, বরং অনুভব করার, চিন্তা করার এবং ভাগ করার
              জন্য।
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">
              Our Mission
            </h3>

            <p>
              Our mission is to create a peaceful digital sanctuary where
              Bengali literature can flourish and reach readers around the
              world. We aim to preserve the beauty of the Bengali language while
              making it accessible to everyone who appreciates thoughtful
              writing.
            </p>

            <p>
              Through this platform, we hope to inspire new writers, connect
              with fellow literature enthusiasts, and contribute to the rich
              tradition of Bengali literary arts.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">
              What You'll Find Here
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>কবিতা (Poems):</strong> Verses that capture emotions,
                nature, and life's moments
              </li>
              <li>
                <strong>গল্প (Stories):</strong> Narratives that explore human
                experiences and relationships
              </li>
              <li>
                <strong>প্রবন্ধ (Essays):</strong> Thoughtful reflections on
                various topics and themes
              </li>
            </ul>

            <p className="mt-8 text-center italic text-muted-foreground">
              "শব্দের মাধ্যমে আমরা সংযুক্ত হই, গল্পের মাধ্যমে আমরা বেঁচে থাকি।"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

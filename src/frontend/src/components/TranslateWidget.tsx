import { useEffect } from "react";

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages?: string },
          elementId: string,
        ) => undefined;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function TranslateWidget() {
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "bn",
            includedLanguages: "en,bn,hi",
          },
          "google_translate_element",
        );
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      console.warn("Google Translate failed to load");
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.googleTranslateElementInit = undefined;
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="fixed bottom-4 right-4 z-50 opacity-80 hover:opacity-100 transition-opacity"
    />
  );
}

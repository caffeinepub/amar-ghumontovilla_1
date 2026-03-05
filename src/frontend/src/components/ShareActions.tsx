import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { SiFacebook } from "react-icons/si";

interface ShareActionsProps {
  title: string;
  itemId: string;
  type: string;
}

export default function ShareActions({
  title,
  itemId,
  type,
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${window.location.pathname}#${type}/${itemId}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(whatsappUrl, "_blank")}
        className="gap-2"
      >
        <Share2 size={16} />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(facebookUrl, "_blank")}
        className="gap-2"
      >
        <SiFacebook size={16} />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}

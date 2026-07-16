import { ExternalLink } from "lucide-react";

interface SourceAnchorProps {
  href: string;
  label?: string;
}

export function SourceAnchor({ href, label = "查看来源" }: SourceAnchorProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-md text-sm text-amber-200/80 underline decoration-amber-200/25 underline-offset-4 hover:text-amber-100">
      {label} <ExternalLink size={13} />
    </a>
  );
}

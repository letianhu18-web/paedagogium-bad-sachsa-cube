import { ExternalLink } from "lucide-react";

interface SourceAnchorProps {
  href: string;
  label?: string;
}

export function SourceAnchor({ href, label = "查看来源" }: SourceAnchorProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-md text-sm text-blue-300 underline decoration-blue-400/30 underline-offset-4 hover:text-blue-200">
      {label} <ExternalLink size={13} />
    </a>
  );
}

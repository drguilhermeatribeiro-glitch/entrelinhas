import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { Badge } from "@/components/ui/badge";
import { CONTENT_TYPE_LABELS, subjectName, type ContentType } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

type Props = {
  type: ContentType;
  title: string;
  href: string;
  coverImage?: string | null;
  subject?: string | null;
  excerpt?: string | null;
  publishedAt?: Date | null;
  showType?: boolean;
};

export function ContentCard({
  type,
  title,
  href,
  coverImage,
  subject,
  excerpt,
  publishedAt,
  showType = true,
}: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      <CoverImage
        src={coverImage}
        alt={title}
        className="aspect-[16/10] w-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {showType && (
            <Badge variant="type">{CONTENT_TYPE_LABELS[type]}</Badge>
          )}
          {subject && <Badge variant="subject">{subjectName(subject)}</Badge>}
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        )}
        {publishedAt && (
          <time className="mt-3 text-xs text-muted-foreground">
            {formatDate(publishedAt)}
          </time>
        )}
      </div>
    </Link>
  );
}

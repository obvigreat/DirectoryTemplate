import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  actionHref?: string;
  onActionClick?: () => void;
  backHref?: string;
  backLabel?: string;
}

export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon,
  actionHref,
  onActionClick,
  backHref,
  backLabel,
}: AdminPageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {backHref && (
          <Link href={backHref}>
            <Button variant="outline">{backLabel || "Back"}</Button>
          </Link>
        )}
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button>
              {ActionIcon && <ActionIcon className="w-4 h-4 mr-2" />}
              {actionLabel}
            </Button>
          </Link>
        )}
        {actionLabel && onActionClick && (
          <Button onClick={onActionClick}>
            {ActionIcon && <ActionIcon className="w-4 h-4 mr-2" />}
            {actionLabel}
          </Button>
        )}
      </div>
    </header>
  );
}

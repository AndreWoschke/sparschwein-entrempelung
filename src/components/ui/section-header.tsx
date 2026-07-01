import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id?: string;
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ id, badge, title, description, centered = true, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12",
          centered && "text-center",
          className
        )}
      >
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            {badge}
          </span>
        )}
        <h2 id={id} className="section-title">{title}</h2>
        {description && (
          <p className={cn("section-subtitle", centered && "mx-auto max-w-2xl")}>
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

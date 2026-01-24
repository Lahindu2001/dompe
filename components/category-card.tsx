import React from "react"
import Link from "next/link";
import {
  ShoppingCart,
  Smartphone,
  Shirt,
  Pill,
  UtensilsCrossed,
  Wrench,
  Croissant,
  Scissors,
  Car,
  Gem,
  Briefcase,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Smartphone,
  Shirt,
  Pill,
  UtensilsCrossed,
  Wrench,
  Croissant,
  Scissors,
  Car,
  Gem,
  Briefcase,
  Store,
};

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  count?: number;
  size?: "default" | "small";
}

export function CategoryCard({ id, name, icon, count, size = "default" }: CategoryCardProps) {
  const Icon = iconMap[icon] || Store;
  const isSmall = size === "small";

  return (
    <Link href={`/shops?category=${id}`}>
      <div
        className={cn(
          "group flex flex-col items-center justify-center bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all duration-200",
          isSmall ? "p-4 gap-2" : "p-6 gap-3"
        )}
      >
        <div
          className={cn(
            "rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
            isSmall ? "w-10 h-10" : "w-14 h-14"
          )}
        >
          <Icon className={cn("text-secondary-foreground group-hover:text-primary-foreground", isSmall ? "w-5 h-5" : "w-7 h-7")} />
        </div>
        <div className="text-center">
          <h3
            className={cn(
              "font-medium text-foreground group-hover:text-primary transition-colors",
              isSmall ? "text-sm" : "text-base"
            )}
          >
            {name}
          </h3>
          {count !== undefined && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {count} shops
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

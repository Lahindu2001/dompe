"use client";

import React from "react"

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  defaultValue?: string;
  size?: "default" | "large";
  className?: string;
}

export function SearchBar({ defaultValue = "", size = "default", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shops?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className={`flex items-center bg-card rounded-xl border border-border shadow-sm ${isLarge ? 'p-2' : 'p-1'}`}>
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className={`text-muted-foreground flex-shrink-0 ${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`} />
          <input
            type="text"
            placeholder="Search shops, services, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground ${isLarge ? 'py-3 text-lg' : 'py-2 text-sm'}`}
          />
        </div>
        <Button 
          type="submit" 
          size={isLarge ? "lg" : "default"}
          className={isLarge ? "px-8" : "px-6"}
        >
          Search
        </Button>
      </div>
    </form>
  );
}

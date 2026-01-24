"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ShopCard } from "@/components/shop-card";
import { Button } from "@/components/ui/button";
import { shops, searchShops, getShopsByCategory } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ShopsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name">("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filteredShops = useMemo(() => {
    let results = searchQuery ? searchShops(searchQuery) : getShopsByCategory(selectedCategory);

    // Sort
    switch (sortBy) {
      case "rating":
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        results = [...results].sort((a, b) => b.review_count - a.review_count);
        break;
      case "name":
        results = [...results].sort((a, b) => a.shop_name.localeCompare(b.shop_name));
        break;
    }

    return results;
  }, [searchQuery, selectedCategory, sortBy]);

  const selectedCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || "All Shops";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 
              className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2 text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== "all" ? selectedCategoryName : "All Shops in Dompe"}
            </h1>
            <p className="text-primary-foreground/80 text-center mb-6">
              {filteredShops.length} shop{filteredShops.length !== 1 ? "s" : ""} found
            </p>
            <SearchBar defaultValue={searchQuery} className="max-w-2xl mx-auto" />
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 bg-transparent"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
                {selectedCategory !== "all" && !searchQuery && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="gap-1"
                  >
                    {selectedCategoryName}
                    <X className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    Sort by: {sortBy === "rating" ? "Top Rated" : sortBy === "reviews" ? "Most Reviewed" : "Name"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>Top Rated</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("reviews")}>Most Reviewed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>Name (A-Z)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Category Filter Panel */}
            {showFilters && (
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <h3 className="font-medium text-foreground mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className={selectedCategory !== "all" ? "bg-transparent" : ""}
                  >
                    All
                  </Button>
                  {CATEGORIES.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={selectedCategory !== cat.id ? "bg-transparent" : ""}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Grid */}
            {filteredShops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredShops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No shops found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => { setSelectedCategory("all"); }} className="bg-transparent" variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading shops...</div>
        </main>
        <Footer />
      </div>
    }>
      <ShopsContent />
    </Suspense>
  );
}

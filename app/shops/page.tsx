"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ShopCard } from "@/components/shop-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXZ3yvFSsdAxS85flSNOIpcDG2ON_ddkQ3inbzUxINBNVa54vYYZIKNc16usyXFZXD/exec";

// Google Drive Link එක Direct Image එකක් බවට පත් කරන Function එක
const getDirectDriveLink = (url: string) => {
  if (!url || !url.includes("drive.google.com")) return url;
  const match = url.match(/\/d\/(.+?)\/(view|edit|usp|sharing)/);
  if (match && match[1]) {
    // නියමිත string interpolation (backticks) භාවිතා කර ඇත
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
};

function ShopsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [allShops, setAllShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        // cache: 'no-store' මගින් දත්ත හැමවිටම අලුතින් ගෙන එයි
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getShops`, { cache: 'no-store' });
        const data = await response.json();
        
        const formattedData = data.map((item: any, index: number) => ({
          ...item,
          id: item.registration_no || item.reg_no || `shop-${index}`,
          shop_name: item.shop_name || "Untitled Shop",
          address: item.address || "",
          // Image එක නියමිත පරිදි සකස් කිරීම
          image: getDirectDriveLink(item.image_url || item.image) || "/placeholder-shop.jpg",
          
          // --- REAL RATING & DATA ---
          // Sheet එකේ column names rating සහ review_count ලෙස තිබිය යුතුය
          rating: item.rating ? parseFloat(item.rating) : 0, 
          review_count: item.review_count ? parseInt(item.review_count) : 0,
          
          categories: item.categories ? item.categories.split(",").map((c: string) => c.trim().toLowerCase()) : [],
          services: item.services ? item.services.split(",").map((s: string) => s.trim()) : [],
          phone_number: item.phone || item.phone_number || "",
          whatsapp_number: item.whatsapp || item.whatsapp_number || "",
          reg_no: item.registration_no || item.reg_no
        }));

        setAllShops(formattedData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  const filteredShops = useMemo(() => {
    let results = [...allShops];
    
    // Search කිරීමේදී shop name හෝ services පරීක්ෂා කරයි
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(shop => 
        shop.shop_name.toLowerCase().includes(query) ||
        shop.services.some((s: string) => s.toLowerCase().includes(query))
      );
    }
    
    // Category filter එක (Case insensitive)
    if (selectedCategory !== "all") {
      results = results.filter(shop => 
        shop.categories.includes(selectedCategory.toLowerCase())
      );
    }
    
    // Sort කිරීම (Rating එක අනුව වැඩිම සිට අඩුම දක්වා)
    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      results.sort((a, b) => a.shop_name.localeCompare(b.shop_name));
    }
    
    return results;
  }, [allShops, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-3xl font-bold mb-4">Explore Shops in Dompe</h1>
            <SearchBar defaultValue={searchQuery} className="max-w-2xl mx-auto" />
          </div>
        </section>

        <section className="py-8 max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort: {sortBy === "rating" ? "Top Rated" : "Name"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("rating")}>Top Rated</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-6 p-4 bg-muted rounded-xl transition-all">
              <Button 
                variant={selectedCategory === "all" ? "default" : "outline"} 
                onClick={() => setSelectedCategory("all")}
                className="rounded-full text-xs"
              >
                All Shops
              </Button>
              {CATEGORIES.map(cat => (
                <Button 
                  key={cat.id} 
                  variant={selectedCategory === cat.id ? "default" : "outline"} 
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full text-xs"
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Fetching latest data from Google Sheets...</p>
            </div>
          ) : (
            <>
              {filteredShops.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredShops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl">
                  <p className="text-muted-foreground text-lg">No shops found for your search.</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ShopsPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
      <ShopsContent />
    </Suspense>
  );
}
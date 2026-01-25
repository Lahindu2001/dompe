"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ShopCard } from "@/components/shop-card";
import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Store, Star, Loader2 } from "lucide-react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjB1bla6iTlMdcUGGybN10IaiHq6BPZjLiWblbzgG3bjk2R0WrKg_vw5e0tiYTNICp/exec";

// Google Drive ලින්ක් එක කෙලින්ම පෙනෙන ලින්ක් එකක් බවට පත් කරන Function එක
const getDirectDriveLink = (url: string) => {
  if (!url || !url.includes("drive.google.com")) return url;
  const match = url.match(/\/d\/(.+?)\/(view|edit|usp)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
  }
  return url;
};

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getShops`);
        const data = await response.json();
        
        const formattedData = data.map((item: any, index: number) => ({
          ...item,
          id: item.registration_no || item.id || `shop-${index}`,
          shop_name: item.shop_name || "Unknown Shop",
          
          // මෙතනදී image එකට getDirectDriveLink function එක පාවිච්චි කරනවා
          image: getDirectDriveLink(item.image_url || item.image) || "/placeholder-shop.jpg",

          categories: typeof item.categories === 'string' 
            ? item.categories.split(',').map((c: string) => c.trim().toLowerCase()) 
            : [],
          services: typeof item.services === 'string' 
            ? item.services.split(',').map((s: string) => s.trim()) 
            : [],
          rating: Number(item.rating) || 0,
        }));

        setShops(formattedData);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  const featuredShops = useMemo(() => shops.slice(0, 6), [shops]);
  const topRatedShops = useMemo(() => [...shops].sort((a, b) => b.rating - a.rating).slice(0, 3), [shops]);

  // Calculate average rating from real shop data
  const averageRating = useMemo(() => {
    if (shops.length === 0) return 0;
    const totalRating = shops.reduce((sum, shop) => sum + (shop.rating || 0), 0);
    return (totalRating / shops.length).toFixed(1);
  }, [shops]);

  const categoryCounts = useMemo(() => {
    return CATEGORIES.map(cat => ({
      ...cat,
      count: shops.filter(shop => shop.categories?.includes(cat.id)).length,
    }));
  }, [shops]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative overflow-hidden min-h-[600px] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070')",
              }}
            />
            {/* Dark gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/75" />
            {/* Animated pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 w-full">
            <div className="max-w-3xl">
              {mounted && isAuthenticated && user && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-white/90 text-sm font-medium">
                    Welcome back, <b className="text-white">{user.firstName}</b>! 👋
                  </p>
                </div>
              )}
              
              <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Discover Local Shops in 
                <span className="block text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400 mt-2">
                  Dompe
                </span>
              </h1>
              
              <p className="text-xl text-slate-200 mb-10 leading-relaxed">
                Your complete guide to all businesses in Dompe town. Find the best shops, services, and local businesses near you.
              </p>
              
              <div className="space-y-4">
                <SearchBar size="large" className="max-w-2xl" />
                
                <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    {shops.length}+ Local Shops
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {Number(averageRating) > 0 ? averageRating : "New"} Average Rating
                  </span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Updated Daily
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-primary w-10 h-10" />
            <p className="mt-4 text-muted-foreground">Loading shops from Google Sheets...</p>
          </div>
        ) : (
          <>
            {/* Stats - Modern Card Style */}
            <section className="py-16 -mt-20 relative z-20">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Store className="text-primary w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{shops.length}</div>
                        <p className="text-sm text-muted-foreground font-medium">Local Shops</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <TrendingUp className="text-blue-500 w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{CATEGORIES.length}</div>
                        <p className="text-sm text-muted-foreground font-medium">Categories</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <Star className="text-yellow-500 w-7 h-7 fill-yellow-500" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{Number(averageRating) > 0 ? averageRating : "-"}</div>
                        <p className="text-sm text-muted-foreground font-medium">Avg Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="py-16 max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {categoryCounts.slice(0, 6).map(cat => (
                  <CategoryCard key={cat.id} {...cat} size="small" />
                ))}
              </div>
            </section>

            {/* Featured */}
            <section className="py-16 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Featured Shops</h2>
                  <Link href="/shops"><Button variant="outline">View All</Button></Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredShops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
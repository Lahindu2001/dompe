"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoryCard } from "@/components/category-card";
import { CATEGORIES } from "@/lib/types";
import { Loader2 } from "lucide-react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7oWmvQxuOTB1Ku1e3-POWQMuq9fK9kBNn5rt8LjqMeoFIHHvb_4U2-TzPaOWAIXi_/exec";

export default function CategoriesPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Google Sheet එකෙන් data ලබා ගැනීම
  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getShops`);
        const data = await response.json();
        
        const formattedData = data.map((item: any) => ({
          ...item,
          // category එක string එකක් නම් array එකක් බවට පත් කිරීම
          categories: typeof item.categories === 'string' 
            ? item.categories.split(',').map((c: string) => c.trim().toLowerCase()) 
            : [],
        }));

        setShops(formattedData);
      } catch (error) {
        console.error("Error fetching shops for categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  // 2. Real data පාවිච්චි කරලා එක් එක් category එකේ shop ගණන සෙවීම
  const categoryCounts = useMemo(() => {
    return CATEGORIES.map(cat => ({
      ...cat,
      // shop.categories array එක ඇතුළේ අදාළ category id එක තිබේදැයි බලයි
      count: shops.filter(shop => shop.categories?.includes(cat.id.toLowerCase())).length,
    }));
  }, [shops]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 
              className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Shop Categories
            </h1>
            <p className="text-primary-foreground/80">
              Browse shops by category to find exactly what you need
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="animate-spin text-primary w-10 h-10" />
                <p className="mt-4 text-muted-foreground">Calculating categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {categoryCounts.map((category) => (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    icon={category.icon}
                    count={category.count}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
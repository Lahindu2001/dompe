"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Loader2, MapPin, Star, Phone, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7oWmvQxuOTB1Ku1e3-POWQMuq9fK9kBNn5rt8LjqMeoFIHHvb_4U2-TzPaOWAIXi_/exec";

// Helper function to convert Google Maps URL to embeddable format
const convertToEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  
  // If already an embed URL, return as is
  if (url.includes('/embed')) return url;
  
  // Extract coordinates or place ID from various Google Maps URL formats
  try {
    // Format: https://maps.app.goo.gl/xxxxx or https://goo.gl/maps/xxxxx
    if (url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
      // For shortened URLs, we can't embed directly
      // Return null to show fallback
      return null;
    }
    
    // Format: https://www.google.com/maps/place/...
    if (url.includes('/maps/place/')) {
      const placeMatch = url.match(/place\/([^/]+)/);
      if (placeMatch) {
        const placeName = encodeURIComponent(placeMatch[1]);
        return `https://www.google.com/maps/embed/v1/place?key=&q=${placeName}`;
      }
    }
    
    // Format: https://www.google.com/maps/@latitude,longitude
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const [, lat, lng] = coordMatch;
      return `https://www.google.com/maps/embed/v1/view?key=&center=${lat},${lng}&zoom=15`;
    }
    
    // Format: https://www.google.com/maps?q=latitude,longitude
    const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      const [, lat, lng] = qMatch;
      return `https://www.google.com/maps/embed/v1/view?key=&center=${lat},${lng}&zoom=15`;
    }
  } catch (error) {
    console.error("Error converting map URL:", error);
  }
  
  return null;
};

interface Shop {
  id: string;
  shop_name: string;
  address: string;
  phone: string;
  rating: number;
  map_url?: string;
  google_maps_url?: string;
  map_link?: string;
  categories?: string;
}

export default function MapPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter shops based on search query
  const filteredShops = shops.filter((shop) => {
    const query = searchQuery.toLowerCase();
    return (
      shop.shop_name.toLowerCase().includes(query) ||
      shop.address.toLowerCase().includes(query) ||
      shop.categories?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getShops`);
        const data = await response.json();
        
        // Filter shops that have map URLs
        const shopsWithMaps = data
          .map((item: any) => ({
            id: item.registration_no || item.id,
            shop_name: item.shop_name || "Unknown Shop",
            address: item.address,
            phone: item.phone_number || item.phone,
            rating: Number(item.rating) || 0,
            map_url: item["Google Maps URL"] || item.google_maps_url || item.map_url || item.map_link,
            categories: item.categories,
          }))
          .filter((shop: Shop) => shop.map_url);

        setShops(shopsWithMaps);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin text-primary w-10 h-10 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading shop locations...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Shops in Map
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  Explore {shops.length} local businesses in Dompe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map & Shop List Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shop List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="sticky top-0 bg-slate-50 py-2 z-10 space-y-3">
                  <h2 className="text-xl font-bold">
                    All Shops ({filteredShops.length})
                  </h2>
                  
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search shops, location, category..."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                  {filteredShops.length > 0 ? (
                    filteredShops.map((shop) => (
                  <div
                    key={shop.id}
                    className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer hover:shadow-lg ${
                      selectedShop?.id === shop.id 
                        ? 'border-primary shadow-md' 
                        : 'border-slate-200'
                    }`}
                    onClick={() => setSelectedShop(shop)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {shop.shop_name}
                      </h3>
                      {shop.rating > 0 && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{shop.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        <span className="line-clamp-2">{shop.address}</span>
                      </div>
                      
                      {shop.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span>{shop.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/shops/${shop.id}`}>
                          View Details
                        </Link>
                      </Button>
                      
                      {shop.map_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <a 
                            href={shop.map_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Navigation className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-slate-200">
                    <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-600 font-medium mb-1">No shops found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search terms
                    </p>
                  </div>
                )}
                </div>
              </div>

              {/* Map View */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 sticky top-4">
                  {selectedShop ? (
                    <div className="h-[600px]">
                      <div className="bg-slate-100 p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{selectedShop.shop_name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedShop.address}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedShop(null)}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                      
                      {selectedShop.map_url ? (
                        <div className="h-[calc(100%-80px)] flex flex-col">
                          <div className="flex-1 bg-slate-50 flex items-center justify-center p-8">
                            <div className="text-center max-w-md">
                              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-10 h-10 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold mb-3">View on Google Maps</h3>
                              <p className="text-muted-foreground mb-6">
                                Click the button below to open this location in Google Maps
                              </p>
                              <Button
                                size="lg"
                                className="w-full"
                                asChild
                              >
                                <a
                                  href={selectedShop.map_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2"
                                >
                                  <Navigation className="w-5 h-5" />
                                  Open in Google Maps
                                </a>
                              </Button>
                              <p className="text-xs text-muted-foreground mt-4">
                                Opens in a new tab
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[calc(100%-80px)] text-muted-foreground">
                          <div className="text-center">
                            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Map URL not available for this shop</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-[600px] flex flex-col items-center justify-center text-center p-8">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <MapPin className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Select a Shop</h3>
                      <p className="text-muted-foreground max-w-md mb-6">
                        Click on any shop from the list to view its location on Google Maps
                      </p>
                      <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                        <p className="font-medium mb-2">💡 Quick Tip:</p>
                        <p>You can also click the navigation icon to open the location directly in Google Maps</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

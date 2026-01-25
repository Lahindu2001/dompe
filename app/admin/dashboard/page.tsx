"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/types";
import {
  LayoutDashboard,
  Store,
  Users,
  Star,
  LogOut,
  Settings,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  MapPin,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7oWmvQxuOTB1Ku1e3-POWQMuq9fK9kBNn5rt8LjqMeoFIHHvb_4U2-TzPaOWAIXi_/exec";

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // --- Fetch Shops Logic ---
  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APPS_SCRIPT_URL}?action=getShops`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      
      const formattedData = data.map((item: any, index: number) => ({
        id: item.registration_no || item.reg_no || `shop-${index}`,
        reg_no: item.registration_no || item.reg_no || "",
        shop_name: item.shop_name || "Untitled Shop",
        shop_owner_name: item.shop_owner_name || item.owner_name || "",
        address: item.address || "",
        image: item.image || item.image_url || "/placeholder-shop.jpg",
        rating: item.rating ? Number(item.rating) : 0, 
        review_count: item.review_count ? Number(item.review_count) : 0,
        categories: item.categories ? (typeof item.categories === 'string' ? item.categories.split(",").map((c: string) => c.trim()) : []) : [],
        services: item.services ? (typeof item.services === 'string' ? item.services.split(",").map((s: string) => s.trim()) : []) : [],
        phone_number: item.phone_number || item.phone || "",
        whatsapp_number: item.whatsapp_number || item.whatsapp || "",
        created_at: item.timestamp || item.created_at || new Date().toISOString()
      }));

      setShops(formattedData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // --- Delete Shop Function (FIXED) ---
  const handleDelete = async (regNo: string) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;

    try {
      setIsDeleting(regNo);
      // Apps Script එකේ doGet එක බලන්නේ 'id' parameter එකයි
      const response = await fetch(`${APPS_SCRIPT_URL}?action=deleteShop&id=${regNo}`);
      const result = await response.json();

      if (result.status === "success") {
        setShops(prevShops => prevShops.filter(shop => shop.reg_no !== regNo));
        alert("Shop deleted successfully!");
      } else {
        alert("Error: " + (result.message || "Could not delete shop"));
      }
    } catch (error) {
      alert("Error deleting shop. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  // --- Filtering Logic ---
  const filteredShops = shops.filter((shop) => {
    const matchesSearch = searchQuery === "" || 
      shop.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.shop_owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.reg_no.toString().includes(searchQuery);
    
    const matchesFilter = selectedFilter === "all" || shop.categories.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const totalShops = shops.length;
  const totalReviews = shops.reduce((sum, shop) => sum + (shop.review_count || 0), 0);
  const averageRating = totalShops > 0 
    ? (shops.reduce((sum, shop) => sum + (shop.rating || 0), 0) / totalShops).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">Dompee.lk</span>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              Welcome, <span className="font-semibold text-foreground">{user?.firstName}</span>
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-card border-r border-border h-[calc(100vh-73px)] sticky top-[73px] hidden lg:block">
          <nav className="p-4 space-y-2">
            <Link href="/admin/dashboard"><Button variant="default" className="w-full justify-start"><LayoutDashboard className="w-4 h-4 mr-3" />Dashboard</Button></Link>
            <Link href="/admin/users"><Button variant="ghost" className="w-full justify-start"><Users className="w-4 h-4 mr-3" />Manage Users</Button></Link>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Overview of your platform performance</p>
              </div>
              <Link href="/admin/shops/new">
                <Button><Plus className="w-4 h-4 mr-2" />Add New Shop</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Shops</p>
                    <h3 className="text-3xl font-bold mt-2">{totalShops}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                    <h3 className="text-3xl font-bold mt-2">{totalReviews}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <h3 className="text-3xl font-bold mt-2">{averageRating}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Categories</p>
                    <h3 className="text-3xl font-bold mt-2">{CATEGORIES.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold">All Shops</h2>
                <div className="flex gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search shops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center py-12">
                  <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading shops...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold">Shop Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">Owner</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">Rating</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredShops.map((shop) => (
                        <tr key={shop.id} className={`border-b border-border hover:bg-muted/50 ${isDeleting === shop.reg_no ? 'opacity-50 pointer-events-none' : ''}`}>
                          <td className="py-3 px-4">
                            <div className="font-medium">{shop.shop_name}</div>
                            <div className="text-sm text-muted-foreground">{shop.reg_no}</div>
                          </td>
                          <td className="py-3 px-4 text-sm">{shop.shop_owner_name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{shop.rating}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3" /> Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/shops/${shop.reg_no}`)}>
                                  <Eye className="w-4 h-4 mr-2" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/admin/shops/edit/${shop.reg_no}`)}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive" 
                                  onClick={() => handleDelete(shop.reg_no)}
                                  disabled={isDeleting === shop.reg_no}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> 
                                  {isDeleting === shop.reg_no ? "Deleting..." : "Delete"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
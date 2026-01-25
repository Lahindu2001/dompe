"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/lib/types";
import { MapPin, ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, Plus, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// OYAGE NEW DEPLOYMENT URL EKA METHANATA DANNA
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7oWmvQxuOTB1Ku1e3-POWQMuq9fK9kBNn5rt8LjqMeoFIHHvb_4U2-TzPaOWAIXi_/exec";

export default function NewShopPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <NewShopContent />
    </ProtectedRoute>
  );
}

function NewShopContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastRegNo, setLastRegNo] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ""
  });

  const [formData, setFormData] = useState({
    shop_name: "",
    shop_owner_name: "",
    phone_number: "",
    whatsapp_number: "",
    address: "",
    google_maps_url: "",
    youtube_link: "",
    image: "",
    categories: [] as string[],
    services: [] as string[],
  });

  const [currentService, setCurrentService] = useState("");

  const handleAddService = () => {
    if (currentService.trim() && !formData.services.includes(currentService.trim())) {
      setFormData({ ...formData, services: [...formData.services, currentService.trim()] });
      setCurrentService("");
    }
  };

  const handleCategoryToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(id) 
        ? prev.categories.filter(c => c !== id) 
        : [...prev.categories, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    if (formData.categories.length === 0 || formData.services.length === 0) {
      setStatus({ type: 'error', message: "Please select at least one category and one service." });
      setIsLoading(false);
      return;
    }

    try {
      const regNo = `DMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setLastRegNo(regNo);
      
      const payload = { 
      ...formData, 
      reg_no: regNo,
      categories: formData.categories.join(", "), // Convert array to string
      services: formData.services.join(", ")      // Convert array to string
      };

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Show professional modal
      setShowSuccessModal(true);
    } catch (error) {
      setStatus({ type: 'error', message: "Failed to connect. Please check your internet." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Shop Added Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              The shop has been registered with ID: <span className="font-mono font-bold text-foreground">{lastRegNo}</span>
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push('/admin/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
                Add Another Shop
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white"><MapPin className="w-5 h-5" /></div>
            <span className="font-bold tracking-tight text-xl">Dompee<span className="text-primary">.lk</span></span>
          </div>
        </div>
      </header>

      <main className="py-10 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Register New Shop</h1>
          <p className="text-muted-foreground mt-2 text-lg">Enter the shop details accurately for the public directory.</p>
        </div>

        {status.type === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" /> {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Details */}
          <Card className="p-6 shadow-sm border-slate-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              General Information
            </h2>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Shop Name</Label>
                  <Input placeholder="e.g. Dompe Fashion" value={formData.shop_name} onChange={e => setFormData({...formData, shop_name: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Owner's Name</Label>
                  <Input placeholder="e.g. Mr. Sunil Perera" value={formData.shop_owner_name} onChange={e => setFormData({...formData, shop_owner_name: e.target.value})} required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="071 234 5678" value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp Number</Label>
                  <Input type="tel" placeholder="071 234 5678" value={formData.whatsapp_number} onChange={e => setFormData({...formData, whatsapp_number: e.target.value})} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Business Address</Label>
                <Textarea placeholder="Full address in Dompe..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
              </div>
            </div>
          </Card>

          {/* Section 2: Categories & Services */}
          <Card className="p-6 shadow-sm border-slate-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Categories & Services
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-base">Select Business Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.id)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all ${
                        formData.categories.includes(cat.id) 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : 'bg-white hover:border-primary'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="text-base">Services / Products Offered</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentService} 
                    onChange={e => setCurrentService(e.target.value)}
                    placeholder="e.g. Printing, Photocopy, Stationary..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                  />
                  <Button type="button" onClick={handleAddService} variant="secondary">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map(s => (
                    <div key={s} className="bg-slate-100 dark:bg-slate-800 pl-3 pr-1 py-1 rounded-md flex items-center text-sm font-medium">
                      {s}
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 hover:text-red-500" onClick={() => setFormData({...formData, services: formData.services.filter(x => x !== s)})}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Media */}
          <Card className="p-6 shadow-sm border-slate-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Media & Location
            </h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label>Google Maps Location URL</Label>
                <Input type="url" placeholder="https://goo.gl/maps/..." value={formData.google_maps_url} onChange={e => setFormData({...formData, google_maps_url: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Shop Cover Image URL</Label>
                <Input type="url" placeholder="Paste image link here..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>YouTube Video Link (Optional)</Label>
                <Input type="url" placeholder="Promotional video link..." value={formData.youtube_link} onChange={e => setFormData({...formData, youtube_link: e.target.value})} />
              </div>
            </div>
          </Card>

          <div className="sticky bottom-6 flex justify-end">
            <Button type="submit"  disabled={isLoading} className="px-12 py-6 text-lg rounded-xl shadow-xl hover:scale-105 transition-transform">
              {isLoading ? (
                <><Loader2 className="animate-spin mr-2" /> Processing...</>
              ) : (
                <><Save className="mr-2" /> Register Shop Now</>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
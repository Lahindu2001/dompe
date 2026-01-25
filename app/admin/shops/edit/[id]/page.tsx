"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/lib/types";
import { 
  Loader2, ArrowLeft, Save, X, 
  CheckCircle, AlertCircle 
} from "lucide-react";
import Link from "next/link";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDkkhET3S0myq1QVCXDrRj0V3NARoxT3Ku1lv85YFC3hZASw1NIWzT53oIHLLr6SoX/exec";

export default function EditShopPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <EditShopContent />
    </ProtectedRoute>
  );
}

function EditShopContent() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentService, setCurrentService] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ""
  });

  const [formData, setFormData] = useState({
    reg_no: "",
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

  const parseToArray = useCallback((val: any) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim() !== "") {
      return val.split(",").map(i => i.trim()).filter(i => i !== "");
    }
    return [];
  }, []);

  useEffect(() => {
    async function loadShop() {
      try {
        const res = await fetch(`${APPS_SCRIPT_URL}?action=getShopById&id=${id}`);
        const data = await res.json();
        
        if (data.error) throw new Error("Shop not found");

        setFormData({
          reg_no: data.registration_no || data.reg_no || id,
          shop_name: data.shop_name || "",
          shop_owner_name: data.shop_owner_name || data.owner_name || "",
          phone_number: data.phone_number || data.phone || "",
          whatsapp_number: data.whatsapp_number || data.whatsapp || "",
          address: data.address || "",
          google_maps_url: data.google_maps_url || "",
          image: data.image || data.image_url || "",
          youtube_link: data.youtube_link || "",
          categories: parseToArray(data.categories),
          services: parseToArray(data.services)
        });
      } catch (err) {
        setStatus({ type: 'error', message: "Failed to fetch shop data." });
      } finally {
        setLoading(false);
      }
    }
    loadShop();
  }, [id, parseToArray]);

  const handleCategoryToggle = (catId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(catId) 
        ? prev.categories.filter(c => c !== catId) 
        : [...prev.categories, catId]
    }));
  };

  const handleAddService = () => {
    if (currentService.trim() && !formData.services.includes(currentService.trim())) {
      setFormData({ ...formData, services: [...formData.services, currentService.trim()] });
      setCurrentService("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
       const payload = { 
      ...formData, 
      reg_no: formData.reg_no,
      categories: formData.categories.join(", "), // Convert array to string
      services: formData.services.join(", ")      // Convert array to string
};

      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "updateShop", data: payload }),
      });
      
      const result = await res.json();
      if (result.status === "success") {
        setStatus({ type: 'success', message: "Shop updated successfully!" });
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: "Update failed. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin w-12 h-12 text-primary" />
      <p className="text-muted-foreground">Fetching shop details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
          <div className="flex items-center gap-2 font-bold text-xl">
              Dompee<span className="text-primary">.lk</span> Admin
          </div>
        </div>
      </header>

      <main className="py-10 px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">Edit Shop Details</h1>
            <p className="text-muted-foreground">Update information for {formData.shop_name}</p>
          </div>
          <div className="bg-white border p-2 rounded text-xs font-mono">Reg ID: {formData.reg_no}</div>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
            status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* basic info */}
          <Card className="p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Shop Name</Label>
                <Input value={formData.shop_name} onChange={e => setFormData({...formData, shop_name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Owner Name</Label>
                <Input value={formData.shop_owner_name} onChange={e => setFormData({...formData, shop_owner_name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input value={formData.whatsapp_number} onChange={e => setFormData({...formData, whatsapp_number: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
            </div>
          </Card>

          {/* Categories & Services */}
          <Card className="p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold border-b pb-2">Categories & Services</h2>
            <div className="space-y-4">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryToggle(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs border transition-all ${
                      formData.categories.includes(cat.id) ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-600 hover:border-primary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Label>Offered Services (Press Enter to add)</Label>
              <div className="flex gap-2">
                <Input 
                  value={currentService} 
                  onChange={e => setCurrentService(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                  placeholder="e.g. Delivery, Warranty..."
                />
                <Button type="button" onClick={handleAddService} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.services.map(s => (
                  <div key={s} className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-md flex items-center text-sm font-medium">
                    {s}
                    <X className="w-3 h-3 ml-2 cursor-pointer text-slate-500 hover:text-red-500" onClick={() => setFormData({...formData, services: formData.services.filter(x => x !== s)})} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Media links */}
          <Card className="p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold border-b pb-2">Location & Media Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Google Maps URL</Label>
                <Input type="url" value={formData.google_maps_url} onChange={e => setFormData({...formData, google_maps_url: e.target.value})} placeholder="https://maps.google.com/..." required />
              </div>
              <div className="space-y-2">
                <Label>Main Image URL</Label>
                <Input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://image-link.com/..." required />
              </div>
              <div className="space-y-2">
                <Label>YouTube Link (Optional)</Label>
                <Input type="url" value={formData.youtube_link} onChange={e => setFormData({...formData, youtube_link: e.target.value})} placeholder="https://youtube.com/..." />
              </div>
            </div>
          </Card>

          <div className="sticky bottom-6 flex gap-4">
            <Button type="submit" disabled={saving} className="flex-1 py-7 text-xl font-bold shadow-lg">
              {saving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} Update Shop Details
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
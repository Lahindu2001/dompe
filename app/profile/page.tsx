"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Save, Shield, Loader2, Lock, RefreshCcw, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmNG5S0M9FTA-i6RX4qA6K4WI-dv2-KSvOrgZzyWna1ePuXNZ3w4_FF7peozzOe3Gu4A/exec";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, checkAuth, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPass, setShowPass] = useState(false); 
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleProfileSave = async () => {
    setIsLoading(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        body: JSON.stringify({
          action: "updateProfile",
          email: formData.email, 
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      // Optimistic update for the header
      if (setUser && user) {
        const updatedUser = { 
          ...user, 
          firstName: formData.firstName, 
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address 
        };
        setUser(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (checkAuth) await checkAuth(); 

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Error saving profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      // Send password update request via GET (more reliable with Apps Script)
      const response = await fetch(
        `${APPS_SCRIPT_URL}?action=updatePassword&email=${encodeURIComponent(user?.email || '')}&currentPassword=${encodeURIComponent(passwordData.currentPassword)}&newPassword=${encodeURIComponent(passwordData.newPassword)}`
      );
      
      const result = await response.json();
      
      if (result.status === "success") {
        alert("Password updated successfully! Please use your new password on next login.");
        
        // Reset only the password UI state
        setShowPasswordFields(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert(result.message || "Failed to update password. Please check your current password.");
      }
      
    } catch (error) {
      console.error("Password error:", error);
      alert("Failed to update password. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <Card className="p-6 border-none shadow-sm bg-white dark:bg-slate-900">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-inner">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                  {user.firstName} {user.lastName}
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                </h1>
                <p className="text-slate-500 text-sm">{user.email}</p>
                <div className="mt-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold rounded border border-green-200 dark:border-green-800 uppercase tracking-tighter">
                  {user.role || "Member"}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => checkAuth()} disabled={isLoading}>
                  <RefreshCcw size={14} className={isLoading ? "animate-spin" : ""} />
                </Button>
                <Button 
                  size="sm" 
                  variant={isEditing ? "destructive" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border-none shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <User size={18} className="text-primary" /> Personal Details
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-slate-500">First Name</Label>
                    <Input 
                      value={formData.firstName} 
                      disabled={!isEditing} 
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-800 border-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-slate-500">Last Name</Label>
                    <Input 
                      value={formData.lastName} 
                      disabled={!isEditing} 
                      onChange={e => setFormData({...formData, lastName: e.target.value})} 
                      className="bg-slate-50 dark:bg-slate-800 border-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase text-slate-500">Phone Number</Label>
                  <Input 
                    value={formData.phone} 
                    disabled={!isEditing} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    className="bg-slate-50 dark:bg-slate-800 border-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase text-slate-500">Home Address</Label>
                  <Textarea 
                    value={formData.address} 
                    disabled={!isEditing} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                    className="bg-slate-50 dark:bg-slate-800 border-none min-h-[100px]"
                  />
                </div>
                {isEditing && (
                  <Button onClick={handleProfileSave} className="w-full h-11 font-bold shadow-lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 w-4 h-4" />}
                    Save Changes
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-slate-900 border-none shadow-sm h-fit">
              <h2 className="font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Shield size={18} className="text-primary" /> Security
              </h2>
              {!showPasswordFields ? (
                <Button variant="outline" className="w-full border-dashed" onClick={() => setShowPasswordFields(true)}>
                  <Lock className="mr-2 w-4 h-4" /> Change Password
                </Button>
              ) : (
                <form onSubmit={handlePasswordUpdate} className="space-y-3">
                  <div className="relative">
                    <Input 
                      type={showPass ? "text" : "password"} 
                      placeholder="Current Password" 
                      required 
                      value={passwordData.currentPassword}
                      onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-800 border-none pr-10"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-slate-400">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <Input 
                    type="password" 
                    placeholder="New Password" 
                    required 
                    value={passwordData.newPassword}
                    onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="bg-slate-50 dark:bg-slate-800 border-none"
                  />
                  <Input 
                    type="password" 
                    placeholder="Confirm New Password" 
                    required 
                    value={passwordData.confirmPassword}
                    onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="bg-slate-50 dark:bg-slate-800 border-none"
                  />
                  <div className="flex flex-col gap-2 pt-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Update Password"}
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowPasswordFields(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
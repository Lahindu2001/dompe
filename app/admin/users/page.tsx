"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, LogOut, Search, MoreVertical, Edit, Trash2, LayoutDashboard, Users, Loader2, Save, Shield } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoARP9pUjvENIrxBntjhjXRm0-HnCmD7RiHC6WRb1gbjHuKy-lXYEWeNoYvSsq4memMA/exec";

export default function ManageUsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersContent />
    </ProtectedRoute>
  );
}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  role: string;
  created_at?: string;
}

function UsersContent() {
  const { user: currentUser, logout } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    role: "customer",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APPS_SCRIPT_URL}?action=getUsers`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      address: user.address || "",
      role: user.role,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setIsSaving(true);
    try {
      // Note: We use 'no-cors' for Apps Script POST if we don't need the return body, 
      // but for better reliability, we handle it as follows:
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        body: JSON.stringify({
          action: "updateUser",
          email: editingUser.email,
          ...editForm
        }),
      });
      
      // Since no-cors doesn't return result, we assume success after a delay and refresh
      setTimeout(() => {
        setIsEditDialogOpen(false);
        fetchUsers();
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      alert("Failed to update");
      setIsSaving(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (email === currentUser?.email) return alert("You cannot delete yourself!");
    if (!confirm("Are you sure?")) return;

    setIsDeleting(email);
    try {
      const resp = await fetch(`${APPS_SCRIPT_URL}?action=deleteUser&email=${encodeURIComponent(email)}`);
      const res = await resp.json();
      if (res.status === "success") {
        setUsers(users.filter(u => u.email !== email));
      }
    } catch (e) {
      alert("Delete failed");
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl">
           <MapPin className="text-primary" /> Dompee Admin
        </div>
        <Button variant="ghost" onClick={logout}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r p-4 hidden lg:block space-y-2">
          <Link href="/admin/dashboard"><Button variant="ghost" className="w-full justify-start"><LayoutDashboard className="mr-2 h-4 w-4"/> Dashboard</Button></Link>
          <Link href="/admin/users"><Button variant="default" className="w-full justify-start"><Users className="mr-2 h-4 w-4"/> Users</Button></Link>
        </aside>

        <main className="flex-1 p-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">User Management</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search email..." 
                  className="pl-9 w-64" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.email} className={`border-t hover:bg-muted/50 ${isDeleting === u.email ? "opacity-30" : ""}`}>
                        <td className="p-3">{u.firstName} {u.lastName}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold capitalize">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4"/></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(u)}><Edit className="w-4 h-4 mr-2"/> Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(u.email)}><Trash2 className="w-4 h-4 mr-2"/> Delete</DropdownMenuItem>
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
        </main>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit User: {editingUser?.email}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><Label>First Name</Label><Input value={editForm.firstName} onChange={e => setEditForm({...editForm, firstName: e.target.value})} /></div>
              <div className="space-y-1"><Label>Last Name</Label><Input value={editForm.lastName} onChange={e => setEditForm({...editForm, lastName: e.target.value})} /></div>
            </div>
            <div className="space-y-1"><Label>Role</Label>
              <select className="w-full border p-2 rounded" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
                <option value="customer">Customer</option>
                <option value="shop_owner">Shop Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit} disabled={isSaving}>{isSaving ? <Loader2 className="animate-spin"/> : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
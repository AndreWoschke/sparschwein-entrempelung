import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Trash2, KeyRound, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  lastSignIn: string | null;
}

export default function TeamManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [resetTarget, setResetTarget] = useState<TeamMember | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // Add form state
  const [addForm, setAddForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "mitarbeiter" as string,
  });
  const [addLoading, setAddLoading] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase.functions.invoke("manage-users", {
      body: { action: "list" },
    });

    if (data?.users) {
      // Get profiles and roles
      const [profilesRes, rolesRes] = await Promise.all([
        supabase.from("profiles").select("user_id, first_name, last_name"),
        supabase.from("user_roles").select("user_id, role"),
      ]);

      const profiles = profilesRes.data || [];
      const roles = rolesRes.data || [];

      const mapped: TeamMember[] = data.users.map((u: any) => {
        const p = profiles.find((pr: any) => pr.user_id === u.id);
        const r = roles.find((ro: any) => ro.user_id === u.id);
        return {
          id: u.id,
          email: u.email,
          firstName: p?.first_name || "",
          lastName: p?.last_name || "",
          role: r?.role || "mitarbeiter",
          lastSignIn: u.last_sign_in_at,
        };
      });
      setMembers(mapped);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchMembers();
  }, [isAdmin]);

  const handleAdd = async () => {
    setAddLoading(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: {
        action: "create",
        email: addForm.email,
        password: addForm.password,
        firstName: addForm.firstName,
        lastName: addForm.lastName,
        role: addForm.role,
      },
    });

    if (data?.error) {
      toast({ title: "Fehler", description: data.error, variant: "destructive" });
    } else {
      toast({ title: "✅ Mitarbeiter angelegt" });
      setShowAdd(false);
      setAddForm({ firstName: "", lastName: "", email: "", password: "", role: "mitarbeiter" });
      fetchMembers();
    }
    setAddLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { data } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete", userId: deleteTarget.id },
    });
    if (data?.error) {
      toast({ title: "Fehler", description: data.error, variant: "destructive" });
    } else {
      toast({ title: "✅ Mitarbeiter gelöscht" });
      fetchMembers();
    }
    setDeleteTarget(null);
  };

  const handleResetPassword = async () => {
    if (!resetTarget || !newPassword) return;
    const { data } = await supabase.functions.invoke("manage-users", {
      body: { action: "reset-password", userId: resetTarget.id, newPassword },
    });
    if (data?.error) {
      toast({ title: "Fehler", description: data.error, variant: "destructive" });
    } else {
      toast({ title: "✅ Passwort zurückgesetzt" });
    }
    setResetTarget(null);
    setNewPassword("");
  };

  if (!isAdmin) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Kein Zugriff – nur für Admins.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/einstellungen")}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
        </Button>
        <h1 className="text-xl font-bold">
          <Users className="mr-1 inline h-5 w-5" /> Team verwalten
        </h1>
        <Badge variant="secondary" className="ml-auto">{members.length}/5</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <Card key={m.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">
                    {m.firstName} {m.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{m.email}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant={m.role === "admin" ? "default" : "secondary"}>
                      {m.role === "admin" ? "Admin" : "Mitarbeiter"}
                    </Badge>
                    {m.lastSignIn && (
                      <span className="text-xs text-muted-foreground">
                        Letzter Login: {new Date(m.lastSignIn).toLocaleDateString("de-DE")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setResetTarget(m)}>
                    <KeyRound className="mr-1 h-3.5 w-3.5" /> Passwort
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(m)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button onClick={() => setShowAdd(true)} disabled={members.length >= 5}>
        <Plus className="mr-1 h-4 w-4" /> Mitarbeiter hinzufügen
      </Button>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neuen Mitarbeiter anlegen</DialogTitle>
            <DialogDescription>Erstelle einen neuen Zugang für dein Team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Vorname</Label>
                <Input value={addForm.firstName} onChange={(e) => setAddForm((p) => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div>
                <Label>Nachname</Label>
                <Input value={addForm.lastName} onChange={(e) => setAddForm((p) => ({ ...p, lastName: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>E-Mail</Label>
              <Input type="email" value={addForm.email} onChange={(e) => setAddForm((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <Label>Passwort</Label>
              <Input type="password" value={addForm.password} onChange={(e) => setAddForm((p) => ({ ...p, password: e.target.value }))} />
            </div>
            <div>
              <Label>Rolle</Label>
              <Select value={addForm.role} onValueChange={(v) => setAddForm((p) => ({ ...p, role: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mitarbeiter">Mitarbeiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAdd}
              disabled={addLoading || !addForm.firstName || !addForm.email || !addForm.password}
            >
              {addLoading ? "Wird angelegt..." : "Anlegen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mitarbeiter löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.firstName} {deleteTarget?.lastName} ({deleteTarget?.email}) wird unwiderruflich gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Password Dialog */}
      <Dialog open={!!resetTarget} onOpenChange={() => { setResetTarget(null); setNewPassword(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Passwort zurücksetzen</DialogTitle>
            <DialogDescription>
              Neues Passwort für {resetTarget?.firstName} {resetTarget?.lastName} setzen.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label>Neues Passwort</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mindestens 6 Zeichen"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleResetPassword} disabled={newPassword.length < 6}>
              Passwort setzen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

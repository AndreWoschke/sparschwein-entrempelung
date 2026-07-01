import { Card, CardContent } from "@/components/ui/card";
import { FileText, History, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🐷 Sparschwein Entrümpelung</h1>
        <p className="text-muted-foreground">Admin-Bereich – Angebote erstellen & verwalten</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/admin/angebot">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Neues Angebot</p>
                <p className="text-xs text-muted-foreground">Angebot erstellen</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/verlauf">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Angebotsverlauf</p>
                <p className="text-xs text-muted-foreground">Alle Angebote</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/einstellungen">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Einstellungen</p>
                <p className="text-xs text-muted-foreground">Firma & AGB</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

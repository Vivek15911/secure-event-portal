import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Calendar, MapPin, Users } from "lucide-react";

interface Ticket {
  id: string;
  ticket_number: string;
  qr_code: string;
  created_at: string;
  expires_at: string;
  bookings: {
    booking_type: string;
    booking_date: string;
    booking_details: any;
    status: string;
  };
}

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      fetchTickets();
    }
  }, [session]);

  const fetchTickets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tickets")
      .select(`
        *,
        bookings (
          booking_type,
          booking_date,
          booking_details,
          status
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTickets(data as any);
    }
    setLoading(false);
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar user={session.user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
          <p className="text-muted-foreground">View and manage all your bookings</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No tickets found</p>
              <button
                onClick={() => navigate("/home")}
                className="text-primary hover:underline"
              >
                Make your first booking
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="shadow-medium hover:shadow-strong transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg capitalize">
                      {ticket.bookings.booking_type}
                    </CardTitle>
                    <Badge
                      variant={ticket.bookings.status === "confirmed" ? "default" : "secondary"}
                    >
                      {ticket.bookings.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    <QRCodeSVG value={ticket.qr_code} size={200} level="H" />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <QrCode className="h-4 w-4" />
                      <span className="font-mono">{ticket.ticket_number}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(ticket.bookings.booking_date), "PPP")}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{ticket.bookings.booking_details.city}, {ticket.bookings.booking_details.state}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{ticket.bookings.booking_details.numberOfPeople} {ticket.bookings.booking_details.numberOfPeople === "1" ? "person" : "people"}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t text-xs text-muted-foreground">
                    Expires: {format(new Date(ticket.expires_at), "PPP")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;

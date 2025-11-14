import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

const TicketVerificationPage = () => {
  const { ticketNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyTicket = async () => {
      if (!ticketNumber) {
        setError("No ticket number provided");
        setLoading(false);
        return;
      }

      try {
        const { data: ticket, error: ticketError } = await supabase
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
          .eq("ticket_number", ticketNumber)
          .single();

        if (ticketError || !ticket) {
          setError("Invalid ticket or ticket not found");
          setLoading(false);
          return;
        }

        const now = new Date();
        const expiresAt = new Date(ticket.expires_at);
        
        if (now > expiresAt) {
          setError("This ticket has expired");
        }

        setTicketData(ticket);
      } catch (err) {
        setError("Failed to verify ticket");
      } finally {
        setLoading(false);
      }
    };

    verifyTicket();
  }, [ticketNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Verifying ticket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar user={null} />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {error ? (
                <>
                  <XCircle className="h-6 w-6 text-destructive" />
                  Ticket Verification Failed
                </>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Valid Ticket
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : ticketData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Number</p>
                    <p className="font-semibold">{ticketData.ticket_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold capitalize">{ticketData.bookings.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold capitalize">{ticketData.bookings.booking_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Date</p>
                    <p className="font-semibold">
                      {format(new Date(ticketData.bookings.booking_date), "PPP")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expires At</p>
                    <p className="font-semibold">
                      {format(new Date(ticketData.expires_at), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Booking Details</p>
                  <div className="space-y-2">
                    {Object.entries(ticketData.bookings.booking_details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-sm font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TicketVerificationPage;

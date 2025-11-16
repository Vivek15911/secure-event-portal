import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import { LibraryBookingForm } from "@/components/booking/LibraryBookingForm";
import { SportsBookingForm } from "@/components/booking/SportsBookingForm";
import { MuseumBookingForm } from "@/components/booking/MuseumBookingForm";
import { ParkBookingForm } from "@/components/booking/ParkBookingForm";
import { TheaterBookingForm } from "@/components/booking/TheaterBookingForm";
import { RoomBookingForm } from "@/components/booking/RoomBookingForm";

const BookingPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (bookingData: any) => {
    setLoading(true);

    try {
      console.log("Starting booking process with data:", bookingData);
      
      const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const qrCodeData = `${window.location.origin}/verify/${ticketNumber}`;

      console.log("Creating booking...");
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: session?.user.id,
          booking_type: type,
          booking_date: bookingData.bookingDate,
          booking_details: bookingData,
        } as any)
        .select()
        .single();

      if (bookingError) {
        console.error("Booking creation error:", bookingError);
        throw bookingError;
      }

      console.log("Booking created successfully:", booking);

      const expiresAt = new Date(bookingData.bookingDate);
      expiresAt.setDate(expiresAt.getDate() + 1);
      expiresAt.setHours(0, 0, 0, 0);

      console.log("Creating ticket...");
      const { error: ticketError } = await supabase.from("tickets").insert({
        booking_id: booking.id,
        ticket_number: ticketNumber,
        qr_code: qrCodeData,
        expires_at: expiresAt.toISOString(),
      });

      if (ticketError) {
        console.error("Ticket creation error:", ticketError);
        throw ticketError;
      }

      console.log("Ticket created successfully");

      toast({
        title: "Booking Successful!",
        description: "Your ticket has been generated. Check your dashboard.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Booking submission error:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "An unknown error occurred. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar user={session.user} />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/create-ticket")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Create Ticket
        </Button>

        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle className="text-2xl capitalize">Book {type}</CardTitle>
            <CardDescription>Fill in the details to complete your booking</CardDescription>
          </CardHeader>
          <CardContent>
            {type === "library" && <LibraryBookingForm onSubmit={handleSubmit} loading={loading} />}
            {type === "sports" && <SportsBookingForm onSubmit={handleSubmit} loading={loading} />}
            {type === "museum" && <MuseumBookingForm onSubmit={handleSubmit} loading={loading} />}
            {type === "park" && <ParkBookingForm onSubmit={handleSubmit} loading={loading} />}
            {type === "theater" && <TheaterBookingForm onSubmit={handleSubmit} loading={loading} />}
            {type === "room" && <RoomBookingForm onSubmit={handleSubmit} loading={loading} />}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BookingPage;

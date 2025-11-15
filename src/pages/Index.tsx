import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { BookingCard } from "@/components/booking/BookingCard";
import { BookOpen, Trophy, Building2, Trees, Drama, Home } from "lucide-react";
import { Session } from "@supabase/supabase-js";

const bookingTypes = [
  {
    title: "Library",
    description: "Book reading rooms and study spaces",
    icon: BookOpen,
    type: "library",
    gradient: "bg-gradient-primary",
  },
  {
    title: "Sports",
    description: "Reserve sports facilities and courts",
    icon: Trophy,
    type: "sports",
    gradient: "bg-gradient-secondary",
  },
  {
    title: "Museum",
    description: "Get tickets for exhibitions and tours",
    icon: Building2,
    type: "museum",
    gradient: "bg-gradient-primary",
  },
  {
    title: "Park",
    description: "Book picnic spots and recreational areas",
    icon: Trees,
    type: "park",
    gradient: "bg-gradient-secondary",
  },
  {
    title: "Theater",
    description: "Reserve seats for shows and performances",
    icon: Drama,
    type: "theater",
    gradient: "bg-gradient-primary",
  },
  {
    title: "Room",
    description: "Book conference and meeting rooms",
    icon: Home,
    type: "room",
    gradient: "bg-gradient-secondary",
  },
];

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
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
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar user={session.user} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Secure Ticket Booking Platform
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book tickets for libraries, sports facilities, museums, parks, theaters, and rooms
            across India with our secure and reliable platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {bookingTypes.map((booking) => (
            <BookingCard key={booking.type} {...booking} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;

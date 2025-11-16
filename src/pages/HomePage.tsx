import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { Session } from "@supabase/supabase-js";

const HomePage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/");
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
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium mb-4 animate-fade-in">
            <Shield className="h-4 w-4 text-primary animate-pulse" />
            <span>Trusted by thousands across India</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            Book Tickets
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Securely & Instantly
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            India&apos;s most secure and fastest ticket booking platform. Book for libraries, 
            sports facilities, museums, parks, theaters, and rooms in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            <Link to="/create-ticket">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 hover-scale text-lg px-8 h-12 transition-all">
                Start Booking Now
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

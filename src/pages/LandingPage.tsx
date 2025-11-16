import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Zap, CheckCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b bg-card shadow-soft sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SecureBook
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span>Trusted by thousands across India</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Book Tickets
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Securely & Instantly
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            India&apos;s most secure and fastest ticket booking platform. Book for libraries, 
            sports facilities, museums, parks, theaters, and rooms in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 h-12">
                Start Booking Now
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span>No credit card required</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Instant Tickets</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

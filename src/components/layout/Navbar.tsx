import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Ticket, Home, User } from "lucide-react";

interface NavbarProps {
  user: any;
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="border-b bg-card shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SecureBook
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Ticket className="h-4 w-4" />
                  My Bookings
                </Button>
              </Link>
              <Link to="/create-ticket">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Ticket className="h-4 w-4" />
                  Create Ticket
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  My Account
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="bg-gradient-primary">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

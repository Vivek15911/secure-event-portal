import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: string;
  gradient: string;
}

export const BookingCard = ({ title, description, icon: Icon, type, gradient }: BookingCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer overflow-hidden">
      <div className={`h-2 ${gradient}`} />
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-2xl ${gradient} group-hover:scale-110 transition-transform`}>
            <Icon className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button
            onClick={() => navigate(`/book/${type}`)}
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

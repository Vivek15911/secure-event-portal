import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const theatersByState: Record<string, string[]> = {
  "Delhi": ["PVR Saket", "INOX Nehru Place", "Cinepolis DLF Place", "DT Cinemas Vasant Kunj"],
  "Maharashtra": ["PVR Phoenix Mumbai", "INOX Nariman Point", "Cinepolis Viviana Mall", "Carnival Cinema Pune"],
  "Karnataka": ["PVR Forum Mall", "INOX Garuda Mall", "Cinepolis Royal Meenakshi", "Gopalan Cinemas"],
  "Tamil Nadu": ["PVR Grand Mall", "INOX Express Avenue", "Sathyam Cinemas", "AGS Cinemas"],
  "West Bengal": ["INOX South City", "PVR Diamond Plaza", "Cinepolis Acropolis", "Priya Cinema"],
  "Kerala": ["PVR Lulu Mall", "Cinepolis Centre Square", "INOX Oberon Mall", "Kairali Sree"],
  "Gujarat": ["PVR Acropolis", "INOX Ahmedabad One", "Cinepolis Alpha One", "Rajhans Cinemas"],
  "Rajasthan": ["PVR Pink Square", "INOX Crystal Palm", "Cinepolis World Trade Park", "Raj Mandir Cinema"],
  "Uttar Pradesh": ["PVR Sahara Ganj", "INOX Riverside Mall", "Cinepolis Fun Republic", "Wave Cinemas"],
  "Punjab": ["PVR Elante Mall", "INOX Chandigarh", "Cinepolis Paras Downtown", "DT Cinemas Ludhiana"],
};

const showTimes = [
  "10:00 AM",
  "01:00 PM",
  "04:00 PM",
  "07:00 PM",
];

const seatTypes = ["Normal", "Delux", "VIP", "VIP+"];

interface TheaterBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const TheaterBookingForm = ({ onSubmit, loading }: TheaterBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    state: "",
    theaterName: "",
    movieShow: "",
    showTime: "",
    seatType: "",
    numberOfSeats: "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateTheaters = formData.state ? theatersByState[formData.state] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theaterName">Theater Name *</Label>
          <Select
            value={formData.theaterName}
            onValueChange={(value) => setFormData({ ...formData, theaterName: value })}
            required
            disabled={!formData.state || selectedStateTheaters.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Theater" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateTheaters.map((theater) => (
                <SelectItem key={theater} value={theater}>
                  {theater}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="movieShow">Movie/Show Name *</Label>
          <Input
            id="movieShow"
            name="movieShow"
            value={formData.movieShow}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookingDate">Show Date *</Label>
          <Input
            id="bookingDate"
            name="bookingDate"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={formData.bookingDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="showTime">Show Time *</Label>
          <Select
            value={formData.showTime}
            onValueChange={(value) => setFormData({ ...formData, showTime: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Show Time" />
            </SelectTrigger>
            <SelectContent>
              {showTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatType">Seat Type *</Label>
          <Select
            value={formData.seatType}
            onValueChange={(value) => setFormData({ ...formData, seatType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Seat Type" />
            </SelectTrigger>
            <SelectContent>
              {seatTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfSeats">Number of Seats *</Label>
          <Input
            id="numberOfSeats"
            name="numberOfSeats"
            type="number"
            min="1"
            max="10"
            value={formData.numberOfSeats}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-primary hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Processing..." : "Complete Booking"}
      </Button>
    </form>
  );
};

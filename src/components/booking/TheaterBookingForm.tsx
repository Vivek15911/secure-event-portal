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
  "Andhra Pradesh": ["PVR Vijayawada", "INOX Visakhapatnam", "Cinepolis GSM Mall", "Asian Multiplex", "Prasads IMAX"],
  "Arunachal Pradesh": ["Donyi Polo Cine Hall", "Gold Cinema", "Dera Natung Govt Theatre", "Naharlagun Theatre", "Picture Palace"],
  "Assam": ["PVR Guwahati", "INOX GS Road", "Cinepolis City Centre", "Gold Cinema", "Big Cinemas"],
  "Bihar": ["PVR Patna", "INOX P&M Mall", "Cinepolis Boring Road", "Anupam Cinema", "Jagat Cinema"],
  "Chhattisgarh": ["PVR Magneto Mall", "INOX City Mall", "Cinepolis Magneto The Mall", "Multiplex Cinema", "Jyoti Talkies"],
  "Goa": ["INOX Panaji", "PVR Goa", "Cinepolis Margao", "Multiplex Cinema", "Carnival Cinema"],
  "Gujarat": ["PVR Acropolis", "INOX Ahmedabad One", "Cinepolis Alpha One", "Rajhans Cinemas", "City Gold Multiplex"],
  "Haryana": ["PVR Ambience Mall", "INOX Gurgaon", "Cinepolis DLF Mall", "Wave Cinemas", "DT Star Mall"],
  "Himachal Pradesh": ["PVR Shimla", "Cinepolis Manali", "Regal Cinema", "Triveni Theatre", "Baljees Cinema"],
  "Jharkhand": ["PVR Nucleus Mall", "INOX Jamshedpur", "Cinepolis City Centre", "Wave Cinema", "Orbit Multiplex"],
  "Karnataka": ["PVR Forum Mall", "INOX Garuda Mall", "Cinepolis Royal Meenakshi", "Gopalan Cinemas", "PVR Orion Mall"],
  "Kerala": ["PVR Lulu Mall", "Cinepolis Centre Square", "INOX Oberon Mall", "Kairali Sree", "Aries Plex"],
  "Madhya Pradesh": ["PVR Treasure Island", "INOX C21 Mall", "Cinepolis City Centre", "Wave Cinemas", "Sapna Sangeeta"],
  "Maharashtra": ["PVR Phoenix Mumbai", "INOX Nariman Point", "Cinepolis Viviana Mall", "Carnival Cinema Pune", "Cinepolis Seasons Mall"],
  "Manipur": ["DM Multiplex", "Galaxy Cinema", "Sangai Theatre", "Rupmahal Cinema", "Classic Theatre"],
  "Meghalaya": ["Galleria Cinema", "Bijou Cinema", "Anjalee Cinema", "Gold Cinema Shillong", "Kelvin Theatre"],
  "Mizoram": ["Luangmual Cinema", "Aizawl Multiplex", "Chanmari Cinema", "Zodin Theatre", "New Cinema Hall"],
  "Nagaland": ["Niathu Cinema", "Dream Theatre", "Capital Cinema", "Blue Mountain Theatre", "Kohima Multiplex"],
  "Odisha": ["PVR Bhubaneswar", "INOX Dniplex", "Cinepolis Esplanade", "Big Cinemas", "Maharaja Theatre"],
  "Punjab": ["PVR Elante Mall", "INOX Chandigarh", "Cinepolis Paras Downtown", "DT Cinemas Ludhiana", "Wave Cinemas"],
  "Rajasthan": ["PVR Pink Square", "INOX Crystal Palm", "Cinepolis World Trade Park", "Raj Mandir Cinema", "Wave Cinemas"],
  "Sikkim": ["Denzong Cinema", "Vajra Cinema", "Gold Cinema Gangtok", "Rachna Cinema", "Rink Mall Multiplex"],
  "Tamil Nadu": ["PVR Grand Mall", "INOX Express Avenue", "Sathyam Cinemas", "AGS Cinemas", "Rohini Silver Screens"],
  "Telangana": ["PVR Panjagutta", "INOX GVK One", "Cinepolis Manjeera Mall", "AMB Cinemas", "Prasads Multiplex"],
  "Tripura": ["Rupashi Cinema", "Alankar Cinema", "Kamal Talkies", "Ashok Cinema", "City Centre Multiplex"],
  "Uttar Pradesh": ["PVR Sahara Ganj", "INOX Riverside Mall", "Cinepolis Fun Republic", "Wave Cinemas", "PVR Sahu Cinema"],
  "Uttarakhand": ["PVR Pacific Mall", "INOX Pacific Mall", "Wave Cinemas", "Cinepolis Mall Road", "Vishal Mega Mart"],
  "West Bengal": ["INOX South City", "PVR Diamond Plaza", "Cinepolis Acropolis", "Priya Cinema", "Nandan Theatre"],
  "Andaman and Nicobar Islands": ["Govind Theatre", "Chanakya Cinema", "Sea Shell Theatre", "Andaman Talkies", "Island Cinema"],
  "Chandigarh": ["PVR Elante", "INOX Elante", "Cinepolis TDI Mall", "DT Star Cinema", "DT Cinemas"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Deepak Cinema", "Roopam Cinema", "Lata Cinema", "Movie Time Theatre", "Stardust Cinema"],
  "Delhi": ["PVR Saket", "INOX Nehru Place", "Cinepolis DLF Place", "DT Cinemas Vasant Kunj", "PVR Select Citywalk"],
  "Jammu and Kashmir": ["INOX Srinagar", "Wave Cinemas Jammu", "KC Cinema", "Broadway Cinema", "Hari Theatre"],
  "Ladakh": ["Himalayan Cinema", "Leh Palace Theatre", "Lamdon Theatre", "Dream Cinema Hall", "Cultural Centre Theatre"],
  "Lakshadweep": ["Community Hall Theatre", "Island Cinema", "Kavaratti Theatre", "Minicoy Cinema", "Cultural Centre"],
  "Puducherry": ["Kailash Theatre", "Sathyam Cinemas", "Delite Cinema", "Bharathi Theatre", "Inox Pondicherry"],
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

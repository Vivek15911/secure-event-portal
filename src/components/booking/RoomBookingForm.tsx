import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const venuesByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Novotel Visakhapatnam", "The Park Hyderabad", "Fortune Murali Park", "Hotel Daspalla", "Grand Bay Hotel"],
  "Arunachal Pradesh": ["Hotel Arun Subansiri", "Blue Pine Hotel", "Donyi Polo Ashok", "Siang Guest House", "Hotel Pybss"],
  "Assam": ["Radisson Blu Guwahati", "Vivanta Guwahati", "Hotel Dynasty", "Brahmaputra Ashok", "Kiranshree Portico"],
  "Bihar": ["Hotel Maurya Patna", "Hotel Chanakya", "Gargee Grand", "Lemon Tree Patna", "The Panache Hotel"],
  "Chhattisgarh": ["Courtyard Marriott Raipur", "Sayaji Hotel", "Babylon Inn", "Hotel Piccadily", "Akriti Grand"],
  "Goa": ["Taj Exotica Goa", "The Leela Goa", "Park Hyatt Goa", "Grand Hyatt Goa", "Alila Diwa Goa"],
  "Gujarat": ["Hyatt Regency Ahmedabad", "The Fern Ahmedabad", "Fortune Landmark", "Lemon Tree Ahmedabad", "Novotel Ahmedabad"],
  "Haryana": ["The Oberoi Gurgaon", "Trident Gurgaon", "Hyatt Regency Gurgaon", "Lemon Tree Gurgaon", "The Westin Gurgaon"],
  "Himachal Pradesh": ["Wildflower Hall Shimla", "The Oberoi Cecil", "Radisson Shimla", "Hotel Combermere", "Clarkes Hotel"],
  "Jharkhand": ["Radisson Blu Ranchi", "Hotel Capitol Hill", "BNR Hotel Ranchi", "The Sonnet Hotel", "Mayfair Lagoon"],
  "Karnataka": ["ITC Gardenia Bangalore", "The Leela Palace", "Sheraton Grand Bangalore", "Taj West End", "The Oberoi Bangalore"],
  "Kerala": ["Le Meridien Kochi", "The Leela Kovalam", "Taj Malabar Kochi", "Grand Hyatt Kochi", "Kumarakom Lake Resort"],
  "Madhya Pradesh": ["Jehan Numa Palace", "Courtyard Marriott Bhopal", "Noor-Us-Sabah Palace", "Sayaji Hotel Indore", "Radisson Blu Indore"],
  "Maharashtra": ["The Taj Mahal Palace Mumbai", "Trident BKC", "Renaissance Convention Centre", "JW Marriott Mumbai", "Grand Hyatt Mumbai"],
  "Manipur": ["Classic Hotel Imphal", "Hotel Imphal", "Sangai Continental", "The Classic Grande", "Hotel White Palace"],
  "Meghalaya": ["Hotel Polo Towers", "Ri Kynjai Shillong", "Hotel Centre Point", "Royal Heritage Tripura Castle", "Vivanta Meghalaya"],
  "Mizoram": ["Hotel Regency Aizawl", "Hotel Chief", "Grand Hotel Aizawl", "Hotel Floria", "Chaltlang Tourist Lodge"],
  "Nagaland": ["Hotel Japfu", "Hotel Vivor", "Hotel Razhu", "Rhododendron Hotel", "Grand Kohima Hotel"],
  "Odisha": ["Mayfair Lagoon Bhubaneswar", "Trident Bhubaneswar", "Hotel Swosti Premium", "Fortune Park Sishmo", "The Crown"],
  "Punjab": ["JW Marriott Chandigarh", "Hyatt Regency Chandigarh", "Taj Chandigarh", "Radisson Chandigarh", "Park Plaza Chandigarh"],
  "Rajasthan": ["ITC Rajputana Jaipur", "The Lalit Jaipur", "Clarks Amer Jaipur", "Le Meridien Jaipur", "Fairmont Jaipur"],
  "Sikkim": ["Mayfair Spa Resort Gangtok", "The Elgin Nor-Khill", "Hotel Sonam Delek", "Summit Newa Regency", "WelcomHeritage Denzong"],
  "Tamil Nadu": ["ITC Grand Chola Chennai", "Taj Coromandel Chennai", "The Westin Chennai", "Trident Chennai", "Hilton Chennai"],
  "Telangana": ["ITC Kohenur Hyderabad", "Taj Falaknuma Palace", "Park Hyatt Hyderabad", "Trident Hyderabad", "Novotel Hyderabad"],
  "Tripura": ["Ginger Hotel Agartala", "Hotel Sonar Tori", "Welcome Palace", "City Centre Hotel", "Royal Guest House"],
  "Uttar Pradesh": ["Taj Ganges Varanasi", "Radisson Lucknow", "Hyatt Regency Lucknow", "Clarks Avadh", "Hotel Hindusthan International"],
  "Uttarakhand": ["JW Marriott Mussoorie", "The Westin Sohna Resort", "Ananda in the Himalayas", "Sterling Mussoorie", "Fortune Resort Grace"],
  "West Bengal": ["ITC Royal Bengal Kolkata", "Taj Bengal Kolkata", "The Park Kolkata", "JW Marriott Kolkata", "The Oberoi Grand"],
  "Andaman and Nicobar Islands": ["Taj Exotica Resort", "Sea Shell Havelock", "Fortune Resort Bay Island", "Silver Sand Beach Resort", "Peerless Resort"],
  "Chandigarh": ["JW Marriott Chandigarh", "Hyatt Regency Chandigarh", "The LaLit Chandigarh", "Taj Chandigarh", "Lemon Tree Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Hotel Miramar", "The Gold Beach Resort", "Hotel Presidency", "Cidade De Daman", "Sandy Resort"],
  "Delhi": ["The Lalit New Delhi", "ITC Maurya", "Ashok Hotel", "Taj Palace Delhi", "The Oberoi Delhi"],
  "Jammu and Kashmir": ["The LaLit Grand Palace Srinagar", "Taj Vivanta Dal View", "Radisson Srinagar", "Grand Mumtaz", "Hotel Broadway Srinagar"],
  "Ladakh": ["The Grand Dragon Ladakh", "Hotel Ladakh Residency", "Spic N Span Leh", "The Zen Ladakh", "Hotel Omasila"],
  "Lakshadweep": ["Bangaram Island Resort", "Agatti Island Beach Resort", "Kadmat Beach Resort", "Minicoy Island Resort", "Coral Paradise"],
  "Puducherry": ["Le Pondy Beach Resort", "The Promenade", "Palais de Mahe", "Le Dupleix", "La Villa"],
};

const roomTypes = [
  "Single Room",
  "Double Room",
  "Suite",
  "Deluxe Room",
  "Executive Room"
];

const bedOptions = [
  "1 Single Bed",
  "1 Double Bed",
  "2 Single Beds",
  "1 King Bed"
];

const visitTimes = [
  "08:00 AM - 10:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "05:00 PM - 07:00 PM",
];

const durations = [
  "2 Hours",
  "4 Hours",
  "Full Day (8 hours)",
  "Custom Duration"
];

interface RoomBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const RoomBookingForm = ({ onSubmit, loading }: RoomBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    bookingDate: "",
    state: "",
    venueName: "",
    roomType: "",
    visitTime: "",
    duration: "",
    numberOfAttendees: "1",
    requirements: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateVenues = formData.state ? venuesByState[formData.state] || [] : [];

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
          <Label htmlFor="organization">Organization/Company *</Label>
          <Input
            id="organization"
            name="organization"
            value={formData.organization}
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
          <Label htmlFor="venueName">Venue Name *</Label>
          <Select
            value={formData.venueName}
            onValueChange={(value) => setFormData({ ...formData, venueName: value })}
            required
            disabled={!formData.state || selectedStateVenues.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Venue" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateVenues.map((venue) => (
                <SelectItem key={venue} value={venue}>
                  {venue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roomType">Room Type *</Label>
          <Select
            value={formData.roomType}
            onValueChange={(value) => setFormData({ ...formData, roomType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Room Type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookingDate">Booking Date *</Label>
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
          <Label htmlFor="visitTime">Visit Time *</Label>
          <Select
            value={formData.visitTime}
            onValueChange={(value) => setFormData({ ...formData, visitTime: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Visit Time" />
            </SelectTrigger>
            <SelectContent>
              {visitTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfAttendees">Number of Attendees *</Label>
          <Input
            id="numberOfAttendees"
            name="numberOfAttendees"
            type="number"
            min="1"
            max="500"
            value={formData.numberOfAttendees}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Special Requirements (Optional)</Label>
        <Textarea
          id="requirements"
          name="requirements"
          placeholder="E.g., projector, whiteboard, catering, audio system"
          value={formData.requirements}
          onChange={handleInputChange}
          rows={3}
        />
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

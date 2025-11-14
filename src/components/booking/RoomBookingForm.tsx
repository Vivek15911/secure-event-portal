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
  "Delhi": ["India Habitat Centre", "The Lalit New Delhi", "ITC Maurya", "Ashok Hotel Convention Centre"],
  "Maharashtra": ["Nehru Centre Mumbai", "The Taj Hotel", "Trident BKC", "Renaissance Convention Centre"],
  "Karnataka": ["Bangalore International Centre", "ITC Gardenia", "The Leela Palace", "Sheraton Grand"],
  "Tamil Nadu": ["Chennai Trade Centre", "ITC Grand Chola", "Taj Coromandel", "The Westin Chennai"],
  "West Bengal": ["Biswa Bangla Convention Centre", "ITC Royal Bengal", "Taj Bengal", "The Park Kolkata"],
  "Kerala": ["Le Meridien Convention Centre", "The Leela Kovalam", "Taj Malabar", "Grand Hyatt Kochi"],
  "Gujarat": ["Ahmedabad Management Association", "The Fern Hotels", "Hyatt Regency", "Fortune Landmark"],
  "Rajasthan": ["Jaipur Exhibition Centre", "ITC Rajputana", "The Lalit Jaipur", "Clarks Amer"],
  "Uttar Pradesh": ["NDLS Convention Hall", "Taj Ganges", "Radisson Lucknow", "Hyatt Regency Lucknow"],
  "Punjab": ["Punjab Engineering College", "JW Marriott Chandigarh", "Hyatt Regency", "Taj Chandigarh"],
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

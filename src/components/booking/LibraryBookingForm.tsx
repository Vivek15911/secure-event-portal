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

const librariesByState: Record<string, string[]> = {
  "Andhra Pradesh": ["State Central Library Hyderabad", "Andhra Pradesh State Library", "Kakinada Public Library", "Vijayawada City Central Library", "Tirupati Public Library"],
  "Arunachal Pradesh": ["Arunachal Pradesh State Library", "Itanagar Public Library", "Naharlagun District Library", "Pasighat Town Library", "Tawang Community Library"],
  "Assam": ["Guwahati Public Library", "Assam State Central Library", "Dibrugarh District Library", "Silchar Public Library", "Jorhat Town Library"],
  "Bihar": ["Bihar State Library Patna", "Patna City Central Library", "Muzaffarpur Public Library", "Bhagalpur District Library", "Gaya Town Library"],
  "Chhattisgarh": ["Chhattisgarh State Library", "Raipur Central Library", "Bilaspur District Library", "Durg Public Library", "Bhilai Town Library"],
  "Goa": ["Central Library Panjim", "Goa State Central Library", "Margao Public Library", "Vasco da Gama Library", "Mapusa Town Library"],
  "Gujarat": ["Gujarat State Central Library", "Ahmedabad City Library", "Surat Public Library", "Vadodara District Library", "Rajkot Town Library"],
  "Haryana": ["Haryana State Library", "Gurugram Central Library", "Faridabad Public Library", "Ambala District Library", "Karnal Town Library"],
  "Himachal Pradesh": ["Shimla Public Library", "HP State Central Library", "Dharamshala District Library", "Manali Town Library", "Kullu Public Library"],
  "Jharkhand": ["Ranchi Central Library", "Jharkhand State Library", "Jamshedpur Public Library", "Dhanbad District Library", "Bokaro Town Library"],
  "Karnataka": ["State Central Library Bangalore", "Seshadri Iyer Memorial Library", "Mysore City Central Library", "Mangalore Public Library", "Hubli District Library"],
  "Kerala": ["Kerala State Central Library", "Thiruvananthapuram Public Library", "Kochi Central Library", "Calicut District Library", "Thrissur Town Library"],
  "Madhya Pradesh": ["MP State Central Library", "Bhopal Central Library", "Indore Public Library", "Jabalpur District Library", "Gwalior Town Library"],
  "Maharashtra": ["Mumbai Central Library", "Pune Public Library", "Nagpur District Library", "Nashik Town Library", "Aurangabad City Library"],
  "Manipur": ["Manipur State Library", "Imphal Public Library", "Churachandpur District Library", "Thoubal Town Library", "Bishnupur Community Library"],
  "Meghalaya": ["Meghalaya State Central Library", "Shillong Public Library", "Tura District Library", "Jowai Town Library", "Nongstoin Community Library"],
  "Mizoram": ["Mizoram State Library", "Aizawl Public Library", "Lunglei District Library", "Champhai Town Library", "Serchhip Community Library"],
  "Nagaland": ["Nagaland State Library", "Kohima Public Library", "Dimapur District Library", "Mokokchung Town Library", "Wokha Community Library"],
  "Odisha": ["Odisha State Central Library", "Bhubaneswar Public Library", "Cuttack District Library", "Puri Town Library", "Berhampur City Library"],
  "Punjab": ["Punjab State Central Library", "Chandigarh Central Library", "Ludhiana Public Library", "Amritsar District Library", "Patiala Town Library"],
  "Rajasthan": ["Rajasthan State Central Library", "Jaipur Central Library", "Jodhpur Public Library", "Udaipur District Library", "Kota Town Library"],
  "Sikkim": ["Sikkim State Library", "Gangtok Public Library", "Namchi District Library", "Gyalshing Town Library", "Mangan Community Library"],
  "Tamil Nadu": ["Connemara Public Library", "Chennai Central Library", "Madurai District Library", "Coimbatore Public Library", "Trichy Town Library"],
  "Telangana": ["Telangana State Central Library", "Hyderabad Public Library", "Warangal District Library", "Nizamabad Town Library", "Khammam City Library"],
  "Tripura": ["Tripura State Library", "Agartala Public Library", "Udaipur District Library", "Dharmanagar Town Library", "Kailashahar Community Library"],
  "Uttar Pradesh": ["UP State Central Library", "Lucknow Public Library", "Kanpur District Library", "Varanasi Town Library", "Agra City Library"],
  "Uttarakhand": ["Uttarakhand State Library", "Dehradun Central Library", "Haridwar Public Library", "Nainital District Library", "Roorkee Town Library"],
  "West Bengal": ["National Library Kolkata", "Calcutta Public Library", "Siliguri District Library", "Durgapur Town Library", "Asansol City Library"],
  "Andaman and Nicobar Islands": ["Port Blair Central Library", "Andaman Public Library", "Car Nicobar District Library", "Havelock Town Library", "Diglipur Community Library"],
  "Chandigarh": ["Chandigarh State Central Library", "Sector 17 Public Library", "Panjab University Library", "Sector 34 District Library", "Manimajra Town Library"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman Central Library", "Silvassa Public Library", "Diu District Library", "Dadra Town Library", "Nagar Haveli Community Library"],
  "Delhi": ["Delhi Public Library", "Nehru Memorial Library", "India International Centre Library", "American Center Library", "British Council Library"],
  "Jammu and Kashmir": ["Jammu Central Library", "Srinagar Public Library", "Kashmir University Library", "Anantnag District Library", "Baramulla Town Library"],
  "Ladakh": ["Ladakh State Library", "Leh Public Library", "Kargil District Library", "Nubra Town Library", "Zanskar Community Library"],
  "Lakshadweep": ["Kavaratti Central Library", "Lakshadweep State Library", "Agatti Public Library", "Minicoy District Library", "Andrott Town Library"],
  "Puducherry": ["Puducherry State Central Library", "French Institute Library", "Romain Rolland Library", "Karaikal Public Library", "Mahe District Library"]
};

const visitTimes = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

interface LibraryBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const LibraryBookingForm = ({ onSubmit, loading }: LibraryBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    visitTime: "",
    state: "",
    libraryName: "",
    numberOfPeople: "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateLibraries = formData.state ? librariesByState[formData.state] || [] : [];

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
            onValueChange={(value) => setFormData({ ...formData, state: value, libraryName: "" })}
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
          <Label htmlFor="libraryName">Library Name *</Label>
          <Select
            value={formData.libraryName}
            onValueChange={(value) => setFormData({ ...formData, libraryName: value })}
            required
            disabled={!formData.state || selectedStateLibraries.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Library" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateLibraries.map((library) => (
                <SelectItem key={library} value={library}>
                  {library}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookingDate">Visit Date *</Label>
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
          <Label htmlFor="numberOfPeople">Number of People *</Label>
          <Input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            min="1"
            max="10"
            value={formData.numberOfPeople}
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

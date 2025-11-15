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

const parksByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Indira Gandhi Zoological Park", "Lumbini Park", "NTR Gardens", "Nehru Zoological Park", "Botanical Garden Vijayawada"],
  "Arunachal Pradesh": ["Itanagar Wildlife Sanctuary", "Namdapha National Park", "Sessa Orchid Sanctuary", "Pakke Tiger Reserve", "Mouling National Park"],
  "Assam": ["Kaziranga National Park", "Manas National Park", "Pobitora Wildlife Sanctuary", "Deepor Beel Wildlife Sanctuary", "Hoollongapar Gibbon Sanctuary"],
  "Bihar": ["Sanjay Gandhi Jaivik Udyan", "Buddha Smriti Park", "Eco Park Rajgir", "Valmiki National Park", "Vikramshila Gangetic Dolphin Sanctuary"],
  "Chhattisgarh": ["Jungle Safari Naya Raipur", "Indravati National Park", "Kanger Valley National Park", "Achanakmar Tiger Reserve", "Barnawapara Wildlife Sanctuary"],
  "Goa": ["Bondla Wildlife Sanctuary", "Dr. Salim Ali Bird Sanctuary", "Mhadei Wildlife Sanctuary", "Bhagwan Mahavir Wildlife Sanctuary", "Netravali Wildlife Sanctuary"],
  "Gujarat": ["Sabarmati Riverfront", "Kankaria Lakefront", "Law Garden", "Victoria Garden", "Indroda Nature Park"],
  "Haryana": ["Sultanpur National Park", "Leisure Valley Park Gurgaon", "Kingdom of Dreams Park", "Tau Devi Lal Bio Diversity Park", "Aravalli Biodiversity Park"],
  "Himachal Pradesh": ["Great Himalayan National Park", "Pin Valley National Park", "Van Vihar Shimla", "Khajjiar Lake Park", "Renuka Wildlife Sanctuary"],
  "Jharkhand": ["Jubilee Park Jamshedpur", "Betla National Park", "Dalma Wildlife Sanctuary", "Hazaribagh National Park", "Jawaharlal Nehru Biological Park"],
  "Karnataka": ["Cubbon Park", "Lalbagh Botanical Garden", "Bannerghatta National Park", "Freedom Park", "Brindavan Gardens"],
  "Kerala": ["Periyar National Park", "Eravikulam National Park", "Silent Valley National Park", "Parambikulam Wildlife Sanctuary", "Wayanad Wildlife Sanctuary"],
  "Madhya Pradesh": ["Van Vihar National Park", "Kanha National Park", "Bandhavgarh National Park", "Pench National Park", "Satpura National Park"],
  "Maharashtra": ["Sanjay Gandhi National Park", "Shivaji Park", "Kamala Nehru Park", "Hanging Gardens", "Tadoba National Park"],
  "Manipur": ["Keibul Lamjao National Park", "Sirohi National Park", "Manipur Zoological Garden", "Loukoipat Ecological Park", "Khonghampat Orchidarium"],
  "Meghalaya": ["Ward's Lake Shillong", "Eco Park Umiam Lake", "Mawphlang Sacred Forest", "Elephant Falls Park", "Thangkharang Park"],
  "Mizoram": ["Dampa Tiger Reserve", "Murlen National Park", "Phawngpui National Park", "Khawnglung Wildlife Sanctuary", "Tamdil Lake Park"],
  "Nagaland": ["Intanki National Park", "Fakim Wildlife Sanctuary", "Pulie Badze Wildlife Sanctuary", "Rangapahar Reserve Forest", "Mount Japfu"],
  "Odisha": ["Nandankanan Zoological Park", "Simlipal National Park", "Bhitarkanika National Park", "Chilika Wildlife Sanctuary", "Debrigarh Wildlife Sanctuary"],
  "Punjab": ["Rock Garden Chandigarh", "Rose Garden Chandigarh", "Sukhna Lake Park", "Rambagh Garden", "Maharaja Ranjit Singh Park"],
  "Rajasthan": ["Central Park Jaipur", "Nahargarh Biological Park", "Ram Niwas Garden", "Saheliyon ki Bari", "Ranthambore National Park"],
  "Sikkim": ["Himalayan Zoological Park", "Khangchendzonga National Park", "Fambong Lho Wildlife Sanctuary", "Maenam Wildlife Sanctuary", "Singba Rhododendron Sanctuary"],
  "Tamil Nadu": ["Marina Beach Park", "Guindy National Park", "Semmozhi Poonga", "Anna Nagar Tower Park", "Mudumalai National Park"],
  "Telangana": ["KBR National Park", "Nehru Zoological Park", "Indira Park", "NTR Gardens", "Mahavir Harina Vanasthali National Park"],
  "Tripura": ["Sepahijala Wildlife Sanctuary", "Clouded Leopard National Park", "Gumti Wildlife Sanctuary", "Heritage Park Agartala", "Ujjayanta Palace Gardens"],
  "Uttar Pradesh": ["Ambedkar Park", "Janeshwar Mishra Park", "Lohia Park", "Taj Nature Walk", "Dudhwa National Park"],
  "Uttarakhand": ["Rajaji National Park", "Jim Corbett National Park", "Nanda Devi National Park", "Valley of Flowers National Park", "Govind Wildlife Sanctuary"],
  "West Bengal": ["Victoria Memorial Gardens", "Eco Park Kolkata", "Central Park Kolkata", "Millennium Park", "Sundarbans National Park"],
  "Andaman and Nicobar Islands": ["Mahatma Gandhi Marine National Park", "Campbell Bay National Park", "Galathea National Park", "Mount Harriet National Park", "Rani Jhansi Marine National Park"],
  "Chandigarh": ["Rock Garden", "Rose Garden", "Sukhna Lake", "Leisure Valley", "Topiary Park"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Lion Safari Park", "Satmalia Deer Park", "Mini Zoo Garden", "Vanvihar Garden", "Devka Beach Garden"],
  "Delhi": ["Lodhi Garden", "India Gate Gardens", "Garden of Five Senses", "Nehru Park", "Buddha Jayanti Park"],
  "Jammu and Kashmir": ["Dachigam National Park", "Shalimar Bagh", "Nishat Bagh", "Tulip Garden", "Hemis National Park"],
  "Ladakh": ["Hemis National Park", "Changthang Wildlife Sanctuary", "Karakorum Wildlife Sanctuary", "Hall of Fame Garden", "Shanti Stupa Garden"],
  "Lakshadweep": ["Marine National Park", "Coral Garden Park", "Minicoy Island Park", "Kavaratti Marine Aquarium", "Bangaram Island Beach Park"],
  "Puducherry": ["Botanical Garden", "Ousteri Lake Park", "Bharathi Park", "Rock Beach Park", "Paradise Beach Park"],
};

const activityTypes = [
  "Picnic",
  "Photography",
  "Bird Watching",
  "Nature Walk",
  "Camping",
  "Family Gathering",
  "Corporate Event",
  "Sports Activity"
];

const visitTimes = [
  "06:00 AM - 09:00 AM",
  "10:00 AM - 01:00 PM",
  "02:00 PM - 05:00 PM",
  "05:00 PM - 08:00 PM",
];

interface ParkBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const ParkBookingForm = ({ onSubmit, loading }: ParkBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    visitTime: "",
    state: "",
    parkName: "",
    activityType: "",
    numberOfPeople: "1",
    equipmentNeeded: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateParks = formData.state ? parksByState[formData.state] || [] : [];

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
          <Label htmlFor="parkName">Park Name *</Label>
          <Select
            value={formData.parkName}
            onValueChange={(value) => setFormData({ ...formData, parkName: value })}
            required
            disabled={!formData.state || selectedStateParks.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Park" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateParks.map((park) => (
                <SelectItem key={park} value={park}>
                  {park}
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
          <Label htmlFor="activityType">Activity Type *</Label>
          <Select
            value={formData.activityType}
            onValueChange={(value) => setFormData({ ...formData, activityType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Activity" />
            </SelectTrigger>
            <SelectContent>
              {activityTypes.map((activity) => (
                <SelectItem key={activity} value={activity}>
                  {activity}
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
            max="100"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipmentNeeded">Equipment/Facilities Needed (Optional)</Label>
        <Textarea
          id="equipmentNeeded"
          name="equipmentNeeded"
          placeholder="E.g., tables, chairs, BBQ grill, gazebo"
          value={formData.equipmentNeeded}
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

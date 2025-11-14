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

const sportsFacilitiesByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Indira Gandhi Stadium", "GMC Balayogi Stadium", "ACA-VDCA Stadium", "Dr BR Ambedkar Stadium", "Rajiv Gandhi Indoor Stadium"],
  "Arunachal Pradesh": ["Chimpu Sports Complex", "Rajiv Gandhi Stadium", "Yupia Sports Complex", "Itanagar Stadium", "Pasighat Sports Ground"],
  "Assam": ["Nehru Stadium Guwahati", "Barsapara Cricket Stadium", "Indira Gandhi Athletic Stadium", "Judges Field", "Kanaklata Indoor Stadium"],
  "Bihar": ["Moin-ul-Haq Stadium", "Patliputra Sports Complex", "JP Sinha Indoor Stadium", "Bapu Stadium", "Urja Stadium"],
  "Chhattisgarh": ["Shaheed Veer Narayan Singh Stadium", "Pt Deendayal Upadhyay Stadium", "Raipur International Cricket Stadium", "Maa Mahamaya Stadium", "Swami Vivekananda Stadium"],
  "Goa": ["Jawaharlal Nehru Stadium", "Fatorda Stadium", "Tilak Maidan", "Bambolim Stadium", "Duler Stadium"],
  "Gujarat": ["Narendra Modi Stadium", "Sardar Patel Stadium", "Rajkot Sports Complex", "Trans Stadia", "Surat Indoor Stadium"],
  "Haryana": ["Tau Devi Lal Stadium", "Nehru Stadium Faridabad", "Chaudhary Bansi Lal Stadium", "Sports Complex Karnal", "Maharana Pratap Stadium"],
  "Himachal Pradesh": ["HPCA Stadium Dharamshala", "Indira Gandhi Sports Complex", "Ice Skating Rink Shimla", "Paddal Ground", "Solan Sports Complex"],
  "Jharkhand": ["JSCA Stadium", "Keenan Stadium", "Birsa Munda Stadium", "Mega Sports Complex", "JRD Tata Sports Complex"],
  "Karnataka": ["M Chinnaswamy Stadium", "Sree Kanteerava Stadium", "Mysore Sports Complex", "Mangala Stadium", "Hubli Sports Complex"],
  "Kerala": ["Jawaharlal Nehru Stadium Kochi", "Greenfield Stadium", "Kannur Indoor Stadium", "Central Stadium Trivandrum", "Kozhikode Sports Complex"],
  "Madhya Pradesh": ["Nehru Stadium Indore", "Motilal Nehru Stadium", "Holkar Cricket Stadium", "TT Nagar Stadium", "Roop Singh Stadium"],
  "Maharashtra": ["Wankhede Stadium", "DY Patil Stadium", "Balewadi Sports Complex", "Shiv Chhatrapati Sports Complex", "Mumbai Football Arena"],
  "Manipur": ["Khuman Lampak Stadium", "Manipur Indoor Stadium", "Imphal Sports Complex", "Tulihal Football Stadium", "Langjing Sports Complex"],
  "Meghalaya": ["JN Stadium Shillong", "Polo Ground Shillong", "Rilbong Sports Complex", "Tura Stadium", "Jowai Sports Ground"],
  "Mizoram": ["Rajiv Gandhi Stadium", "Lammual Sports Complex", "AR Ground Aizawl", "Lunglei Sports Complex", "Champhai Stadium"],
  "Nagaland": ["Kohima Local Ground", "Indira Gandhi Stadium", "Dimapur Sports Complex", "Mokokchung Stadium", "Wokha Sports Ground"],
  "Odisha": ["Kalinga Stadium", "Barabati Stadium", "Biju Patnaik Sports Complex", "Cuttack Indoor Stadium", "Rourkela Hockey Stadium"],
  "Punjab": ["Punjab Cricket Stadium", "Guru Nanak Stadium", "Ludhiana Sports Complex", "Tau Devi Lal Stadium", "Patiala Sports Complex"],
  "Rajasthan": ["Sawai Mansingh Stadium", "Barkatullah Khan Stadium", "Maharana Pratap Stadium", "Gandhi Stadium", "Kota Sports Complex"],
  "Sikkim": ["Paljor Stadium", "Gangtok Football Ground", "Namchi Sports Complex", "Jorethang Stadium", "Rangpo Sports Ground"],
  "Tamil Nadu": ["MA Chidambaram Stadium", "Jawaharlal Nehru Stadium", "Salem Cricket Stadium", "Madurai Sports Complex", "Coimbatore Stadium"],
  "Telangana": ["GMC Balayogi Stadium", "Lal Bahadur Stadium", "Gachibowli Indoor Stadium", "Warangal Sports Complex", "Nizamabad Stadium"],
  "Tripura": ["Swami Vivekananda Stadium", "MBB College Ground", "Agartala Sports Complex", "Udaipur Stadium", "Ambassa Sports Ground"],
  "Uttar Pradesh": ["Ekana Cricket Stadium", "Green Park Stadium", "Atal Bihari Stadium", "Dr Bhimrao Ambedkar Stadium", "Agra Sports Complex"],
  "Uttarakhand": ["Rajiv Gandhi Stadium", "IIT Roorkee Sports Complex", "Dehradun Sports Stadium", "Parade Ground", "Haldwani Sports Complex"],
  "West Bengal": ["Eden Gardens", "Salt Lake Stadium", "Netaji Indoor Stadium", "Barasat Stadium", "Siliguri Sports Complex"],
  "Andaman and Nicobar Islands": ["Swaraj Stadium", "Port Blair Sports Complex", "Carnicobar Stadium", "Diglipur Sports Ground", "Havelock Beach Ground"],
  "Chandigarh": ["Sector 16 Stadium", "Hockey Stadium", "Cricket Stadium Sector 17", "Sports Complex Sector 42", "Lawn Tennis Complex"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman Sports Complex", "Silvassa Stadium", "Diu Sports Ground", "Dadra Football Ground", "Nani Daman Stadium"],
  "Delhi": ["Jawaharlal Nehru Stadium", "Arun Jaitley Stadium", "Thyagaraj Stadium", "Indira Gandhi Indoor Stadium", "Major Dhyan Chand Stadium"],
  "Jammu and Kashmir": ["Sher-i-Kashmir Stadium", "Bakshi Stadium", "Srinagar Sports Complex", "Anantnag Stadium", "Baramulla Sports Ground"],
  "Ladakh": ["Leh Sports Stadium", "Kargil Sports Complex", "NDS Stadium", "Nubra Sports Ground", "Zanskar Stadium"],
  "Lakshadweep": ["Kavaratti Sports Ground", "Agatti Stadium", "Minicoy Sports Complex", "Andrott Ground", "Kadmat Beach Stadium"],
  "Puducherry": ["Indira Gandhi Sports Complex", "Rajiv Gandhi Stadium", "Karaikal Sports Ground", "Yanam Stadium", "Mahe Sports Complex"]
};

const complexesByState = sportsFacilitiesByState;

const sportTypes = [
  "Cricket", "Football", "Badminton", "Tennis", "Basketball", 
  "Swimming", "Table Tennis", "Squash", "Volleyball", "Hockey"
];

const visitTimes = [
  "06:00 AM - 08:00 AM",
  "10:00 AM - 12:00 PM",
  "02:00 PM - 04:00 PM",
  "06:00 PM - 08:00 PM",
];

const durations = [
  "1 Hour",
  "2 Hours",
  "3 Hours",
  "4 Hours",
];

interface SportsBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const SportsBookingForm = ({ onSubmit, loading }: SportsBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    visitTime: "",
    duration: "",
    state: "",
    complexName: "",
    sportType: "",
    numberOfPeople: "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateComplexes = formData.state ? complexesByState[formData.state] || [] : [];

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
            onValueChange={(value) => setFormData({ ...formData, state: value, complexName: "" })}
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
          <Label htmlFor="complexName">Sports Complex Name *</Label>
          <Select
            value={formData.complexName}
            onValueChange={(value) => setFormData({ ...formData, complexName: value })}
            required
            disabled={!formData.state || selectedStateComplexes.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Complex" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateComplexes.map((complex) => (
                <SelectItem key={complex} value={complex}>
                  {complex}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sportType">Sport Type *</Label>
          <Select
            value={formData.sportType}
            onValueChange={(value) => setFormData({ ...formData, sportType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent>
              {sportTypes.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
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
          <Label htmlFor="numberOfPeople">Number of People *</Label>
          <Input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            min="1"
            max="20"
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

import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/contact-form";
import BookingForm from "@/components/booking-form";

interface ContactInfoProps {
  listingId: number;
  listingTitle: string;
  phone: string;
  email: string;
  website: string;
  location: string;
}

export default function ContactInfo({
  listingId,
  listingTitle,
  phone,
  email,
  website,
  location,
}: ContactInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

      <div className="space-y-4">
        <div className="flex items-start">
          <Phone className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
            <p>{phone}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
            <p>{email}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Globe className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Website</h4>
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {website}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
            <p>{location}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline mt-1 inline-block"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Contact</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0">
            <ContactForm listingId={listingId} listingTitle={listingTitle} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0">
            <BookingForm listingId={listingId} listingTitle={listingTitle} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

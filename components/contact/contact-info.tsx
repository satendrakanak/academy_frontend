import { Mail, Phone, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <h3 className="text-xl font-semibold">Get in touch</h3>

      <div className="flex items-start gap-3">
        <Mail className="text-blue-600" />
        <div>
          <p className="font-medium">Email</p>
          <p className="text-sm text-gray-500">support@unitushealth.com</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Phone className="text-blue-600" />
        <div>
          <p className="font-medium">Phone</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="text-blue-600" />
        <div>
          <p className="font-medium">Address</p>
          <p className="text-sm text-gray-500">Delhi NCR, India</p>
        </div>
      </div>
    </div>
  );
}

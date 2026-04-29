import { Mail, Phone, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="rounded-[28px] border border-[var(--brand-100)] bg-white p-6 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.35)] space-y-6">
      <h3 className="text-2xl font-semibold text-slate-900">Get in touch</h3>

      <div className="flex items-start gap-3">
        <Mail className="text-[var(--brand-500)]" />
        <div>
          <p className="font-medium">Email</p>
          <p className="text-sm text-gray-500">support@unitushealth.com</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Phone className="text-[var(--brand-500)]" />
        <div>
          <p className="font-medium">Phone</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="text-[var(--brand-500)]" />
        <div>
          <p className="font-medium">Address</p>
          <p className="text-sm text-gray-500">Delhi NCR, India</p>
        </div>
      </div>
    </div>
  );
}

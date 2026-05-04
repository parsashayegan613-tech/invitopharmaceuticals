import { MapPin, Phone, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-topbar py-2">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-start gap-6 text-sm text-topbar-text">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Edmonton, AB</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <a href="tel:+17807095678" className="hover:text-primary transition-colors">
            +1-780-709-5678
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <a href="mailto:info@invitvo.com" className="hover:text-primary transition-colors">
            info@invitvo.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

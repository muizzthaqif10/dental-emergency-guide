import { ArrowRight, Siren } from "lucide-react";
import { Link } from "react-router-dom";

function EmergencyButton() {
  return (
    <Link to="/emergencies" className="home-emergency-button">
      <Siren size={20} aria-hidden="true" />
      <span>EMERGENCY</span>
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}

export default EmergencyButton;
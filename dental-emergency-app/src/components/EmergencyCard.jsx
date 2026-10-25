import { ArrowUpRight } from "lucide-react";

function EmergencyCard({ title, category, summary, index, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="emergency-index-card"
      aria-label={`Open ${title} emergency guide`}
    >
      <span className="emergency-index-card__number">{String(index).padStart(2, "0")}</span>
      <span className="emergency-index-card__copy">
        <span className="emergency-index-card__category">{category}</span>
        <span className="emergency-index-card__title">{title}</span>
        <span className="emergency-index-card__summary">{summary}</span>
      </span>
      <span className="emergency-index-card__arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
    </button>
  );
}

export default EmergencyCard;

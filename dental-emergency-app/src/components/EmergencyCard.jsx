import { ArrowUpRight } from "lucide-react";

function EmergencyCard({ title, category, summary, image, imageCredit, index, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="emergency-index-card"
      aria-label={`Open ${title} emergency guide`}
    >
      <span className="emergency-index-card__number">{String(index).padStart(2, "0")}</span>
      {image && (
        <img
          className="emergency-index-card__image"
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      )}
      <span className="emergency-index-card__copy">
        <span className="emergency-index-card__category">{category}</span>
        <span className="emergency-index-card__title">{title}</span>
        <span className="emergency-index-card__summary">{summary}</span>
        {imageCredit && (
          <span className="emergency-index-card__credit">{imageCredit}</span>
        )}
      </span>
      <span className="emergency-index-card__arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
    </button>
  );
}

export default EmergencyCard;

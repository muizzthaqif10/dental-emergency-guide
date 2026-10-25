import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Brain,
  ChevronRight,
  HeartPulse,
  Home,
  Image,
  LifeBuoy,
  Pill,
  ShieldAlert,
  Wind,
  X,
} from "lucide-react";
import { createElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { emergencyData, references } from "../data/emergencyContent";
import "../styles/emergency-guide.css";
import "../styles/guide-editorial.css";

const emergencyIcons = {
  "vasovagal-syncope": Activity,
  anaphylaxis: ShieldAlert,
  hypoglycemia: Pill,
  "cardiac-arrest": HeartPulse,
  "asthma-attacks": Wind,
  epilepsy: Brain,
  others: LifeBuoy,
};

const signIcons = {
  Skin: ShieldAlert,
  Respiratory: Wind,
  "Cardiovascular (CVS)": HeartPulse,
  "Gastrointestinal (GI)": Activity,
};

const sectionIcons = {
  "Recognising the emergency": ShieldAlert,
  "Initial emergency actions": Activity,
  "Suspected collapse": HeartPulse,
  "During resuscitation": HeartPulse,
  "If the patient becomes unresponsive after the seizure": Brain,
  "General emergency actions": LifeBuoy,
};

const reviewNotice =
  "The text above is transcribed and organised from your PowerPoint, not independently medically validated. Some medication instructions, doses, routes and emergency-response steps require review by a qualified clinician before publication. In particular, the adrenaline instructions for asthma and anaphylaxis should be checked against current clinical guidelines.";

function getSectionId(value, index) {
  return `${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${index}`;
}

function getSectionIcon(value) {
  if (/pulse|breathing|collaps|resuscitation/i.test(value)) return HeartPulse;
  if (/seizure/i.test(value)) return Brain;
  if (/airway|breathing compromise/i.test(value)) return Wind;
  return sectionIcons[value] || Activity;
}

function getIllustrationLabels(content) {
  const text = Array.isArray(content) ? content.join(" ").toLowerCase() : content.toLowerCase();
  if (/\bcpr\b|aed|chest compression|resuscitation/.test(text)) return ["CPR"];
  if (/position|supine|upright|recovery position/.test(text)) return ["Patient positioning"];
  if (/airway|head tilt|chin lift/.test(text)) return ["Airway assessment"];
  if (/oxygen|ventilation|give .*breaths/.test(text)) return ["Oxygen administration"];
  return [];
}

function getOrderedSections(emergency) {
  const contentSections = [...emergency.sections];
  const decisionSections = contentSections.filter((section) => section.kind === "decision");
  const remainingSections = contentSections.filter((section) => section.kind !== "decision");

  return [...remainingSections, ...decisionSections];
}

function getParentHeading(sections, index) {
  for (let current = index - 1; current >= 0; current -= 1) {
    if (sections[current].kind === "heading") return sections[current].value;
  }
  return "";
}

function isPulseBreathingDecision(section) {
  const branchHeadings = `${section.yesTitle} ${section.noTitle}`.toLowerCase();
  return /pulse present|pulse absent|breathing present|breathing absent/.test(branchHeadings)
    || /during resuscitation/i.test(section.question);
}

function ImagePlaceholder({ label }) {
  return (
    <div className="eg-image-placeholder" role="img" aria-label={`image letak sini${label ? `: ${label}` : ""}`}>
      <Image size={22} strokeWidth={1.6} aria-hidden="true" />
      <span>image letak sini</span>
      {label && <small>{label}</small>}
    </div>
  );
}

function IllustrationPlaceholders({ labels }) {
  if (!labels.length) return null;

  return (
    <div className="eg-image-placeholder-list">
      {labels.map((label) => <ImagePlaceholder label={label} key={label} />)}
    </div>
  );
}

function StepList({ items, ordered = false, illustrations = [] }) {
  let orderedIndex = 0;

  return (
    <>
      <div className={`eg-step-list ${ordered ? "eg-step-list--ordered" : ""}`}>
        {items.map((item, index) => {
          const isNested = item.startsWith("-");
          const isNumbered = /^\d+\.\s/.test(item);
          const isSubheading = !isNested && !isNumbered && (
            item.endsWith(":") || /^(If the patient|If there are|If the seizure|During resuscitation|Continue CPR until|Chest compressions|Decision point)/i.test(item)
          );
          const number = isNumbered ? item.match(/^(\d+)\./)[1] : null;
          const orderedNumber = ordered && !isNested && !isNumbered && !isSubheading
            ? String(++orderedIndex)
            : null;
          const content = item.replace(/^(?:-\s*|\d+\.\s*)/, "");
          const colonIndex = content.indexOf(":");
          const label = colonIndex > -1 ? content.slice(0, colonIndex + 1) : "";
          const detail = label ? content.slice(colonIndex + 1).trimStart() : content;

          if (isSubheading) {
            return <h4 className="eg-list-heading" key={`${item}-${index}`}>{item}</h4>;
          }

          return (
            <div
              className={[
                "eg-step",
                isNested ? "eg-step--nested" : "",
                isNumbered ? "eg-step--numbered" : "",
                /key step|first and life-saving drug|Start CPR immediately|call emergency services|call an ambulance|emergency medical services/i.test(item) ? "eg-step--urgent" : "",
              ].filter(Boolean).join(" ")}
              key={`${item}-${index}`}
            >
              {number || orderedNumber
                ? <span className="eg-step__number">{number || orderedNumber}</span>
                : <span className="eg-step__mark" aria-hidden="true" />}
              <p>{label && <strong>{label} </strong>}{detail}</p>
            </div>
          );
        })}
      </div>
      <IllustrationPlaceholders labels={illustrations} />
    </>
  );
}

function DecisionSection({ section, index }) {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const branches = [
    { title: section.yesTitle, items: section.yesItems, label: section.yesLabel || "YES", tone: "teal" },
    { title: section.noTitle, items: section.noItems, label: section.noLabel || "NO", tone: "red" },
  ].filter((branch) => branch.title || branch.items?.length);
  const selectedBranchData = selectedBranch === null ? null : branches[selectedBranch];
  const showBothBranches = isPulseBreathingDecision(section);

  return (
    <section className="eg-section eg-decision" id={getSectionId(section.question, index)}>
      <div className="eg-section__heading">
        <span className="eg-section__index">{createElement(getSectionIcon(section.question), { size: 19, strokeWidth: 1.8 })}</span>
        <div>
          <p className="eg-eyebrow">DECISION POINT</p>
          <h2>{section.question}</h2>
        </div>
      </div>
      {!showBothBranches && (
        <div className="eg-decision__choices" role="group" aria-label={section.question}>
          {branches.map((branch, branchIndex) => (
            <button
              className={`eg-decision__choice eg-decision__choice--${branch.tone} ${selectedBranch === branchIndex ? "is-selected" : ""}`}
              type="button"
              aria-pressed={selectedBranch === branchIndex}
              aria-label={`${branchIndex === 0 ? "YES" : "NO"}: ${branch.title}`}
              onClick={() => setSelectedBranch(branchIndex)}
              key={branch.title}
            >
              <span>{branchIndex === 0 ? "YES" : "NO"}</span>
            </button>
          ))}
        </div>
      )}
      {showBothBranches ? (
        <div className="eg-decision__branches eg-decision__branches--always-visible">
          {branches.map((branch, branchIndex) => (
            <article className={`eg-branch eg-branch--${branch.tone}`} key={branch.title}>
              <div className="eg-branch__heading">
                <span>{branchIndex === 0 ? "YES" : "NO"}</span>
                <h3>{branch.title}</h3>
              </div>
              <StepList items={branch.items || []} ordered illustrations={getIllustrationLabels(branch.items || [])} />
            </article>
          ))}
        </div>
      ) : selectedBranchData && (
        <div className="eg-decision__branches eg-decision__branches--selected" aria-live="polite">
          <article className={`eg-branch eg-branch--${selectedBranchData.tone}`} key={selectedBranchData.title}>
            <div className="eg-branch__heading"><span>{selectedBranchData.label}</span><h3>{selectedBranchData.title}</h3></div>
            <StepList items={selectedBranchData.items || []} ordered illustrations={getIllustrationLabels(selectedBranchData.items || [])} />
          </article>
        </div>
      )}
    </section>
  );
}

function ContentSection({ section, index, parentHeading = "" }) {
  if (section.kind === "decision") {
    return <DecisionSection section={section} index={index} />;
  }

  if (section.kind === "heading") {
    return (
      <section className="eg-section" id={getSectionId(section.value, index)}>
        <div className="eg-section__heading">
          <span className="eg-section__index">{createElement(getSectionIcon(section.value), { size: 19, strokeWidth: 1.8 })}</span>
          <div><p className="eg-eyebrow">EMERGENCY MANAGEMENT</p><h2>{section.value}</h2></div>
        </div>
      </section>
    );
  }

  if (section.kind === "paragraph") {
    return <p className="eg-callout" key={`paragraph-${index}`}>{section.value}</p>;
  }

  if (section.kind === "list") {
    const isSigns = section.items.some((item) => /^(Skin|Respiratory|Cardiovascular|Gastrointestinal):/.test(item));
    return isSigns ? (
      <div className="eg-sign-grid">
        {section.items.map((item) => {
          const [label, ...details] = item.split(":");
          const Icon = signIcons[label] || Activity;
          return (
            <article className="eg-sign-card" key={item}>
              <span className="eg-sign-card__icon"><Icon size={19} /></span>
              <p><strong>{label}:</strong> {details.join(":").trim()}</p>
            </article>
          );
        })}
      </div>
    ) : (
      <StepList
        items={section.items}
        ordered={section.ordered}
        illustrations={parentHeading === "Recognising the emergency" && !section.items.some((item) => /\bcpr\b|aed|position|airway|oxygen|ventilation/i.test(item))
          ? []
          : getIllustrationLabels(`${parentHeading} ${section.items.join(" ")}`)}
      />
    );
  }

  return null;
}

function Modal({ type, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isReferences = type === "references";
  return (
    <div className="eg-modal-backdrop" onMouseDown={onClose}>
      <section
        className="eg-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eg-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="eg-modal__header">
          <div><p className="eg-eyebrow">{isReferences ? "PRESENTATION SOURCES" : "CLINICAL REVIEW"}</p><h2 id="eg-modal-title">{isReferences ? "References" : "Important before putting this content on the website"}</h2></div>
          <button type="button" className="eg-modal__close" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        </header>
        {isReferences ? (
          <ol className="eg-reference-list">{references.map((reference) => <li key={reference}>{reference.replace(/^\d+\.\s*/, "")}</li>)}</ol>
        ) : (
          <p className="eg-modal__notice">{reviewNotice}</p>
        )}
        <button type="button" className="eg-modal__done" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}

function EmergencyGuide() {
  const { id } = useParams();
  const [modal, setModal] = useState(null);
  const emergency = emergencyData.find((item) => item.id === id);

  if (!emergency) {
    return (
      <main className="eg-not-found">
        <ShieldAlert size={35} />
        <h1>Emergency guide unavailable</h1>
        <p>This emergency type is not in the current guide. Return to the emergency list and select a valid topic.</p>
        <Link to="/emergencies"><ArrowLeft size={17} /> View all emergencies</Link>
      </main>
    );
  }

  const Icon = emergencyIcons[emergency.id] || LifeBuoy;
  const sections = getOrderedSections(emergency);

  return (
    <div className="emergency-guide">
      <header className="eg-topbar">
        <Link to="/emergencies" className="eg-brand"><span className="eg-brand__mark"><Activity size={20} /></span><span>MAHSA INTERNATIONAL COLLEGE<small>DENTAL EMERGENCY QUICK REFERENCE</small></span></Link>
        <Link to="/" className="eg-home"><Home size={17} /> Home</Link>
      </header>

      <main className="eg-main">
        <nav className="eg-breadcrumb" aria-label="Breadcrumb">
          <Link to="/emergencies">Emergency guides</Link><ChevronRight size={15} /><span>{emergency.title}</span>
        </nav>

        <header className={`eg-hero eg-hero--${emergency.id}`}>
          <div className="eg-hero__copy">
            <p className="eg-eyebrow">DENTAL EMERGENCY TRAINING</p>
            <h1>{emergency.title}<span>– Emergency Management</span></h1>
            <p className="eg-hero__introduction">{emergency.introduction}</p>
          </div>
          <div className="eg-hero__art">
            <span className="eg-hero__icon"><Icon size={38} strokeWidth={1.6} /></span>
            <ImagePlaceholder label="Emergency overview" />
          </div>
        </header>

        <nav className="eg-jump-links" aria-label="Guide sections">
          {sections.filter((section) => section.kind === "heading" || section.kind === "decision").map((section, index) => {
            const label = section.kind === "heading" ? section.value : section.question;
            return <a href={`#${getSectionId(label, sections.indexOf(section))}`} key={`${label}-${index}`}>{label}<ArrowRight size={14} /></a>;
          })}
        </nav>

        <div className="eg-content">
          {sections.map((section, index) => (
            <ContentSection
              section={section}
              index={index}
              parentHeading={getParentHeading(sections, index)}
              key={`${section.kind}-${index}`}
            />
          ))}
        </div>

        <aside className="eg-review-card">
          <div className="eg-review-card__icon"><ShieldAlert size={21} /></div>
          <div><h2>Important before putting this content on the website</h2><p>{reviewNotice}</p></div>
          <button type="button" onClick={() => setModal("review")}>Clinical review <ArrowRight size={16} /></button>
        </aside>

        <footer className="eg-footer">
          <p>Educational and quick-reference material</p>
          <button type="button" onClick={() => setModal("references")}>References <ArrowRight size={16} /></button>
          <Link to="/emergencies" className="eg-all-guides"><ArrowLeft size={16} /> All emergency guides</Link>
        </footer>
      </main>
      {modal && <Modal type={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

export default EmergencyGuide;

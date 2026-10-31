import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Brain,
  ChevronRight,
  Droplet,
  Eye,
  HeartPulse,
  LifeBuoy,
  ShieldAlert,
  Utensils,
  Wind,
  X,
} from "lucide-react";
import { createElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { emergencyData, references } from "../data/emergencyContent";
import FooterCredit from "../components/FooterCredit";
import "../styles/emergency-guide.css";

const signIcons = {
  Skin: ShieldAlert,
  Respiratory: Wind,
  "Cardiovascular (CVS)": HeartPulse,
  "Gastrointestinal (GI)": Activity,
};

const earlySignIconsByEmergency = {
  "vasovagal-syncope": Activity,
  "asthma-attacks": Wind,
};

const hypoglycemiaSignIcons = [
  { pattern: /sweating|tremor/i, icon: Droplet },
  { pattern: /hunger/i, icon: Utensils },
  { pattern: /confusion|irritability/i, icon: Brain },
  { pattern: /tachycardia/i, icon: HeartPulse },
  { pattern: /consciousness/i, icon: Eye },
];

const sectionIcons = {
  "Recognising the emergency": ShieldAlert,
  "Initial emergency actions": Activity,
  "Suspected collapse": HeartPulse,
  "During resuscitation": HeartPulse,
  "If the patient becomes unresponsive after the seizure": Brain,
  "General emergency actions": LifeBuoy,
};

const reviewNotice = "This guide is based on the provided references. Clinical procedures, medication instructions, dosages, and emergency-response steps should be verified against current clinical guidelines."
function getEarlySignIcon(emergencyId, item) {
  if (emergencyId === "hypoglycemia") {
    return hypoglycemiaSignIcons.find(({ pattern }) => pattern.test(item))?.icon || Activity;
  }

  return earlySignIconsByEmergency[emergencyId] || Activity;
}

function getSectionId(value, index) {
  return `${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${index}`;
}

function getSectionIcon(value) {
  if (/pulse|breathing|collaps|resuscitation/i.test(value)) return HeartPulse;
  if (/seizure/i.test(value)) return Brain;
  if (/airway|breathing compromise/i.test(value)) return Wind;
  return sectionIcons[value] || Activity;
}

function getOrderedSections(emergency) {
  const contentSections = [...emergency.sections];
  const decisionSections = contentSections.filter((section) => section.kind === "decision");
  const remainingSections = contentSections.filter((section) => section.kind !== "decision");

  return [...remainingSections, ...decisionSections];
}

function isPulseBreathingDecision(section) {
  const branchHeadings = `${section.yesTitle} ${section.noTitle}`.toLowerCase();
  return /pulse present|pulse absent|breathing present|breathing absent/.test(branchHeadings)
    || /during resuscitation/i.test(section.question);
}

function StepList({ items, ordered = false }) {
  let orderedIndex = 0;

  return (
    <>
      <div className={`eg-step-list ${ordered ? "eg-step-list--ordered" : ""}`}>
        {items.map((item, index) => {
          const isNested = item.startsWith("-");
          const isNumbered = /^\d+\.\s/.test(item);
          const isSubheading = !isNested && !isNumbered && (
            item.endsWith(":") || /^(If the patient|If there are|If the seizure|During resuscitation|Chest compressions|Decision point)/i.test(item)
            || item === "Continue CPR until:"
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
    <section
      className={`eg-section eg-decision ${showBothBranches ? "eg-decision--checkpoint" : ""}`}
      id={getSectionId(section.question, index)}
    >
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
              <StepList items={branch.items || []} ordered />
            </article>
          ))}
        </div>
      ) : selectedBranchData && (
        <div className="eg-decision__branches eg-decision__branches--selected" aria-live="polite">
          <article className={`eg-branch eg-branch--${selectedBranchData.tone}`} key={selectedBranchData.title}>
            <div className="eg-branch__heading"><span>{selectedBranchData.label}</span><h3>{selectedBranchData.title}</h3></div>
            <StepList items={selectedBranchData.items || []} ordered />
          </article>
        </div>
      )}
    </section>
  );
}

function PathwaysSection({ section, index }) {
  const icons = [Brain, Wind, HeartPulse];

  return (
    <section className="eg-section eg-pathway-map" id={getSectionId(section.question, index)}>
      <div className="eg-section__heading">
        <span className="eg-section__index">{createElement(getSectionIcon(section.question), { size: 19, strokeWidth: 1.8 })}</span>
        <div>
          <p className="eg-eyebrow">EMERGENCY MANAGEMENT</p>
          <h2>{section.question}</h2>
        </div>
      </div>
      <div className="eg-pathway-map__branches">
        {section.branches.map((branch, branchIndex) => {
          const Icon = icons[branchIndex] || Activity;
          return (
            <article className={`eg-pathway-card eg-pathway-card--${branchIndex + 1}`} key={branch.title}>
              <div className="eg-pathway-card__heading">
                <span className="eg-pathway-card__icon"><Icon size={19} /></span>
                <h3>{branch.title}</h3>
              </div>
              <StepList items={branch.items} ordered />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function isEarlySignsList(sections, index) {
  const current = sections[index];
  const label = sections[index - 1];
  const heading = sections[index - 2];

  return current?.kind === "list"
    && label?.kind === "paragraph"
    && /^(early signs|signs):?$/i.test(label.value.trim())
    && heading?.kind === "heading"
    && /recognis/i.test(heading.value);
}

function isEarlySignsLabel(sections, index) {
  return sections[index]?.kind === "paragraph" && isEarlySignsList(sections, index + 1);
}

function ContentSection({ section, index, earlySignsLabel, emergencyId }) {
  if (section.kind === "pathways") {
    return <PathwaysSection section={section} index={index} />;
  }

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
    const isSigns = Boolean(earlySignsLabel)
      || section.items.some((item) => /^(Skin|Respiratory|Cardiovascular|Gastrointestinal):/.test(item));
    const content = isSigns ? (
      <div className="eg-sign-grid">
        {section.items.map((item) => {
          const [label, ...details] = item.split(":");
          const hasCategory = /^(Skin|Respiratory|Cardiovascular|Gastrointestinal)/.test(label);
          const Icon = signIcons[label] || getEarlySignIcon(emergencyId, item);
          return (
            <article className="eg-sign-card" key={item}>
              <span className="eg-sign-card__icon"><Icon size={19} aria-hidden="true" /></span>
              <p>{hasCategory ? <><strong>{label}:</strong> {details.join(":").trim()}</> : item}</p>
            </article>
          );
        })}
      </div>
    ) : (
      <StepList
        items={section.items}
        ordered={section.ordered}
      />
    );

    return earlySignsLabel ? (
      <div className="eg-early-signs">
        <p className="eg-early-signs__label">{earlySignsLabel}</p>
        {content}
      </div>
    ) : content;
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
      <div className="emergency-guide">
        <Navbar />
        <main className="eg-not-found">
          <ShieldAlert size={35} />
          <h1>Emergency guide unavailable</h1>
          <p>This emergency type is not in the current guide. Return to the emergency list and select a valid topic.</p>
          <Link to="/emergencies"><ArrowLeft size={17} /> View all emergencies</Link>
        </main>
        <FooterCredit />
      </div>
    );
  }

  const sections = getOrderedSections(emergency);

  return (
    <div className="emergency-guide">
      <Navbar />

      <main className="eg-main">
        <nav className="eg-breadcrumb" aria-label="Breadcrumb">
          <Link to="/emergencies">Emergency guides</Link><ChevronRight size={15} /><span>{emergency.title}</span>
        </nav>

        <header className={`eg-hero eg-hero--${emergency.id}`}>
          <div className="eg-hero__label">
            <p className="eg-eyebrow eg-hero__eyebrow">DENTAL EMERGENCY TRAINING</p>
          </div>
          <div className="eg-hero__body">
            <div className="eg-hero__copy">
              <h1>
                {emergency.title}
              </h1>
              <p className="eg-hero__introduction">{emergency.introduction}</p>
            </div>
            <figure className="eg-hero__art">
              <img
                className="eg-hero__photo"
                src={emergency.image}
                alt={emergency.imageAlt}
                loading="eager"
              />
              {(emergency.imageCredit || emergency.image.startsWith("https://images.unsplash.com/")) && (
                <figcaption className="eg-hero__photo-credit">
                  {emergency.imageCredit ? (
                    <a href={emergency.imageSourceUrl} target="_blank" rel="noreferrer">
                      {emergency.imageCredit}
                    </a>
                  ) : (
                    <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
                      Image source: Unsplash
                    </a>
                  )}
                </figcaption>
              )}
            </figure>
          </div>
        </header>

        <nav className="eg-jump-links" aria-label="Guide sections">
          {sections.filter((section) => section.kind === "heading" || section.kind === "decision" || section.kind === "pathways").map((section, index) => {
            const label = section.kind === "heading" ? section.value : section.question;
            return <a href={`#${getSectionId(label, sections.indexOf(section))}`} key={`${label}-${index}`}>{label}<ArrowRight size={14} /></a>;
          })}
        </nav>

        <div className="eg-content">
          {sections.map((section, index) => isEarlySignsLabel(sections, index) ? null : (
            <ContentSection
              section={section}
              index={index}
              earlySignsLabel={isEarlySignsList(sections, index) ? sections[index - 1].value : undefined}
              emergencyId={emergency.id}
              key={`${section.kind}-${index}`}
            />
          ))}
        </div>

        <aside className="eg-review-card">
          <div className="eg-review-card__icon"><ShieldAlert size={21} /></div>
          <div><h2>Important Medical Disclaimer</h2><p>{reviewNotice}</p></div>
          <button type="button" onClick={() => setModal("review")}>Clinical review <ArrowRight size={16} /></button>
        </aside>

        <footer className="eg-footer">
          <p>Educational and quick-reference material</p>
          <button type="button" onClick={() => setModal("references")}>References <ArrowRight size={16} /></button>
          <Link to="/emergencies" className="eg-all-guides"><ArrowLeft size={16} /> All emergency guides</Link>
        </footer>
      </main>
      <FooterCredit />
      {modal && <Modal type={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

export default EmergencyGuide;

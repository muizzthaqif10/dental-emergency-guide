import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Home,
  LifeBuoy,
  PhoneCall,
  ShieldAlert,
  Syringe,
  Wind,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "../styles/anaphylaxis-guide.css";

const emergency = {
  introduction:
    "A rapidly progressive allergic reaction involving skin, respiratory and cardiovascular effects that can become life-threatening within minutes.",
  signs: [
    ["Skin", "Urticaria, rash and swelling"],
    ["Respiratory", "Wheezing, stridor and dyspnea"],
    ["Cardiovascular (CVS)", "Hypotension and tachycardia"],
    ["Gastrointestinal (GI)", "Nausea and vomiting"],
  ],
  initial: [
    "Stop dental treatment and remove all agents.",
    "Call for help immediately.",
    "Supine with legs elevated if hypotensive.",
    "Sit upright if experiencing breathing difficulty.",
    "Airway — check.",
    "Breathing — assess.",
    "Circulation — monitor.",
  ],
  question: "Decision: Is there airway or breathing compromise?",
  compromised: [
    "1. Immediate key step: Adrenaline (epinephrine) 0.5 mg IM (1:1000) is the first and life-saving drug.",
    "2. Airway: Maintain the airway and prepare for possible airway obstruction due to laryngeal edema.",
    "3. Breathing: Give high-flow oxygen and assist ventilation if needed.",
    "4. Circulation: Monitor pulse and blood pressure.",
    "5. Repeat adrenaline: Every five minutes if there is no improvement.",
    "6. Adjunct drugs: Antihistamines and corticosteroids.",
    "7. Emergency transfer: Call an ambulance and refer immediately.",
  ],
  uncomplicated: [
    "1. Give adrenaline IM early to prevent progression.",
    "2. Administer oxygen.",
    "3. Monitor ABC closely.",
    "4. Adjunct drugs: Antihistamines and corticosteroids.",
    "5. Observe carefully because the condition may progress rapidly.",
    "6. Arrange medical transfer.",
  ],
  collapse: [
    "Pulse absent: Start CPR immediately.",
    "Pulse present: Continue oxygen and adrenaline and monitor closely.",
  ],
};

const pages = [
  { id: "overview", label: "Emergency overview", short: "Overview" },
  { id: "initial-actions", label: "Initial actions", short: "First actions" },
  { id: "decision", label: "Decision point", short: "Decision" },
  { id: "compromise", label: "Airway / breathing", short: "YES pathway" },
  { id: "no-compromise", label: "No compromise", short: "NO pathway" },
  { id: "collapse", label: "Patient collapse", short: "Collapse" },
];

function StepCard({ number, title, children, icon: Icon, tone = "teal" }) {
  return (
    <article className={`an-card an-card--${tone}`}>
      <span className="an-card__number">{String(number).padStart(2, "0")}</span>
      {Icon && (
        <span className="an-card__icon" aria-hidden="true">
          <Icon size={19} strokeWidth={1.8} />
        </span>
      )}
      <div className="an-card__body">
        {title && <h3>{title}</h3>}
        <div className="an-card__copy">{children}</div>
      </div>
    </article>
  );
}

function PatientIllustration({ upright = false }) {
  return (
    <svg viewBox="0 0 360 190" role="img" aria-label={upright ? "Patient positioned upright in a dental chair" : "Patient lying supine with legs elevated"}>
      <path d="M16 163h326" stroke="#d7e1df" strokeWidth="2" />
      <path d={upright ? "M98 146V79h34v67m0-51h89" : "M62 145V104h46"} fill="none" stroke="#aebfbd" strokeWidth="5" strokeLinecap="round" />
      {upright ? (
        <>
          <circle cx="183" cy="60" r="19" fill="#e6c6b4" stroke="#244c59" strokeWidth="3" />
          <path d="M177 82c-14 10-22 22-23 39l7 22m14-60 29 6 17 28m-62 4 51-1" fill="none" stroke="#387c79" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M195 89h34" stroke="#7ca8a1" strokeWidth="3" strokeDasharray="4 5" />
          <path d="m221 82 9 7-9 7" fill="none" stroke="#7ca8a1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <circle cx="88" cy="87" r="17" fill="#e6c6b4" stroke="#244c59" strokeWidth="3" />
          <path d="M106 91c21 7 34 8 57 3l28-17 41 1 30-25" fill="none" stroke="#387c79" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m224 78 31-29 32 1" fill="none" stroke="#387c79" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M284 45V19m-9 10 9-10 9 10" fill="none" stroke="#b94840" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      <path d="M78 147h194" stroke="#244c59" strokeWidth="5" strokeLinecap="round" />
      <path d="M104 148v14m149-14v14" stroke="#aebfbd" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function NumberedList({ items, icons = [], firstNumber = 1 }) {
  return (
    <div className="an-steps">
      {items.map((item, index) => {
        const [label, ...details] = item.replace(/^\d+\.\s*/, "").split(": ");
        const Icon = icons[index] || Activity;
        return (
          <StepCard key={item} number={firstNumber + index} icon={Icon}>
            {details.length ? (
              <p><strong>{label}:</strong> {details.join(": ")}</p>
            ) : (
              <p>{item.replace(/^\d+\.\s*/, "")}</p>
            )}
          </StepCard>
        );
      })}
    </div>
  );
}

function DecisionFlow({ branches }) {
  return (
    <div className="an-flow">
      <div className="an-flow__question"><ShieldAlert size={22} />{emergency.question}</div>
      <div className="an-flow__stem" aria-hidden="true"><ArrowDown size={20} /></div>
      <div className="an-flow__branches">
        {branches.map((branch) => (
          <Link
            className={`an-flow__branch an-flow__branch--${branch.tone}`}
            to={`/emergencies/anaphylaxis/${branch.to}`}
            key={branch.label}
          >
            <span className="an-flow__answer">{branch.label}</span>
            <strong>{branch.title}</strong>
            <span className="an-flow__go">View pathway <ArrowRight size={16} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CollapseFlow() {
  return (
    <div className="an-collapse-flow">
      <div className="an-collapse-flow__question"><HeartPulse size={23} />Patient collapse</div>
      <div className="an-flow__stem" aria-hidden="true"><ArrowDown size={20} /></div>
      <div className="an-collapse-flow__branches">
        {emergency.collapse.map((branch, index) => {
          const absent = index === 0;
          const [label, instruction] = branch.split(": ");
          return (
            <article className={`an-pulse-branch ${absent ? "an-pulse-branch--red" : ""}`} key={branch}>
              <span className="an-flow__answer">{label}:</span>
              <span className="an-pulse-branch__icon">{absent ? <Activity /> : <HeartPulse />}</span>
              <p>{instruction}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function AnaphylaxisGuide() {
  const { step = "overview" } = useParams();
  const index = pages.findIndex((page) => page.id === step);
  const pageIndex = index < 0 ? 0 : index;
  const page = pages[pageIndex];
  const previous = pages[pageIndex - 1];
  const next = pages[pageIndex + 1];

  return (
    <div className="an-guide">
      <header className="an-topbar">
        <Link to="/emergencies" className="an-brand"><span className="an-brand__mark"><Activity size={19} /></span><span>MAHSA INTERNATIONAL COLLEGE<small>CLINICAL EMERGENCY QUICK REFERENCE</small></span></Link>
        <div className="an-topbar__right">
          <span className="an-status"><span />DENTAL EMERGENCY MANAGEMENT</span>
          <Link to="/" className="an-home"><Home size={16} /> Home</Link>
        </div>
      </header>

      <div className="an-layout">
        <aside className="an-sidebar" aria-label="Guide pages">
          <Link className="an-back" to="/emergencies"><ArrowLeft size={16} /> All emergencies</Link>
          <p className="an-sidebar__eyebrow">ANAPHYLAXIS</p>
          <nav>
            {pages.map((item, navIndex) => (
              <Link
                key={item.id}
                to={`/emergencies/anaphylaxis/${item.id}`}
                aria-current={item.id === page.id ? "page" : undefined}
                className={`an-nav-item ${item.id === page.id ? "is-active" : ""}`}
              >
                <span className="an-nav-item__number">{String(navIndex + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
                {navIndex < pageIndex && <Check className="an-nav-item__check" size={15} />}
              </Link>
            ))}
          </nav>
          <div className="an-sidebar__note"><LifeBuoy size={18} /><p>For clinical training and emergency reference.</p></div>
        </aside>

        <main className="an-main">
          <div className="an-breadcrumb"><span>Emergency guide</span><ChevronRight size={14} /><span>Anaphylaxis</span><ChevronRight size={14} /><strong>{page.label}</strong></div>
          <section className="an-title">
            <div>
              <p className="an-kicker">EMERGENCY MANAGEMENT <span>•</span> {String(pageIndex + 1).padStart(2, "0")} / 06</p>
              <h1>Anaphylaxis <span>– Emergency Management</span></h1>
              <p className="an-title__subtitle">{page.label}</p>
            </div>
            <div className="an-title__badge"><ShieldAlert size={19} /><span>TIME-CRITICAL<small>Recognise and respond</small></span></div>
          </section>

          {page.id === "overview" && (
            <>
              <div className="an-introduction"><span className="an-introduction__icon"><Activity size={21} /></span><p>{emergency.introduction}</p></div>
              <div className="an-section-heading"><span>01</span><div><h2>Recognising the emergency</h2><p>Signs:</p></div></div>
              <div className="an-sign-grid">
                {emergency.signs.map(([system, signs], signIndex) => {
                  const icons = [ShieldAlert, Wind, HeartPulse, Activity];
                  const Icon = icons[signIndex];
                  return <article className="an-sign-card" key={system}><span className="an-sign-card__icon"><Icon size={21} /></span><div><h3>{system}</h3><p>{signs}</p></div></article>;
                })}
              </div>
              <DecisionFlow branches={[
                { label: "YES", title: "If airway or breathing compromise is present", to: "compromise", tone: "red" },
                { label: "NO", title: "If there is no airway or breathing compromise", to: "no-compromise", tone: "teal" },
              ]} />
            </>
          )}

          {page.id === "initial-actions" && (
            <>
              <div className="an-section-heading"><span>02</span><div><h2>Initial emergency actions</h2><p>Take these actions and assess ABC</p></div></div>
              <div className="an-initial-layout">
                <div className="an-steps">
                  <StepCard number={1} icon={Activity}><p>{emergency.initial[0]}</p></StepCard>
                  <StepCard number={2} icon={PhoneCall} tone="red"><p>{emergency.initial[1]}</p></StepCard>
                  <StepCard number={3} title="Position:" icon={ArrowUpRight}><p>{emergency.initial[2]}</p><p>{emergency.initial[3]}</p></StepCard>
                  <StepCard number={4} title="Follow ABC:" icon={Activity}><p>Airway — check.</p><p>Breathing — assess.</p><p>Circulation — monitor.</p></StepCard>
                </div>
                <aside className="an-patient-panel"><div className="an-patient-panel__label"><Activity size={16} /> PATIENT POSITIONING</div><div className="an-patient-panel__position"><PatientIllustration /><p>{emergency.initial[2]}</p></div><div className="an-patient-panel__position"><PatientIllustration upright /><p>{emergency.initial[3]}</p></div></aside>
              </div>
              <div className="an-inline-decision"><p>{emergency.question}</p><Link to="/emergencies/anaphylaxis/decision">Continue to decision <ArrowRight size={16} /></Link></div>
            </>
          )}

          {page.id === "decision" && (
            <>
              <div className="an-section-heading"><span>03</span><div><h2>Decision point</h2><p>Follow the appropriate pathway</p></div></div>
              <DecisionFlow branches={[
                { label: "YES", title: "If airway or breathing compromise is present", to: "compromise", tone: "red" },
                { label: "NO", title: "If there is no airway or breathing compromise", to: "no-compromise", tone: "teal" },
              ]} />
              <div className="an-decision-help"><Wind size={21} /><p>Choose the pathway that matches the patient’s presentation.</p></div>
            </>
          )}

          {page.id === "compromise" && (
            <>
              <div className="an-pathway-heading an-pathway-heading--red"><span className="an-pathway-heading__mark">YES</span><div><p>Airway or breathing compromise</p><h2>Immediate response pathway</h2></div></div>
              <article className="an-adrenaline"><div className="an-adrenaline__header"><span><Syringe size={20} /> IMMEDIATE KEY STEP</span><span>01 / 07</span></div><p>{emergency.compromised[0]}</p><span className="an-adrenaline__dose">0.5 mg IM <i>(1:1000)</i></span></article>
              <NumberedList items={emergency.compromised.slice(1)} firstNumber={2} icons={[Wind, Activity, HeartPulse, Syringe, ShieldAlert, PhoneCall]} />
              <Link className="an-secondary-link" to="/emergencies/anaphylaxis/collapse">Continue to patient collapse <ArrowRight size={16} /></Link>
            </>
          )}

          {page.id === "no-compromise" && (
            <>
              <div className="an-pathway-heading"><span className="an-pathway-heading__mark">NO</span><div><p>No airway or breathing compromise</p><h2>Early intervention pathway</h2></div></div>
              <NumberedList items={emergency.uncomplicated} icons={[Syringe, Activity, HeartPulse, ShieldAlert, Activity, PhoneCall]} />
              <div className="an-collapse-teaser"><div><HeartPulse size={20} /><p>If the patient collapses:</p></div><CollapseFlow /></div>
            </>
          )}

          {page.id === "collapse" && (
            <>
              <div className="an-pathway-heading an-pathway-heading--red"><span className="an-pathway-heading__mark"><HeartPulse size={22} /></span><div><p>Patient collapse</p><h2>Decision point:</h2></div></div>
              <CollapseFlow />
            </>
          )}

          <div className="an-clinical-notice"><ShieldAlert size={19} /><div><strong>Clinical verification required</strong><p>This guide is for educational and quick-reference purposes only and does not replace professional training or clinical judgment. Medication instructions, doses and emergency-response steps require review by a qualified clinician before publication.</p></div></div>

          <footer className="an-pagination">
            {previous ? <Link to={`/emergencies/anaphylaxis/${previous.id}`} className="an-page-button"><ChevronLeft size={17} /><span>Previous<small>{previous.label}</small></span></Link> : <Link to="/emergencies" className="an-page-button"><ChevronLeft size={17} /><span>Back<small>All emergencies</small></span></Link>}
            <span className="an-page-count">PAGE {String(pageIndex + 1).padStart(2, "0")} OF 06</span>
            {next ? <Link to={`/emergencies/anaphylaxis/${next.id}`} className="an-page-button an-page-button--next"><span>Next<small>{next.label}</small></span><ChevronRight size={17} /></Link> : <Link to="/emergencies" className="an-page-button an-page-button--next"><span>Finish<small>All emergencies</small></span><ChevronRight size={17} /></Link>}
          </footer>
        </main>
      </div>
    </div>
  );
}

export default AnaphylaxisGuide;

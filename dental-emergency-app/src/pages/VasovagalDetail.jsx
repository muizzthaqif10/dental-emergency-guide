import {
  Activity,
  ArrowLeft,
  Check,
  House,
  UserRound
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { emergencies } from "../data/emergencies";
import { references } from "../data/emergencyContent";

const vasovagal = emergencies.find((item) => item.id === "vasovagal-syncope");

const pulseDecision = vasovagal.content[2].items.find((item) => item.startsWith("Decision point:"));
const pulseBranches = pulseDecision
  .replace("Decision point: ", "")
  .split(". If pulse is absent, ")
  .map((branch, index) => index === 0 ? `${branch}.` : `If pulse is absent, ${branch}`);

function ClinicalIllustration({ type, label }) {
  if (type === "overview") {
    return (
      <svg viewBox="0 0 320 220" role="img" aria-label={label} className="h-auto w-full">
        <rect x="16" y="16" width="288" height="188" rx="12" fill="#eef5f2" />
        <path d="M41 174h241" stroke="#c8d8d2" strokeWidth="3" />
        <path d="M77 154V89h31v65m0-43h103v42" fill="#dce9e4" stroke="#829f99" strokeWidth="3" />
        <path d="M114 117h90" stroke="#829f99" strokeWidth="3" />
        <circle cx="157" cy="72" r="21" fill="#f1d8c9" stroke="#2d6268" strokeWidth="3" />
        <path d="M176 70c-3-14-13-23-27-21" fill="none" stroke="#173f50" strokeLinecap="round" strokeWidth="6" />
        <path d="M151 95c-14 7-21 16-27 29l-12 25m45-53 29 16 20-1" fill="none" stroke="#2d6268" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
        <path d="m185 111 33-22 30 2" fill="none" stroke="#2d6268" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
        <path d="M117 149h60" stroke="#2d6268" strokeLinecap="round" strokeWidth="11" />
        <path d="M214 85V51m-8 10 8-10 8 10" fill="none" stroke="#a85c4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M57 73c-9-12 7-24 17-13 10-11 26 1 17 13L74 91 57 73Z" fill="#f3e4df" stroke="#a85c4d" strokeWidth="2" />
        <path d="m59 116 4-9 4 9 4-9 4 9 4-9 4 9" fill="none" stroke="#397a77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    );
  }

  if (type === "position") {
    return (
      <svg viewBox="0 0 320 190" role="img" aria-label={label} className="h-auto w-full">
        <rect x="8" y="8" width="304" height="174" rx="10" fill="#eff5f2" />
        <path d="M31 145h257M45 145V105h46" fill="none" stroke="#9aadb3" strokeWidth="3" />
        <path d="M89 105h41l36-39 42 2 28 27" fill="none" stroke="#246c75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
        <circle cx="67" cy="94" r="20" fill="#f1d8c9" stroke="#246c75" strokeWidth="4" />
        <path d="M164 67 194 35l42 2 28 29" fill="none" stroke="#246c75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
        <path d="m191 37 7 27m36-26 2 25" fill="none" stroke="#a4beb8" strokeWidth="4" />
        <path d="M141 163h74" fill="none" stroke="#cad8d4" strokeDasharray="5 6" strokeWidth="2.5" />
        <path d="m188 154 9 9-9 9" fill="none" stroke="#246c75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>
    );
  }

  if (type === "airway") {
    return (
      <svg viewBox="0 0 260 150" role="img" aria-label={label} className="h-auto w-full">
        <path d="M40 117h176" fill="none" stroke="#bdcbc8" strokeWidth="3" />
        <path d="M70 89c20-15 41-18 66-12l30 8" fill="none" stroke="#246c75" strokeLinecap="round" strokeWidth="7" />
        <circle cx="59" cy="79" r="22" fill="#e5efec" stroke="#246c75" strokeWidth="4" />
        <path d="m72 68 13 5-7 10m-16 18 14 4" fill="none" stroke="#246c75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M155 57c12 6 20 15 22 28" fill="none" stroke="#73aaa2" strokeLinecap="round" strokeWidth="3" />
        <path d="m169 78 8 8 5-10" fill="none" stroke="#73aaa2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <circle cx="177" cy="100" r="5" fill="#c05a4b" />
        <path d="M186 99h25" fill="none" stroke="#c05a4b" strokeDasharray="3 4" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 260 150" role="img" aria-label={label} className="h-auto w-full">
      <path d="M33 116h194" fill="none" stroke="#bdcbc8" strokeWidth="3" />
      <path d="M57 104h69l25-17 24 7 23 10" fill="none" stroke="#246c75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <circle cx="45" cy="94" r="15" fill="#e5efec" stroke="#246c75" strokeWidth="4" />
      <path d="M135 91h38m-26-11 9 11-9 11" fill="none" stroke="#c05a4b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <path d="M159 51v24m-10-14 10 14 10-14" fill="none" stroke="#c05a4b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <path d="M206 42c-6-8-18-4-18 5 0 11 18 20 18 20s18-9 18-20c0-9-12-13-18-5Z" fill="#f7e8e5" stroke="#b64d42" strokeWidth="2" />
    </svg>
  );
}

function NumberedSteps({ items, firstNumber = 1, illustration }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
      <ol className="space-y-3">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="group flex gap-4 border border-[#dce5e2] bg-white p-4 shadow-[0_3px_12px_rgba(23,53,72,0.035)] transition-colors hover:border-[#a9c6bd] sm:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9ded5] bg-[#edf5f1] text-sm font-bold text-[#205b61] transition-colors group-hover:bg-[#dcebe5]">
              {firstNumber + index}
            </span>
            <p className="pt-1 text-base leading-7 text-[#263b45]">{item}</p>
          </li>
        ))}
      </ol>
      {illustration && (
        <aside className="flex flex-col justify-center border border-[#d4e1dc] bg-[#f0f5f2] p-4">
          <ClinicalIllustration type={illustration.type} label={illustration.label} />
          <p className="mt-3 border-t border-[#d7e3de] pt-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#45636a]">{illustration.caption}</p>
        </aside>
      )}
    </div>
  );
}

function OverviewPage() {
  const recognition = vasovagal.content[0];
  const signs = recognition.items.filter((item) => item !== "Early signs:" && !item.startsWith("Decision:"));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-6 w-1 bg-[#3d827b]" aria-hidden="true" />
          <p className="text-base font-bold text-[#29444f]">{recognition.items.find((item) => item === "Early signs:")}</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {signs.map((sign, index) => (
            <li key={sign} className="flex min-h-14 items-start gap-3 border border-[#e0e8e4] bg-white px-4 py-3 text-sm leading-6 text-[#263b45]">
              <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#e7f1ed] text-[10px] font-bold text-[#28646a]">{index + 1}</span>
              {sign}
            </li>
          ))}
        </ul>
      </section>
      <aside className="flex flex-col justify-center border border-[#d4e1dc] bg-[#eef4f1] p-4">
        <ClinicalIllustration
          type="overview"
          label="Clinical illustration of a patient supported in a dental chair"
        />
        <p className="mt-2 border-t border-[#d7e3de] pt-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#45636a]">Vasovagal Syncope</p>
      </aside>
    </div>
  );
}

function PulseDecisionSection({ selectedPulse, onSelectPulse }) {
  const pulsePresent = pulseBranches[0];
  const pulseAbsent = pulseBranches[1];

  return (
    <section className="mt-8 border-t border-[#d9e1de] pt-6">
      <div className="flex items-start gap-4 border border-[#cbded7] bg-[#edf4f1] px-4 py-4 sm:px-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cbded7] bg-white text-[#28646a]">
          <Activity className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#28646a]">Pulse check</p>
          <h4 className="mt-1 text-lg font-bold leading-snug text-[#173548]">Decision point:</h4>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { id: "present", label: "YES", title: "Pulse present", tone: "teal" },
          { id: "absent", label: "NO", title: "Pulse absent", tone: "red" }
        ].map((option) => {
          const selected = selectedPulse === option.id;
          const teal = option.tone === "teal";
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelectPulse(option.id)}
              className={[
                "flex min-h-16 items-center gap-3 border px-4 py-3 text-left transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                selected
                  ? teal
                    ? "border-[#1c5861] bg-[#e5f0eb] shadow-[inset_0_0_0_1px_#1c5861] focus-visible:outline-[#28646a]"
                    : "border-[#9b4d43] bg-[#fbefed] shadow-[inset_0_0_0_1px_#9b4d43] focus-visible:outline-[#a95045]"
                  : "border-[#dce5e2] bg-white hover:border-[#9bbdb2] hover:bg-[#f7f9f8] focus-visible:outline-[#28646a]"
              ].join(" ")}
            >
              <span className={[
                "flex h-9 w-12 shrink-0 items-center justify-center text-xs font-bold text-white",
                teal ? "bg-[#28646a]" : "bg-[#8e4b43]"
              ].join(" ")}>{option.label}</span>
              <span className="font-semibold text-[#173548]">{option.title}</span>
              {selected && <Check className="ml-auto h-4 w-4 text-[#28646a]" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {selectedPulse && (
        <div
          className={[
            "mt-4 border-l-4 px-4 py-4 text-base leading-7",
            selectedPulse === "present"
              ? "border-[#28646a] bg-[#eef5f2] text-[#263b45]"
              : "border-[#a95045] bg-[#fbf2f0] font-semibold text-[#743c35]"
          ].join(" ")}
          aria-live="polite"
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em]">
            {selectedPulse === "present" ? "YES — Pulse present" : "NO — Pulse absent"}
          </p>
          {selectedPulse === "present" ? pulsePresent : pulseAbsent}
        </div>
      )}
    </section>
  );
}

function ConsciousDecisionPage({ selectedConscious, onSelectConscious, selectedPulse, onSelectPulse }) {
  const question = vasovagal.content[0].items.find((item) => item.startsWith("Decision:"));
  const consciousItems = vasovagal.content[1].items;
  const unconsciousItems = vasovagal.content[2].items.slice(0, 5);

  return (
    <section>
      <div className="flex items-start gap-4 border border-[#d1e0da] bg-[#eaf2ee] px-4 py-5 sm:px-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#183f50] text-sm font-bold text-white shadow-sm">
          1
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#28646a]">Assessment · Consciousness</p>
          <h3 className="mt-1 text-xl font-bold leading-snug text-[#173548] sm:text-2xl">{question}</h3>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          { id: "yes", label: "YES", heading: vasovagal.content[1].heading, tone: "teal" },
          { id: "no", label: "NO", heading: vasovagal.content[2].heading, tone: "red" }
        ].map((option) => {
          const selected = selectedConscious === option.id;
          const teal = option.tone === "teal";
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                onSelectConscious(option.id);
                onSelectPulse(null);
              }}
              className={[
                "flex min-h-20 items-center gap-4 border p-4 text-left transition-colors sm:p-5",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                selected
                  ? teal
                    ? "border-[#1c5861] bg-[#e5f0eb] shadow-[inset_0_0_0_1px_#1c5861] focus-visible:outline-[#28646a]"
                    : "border-[#9b4d43] bg-[#fbefed] shadow-[inset_0_0_0_1px_#9b4d43] focus-visible:outline-[#a95045]"
                  : "border-[#dce5e2] bg-white hover:border-[#9bbdb2] hover:bg-[#f7f9f8] focus-visible:outline-[#28646a]"
              ].join(" ")}
            >
              <span className={[
                "flex h-10 w-12 shrink-0 items-center justify-center text-xs font-bold text-white",
                teal ? "bg-[#28646a]" : "bg-[#8e4b43]"
              ].join(" ")}>{option.label}</span>
              <span className="font-semibold leading-6 text-[#173548]">{option.heading}</span>
              {selected && <Check className="ml-auto h-4 w-4 shrink-0 text-[#28646a]" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {selectedConscious && (
        <div className="mt-6 border-t border-[#d9e1de] pt-5" aria-live="polite">
          <p className={[
            "mb-4 inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em]",
            selectedConscious === "yes"
              ? "border-[#cbded7] bg-[#e8f2ef] text-[#205b61]"
              : "border-[#e4d3d0] bg-[#fbefed] text-[#8e4b43]"
          ].join(" ")}>
            {selectedConscious === "yes" ? "YES SELECTED" : "NO SELECTED"}
            <span className="normal-case tracking-normal">
              {selectedConscious === "yes" ? vasovagal.content[1].heading : vasovagal.content[2].heading}
            </span>
          </p>

          {selectedConscious === "yes" ? (
            <NumberedSteps
              items={consciousItems}
              illustration={{
                type: "position",
                label: "Line illustration of a patient lying flat with legs elevated",
                caption: "Patient positioning"
              }}
            />
          ) : (
            <>
              <NumberedSteps
                items={unconsciousItems}
                illustration={{
                  type: "airway",
                  label: "Line illustration representing airway assessment",
                  caption: "Airway and breathing assessment"
                }}
              />
              <PulseDecisionSection selectedPulse={selectedPulse} onSelectPulse={onSelectPulse} />
            </>
          )}
        </div>
      )}
    </section>
  );
}

function VasovagalDetail() {
  const [selectedConscious, setSelectedConscious] = useState(null);
  const [selectedPulse, setSelectedPulse] = useState(null);

  return (
    <div className="min-h-screen bg-[#eef3f1] text-[#20313b]">
      <header className="border-b border-[#dce4e0] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/emergencies" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#29444f] transition-colors hover:text-[#1c5861] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All emergency types
          </Link>
          <Link to="/" aria-label="Home" className="inline-flex h-10 w-10 items-center justify-center border border-[#dce4e0] text-[#29444f] transition-colors hover:bg-[#f3f7f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
            <House className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9">
        <article className="overflow-hidden border border-[#d3dfda] border-t-4 border-t-[#377a75] bg-white shadow-[0_14px_38px_rgba(23,53,72,0.08)]">
          <header className="bg-[#173548] px-5 py-6 text-white sm:px-8 sm:py-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 bg-white/10 text-[#c7e3d9]">
                <UserRound className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b6d8cd]">Dental emergency training</p>
                <h1 className="mt-1 text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                  Vasovagal Syncope – Emergency Management
                </h1>
                <p className="mt-2 text-sm text-slate-200">Fainting</p>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <section aria-labelledby="overview-heading">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#dce5e1] pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397b75]">Emergency overview</p>
                  <h2 id="overview-heading" className="mt-1 text-xl font-bold text-[#173548] sm:text-2xl">
                  Recognising the emergency
                  </h2>
                </div>
                <span className="hidden text-xs font-medium text-slate-500 sm:block">Early signs</span>
              </div>
              <OverviewPage />
            </section>

            <section className="mt-8 border-t-2 border-[#d6e1dd] pt-6" aria-labelledby="patient-response-heading" aria-live="polite">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#dce5e1] pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397b75]">Patient response</p>
                  <h2 id="patient-response-heading" className="mt-1 text-xl font-bold text-[#173548] sm:text-2xl">
                  Is the patient conscious?
                  </h2>
                </div>
                <span className="hidden text-xs font-medium text-slate-500 sm:block">Select one response</span>
              </div>
              <ConsciousDecisionPage
                selectedConscious={selectedConscious}
                onSelectConscious={setSelectedConscious}
                selectedPulse={selectedPulse}
                onSelectPulse={setSelectedPulse}
              />
            </section>
          </div>
        </article>

        <aside className="mt-5 border border-[#e5d8ce] bg-[#fbf6f0] p-4 sm:p-5">
          <h2 className="text-sm font-bold text-[#694b3e]">Clinical wording for professional verification</h2>
          <p className="mt-2 text-sm leading-6 text-[#624e45]">
            The following wording is retained from the supplied guide and is presented unchanged for qualified clinical review: “Trendelenburg position”, “give rescue breathing”, “oral glucose if hypoglycaemia is suspected” and “consider IV glucose or further management.”
          </p>
        </aside>

        <footer className="mt-7 border-t border-[#d5dfda] pt-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#173548]">References</h2>
          <ol className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
            {references.map((reference) => <li key={reference}>{reference}</li>)}
          </ol>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            This material is for educational use and should be reviewed by a qualified clinician before clinical use.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default VasovagalDetail;

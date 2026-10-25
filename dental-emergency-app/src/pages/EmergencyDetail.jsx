import { AlertTriangle, ArrowLeft, House, PhoneCall } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { emergencyData, references } from "../data/emergencyContent";

function extractActionItems(emergency) {
  const items = [];

  emergency.sections.forEach((section) => {
    if (section.kind === "list" && Array.isArray(section.items)) {
      section.items.forEach((item) => {
        if (typeof item !== "string") return;
        const normalized = item.trim();
        if (!normalized) return;
        if (/^\d+\./.test(normalized) || /^[-•*]/.test(normalized) || /:/.test(normalized)) {
          items.push(normalized);
        }
      });
    }

    if (section.kind === "decision") {
      const decisionItems = [...(section.yesItems || []), ...(section.noItems || [])];
      decisionItems.forEach((item) => {
        if (typeof item !== "string") return;
        const normalized = item.trim();
        if (!normalized) return;
        if (/^\d+\./.test(normalized) || /^[-•*]/.test(normalized) || /:/.test(normalized)) {
          items.push(normalized);
        }
      });
    }
  });

  return items
    .filter((item) => !item.toLowerCase().includes("decision point") && !item.toLowerCase().includes("if the patient") && !item.toLowerCase().includes("if the seizure"))
    .map((item) => {
      const text = item.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "").trim();
      if (!text) return null;

      if (text.includes(":")) {
        const [title, ...detailParts] = text.split(":");
        const detail = detailParts.join(":").trim();
        return {
          title: title.trim(),
          description: detail || "Follow the guidance for this step."
        };
      }

      const shortTitle = text.split(" ").slice(0, 5).join(" ");
      return {
        title: shortTitle,
        description: text
      };
    })
    .filter(Boolean)
    .slice(0, 6);
}

function extractKeySigns(emergency) {
  const signs = [];

  emergency.sections.forEach((section) => {
    if (section.kind !== "list" || !Array.isArray(section.items)) return;
    section.items.forEach((item) => {
      if (typeof item !== "string") return;
      const trimmed = item.trim();
      if (!trimmed) return;
      const cleaned = trimmed.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "");
      if (cleaned && !/^(stop|position|assess|monitor|call|check|give|start|allow|continue|place|remove|if|follow)/i.test(cleaned)) {
        signs.push(cleaned);
      }
    });
  });

  return signs.slice(0, 6);
}

function extractWarningSignals(emergency) {
  const warningMap = {
    "vasovagal-syncope": [
      "Loss of consciousness > 1 minute",
      "No pulse or abnormal breathing",
      "Chest pain or shortness of breath",
      "No improvement after positioning"
    ],
    anaphylaxis: [
      "Severe breathing difficulty",
      "Worsening swelling or wheeze",
      "Collapse or altered consciousness",
      "No response to adrenaline"
    ],
    hypoglycemia: [
      "Unconscious or fitting",
      "No response to glucose",
      "Severe confusion or collapse",
      "Breathing becomes abnormal"
    ],
    "cardiac-arrest": [
      "Unresponsive or no breathing",
      "No pulse or abnormal rhythm",
      "Chest pain or sudden collapse",
      "AED not available or no recovery"
    ],
    "asthma-attacks": [
      "Severe breathlessness",
      "Silent chest or cyanosis",
      "No response to inhaler",
      "Altered consciousness"
    ],
    epilepsy: [
      "Seizure > 5 minutes",
      "Repeated seizures",
      "No breathing after seizure",
      "Worsening post-ictal state"
    ],
    others: [
      "No pulse or abnormal breathing",
      "Patient remains unconscious",
      "No response to emergency care",
      "Cardiac arrest suspected"
    ]
  };

  return warningMap[emergency.id] || [
    "No response to initial management",
    "Breathing difficulty or collapse",
    "Persistent chest pain",
    "Need for emergency transfer"
  ];
}

function SubtitleTag({ emergency }) {
  const subtitles = {
    "vasovagal-syncope": "Fainting and lightheadedness",
    anaphylaxis: "Airway and allergic emergency",
    hypoglycemia: "Low blood sugar emergency",
    "cardiac-arrest": "Cardiopulmonary collapse",
    "asthma-attacks": "Breathing difficulty and wheeze",
    epilepsy: "Seizure management and protection",
    others: "General emergency pathway"
  };

  return subtitles[emergency.id] || emergency.category || emergency.title;
}

function EmergencyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const emergency = emergencyData.find((item) => item.id === id);

  if (!emergency) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-5">
        <div className="max-w-lg rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-600">Not found</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900">Emergency guide unavailable</h1>
          <p className="mt-3 text-slate-600">This emergency type is not in the current guide. Return to the emergency list and select a valid topic.</p>
          <button
            type="button"
            onClick={() => navigate("/emergencies")}
            className="mt-6 rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
          >
            View all emergencies
          </button>
        </div>
      </div>
    );
  }

  const actionSteps = extractActionItems(emergency);
  const keySigns = extractKeySigns(emergency);
  const warningSignals = extractWarningSignals(emergency);
  const earlySignsText = keySigns.length
    ? keySigns.join(" • ")
    : "Dizziness, sweating, pallor, nausea and transient loss of consciousness.";

  return (
    <div className="min-h-screen bg-[#eef2f5] px-4 py-8 text-slate-800 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/emergencies")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to emergencies
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700"
          >
            <House className="h-4 w-4" />
            Home
          </button>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-[#f6f8f9] shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
          <header className="rounded-t-[30px] bg-gradient-to-r from-[#0e2d42] via-[#123857] to-[#1b4a68] p-6 text-white md:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl lg:text-[4rem]">
                  {emergency.title}
                </h1>
                <p className="mt-4 text-xl font-medium text-slate-200 md:text-2xl">
                  <SubtitleTag emergency={emergency} />
                </p>
              </div>

              <div className="h-[160px] w-full max-w-[330px] overflow-hidden rounded-[18px] border border-white/20 bg-white/5 shadow-xl">
                <img src={emergency.image} alt={emergency.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 bg-white/5 px-5 py-4 md:px-6 xl:px-8">
            <div className="rounded-[18px] border border-[#d5edf1] bg-[#edf9fb] p-4 shadow-[0_12px_22px_rgba(15,118,143,0.06)]">
              <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#0f7b8a]">
                Recognise early signs
              </p>
              <p className="mt-2 text-base leading-7 text-slate-700 md:text-lg">
                {earlySignsText}
              </p>
            </div>
          </div>

          <main className="grid gap-6 p-5 md:p-6 xl:grid-cols-[1.65fr_0.85fr] xl:p-8">
            <section className="relative">
              <div className="absolute left-[23px] top-3 bottom-3 w-px bg-[#7ec9d9]" />

              <div className="space-y-4">
                {actionSteps.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="relative flex items-center rounded-[18px] border border-[#dfeaf1] bg-[#f8fbfc] p-4 shadow-[0_10px_24px_rgba(148,163,184,0.08)]"
                  >
                    <div className="relative z-10 mr-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7ec9d9] bg-[#dff5fb] text-lg font-black text-[#0f3d55]">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-[1.05rem] font-black text-slate-900 md:text-[1.2rem]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600 md:text-[0.98rem]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[22px] border border-[#cfe7ea] bg-[#edf9f9] p-4 shadow-sm md:p-5">
                <h2 className="text-[0.8rem] font-black uppercase tracking-[0.2em] text-[#0f7b8a]">
                  Key signs & symptoms
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
                  {keySigns.map((sign) => (
                    <li key={sign} className="relative pl-3 before:absolute before:left-0 before:top-[0.72rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#0f7b8a]">
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[22px] border border-[#f0c4c3] bg-[#fff5f4] p-4 shadow-sm md:p-5">
                <h2 className="text-[0.8rem] font-black uppercase tracking-[0.2em] text-[#d52b2b]">
                  Call for help if
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
                  {warningSignals.map((signal) => (
                    <li key={signal} className="relative pl-3 before:absolute before:left-0 before:top-[0.72rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#d52b2b]">
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </main>

          <div className="px-5 pb-6 md:px-6 md:pb-8 xl:px-8">
            <a
              href="tel:999"
              className="flex items-center justify-between gap-4 rounded-[20px] border border-[#f7b7b7] bg-[#f35f5f] px-4 py-4 text-white shadow-[0_20px_40px_rgba(243,95,95,0.22)] transition hover:bg-[#e84d4d] md:px-6"
            >
              <div className="flex items-center gap-3 text-lg font-black uppercase tracking-[0.08em] md:text-2xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/10">
                  <PhoneCall className="h-5 w-5" />
                </div>
                Emergency contact
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-red-50 md:text-sm">
                  Activate emergency response
                </p>
                <p className="text-sm text-red-50 md:text-base">Call for medical assistance immediately</p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-3xl font-black leading-none md:h-16 md:w-16 md:text-4xl">
                999
              </div>
            </a>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 md:px-6 md:py-6 xl:px-8">
            <div className="rounded-[18px] border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
                <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-800">Important</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                This content has been transcribed and organised from the presentation and should not be treated as independently medically validated. Medication instructions, doses and emergency-response steps require review by a qualified clinician before publication.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-black text-slate-900">References</h3>
              <ol className="mt-4 space-y-3 pl-6 text-sm leading-6 text-slate-700">
                {references.map((reference) => (
                  <li key={reference} className="list-decimal">
                    {reference}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyDetail;

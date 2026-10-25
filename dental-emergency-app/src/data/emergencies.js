export const emergencies = [
  {
    id: "vasovagal-syncope",
    title: "Vasovagal Syncope",
    image: "/images/vasovagal.jpg",
    category: "Fainting",
    summary: "A common fainting episode caused by a transient drop in cerebral blood flow, often preceded by dizziness, pallor, sweating and nausea.",
    content: [
      {
        heading: "Recognising the emergency",
        items: [
          "Early signs:",
          "Dizziness and nausea",
          "Sweating and pallor",
          "Tachycardia, followed by bradycardia",
          "Decreased blood pressure",
          "Decision: Is the patient conscious?"
        ]
      },
      {
        heading: "If the patient is conscious",
        ordered: true,
        items: [
          "Stop dental treatment.",
          "Position: Place the patient in a supine or Trendelenburg position and elevate the legs to increase cerebral blood flow.",
          "Airway: Ensure the airway is patent and loosen tight clothing.",
          "Breathing: Assess breathing and give oxygen if available.",
          "Circulation: Check pulse and blood pressure.",
          "Management: Reassure the patient and give oral glucose if hypoglycaemia is suspected.",
          "Monitor vital signs continuously.",
          "Recovery is usually rapid. Keep the patient under observation.",
          "If not improving: Call for medical assistance and consider IV glucose or further management."
        ]
      },
      {
        heading: "If the patient is unconscious",
        ordered: true,
        items: [
          "Stop treatment and call for help.",
          "Position: Place the patient supine with legs elevated.",
          "Airway: Perform a head tilt-chin lift and clear the airway.",
          "Breathing: Look, listen and feel. If breathing is absent, give rescue breathing.",
          "Circulation: Check the carotid pulse.",
          "Decision point: If pulse is present, continue oxygen, monitor vital signs and observe recovery. If pulse is absent, start CPR immediately and call emergency services."
        ]
      }
    ]
  },
  {
    id: "anaphylaxis",
    title: "Anaphylaxis",
    image: "/images/vasovagal.jpg",
    category: "Allergic reaction",
    summary: "A rapidly progressive allergic reaction involving skin, respiratory and cardiovascular effects that can become life-threatening within minutes.",
    content: [
      {
        heading: "Recognising the emergency",
        items: [
          "Signs:",
          "Skin: urticaria, rash and swelling",
          "Respiratory: wheezing, stridor and dyspnoea",
          "Cardiovascular: hypotension and tachycardia",
          "Gastrointestinal: nausea and vomiting",
          "Decision: Is there airway or breathing compromise?"
        ]
      },
      {
        heading: "Initial emergency actions",
        ordered: true,
        items: [
          "Stop dental treatment and remove all agents.",
          "Call for help immediately.",
          "Position: supine with legs elevated if hypotensive; sit upright if breathing is difficult.",
          "Follow ABC: airway, breathing and circulation."
        ]
      },
      {
        heading: "If airway or breathing compromise is present",
        ordered: true,
        items: [
          "Immediate key step: adrenaline (epinephrine) 0.5 mg IM (1:1000) as the first and life-saving drug.",
          "Airway: maintain the airway and prepare for possible laryngeal oedema.",
          "Breathing: give high-flow oxygen and assist ventilation if needed.",
          "Circulation: monitor pulse and blood pressure.",
          "Repeat adrenaline every five minutes if there is no improvement.",
          "Adjunct drugs: antihistamines and corticosteroids.",
          "Emergency transfer: call an ambulance and refer immediately."
        ]
      },
      {
        heading: "If there is no airway or breathing compromise",
        ordered: true,
        items: [
          "Give adrenaline IM early to prevent progression.",
          "Administer oxygen.",
          "Monitor ABC closely.",
          "Adjunct drugs: antihistamines and corticosteroids.",
          "Observe carefully because the condition may progress rapidly.",
          "Arrange medical transfer.",
          "If the patient collapses: pulse absent means start CPR immediately; pulse present means continue oxygen and adrenaline and monitor closely."
        ]
      }
    ]
  },
  {
    id: "hypoglycemia",
    title: "Hypoglycemia",
    image: "/images/vasovagal.jpg",
    category: "Low blood glucose",
    summary: "A drop in blood sugar that may cause sweating, tremor, confusion, tachycardia and reduced consciousness.",
    content: [
      {
        heading: "Recognising the emergency",
        items: [
          "Early signs:",
          "Sweating and tremors",
          "Hunger",
          "Confusion and irritability",
          "Tachycardia",
          "Decreased consciousness (late sign)",
          "Decision: Is the patient conscious?"
        ]
      },
      {
        heading: "If the patient is conscious",
        ordered: true,
        items: [
          "Stop dental treatment immediately.",
          "Position: sit the patient upright or semi-supine.",
          "Airway: ensure the airway is clear.",
          "Breathing: assess breathing and give oxygen if needed.",
          "Circulation: check pulse and blood pressure.",
          "Management: give oral glucose immediately, including glucose drink or gel, or sugar such as sweets or sugar lumps.",
          "Reassess after 5-10 minutes. If improved, continue observation; if not improved, repeat glucose.",
          "After recovery: give long-acting carbohydrate such as biscuits and postpone dental treatment.",
          "If still not improving: call for medical assistance and prepare for IV glucose."
        ]
      },
      {
        heading: "If the patient is unconscious",
        ordered: true,
        items: [
          "Stop treatment and call for help.",
          "Position: place the patient supine with legs elevated.",
          "Airway: perform a head tilt-chin lift and clear the airway.",
          "Breathing: check breathing and give oxygen.",
          "Circulation: check the pulse.",
          "Decision point: if pulse is present, do not give oral glucose because of aspiration risk; give IV glucose (for example 20-50% dextrose) or IM glucagon if IV access is unavailable. Monitor vital signs. If pulse is absent, start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "cardiac-arrest",
    title: "Cardiac Arrest",
    image: "/images/vasovagal.jpg",
    category: "Life-threatening collapse",
    summary: "A sudden cessation of effective circulation and ventilation, requiring immediate CPR, airway support and emergency response.",
    content: [
      {
        heading: "Suspected collapse",
        items: [
          "Initial action: stop dental treatment and remove all instruments.",
          "Check responsiveness: tap the patient and shout to determine if they are responsive and breathing normally."
        ]
      },
      {
        heading: "If the patient is responsive and breathing normally",
        ordered: true,
        items: [
          "No cardiac arrest yet.",
          "Continue assessment using ABC: airway, breathing and circulation.",
          "Manage the underlying cause, such as syncope, hypoglycaemia or asthma.",
          "Monitor continuously: reassure the patient and prepare emergency drugs if needed."
        ]
      },
      {
        heading: "If the patient is unresponsive or not breathing normally",
        ordered: true,
        items: [
          "Call for help and activate emergency services immediately.",
          "Position: place the patient supine on a firm surface.",
          "Airway: perform a head tilt-chin lift.",
          "Breathing: check breathing for no more than 10 seconds.",
          "Start CPR immediately.",
          "Chest compressions: rate 100-120 per minute, depth 5-6 cm, compression-to-breath ratio 30:2.",
          "Give two rescue breaths after 30 compressions.",
          "Attach an AED if available and follow its voice prompts."
        ]
      },
      {
        heading: "During resuscitation",
        items: [
          "If pulse returns or breathing resumes: place the patient in the recovery position, give oxygen and monitor.",
          "If there is no response: continue CPR and AED cycles.",
          "Continue CPR until normal breathing returns, help arrives or you are physically unable to continue."
        ]
      }
    ]
  },
  {
    id: "asthma-attacks",
    title: "Asthma Attacks",
    image: "/images/vasovagal.jpg",
    category: "Respiratory emergency",
    summary: "A bronchospasm event characterised by dyspnoea, wheeze, chest tightness and anxiety that may rapidly worsen without treatment.",
    content: [
      {
        heading: "Recognising the emergency",
        items: [
          "Signs:",
          "Difficulty breathing (dyspnoea)",
          "Wheezing, especially during expiration",
          "Chest tightness",
          "Cough and anxiety",
          "Decision: Is the patient breathing adequately?"
        ]
      },
      {
        heading: "Initial emergency actions",
        ordered: true,
        items: [
          "Stop dental treatment immediately and remove all instruments.",
          "Position: sit the patient upright in their most comfortable position.",
          "Follow ABC: airway, breathing and circulation."
        ]
      },
      {
        heading: "If the patient is breathing adequately",
        ordered: true,
        items: [
          "Give a bronchodilator: salbutamol inhaler, two puffs.",
          "Give oxygen if available.",
          "Reassess after a short interval. If improved, continue monitoring.",
          "If not improved, repeat the inhaler.",
          "If there is still no response: adrenaline 0.5 ml (1:1000) IM/SC.",
          "If symptoms persist: call emergency medical services."
        ]
      },
      {
        heading: "If the patient is not breathing adequately",
        ordered: true,
        items: [
          "Call for help immediately.",
          "Airway: maintain the airway using a head tilt-chin lift.",
          "Breathing: give high-flow oxygen.",
          "Assist ventilation if needed.",
          "Circulation: check the pulse.",
          "Decision point: if pulse is present, give adrenaline 0.5 ml (1:1000) IM/SC, repeat bronchodilator if possible, monitor continuously and prepare for transfer. If pulse is absent, start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "epilepsy",
    title: "Epilepsy",
    image: "/images/vasovagal.jpg",
    category: "Seizure management",
    summary: "A seizure may present as tonic-clonic movements and requires immediate protection, monitoring and escalation if prolonged or recurrent.",
    content: [
      {
        heading: "Recognising the emergency",
        items: [
          "Situation: the patient is actively experiencing a seizure with tonic-clonic movements.",
          "Stop dental treatment immediately and remove all instruments.",
          "Call for help.",
          "Protect the patient: do not restrain the movements, remove sharp objects and protect the head.",
          "Position: keep the patient in the dental chair in a safe position during the seizure; after the seizure place in the lateral recovery position.",
          "Check the duration of the seizure.",
          "Do not put anything in the patient's mouth or forcefully open the jaw."
        ]
      },
      {
        heading: "If the seizure lasts less than 5 minutes",
        ordered: true,
        items: [
          "Allow the seizure to finish.",
          "After the seizure (post-ictal phase): ensure the airway is clear, give oxygen and check the pulse.",
          "Place the patient in the recovery position.",
          "Reassure the patient when conscious.",
          "Monitor vital signs; recovery usually occurs."
        ]
      },
      {
        heading: "If the seizure lasts more than 5 minutes or seizures repeat",
        ordered: true,
        items: [
          "Call emergency services immediately.",
          "Airway: maintain the airway.",
          "Breathing: give high-flow oxygen.",
          "Circulation: monitor the pulse.",
          "Give an anticonvulsant: diazepam IV or midazolam buccal/IM according to age and weight.",
          "Monitor continuously and prepare for transfer."
        ]
      },
      {
        heading: "If the patient becomes unresponsive after the seizure",
        items: [
          "Breathing present: place in the recovery position, give oxygen and monitor.",
          "Breathing absent: start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "others",
    title: "Others",
    image: "/images/others.jpg",
    category: "General scenario",
    summary: "A general emergency pathway for unlisted situations, with conscious and unconscious patient management based on ABC assessment.",
    content: [
      {
        heading: "General emergency actions",
        items: [
          "If the patient is conscious: stop dental treatment, position the patient appropriately, reassure them, give specific medication as appropriate and monitor vital signs.",
          "If the patient is unconscious: call for help, call 999, check ABC, place the patient in the recovery position if breathing, start CPR if needed, give emergency drugs as appropriate and monitor continuously.",
          "If there are no signs of life or resuscitation fails: continue CPR until help arrives or the patient shows signs of recovery, follow local protocols and document the time of arrest, CPR start and stop, and any drugs given."
        ]
      }
    ]
  }
];

export const referenceList = [
  "Uyamadu J, Odai CD. A review of medical emergencies in dental practice. Orient Journal of Medicine. 2012;24(3-4):1-9.",
  "Laurent F, Augustin P, Youngquist ST, Segal N. Medical emergencies in dental practice. Médecine Buccale Chirurgie Buccale. 2014;20(1):3-12.",
  "Prasad KD, Hegde C, Alva H, Shetty M. Medical and dental emergencies and complications in dental practice and its management. Journal of Education and Ethics in Dentistry. 2012;2(1):13-19."
];

export function getEmergencyById(id) {
  return emergencies.find((emergency) => emergency.id === id);
}

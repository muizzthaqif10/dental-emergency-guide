export const emergencyData = [
  {
    id: "vasovagal-syncope",
    title: "Vasovagal Syncope",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Medical training photograph accompanying the vasovagal syncope guide.",
    introduction: "A common fainting episode caused by a transient drop in cerebral blood flow, often preceded by dizziness, pallor, sweating and nausea.",
    sections: [
      {
        kind: "heading",
        value: "Recognising the emergency"
      },
      {
        kind: "paragraph",
        value: "Early signs:"
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Dizziness and nausea",
          "Sweating and pallor",
          "Tachycardia, followed by bradycardia",
          "Decreased blood pressure"
        ]
      },
      {
        kind: "decision",
        question: "Decision: Is the patient conscious?",
        yesTitle: "If the patient is conscious",
        yesItems: [
          "1. Stop dental treatment.",
          "2. Position: Place the patient in a supine or Trendelenburg position and elevate the legs to increase cerebral blood flow.",
          "3. Airway: Ensure the airway is patent and loosen tight clothing.",
          "4. Breathing: Assess breathing and give oxygen if available.",
          "5. Circulation: Check pulse and blood pressure.",
          "6. Management:",
          "- Reassure the patient.",
          "- Give oral glucose if hypoglycemia is suspected.",
          "- Monitor vital signs continuously.",
          "7. Recovery: Recovery is usually rapid. Keep the patient under observation.",
          "8. If not improving: Call for medical assistance and consider IV glucose or further management."
        ],
        noTitle: "If the patient is unconscious",
        noItems: [
          "1. Stop treatment and call for help.",
          "2. Position: Place the patient supine with legs elevated.",
          "3. Airway: Perform a head tilt–chin lift and clear the airway.",
          "4. Breathing: Look, listen and feel. If breathing is absent, the slides indicate rescue breathing.",
          "5. Circulation: Check the carotid pulse."
        ]
      },
      {
        kind: "decision",
        question: "Decision point:",
        yesTitle: "Pulse present",
        yesItems: [
          "Continue oxygen, monitor vital signs and observe recovery."
        ],
        noTitle: "Pulse absent",
        noItems: [
          "Start CPR immediately and call emergency services."
        ]
      }
    ]
  },
  {
    id: "anaphylaxis",
    title: "Anaphylaxis",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Medical training photograph accompanying the anaphylaxis guide.",
    introduction: "A rapidly progressive allergic reaction involving skin, respiratory and cardiovascular effects that can become life-threatening within minutes.",
    sections: [
      {
        kind: "heading",
        value: "Recognising the emergency"
      },
      {
        kind: "paragraph",
        value: "Signs:"
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Skin: Urticaria, rash and swelling",
          "Respiratory: Wheezing, stridor and dyspnea",
          "Cardiovascular (CVS): Hypotension and tachycardia",
          "Gastrointestinal (GI): Nausea and vomiting"
        ]
      },
      {
        kind: "decision",
        question: "Decision: Is there airway or breathing compromise?",
        yesTitle: "If airway or breathing compromise is present",
        yesItems: [
          "1. Immediate key step: The slides specify adrenaline (epinephrine) 0.5 mg IM (1:1000) as the first and life-saving drug.",
          "2. Airway: Maintain the airway and prepare for possible airway obstruction due to laryngeal edema.",
          "3. Breathing: Give high-flow oxygen and assist ventilation if needed.",
          "4. Circulation: Monitor pulse and blood pressure.",
          "5. Repeat adrenaline: Every five minutes if there is no improvement.",
          "6. Adjunct drugs: Antihistamines and corticosteroids.",
          "7. Emergency transfer: Call an ambulance and refer immediately."
        ],
        noTitle: "If there is no airway or breathing compromise",
        noItems: [
          "1. Give adrenaline IM early to prevent progression.",
          "2. Administer oxygen.",
          "3. Monitor ABC closely.",
          "4. Adjunct drugs: Antihistamines and corticosteroids.",
          "5. Observe carefully because the condition may progress rapidly.",
          "6. Arrange medical transfer."
        ]
      },
      {
        kind: "heading",
        value: "Initial emergency actions"
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Stop dental treatment and remove all agents.",
          "Call for help immediately.",
          "Position:",
          "- Supine with legs elevated if hypotensive.",
          "- Sit upright if experiencing breathing difficulty.",
          "Follow ABC:",
          "- Airway — check.",
          "- Breathing — assess.",
          "- Circulation — monitor."
        ]
      },
      {
        kind: "decision",
        question: "If the patient collapses:",
        yesTitle: "Pulse present",
        yesItems: [
          "Continue oxygen and adrenaline and monitor closely."
        ],
        noTitle: "Pulse absent",
        noItems: [
          "Start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "hypoglycemia",
    title: "Hypoglycemia",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Medical training photograph accompanying the hypoglycemia guide.",
    introduction: "A drop in blood sugar that may cause sweating, tremor, confusion, tachycardia and reduced consciousness.",
    sections: [
      {
        kind: "heading",
        value: "Recognising the emergency"
      },
      {
        kind: "paragraph",
        value: "Early signs:"
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Sweating and tremors",
          "Hunger",
          "Confusion and irritability",
          "Tachycardia",
          "Decreased consciousness (late sign)"
        ]
      },
      {
        kind: "decision",
        question: "Decision: Is the patient conscious?",
        yesTitle: "If the patient is conscious",
        yesItems: [
          "1. Stop dental treatment immediately.",
          "2. Position: Sit the patient upright or semi-supine.",
          "3. Airway: Ensure the airway is clear.",
          "4. Breathing: Assess breathing and give oxygen if needed.",
          "5. Circulation: Check pulse and blood pressure.",
          "6. Management — key step:",
          "- Give oral glucose immediately.",
          "- Glucose drink or gel.",
          "- Sugar, such as sweets or sugar lumps.",
          "7. Reassess after 5–10 minutes:",
          "- If improved, continue observation.",
          "- If not improved, repeat glucose.",
          "8. After recovery: Give long-acting carbohydrate, such as biscuits, and postpone dental treatment.",
          "9. If still not improving: Call for medical assistance and prepare for IV glucose."
        ],
        noTitle: "If the patient is unconscious",
        noItems: [
          "1. Stop treatment and call for help.",
          "2. Position: Place the patient supine with legs elevated.",
          "3. Airway: Perform a head tilt–chin lift and clear the airway.",
          "4. Breathing: Check breathing and give oxygen.",
          "5. Circulation: Check the pulse."
        ]
      },
      {
        kind: "decision",
        question: "Decision point:",
        yesTitle: "Pulse present — management",
        yesItems: [
          "Do not give oral glucose because of the risk of aspiration.",
          "The slides specify IV glucose (e.g., 20–50% dextrose) or IM glucagon if IV access is unavailable.",
          "Monitor vital signs; recovery is expected."
        ],
        noTitle: "Pulse absent",
        noItems: [
          "Start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "cardiac-arrest",
    title: "Cardiac Arrest",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/CPR_Training_Chiasma.jpg/960px-CPR_Training_Chiasma.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    imageAlt: "CPR training session with a medical-training mannequin.",
    imageCredit: "CPR Training Chiasma by Adhitya2048, CC BY-SA 4.0",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:CPR_Training_Chiasma.jpg",
    introduction: "A sudden cessation of effective circulation and ventilation, requiring immediate CPR, airway support and emergency response.",
    sections: [
      {
        kind: "heading",
        value: "Suspected collapse"
      },
      {
        kind: "paragraph",
        value: "Initial action: Stop dental treatment and remove all instruments."
      },
      {
        kind: "paragraph",
        value: "Check responsiveness:"
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Tap the patient and shout.",
          "Determine whether the patient is responsive and breathing normally."
        ]
      },
      {
        kind: "decision",
        question: "If the patient is responsive and breathing normally",
        yesTitle: "If the patient is responsive and breathing normally",
        yesItems: [
          "1. No cardiac arrest yet.",
          "2. Continue assessment using ABC:",
          "- Airway — ensure it is patent.",
          "- Breathing — monitor.",
          "- Circulation — check pulse and blood pressure.",
          "3. Manage the underlying cause, such as syncope, hypoglycemia or asthma.",
          "4. Monitor continuously:",
          "- Reassure the patient.",
          "- Prepare emergency drugs if needed."
        ],
        noTitle: "If the patient is unresponsive or not breathing normally",
        noItems: [
          "1. Call for help and activate emergency services immediately.",
          "2. Position: Place the patient supine on a firm surface.",
          "3. Airway: Perform a head tilt–chin lift.",
          "4. Breathing: Check breathing for no more than 10 seconds.",
          "5. Start CPR immediately.",
          "Chest compressions:",
          "- Rate: 100–120 compressions per minute",
          "- Depth: 5–6 cm",
          "- Compression-to-breath ratio: 30:2",
          "6. Rescue breaths: Give two breaths after 30 compressions.",
          "7. Attach an AED if available and follow its voice prompts."
        ]
      },
      {
        kind: "decision",
        question: "During resuscitation",
        yesLabel: "PULSE RETURNS",
        yesTitle: "If pulse returns or breathing resumes",
        yesItems: [
          "Place the patient in the recovery position, give oxygen and monitor."
        ],
        noLabel: "NO RESPONSE",
        noTitle: "If there is no response",
        noItems: [
          "Continue CPR and AED cycles.",
          "Continue CPR until:",
          "- Normal breathing returns.",
          "- Help arrives.",
          "- You are physically unable to continue."
        ]
      }
    ]
  },
  {
    id: "asthma-attacks",
    title: "Asthma Attacks",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/An_Asthma_patient_taking_medication_using_an_inhaler.png/960px-An_Asthma_patient_taking_medication_using_an_inhaler.png",
    imageAlt: "Illustration of an asthma patient using an inhaler with a comparison of normal and asthmatic airways.",
    imageCredit: "An Asthma patient taking medication using an inhaler by myUpchar, CC BY-SA 4.0",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:An_Asthma_patient_taking_medication_using_an_inhaler.png",
    introduction: "A bronchospasm event characterised by dyspnoea, wheeze, chest tightness and anxiety that may rapidly worsen without treatment.",
    sections: [
      {
        kind: "heading",
        value: "Recognising the emergency"
      },
      {
        kind: "paragraph",
        value: "Signs:"
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Difficulty breathing (dyspnea)",
          "Wheezing, especially during expiration",
          "Chest tightness",
          "Cough and anxiety"
        ]
      },
      {
        kind: "decision",
        question: "Decision: Is the patient breathing adequately?",
        yesTitle: "If the patient is breathing adequately",
        yesItems: [
          "1. Give bronchodilator — key step: The slides specify a salbutamol inhaler, two puffs.",
          "2. Give oxygen if available.",
          "3. Reassess after a short interval.",
          "- If improved, continue monitoring.",
          "4. If not improved: Repeat the inhaler.",
          "5. If there is still no response: The slides specify adrenaline 0.5 ml (1:1000) IM/SC.",
          "6. If symptoms persist: Call emergency medical services."
        ],
        noTitle: "If the patient is not breathing adequately",
        noItems: [
          "1. Call for help immediately.",
          "2. Airway: Maintain the airway using a head tilt–chin lift.",
          "3. Breathing:",
          "- Give high-flow oxygen.",
          "- Assist ventilation if needed.",
          "4. Circulation: Check the pulse."
        ]
      },
      {
        kind: "heading",
        value: "Initial emergency actions"
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Stop dental treatment immediately and remove all instruments.",
          "Position: Sit the patient upright in their most comfortable position.",
          "Follow ABC:",
          "- Airway — ensure it is clear.",
          "- Breathing — assess.",
          "- Circulation — check pulse."
        ]
      },
      {
        kind: "decision",
        question: "Decision point:",
        yesTitle: "Pulse present",
        yesItems: [
          "The slides specify adrenaline 0.5 ml (1:1000) IM/SC.",
          "Repeat bronchodilator if possible.",
          "Monitor continuously and prepare for transfer."
        ],
        noTitle: "Pulse absent",
        noItems: [
          "Start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "epilepsy",
    title: "Epilepsy",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Medical training photograph accompanying the epilepsy guide.",
    introduction: "A seizure may present as tonic–clonic movements and requires immediate protection, monitoring and escalation if prolonged or recurrent.",
    sections: [
      {
        kind: "heading",
        value: "Recognising the emergency"
      },
      {
        kind: "paragraph",
        value: "Situation: The patient is actively experiencing a seizure with tonic–clonic movements."
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Stop dental treatment immediately and remove all instruments.",
          "Call for help.",
          "Protect the patient — key step:",
          "- Do not restrain the patient's movements.",
          "- Remove sharp or dangerous objects.",
          "- Protect the head to prevent injury.",
          "Position:",
          "- Keep the patient in the dental chair in a safe position during the seizure.",
          "- After the seizure, place the patient in the lateral recovery position.",
          "Check the duration of the seizure.",
          "Do not:",
          "- Put anything in the patient's mouth.",
          "- Forcefully open the jaw."
        ]
      },
      {
        kind: "decision",
        question: "If the seizure lasts less than 5 minutes",
        yesTitle: "If the seizure lasts less than 5 minutes",
        yesItems: [
          "Self-limiting seizure, according to the slides.",
          "1. Allow the seizure to finish.",
          "2. After the seizure (post-ictal phase):",
          "- Airway — ensure it is clear.",
          "- Breathing — give oxygen.",
          "- Circulation — check the pulse.",
          "3. Place the patient in the recovery position.",
          "4. Reassure the patient when conscious.",
          "5. Monitor vital signs; recovery usually occurs."
        ],
        noTitle: "If the seizure lasts more than 5 minutes or seizures repeat",
        noItems: [
          "The slides identify this as status epilepticus.",
          "1. Call emergency services immediately.",
          "2. Airway: Maintain the airway.",
          "3. Breathing: Give high-flow oxygen.",
          "4. Circulation: Monitor the pulse.",
          "5. Give anticonvulsant — key step: The slides list:",
          "- Diazepam IV: 10 mg for adults, 0.1–0.5 mg/kg for children; OR",
          "- Midazolam (buccal/IM): 10 mg for adults, 0.1–0.2 mg/kg for children.",
          "6. Monitor continuously and prepare for transfer."
        ]
      },
      {
        kind: "decision",
        question: "If the patient becomes unresponsive after the seizure",
        yesTitle: "Breathing present",
        yesItems: [
          "Place in the recovery position, give oxygen and monitor."
        ],
        noTitle: "Breathing absent",
        noItems: [
          "Start CPR immediately."
        ]
      }
    ]
  },
  {
    id: "others",
    title: "Others",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Medical training photograph accompanying the general emergency guide.",
    introduction: "A general emergency pathway for unlisted situations, with conscious and unconscious patient management based on ABC assessment.",
    sections: [
      {
        kind: "pathways",
        question: "General emergency actions",
        branches: [
          {
            title: "Conscious patient",
            items: [
              "Stop dental treatment.",
              "Position the patient appropriately.",
              "Reassure the patient.",
              "Give specific medication as appropriate.",
              "Monitor vital signs."
            ]
          },
          {
            title: "Unconscious patient",
            items: [
              "Call for help (doctor or trained medical personnel on duty).",
              "Call 999.",
              "Check ABC: Airway, Breathing and Circulation.",
              "Place the patient in the recovery position if breathing.",
              "Start CPR if needed.",
              "Give emergency drugs as appropriate.",
              "Monitor continuously."
            ]
          },
          {
            title: "No signs of life/resuscitation fails",
            items: [
              "Continue CPR until help arrives or the patient shows signs of recovery.",
              "If there is no response after prolonged resuscitation:",
              "- Follow local protocols and guidelines.",
              "- A doctor confirms death.",
              "- Document:",
              "- Time of arrest.",
              "- Time CPR started and stopped.",
              "- Drugs given."
            ]
          }
        ]
      }
    ]
  }
];

export const references = [
  "1. Uyamadu J, Odai CD. A review of medical emergencies in dental practice. Orient Journal of Medicine. 2012;24(3–4):1–9.",
  "2. Laurent F, Augustin P, Youngquist ST, Segal N. Medical emergencies in dental practice. Médecine Buccale Chirurgie Buccale. 2014 Jan 1;20(1):3–12.",
  "3. Prasad KD, Hegde C, Alva H, Shetty M. Medical and dental emergencies and complications in dental practice and its management. Journal of Education and Ethics in Dentistry. 2012 Jan 1;2(1):13–19."
];

export const disclaimer =
  "This guide is fOR EDUCATIONAL AND QUICK-REFERENCE PURPOSES ONLY AND DOES NOT REPLACE PROFESSIONAL TRAINING OR CLINICAL JUDGMENT.";

export const institution = {
  name: "Mahsa International College",
  identifier: "PIDC/IRB/SRP/10/26"
};

export const emergencyOptions = [
  "Vasovagal Syncope",
  "Anaphylaxis",
  "Hypoglycemia",
  "Cardiac Arrest",
  "Asthma Attacks",
  "Epilepsy",
  "Others"
];

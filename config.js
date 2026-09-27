/* =====================================================================
   APNA SCHOOL — WEBSITE SETTINGS
   ---------------------------------------------------------------------
   This is the only file you need to edit to update school details.

   RULES
   • Leave a value as "" (empty) or null and it stays HIDDEN on the website.
     Nothing unverified is ever shown to the public.
   • Fill a value in and it appears everywhere it is used, on every page.
   • Keep the quotes and commas exactly as they are. Only change the text
     between the quotes.
   • Dates use the format "YYYY-MM-DD", e.g. "2026-11-15".
   • Links must start with https:// (or be a file in this folder, e.g.
     "docs/prospectus.pdf").
   ===================================================================== */

window.SCHOOL_CONFIG = {

  /* ------------------------------------------------------------------
     SCHOOL DETAILS
     ------------------------------------------------------------------ */
  school: {
    name: "Apna School",
    motto: "विद्या ददाति विनयम्",
    mottoTranslation: "Knowledge gives humility",

    board: "",               // e.g. "CBSE". Shows the affiliation badge once filled.
    affiliationNumber: "",   // Official CBSE affiliation number
    schoolCode: "",          // Official CBSE school code
    foundedYear: null,       // e.g. 1998 (no quotes). Shows "Since 1998".

    address: {
      line1: "",             // e.g. "Plot 12, Sector 5"
      line2: "",             // e.g. "Near City Park" (optional)
      city: "",
      state: "",
      pin: ""
    },
    phone: "",               // e.g. "+91 98765 43210"
    email: "",               // e.g. "admissions@apnaschool.edu.in"
    officeHours: "",         // e.g. "Monday to Saturday, 8:00 am to 2:00 pm"

    // Shows a Google Map in the footer. Only works once the full address
    // above (line1, city, state, pin) is filled in.
    showMap: false
  },

  /* ------------------------------------------------------------------
     PRINCIPAL
     ------------------------------------------------------------------ */
  principal: {
    name: "Rathi Sir",
    qualifications: "",      // e.g. "M.Sc., M.Ed."
    photo: ""                // e.g. "images/principal.jpg" (portrait, 4:5 ratio)
  },

  /* ------------------------------------------------------------------
     ADMISSIONS
     ------------------------------------------------------------------ */
  admissions: {
    open: true,                        // false hides every "Admissions open" message
    academicYear: "2027–28",
    classesSummary: "",                // e.g. "Nursery to Class IX, and Class XI"
    registrationStart: "",             // "YYYY-MM-DD"
    registrationEnd: "",               // "YYYY-MM-DD"
    ageCriteria: "",                   // e.g. "Nursery: 3+ years as on 31 March 2027"
    feesNote: "",                      // e.g. "Fees are shared with the prospectus at the school office."
    prospectusUrl: "",                 // link to a PDF or page
    feeStructureUrl: "",               // link to a PDF or page

    // Classes shown in the enquiry form's drop-down list
    classesOffered: [
      "Nursery", "LKG", "UKG",
      "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI",
      "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII"
    ]
  },

  /* ------------------------------------------------------------------
     ACADEMICS
     ------------------------------------------------------------------ */
  academics: {
    streams: ""              // e.g. "Science (PCM / PCB), Commerce and Humanities"
  },

  /* ------------------------------------------------------------------
     ENQUIRY FORM
     The form is hidden until "endpoint" is set. It must be an https:// URL
     from a form service or your CRM. Examples:
       Formspree:  endpoint "https://formspree.io/f/XXXXXXXX", format "json"
       Web3Forms:  endpoint "https://api.web3forms.com/submit", format "json",
                   extraFields { access_key: "YOUR-PUBLIC-ACCESS-KEY" }
     Never put private passwords or secret API keys here: this file is public.
     ------------------------------------------------------------------ */
  enquiry: {
    endpoint: "",
    format: "json",          // "json" or "form"
    extraFields: {},         // extra values some services require
    responseTime: ""         // Only fill this if it is true, e.g. "We reply within two working days."
  },

  /* ------------------------------------------------------------------
     SCHOOL IN NUMBERS
     The whole band stays hidden until at least one value is filled.
     Use verified figures only (numbers, no quotes), e.g. value: 1500
     ------------------------------------------------------------------ */
  stats: [
    { label: "Learners",                      value: null, suffix: "+" },
    { label: "Educators",                     value: null, suffix: "+" },
    { label: "Co-curricular clubs",           value: null, suffix: "+" },
    { label: "Board results with distinction", value: null, suffix: "%" }
  ],

  /* ------------------------------------------------------------------
     TESTIMONIALS
     Hidden until added. Only publish real quotes shared with written
     consent, and set consent: true. Example:
       { quote: "…", name: "Anita Verma", role: "Parent of a Class V student", consent: true }
     ------------------------------------------------------------------ */
  testimonials: [],

  /* ------------------------------------------------------------------
     SOCIAL MEDIA  (each icon is hidden until its link is added)
     ------------------------------------------------------------------ */
  social: {
    instagram: "",
    youtube: "",
    facebook: "",
    linkedin: ""
  },

  /* ------------------------------------------------------------------
     POLICIES & GRIEVANCES
     ------------------------------------------------------------------ */
  legal: {
    lastUpdated: "2026-09-27",
    privacyEmail: "",          // Falls back to the school email if empty
    jurisdictionCity: "",      // e.g. "Jaipur", used in Terms of Use
    grievance: {
      officerName: "",
      designation: "",         // e.g. "Vice Principal"
      email: "",
      phone: "",
      responseTime: ""         // Only if true, e.g. "within 7 working days"
    }
  },

  /* ------------------------------------------------------------------
     MANDATORY PUBLIC DISCLOSURE (CBSE Appendix IX format)
     Section A (general information) is filled automatically from the
     details above. For documents, paste a link into "url". Rows without
     a link stay hidden.
     ------------------------------------------------------------------ */
  disclosure: {
    documents: [
      { label: "Copies of affiliation / upgradation letter and recent extension of affiliation", url: "" },
      { label: "Copies of societies / trust / company registration and renewal certificate", url: "" },
      { label: "Copy of No Objection Certificate (NOC) issued by the State Government / UT", url: "" },
      { label: "Copies of recognition certificate under the RTE Act, 2009, and its renewal", url: "" },
      { label: "Copy of valid building safety certificate as per the National Building Code", url: "" },
      { label: "Copy of valid fire safety certificate issued by the competent authority", url: "" },
      { label: "Copy of the DEO certificate submitted by the school for affiliation / self-certification", url: "" },
      { label: "Copies of valid water, health and sanitation certificates", url: "" }
    ],
    academics: [
      { label: "Fee structure of the school", url: "" },
      { label: "Annual academic calendar", url: "" },
      { label: "List of School Management Committee (SMC)", url: "" },
      { label: "List of Parent Teacher Association (PTA) members", url: "" },
      { label: "Last three years' result of the board examination", url: "" }
    ],
    // Board results, e.g. { year: "2026", registered: 120, passed: 118, passPercent: "98.3", remarks: "" }
    resultsClassX: [],
    resultsClassXII: [],
    staff: {
      totalTeachers: "",
      pgt: "",
      tgt: "",
      prt: "",
      teacherSectionRatio: "",
      specialEducator: "",
      counsellor: ""
    },
    infrastructure: {
      campusArea: "",          // e.g. "8,000 sq m"
      classrooms: "",          // number and size, e.g. "40 rooms, 50 sq m each"
      laboratories: "",        // number and size, including computer labs
      internet: "",            // "Yes" / "No"
      girlsToilets: "",
      boysToilets: "",
      inspectionVideoUrl: ""   // YouTube link of the school inspection video
    }
  }
};

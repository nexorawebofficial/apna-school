# Apna School website

Live site: https://nexorawebofficial.github.io/apna-school/

## Updating school details

Edit **`config.js`** only. Every value left empty (`""` or `null`) stays hidden on the website,
so nothing unverified is ever shown. Fill a value in, commit, and the site updates in about a minute.

| What | Where in `config.js` |
|---|---|
| Address, phone, email, office hours, map | `school` |
| Board, affiliation number, school code, founding year | `school` |
| Principal's qualifications and photo | `principal` |
| Academic year, registration dates, age criteria, fees, prospectus | `admissions` |
| Enquiry form destination | `enquiry.endpoint` |
| Verified statistics | `stats` |
| Testimonials (real, with consent) | `testimonials` |
| Instagram, YouTube, Facebook, LinkedIn | `social` |
| Grievance officer, privacy email | `legal` |
| Mandatory public disclosure documents and data | `disclosure` |

## Turning on the enquiry form

The form stays hidden until `enquiry.endpoint` is set to an `https://` address.

**Formspree** (simplest): create a free form at formspree.io with the admissions email, then set
`endpoint: "https://formspree.io/f/XXXXXXXX"`.

**Web3Forms**: get a free access key at web3forms.com, then set
`endpoint: "https://api.web3forms.com/submit"` and `extraFields: { access_key: "YOUR-KEY" }`.

Any CRM or Google Apps Script URL that accepts a JSON POST and returns a 2xx status also works.
Never put secret API keys in `config.js`: the file is public.

## Pages

- `index.html` – home page
- `disclosure.html` – Mandatory Public Disclosure (CBSE Appendix IX format)
- `privacy.html`, `terms.html`, `grievance.html` – policies (have them reviewed by the school before launch)

Photos in `/images` are free Pexels stock photos. Replace them with the school's own photographs
using the same file names.

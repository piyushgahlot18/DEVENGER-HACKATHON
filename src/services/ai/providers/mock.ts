import { AIProvider } from '../types';
import type { AIProviderConfig, ChatOptions, AssistantRole } from '../types';

// ─── Rich mock responses per role ─────────────────────────────────────────────

type MockEntry = { keywords: string[]; response: string };

const MOCK_RESPONSES: Record<AssistantRole, MockEntry[]> = {
  'citizen-query': [
    {
      keywords: ['passport', 'renew', 'apply'],
      response: `## How to Apply/Renew Your Passport

Renewing your Indian passport is straightforward! Here is the complete process:

**Step 1: Register on Passport Seva Portal**
Visit the official portal and create an account with your mobile number and email.

**Step 2: Fill the Application Form**
- Select **"Re-issue of Passport"** for renewal
- Fill all personal details carefully — name must match Aadhaar exactly

**Step 3: Upload Documents**
- Existing passport (original + self-attested copy)
- Aadhaar Card
- Address proof (if changed)
- 2 recent passport-size photos (white background, 35x45mm)

**Step 4: Pay Fee and Book Appointment**
- Normal: **Rs. 1,500** | Tatkaal: **Rs. 3,500**
- Choose your nearest Passport Seva Kendra (PSK)

**Step 5: Visit PSK with Originals**
Your old passport will be impounded and a new one dispatched within 30 days (Normal) or 1-3 days (Tatkaal).

> Apply at least 6 months before your passport expires. Peak seasons (April-June) have longer wait times.

\`\`\`actions
[
  { "type": "link",     "label": "Apply on Passport Seva Portal", "url": "https://passportindia.gov.in" },
  { "type": "service",  "label": "View Passport Service Details",  "serviceId": "s003" },
  { "type": "document", "label": "Check Required Documents",       "service": "Passport" },
  { "type": "phone",    "label": "Passport Helpline",             "phone": "1800-258-1800" }
]
\`\`\``,
    },
    {
      keywords: ['aadhaar', 'update', 'address', 'name'],
      response: `## Updating Your Aadhaar Card Details

You can update your Aadhaar details online (address only) or by visiting an Aadhaar enrolment centre.

### What Can Be Updated Online?
- Address — Update on the UIDAI Self-Service Portal
- Name, DOB, Gender — Must visit an enrolment centre

### Online Address Update (Fastest):
1. Visit **SSUP Portal** (ssup.uidai.gov.in)
2. Login with your 12-digit Aadhaar + OTP
3. Upload proof of new address
4. Pay **Rs. 50** (waived till Dec 2026!)
5. Receive updated e-Aadhaar in 30 days

### Valid Address Proof Documents:
- Electricity/Gas/Water bill (last 3 months)
- Bank passbook / statement
- Rent agreement
- Government-issued ID with address

> After update, download your **e-Aadhaar** immediately from UIDAI — it is legally valid.

\`\`\`actions
[
  { "type": "link",    "label": "Update Address on UIDAI",      "url": "https://ssup.uidai.gov.in" },
  { "type": "link",    "label": "Download e-Aadhaar",           "url": "https://myaadhaar.uidai.gov.in" },
  { "type": "service", "label": "View Aadhaar Service Details", "serviceId": "s001" },
  { "type": "phone",   "label": "Aadhaar Helpline 1947",       "phone": "1947" }
]
\`\`\``,
    },
    {
      keywords: ['rti', 'right to information', 'information'],
      response: `## Filing an RTI Application

The **Right to Information (RTI) Act 2005** gives every Indian citizen the right to request information from any government office.

### Online RTI Filing (Central Government):
1. Visit **RTI Online Portal** (rtionline.gov.in)
2. Register and select the Ministry/Department
3. Write your query clearly (max 500 words)
4. Pay Rs. 10 via net banking / UPI
5. Receive response within **30 days** (mandatory by law)

### What You Can Ask:
- Status of your pending applications
- Why your application was rejected
- Copies of decisions affecting you
- Expenditure records of government projects

### Tips for a Strong RTI:
- Be specific — mention file numbers, dates if known
- Ask one topic per RTI
- If denied, file a **First Appeal** within 30 days

> Under RTI Act Section 20, officials face penalty of Rs. 250/day (up to Rs. 25,000) for delay!

\`\`\`actions
[
  { "type": "link",  "label": "File RTI Online",          "url": "https://rtionline.gov.in" },
  { "type": "link",  "label": "State RTI Portals List",   "url": "https://rti.gov.in" },
  { "type": "phone", "label": "Central Info Commission",  "phone": "011-26180532" },
  { "type": "copy",  "label": "Copy RTI Template",        "content": "To,\\nThe Central Public Information Officer\\n[Department Name]\\n[Address]\\n\\nSub: RTI Application under Section 6(1) of RTI Act 2005\\n\\nI, [Your Name], citizen of India, hereby request the following information:\\n\\n[Your specific question here]\\n\\nI am enclosing the RTI fee of Rs.10 herewith.\\n\\nYours faithfully,\\n[Your Name]\\n[Address]\\n[Phone]\\n[Date]" }
]
\`\`\``,
    },
    {
      keywords: ['pan', 'income tax', 'permanent account'],
      response: `## Applying for a PAN Card

**Online Application via NSDL:**

1. Visit [onlineservices.nsdl.com](https://onlineservices.nsdl.com)
2. Select "Application Type" -> Form 49A (Indian Citizens)
3. Fill personal details and upload documents

**Required Documents:**
- Proof of Identity (Aadhaar / Voter ID)
- Proof of Address
- Date of Birth proof (Birth Certificate / 10th Marksheet)
- Passport-size photograph

**Fees:**
- Physical PAN: Rs. 107 (Rs. 91 + GST)
- e-PAN only: Rs. 66

**Processing Time:** 15-20 working days

> You can also get an **Instant e-PAN free** via the Income Tax Portal if your Aadhaar is linked to your mobile number!

\`\`\`actions
[
  { "type": "link",    "label": "Get Instant e-PAN (Free)",    "url": "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan" },
  { "type": "link",    "label": "Apply via NSDL",              "url": "https://tin.tin.nsdl.com/pan" },
  { "type": "service", "label": "PAN Card Service Details",    "serviceId": "s002" },
  { "type": "phone",   "label": "Income Tax Helpline",        "phone": "1800-103-4455" }
]
\`\`\``,
    },
    {
      keywords: ['ration', 'ration card'],
      response: `## Applying for a Ration Card

Ration card applications are managed by **State governments**. Here is the general process:

**Eligibility:**
- Indian citizen residing in the state
- Family should not already have a ration card

**Document Checklist:**
- Aadhaar cards of all family members
- Proof of address (electricity bill / rent agreement)
- Income certificate
- Passport-size photos of head of family

**Application Process:**
1. Visit your nearest **Block/Tehsil Office** or apply online on your state food portal
2. Submit Form 1 (new ration card application)
3. Inspector visits for verification
4. Card issued within 30 days post verification

\`\`\`actions
[
  { "type": "link",  "label": "Delhi Ration Portal",           "url": "https://ration.jantasamvad.org" },
  { "type": "link",  "label": "One Nation One Ration Card",    "url": "https://impds.nic.in" },
  { "type": "phone", "label": "National Food Helpline",        "phone": "14445" },
  { "type": "document", "label": "View Document Checklist",    "service": "Ration Card" }
]
\`\`\``,
    },
  ],
  'scheme-advisor': [
    {
      keywords: ['farmer', 'agriculture', 'kisan', 'pm-kisan', 'crop'],
      response: `## Government Schemes for Farmers

Great news! There are several powerful schemes available for Indian farmers:

### 1. PM-KISAN Samman Nidhi (Most Popular)
- **Benefit:** Rs. 6,000/year (Rs. 2,000 every 4 months) directly in your bank
- **Who:** Small and marginal farmers with land < 2 hectares
- **Apply:** pmkisan.gov.in or your nearest Common Service Centre

### 2. PM Fasal Bima Yojana (Crop Insurance)
- **Benefit:** Insurance for crop losses due to floods, drought, pest
- **Premium:** Very low (1.5-5% of sum insured, rest paid by govt)

### 3. Kisan Credit Card (KCC)
- **Benefit:** Credit up to Rs. 3 lakh at just **4% interest** for crop needs

### 4. PM Krishi Sinchayee Yojana
- **Benefit:** Subsidized irrigation equipment (drip/sprinkler)
- **Subsidy:** 55% for small farmers

### 5. E-NAM (National Agriculture Market)
- **Benefit:** Sell crops online at better prices, avoid middlemen

> A typical farmer can benefit from Rs. 10,000 to Rs. 50,000 per year in combined scheme benefits!

\`\`\`actions
[
  { "type": "link",  "label": "Check PM-KISAN Status",      "url": "https://pmkisan.gov.in" },
  { "type": "link",  "label": "Apply Fasal Bima Yojana",    "url": "https://pmfby.gov.in" },
  { "type": "link",  "label": "Get Kisan Credit Card",      "url": "https://www.nabard.org" },
  { "type": "phone", "label": "Kisan Call Centre (Free)",   "phone": "1800-180-1551" }
]
\`\`\``,
    },
    {
      keywords: ['health', 'ayushman', 'hospital', 'medical', 'pm-jay', 'insurance'],
      response: `## Ayushman Bharat PM-JAY Health Scheme

**Ayushman Bharat Pradhan Mantri Jan Arogya Yojana** is the world's largest government health insurance scheme!

### What You Get:
- **Rs. 5 Lakh** health cover per family per year
- Coverage for 1,929+ medical procedures
- **Cashless treatment** at empanelled hospitals
- Covers: Surgery, medicine, ICU, diagnostics

### Who is Eligible?
Based on SECC 2011 data:
- Rural: Families with deprived socio-economic conditions
- Urban: 11 occupational categories (construction workers, rag pickers, domestic workers, etc.)

### How to Use:
1. Find nearest **Ayushman Mitra** or Common Service Centre
2. Show Aadhaar and check eligibility
3. Get your **Golden Card** (Ayushman Card)
4. Use it at 26,000+ empanelled hospitals — completely cashless!

> If eligible, you NEVER pay out of pocket at govt hospitals for covered treatments!

\`\`\`actions
[
  { "type": "link",  "label": "Check PM-JAY Eligibility",   "url": "https://mera.pmjay.gov.in" },
  { "type": "link",  "label": "Find Empanelled Hospital",   "url": "https://hospitals.pmjay.gov.in" },
  { "type": "phone", "label": "Ayushman Bharat Helpline",  "phone": "14555" }
]
\`\`\``,
    },
    {
      keywords: ['house', 'home', 'awas', 'housing', 'loan'],
      response: `## PM Awas Yojana — Housing for All

The **Pradhan Mantri Awas Yojana (PMAY)** helps you buy or build your own home with government subsidy!

### Benefits by Category:

| Category | Annual Income | Subsidy |
|---|---|---|
| EWS | Up to Rs. 3 lakh | Rs. 2.67 lakh |
| LIG | Rs. 3-6 lakh | Rs. 2.67 lakh |
| MIG-I | Rs. 6-12 lakh | Rs. 1.80 lakh |
| MIG-II | Rs. 12-18 lakh | Rs. 1.30 lakh |

### Eligibility:
- First-time home buyer
- No existing pucca house in family
- Aadhaar is mandatory

### How to Apply:
1. Visit your bank or Housing Finance Company
2. Apply for home loan and mention PMAY
3. Bank will process subsidy directly

> The subsidy is applied to your loan principal — reducing your EMI significantly!

\`\`\`actions
[
  { "type": "link",  "label": "Check PMAY Eligibility",       "url": "https://pmaymis.gov.in" },
  { "type": "link",  "label": "Find PMAY Listed Banks",       "url": "https://pmayg.nic.in" },
  { "type": "phone", "label": "PMAY Helpline",               "phone": "1800-11-6446" }
]
\`\`\``,
    },
  ],
  'complaint-draft': [
    {
      keywords: ['pothole', 'road', 'street', 'highway'],
      response: `## Complaint Draft: Road/Pothole Issue

Here is a formal complaint letter ready to submit:

---

**To,**
The Executive Engineer / Municipal Commissioner,
[Your Municipal Corporation / PWD Office],
[City, State]

**Subject:** Urgent Complaint Regarding Dangerous Pothole at [Location] — Safety Hazard

**Date:** ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

Respected Sir/Madam,

I, [Your Full Name], resident of [Your Address], am writing to report a dangerous pothole near [specific road/area and landmark]. The pothole has existed for approximately [X weeks] and poses a serious safety threat to motorists and pedestrians.

**Incidents:** [Mention any accidents or near-misses if known]

**Action Requested:** Immediate inspection and repair within 7 working days as per PWD guidelines. If no action is taken, I will escalate to the District Collector and file an RTI application.

Yours faithfully,
[Your Full Name], [Phone Number], [Email]

**CC:** District Collector | Local Ward Corporator

---

\`\`\`actions
[
  { "type": "copy",      "label": "Copy Full Complaint",         "content": "To,\\nThe Executive Engineer / Municipal Commissioner,\\n[Your Municipal Corporation / PWD Office]\\n[City, State]\\n\\nSubject: Urgent Complaint Regarding Dangerous Pothole at [Location]\\n\\nRespected Sir/Madam,\\n\\nI, [Your Full Name], resident of [Your Address], am writing to report a dangerous pothole near [Location and Landmark]. The pothole has existed for approximately [X weeks] and poses a serious safety threat.\\n\\nAction Requested: Immediate inspection and repair within 7 working days.\\n\\nYours faithfully,\\n[Your Name]\\n[Phone]\\n[Date]" },
  { "type": "link",      "label": "File on PG Portal",           "url": "https://pgportal.gov.in" },
  { "type": "complaint", "label": "File via Civic AI",           "category": "Roads & Transport" },
  { "type": "phone",     "label": "National Helpline 1533",     "phone": "1533" }
]
\`\`\``,
    },
    {
      keywords: ['electricity', 'power', 'bill', 'light', 'meter'],
      response: `## Complaint Draft: Electricity Issue

Here is a ready-to-submit formal complaint:

---

**To,**
The Grievance Officer / Consumer Services Manager,
[Your Electricity Distribution Company — DISCOM],
[Circle/Division Office Address]

**Subject:** Formal Complaint — Consumer Account No. [XXXXXX] — [Billing Error / Power Outage / Faulty Meter]

**Date:** ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

Respected Sir/Madam,

I am writing to formally complain about [describe issue: inflated electricity bill / frequent power cuts / faulty meter] at my premises at [Your Address].

- Consumer Account Number: [Your Account Number]
- Meter Number: [Meter No. from bill]
- Issue: [e.g., Bill for June 2026 shows Rs. X,XXX vs usual Rs. XXX]
- Affected Period: Since [Date]

Under the **Electricity Act 2003**, you are obligated to resolve consumer complaints within **45 days** for billing disputes.

**Action Requested:** Immediate investigation and correction of bill / restoration of power / refund of excess amount charged.

Yours faithfully,
[Your Name], [Account No.], [Phone], [Email]

---

\`\`\`actions
[
  { "type": "copy",  "label": "Copy Complaint Draft",    "content": "Electricity complaint draft — personalize and submit" },
  { "type": "link",  "label": "CGRF Consumer Portal",   "url": "https://grievance.electricity.gov.in" },
  { "type": "phone", "label": "National Power Helpline", "phone": "1912" },
  { "type": "link",  "label": "Consumer Forum (eDaakhil)", "url": "https://edaakhil.nic.in" }
]
\`\`\``,
    },
  ],
  'document-advisor': [
    {
      keywords: ['passport', 'document', 'what do i need'],
      response: `## Documents Required for Passport Application

Here is the complete, verified checklist:

### Mandatory Documents (ORIGINAL + 1 self-attested photocopy of each)

- **Aadhaar Card** — 12-digit Aadhaar is the strongest identity proof
- **Proof of Address** — Aadhaar / Voter ID / Bank Passbook / Utility bill
- **Date of Birth Proof** — Birth Certificate / School Certificate / 10th Marksheet
- **Proof of Identity** — Aadhaar / Voter ID / PAN Card / Driving License
- **Existing Passport** (for renewal only) — front and back pages + ECR/Non-ECR pages

### Photo Requirements:
- Size: **35mm x 45mm** (passport size)
- Background: **Plain white only**
- Recency: Taken within last **6 months**
- Glasses: **NOT allowed** (ICAO rules 2023)

### Common Rejection Reasons:
- Photo with tinted background
- Expired address proof (must be within last 1 year)
- Name mismatch between documents
- Self-attestation missing

> Tip: Aadhaar card alone serves as Identity + Address + DOB proof — it simplifies the process greatly!

\`\`\`actions
[
  { "type": "link",    "label": "Apply on Passport Seva",      "url": "https://passportindia.gov.in" },
  { "type": "service", "label": "View Full Passport Service",  "serviceId": "s003" },
  { "type": "phone",   "label": "Passport Helpline",          "phone": "1800-258-1800" }
]
\`\`\``,
    },
    {
      keywords: ['pan', 'income tax', 'pan card document'],
      response: `## Documents Required for PAN Card

### Proof of Identity (any one):
- Aadhaar Card (recommended — fastest processing)
- Voter ID Card
- Driving License
- Passport

### Proof of Address (any one):
- Aadhaar Card
- Bank account statement (last 3 months)
- Electricity/Gas bill (last 3 months)
- Voter ID

### Proof of Date of Birth (any one):
- Aadhaar Card (contains DOB)
- Birth Certificate
- 10th Class Marksheet/Certificate

### Photos:
- 2 passport-size photos (35x45mm, white background, taken within 6 months)

### Instant PAN via Aadhaar (Recommended):
If you have Aadhaar linked to your mobile, get an **Instant e-PAN in under 10 minutes — free** at the Income Tax Portal!

\`\`\`actions
[
  { "type": "link",    "label": "Get Instant e-PAN (Free)",  "url": "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan" },
  { "type": "link",    "label": "Apply via NSDL",            "url": "https://tin.tin.nsdl.com/pan" },
  { "type": "service", "label": "PAN Card Service Details",  "serviceId": "s002" }
]
\`\`\``,
    },
    {
      keywords: ['driving', 'license', 'dl', 'licence'],
      response: `## Documents Required for Driving License

### For Learner License (First Step):

- **Proof of Age** — Birth Certificate / 10th Marksheet / Aadhaar (must be 18+)
- **Proof of Address** — Aadhaar / Voter ID / Passport / Utility bill
- **Passport-size Photos** — 6 photos (white background)
- **Medical Certificate** (Form 1A) — From a registered doctor

### For Permanent Driving License:
After holding Learner License for **30 days (min) to 180 days (max)**:
- Original Learner License
- All above documents again
- Driving test booking confirmation

### For Renewal (expired DL):
- Original Driving License
- Aadhaar / Address proof
- Medical Certificate (for transport vehicles or drivers 40+)
- Recent passport photos

> Everything can now be done online via **Parivahan Seva Portal** — no need to visit RTO for learner license!

\`\`\`actions
[
  { "type": "link",    "label": "Apply on Parivahan Seva",   "url": "https://parivahan.gov.in/parivahan" },
  { "type": "service", "label": "Driving License Service",  "serviceId": "s004" },
  { "type": "phone",   "label": "Transport Helpline",       "phone": "1800-120-1412" }
]
\`\`\``,
    },
  ],
  'policy-simplifier': [
    {
      keywords: ['rti', 'right to information', 'act', 'law'],
      response: `## Right to Information Act 2005 — Explained Simply

Think of RTI as your **superpower** to question the government!

### What It Means in Simple Words:
You have the **legal right** to ask any government office "What are you doing with public money and power?" — and they MUST answer within 30 days.

### What You Can Ask About:
- Why your application was rejected or delayed
- How much money was spent on a local road or project
- Copies of rules, orders, or decisions that affect you
- Attendance records of government employees

### What You CANNOT Ask:
- Information that affects national security
- Personal information of private individuals
- Cabinet deliberations

### Key Rights Under RTI:
1. **30-day deadline** — govt must respond in 30 days (7 days if life/liberty is at stake)
2. **First Appeal** — if unsatisfied, appeal within 30 days
3. **Second Appeal** — escalate to Information Commission within 90 days
4. **Penalty** — PIO faces Rs. 250/day fine (up to Rs. 25,000) for delay or wrong information

### Real Example:
A Delhi resident asked why her Aadhaar correction was pending for 6 months. Using RTI, she found the file was stuck at a specific officer's desk. The officer was penalized and her case resolved in 15 days!

> This is for awareness only. For complex legal situations, consult a registered advocate.

\`\`\`actions
[
  { "type": "link",  "label": "File RTI Online",            "url": "https://rtionline.gov.in" },
  { "type": "link",  "label": "Read Full RTI Act Text",     "url": "https://rti.gov.in/rti-act.pdf" },
  { "type": "copy",  "label": "Copy RTI Template",          "content": "To,\\nThe CPIO,\\n[Department Name and Address]\\n\\nSub: Application under RTI Act 2005\\n\\nI request the following information:\\n1. [Your Question]\\n\\nEnclosing: Rs. 10 IPO/DD\\n\\n[Your Name, Address, Date]" },
  { "type": "phone", "label": "CIC Helpline",              "phone": "011-26180532" }
]
\`\`\``,
    },
    {
      keywords: ['consumer', 'protection', 'complaint', 'product', 'defective'],
      response: `## Consumer Protection Act 2019 — Your Rights as a Buyer

India's Consumer Protection Act 2019 is one of the strongest consumer laws in the world!

### Your 6 Basic Consumer Rights:
1. **Right to Safety** — protection against hazardous goods
2. **Right to Information** — know quality, quantity, price before buying
3. **Right to Choose** — access to variety at competitive prices
4. **Right to be Heard** — grievances must be addressed
5. **Right to Redressal** — compensation for defective goods/services
6. **Right to Consumer Education** — know your rights

### What You Can Complain About:
- Defective product received online or offline
- Service deficiency (hotel, hospital, builder)
- Unfair trade practices (fake discounts, misleading ads)
- Overcharging above MRP

### How to File a Consumer Complaint:
1. **Online:** eDaakhil portal (edaakhil.nic.in) — free, paperless, fast!
2. **District Forum:** For claims up to Rs. 1 crore
3. **State Commission:** For claims Rs. 1 crore to Rs. 10 crore
4. **National Commission:** For claims above Rs. 10 crore

> You can file a consumer complaint against Amazon, Flipkart, hospitals, builders, banks — anyone who sold you a defective product or poor service!

\`\`\`actions
[
  { "type": "link",  "label": "File Consumer Complaint (eDaakhil)", "url": "https://edaakhil.nic.in" },
  { "type": "link",  "label": "National Consumer Helpline",         "url": "https://consumerhelpline.gov.in" },
  { "type": "phone", "label": "Consumer Helpline",                 "phone": "1915" }
]
\`\`\``,
    },
  ],
  'multilingual': [
    {
      keywords: ['ration', 'rashon', 'rashon card', 'ration card', 'rasan'],
      response: `## राशन कार्ड के लिए आवेदन

**राशन कार्ड** एक सरकारी दस्तावेज है जो आपको सस्ती दर पर चावल, गेहूं, और अन्य खाद्यान्न दिलाता है।

### राशन कार्ड के प्रकार:
- APL (गरीबी रेखा से ऊपर) — Rs. 6.10/kg चावल
- BPL (गरीबी रेखा से नीचे) — Rs. 3/kg चावल
- AAY (अंत्योदय) — Rs. 2/kg गेहूं, Rs. 3/kg चावल

### आवेदन कैसे करें:
1. अपने **तहसील / ब्लॉक कार्यालय** जाएं
2. फॉर्म-1 (नए राशन कार्ड के लिए) भरें
3. जरूरी दस्तावेज लगाएं:
   - आधार कार्ड (परिवार के सभी सदस्यों का)
   - निवास प्रमाण (बिजली बिल / किराया समझौता)
   - आय प्रमाण पत्र
   - परिवार के मुखिया की फोटो
4. 30 दिन में राशन कार्ड मिल जाएगा

\`\`\`actions
[
  { "type": "link",  "label": "दिल्ली — ऑनलाइन आवेदन",    "url": "https://ration.jantasamvad.org" },
  { "type": "link",  "label": "One Nation One Ration Card", "url": "https://impds.nic.in" },
  { "type": "phone", "label": "राष्ट्रीय खाद्य हेल्पलाइन", "phone": "14445" }
]
\`\`\``,
    },
    {
      keywords: ['passport', 'paasport'],
      response: `## पासपोर्ट के लिए आवेदन कैसे करें

**पासपोर्ट** भारत सरकार द्वारा जारी एक महत्वपूर्ण यात्रा दस्तावेज है।

### ऑनलाइन आवेदन प्रक्रिया:
1. **Passport Seva Portal** पर जाएं: passportindia.gov.in
2. नया खाता बनाएं (मोबाइल नंबर और ईमेल से)
3. "Apply for Fresh Passport" या "Re-issue" चुनें
4. सभी जानकारी ध्यान से भरें — नाम आधार के अनुसार होना चाहिए
5. अपॉइंटमेंट बुक करें और नजदीकी PSK में जाएं

### आवश्यक दस्तावेज:
- आधार कार्ड
- पता प्रमाण
- जन्म प्रमाण पत्र / 10वीं मार्कशीट
- पासपोर्ट साइज फोटो (सफेद बैकग्राउंड)

### शुल्क:
- सामान्य: **Rs. 1,500**
- तत्काल: **Rs. 3,500**

\`\`\`actions
[
  { "type": "link",  "label": "Passport Seva Portal पर जाएं", "url": "https://passportindia.gov.in" },
  { "type": "phone", "label": "Passport Helpline",            "phone": "1800-258-1800" },
  { "type": "service", "label": "पासपोर्ट सर्विस देखें",     "serviceId": "s003" }
]
\`\`\``,
    },
  ],
};

const DEFAULT_RESPONSE = `## Namaste! Hello!

I am **Civic AI**, your intelligent companion for all Indian government services!

I can help you with:
- **Government Services** — PAN, Aadhaar, Passport, Driving License
- **Welfare Schemes** — PM-KISAN, Ayushman Bharat, PM Awas Yojana
- **Complaint Drafting** — Ready-to-submit formal letters
- **Document Checklists** — Know exactly what you need
- **Policy Explanation** — Complex laws in simple words
- **22 Languages** — Ask in Hindi, Tamil, Bengali, or any Indian language

**Try asking me:**
- "How do I renew my passport?"
- "What schemes are available for farmers?"
- "Draft a complaint about a pothole"
- "What documents do I need for a PAN card?"

\`\`\`actions
[
  { "type": "service",   "label": "Browse Gov Services",  "serviceId": "s001" },
  { "type": "complaint", "label": "File a Complaint",     "category": "General" },
  { "type": "document",  "label": "Check My Documents",   "service": "General" },
  { "type": "phone",     "label": "UMANG Helpline",       "phone": "97183-97183" }
]
\`\`\``;

// ─── Mock Provider Implementation ─────────────────────────────────────────────

export class MockProvider extends AIProvider {
  constructor(config: AIProviderConfig = {}) {
    super(config);
  }

  get name(): string {
    return 'Mock (Demo)';
  }

  get isAvailable(): boolean {
    return true;
  }

  async chat(userMessage: string, options: ChatOptions): Promise<string> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const lower = userMessage.toLowerCase();
    const roleResponses = MOCK_RESPONSES[options.role] ?? MOCK_RESPONSES['citizen-query'];

    // Find best matching response for current role
    for (const entry of roleResponses) {
      if (entry.keywords.some(kw => lower.includes(kw))) {
        return entry.response;
      }
    }

    // Cross-role search
    for (const responses of Object.values(MOCK_RESPONSES)) {
      for (const entry of responses) {
        if (entry.keywords.some(kw => lower.includes(kw))) {
          return entry.response;
        }
      }
    }

    return DEFAULT_RESPONSE;
  }
}

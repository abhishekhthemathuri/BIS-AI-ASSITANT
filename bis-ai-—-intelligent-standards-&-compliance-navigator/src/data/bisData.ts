import { IndianStandard, CertificationScheme, TestingLab, WorkflowStep, HUIDRecord } from '../types';

export const INDIAN_STANDARDS: IndianStandard[] = [
  {
    id: 'is-17803',
    code: 'IS 17803 : 2022',
    title: 'Stainless Steel Vacuum Flasks / Insulated Water Bottles',
    category: 'Consumer Goods & Metallurgy',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: '15th March 2024 (Mandatory under DPIIT QCO)',
    qcoMinistry: 'Ministry of Commerce & Industry (DPIIT)',
    year: 2022,
    scope: 'Prescribes physical, chemical, thermal, and food contact safety requirements for stainless steel double-walled vacuum flasks and single-walled water bottles intended for potable storage.',
    keyClauses: [
      {
        number: 'Clause 4.1',
        title: 'Material Specification & Grade Compliance',
        summary: 'Body and interior liner must be manufactured from food-grade stainless steel adhering to IS 6911 (Grade 304, Austenitic SS conforming to minimum 18% Cr and 8% Ni).',
        page: 6
      },
      {
        number: 'Clause 5.2',
        title: 'Thermal Insulation Retention Test',
        summary: 'Liquid filled at 95°C must sustain minimum temperature of 60°C after 6 hours and 45°C after 12 hours under ambient room temperature (27±2°C).',
        page: 11
      },
      {
        number: 'Clause 5.6',
        title: 'Leak Resistance & Drop Impact',
        summary: 'Bottle filled to nominal volume dropped from 1.2m onto smooth concrete with inverted orientation must exhibit zero liquid leakage.',
        page: 14
      },
      {
        number: 'Clause 8.1',
        title: 'Marking & Standard ISI Emblem',
        summary: 'Each bottle must be legibly laser etched or stamped with manufacturer license number (CM/L), nominal volume in ml, and IS 17803 ISI mark.',
        page: 19
      }
    ],
    applicableScheme: 'Scheme-I (ISI Mark)',
    testingParameters: ['Spectrometric chemical analysis (Cr/Ni content)', 'Thermal insulation performance (6h/12h)', 'Leachability of heavy metals (Pb, Cd, As)', 'Pressure seal resistance test'],
    relevanceKeywords: ['water bottle', 'stainless steel', 'flask', 'thermos', 'vacuum insulated', 'tumbler', 'sipper', 'is 17803', 'is17803'],
    officialDocUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is17803'
  },
  {
    id: 'is-9873-1',
    code: 'IS 9873 (Part 1) : 2019',
    title: 'Safety of Toys — Mechanical and Physical Properties',
    category: 'Children & Consumer Safety',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: '1st January 2021 (Toys QCO mandatory)',
    qcoMinistry: 'DPIIT, Ministry of Commerce & Industry',
    year: 2019,
    scope: 'Specifies acceptable mechanical and physical safety criteria for children toys manufactured or imported into India, prohibiting sharp edges, choking hazards, and fragile parts.',
    keyClauses: [
      {
        number: 'Clause 4.4',
        title: 'Small Parts Hazard for Children Under 36 Months',
        summary: 'No component or detached fragment shall fit entirely inside the truncated test cylinder of 31.7 mm diameter and 57.1 mm depth.',
        page: 12
      },
      {
        number: 'Clause 4.7',
        title: 'Accessible Sharp Edges and Points',
        summary: 'Metal or plastic accessible corners must pass test with simulated skin penetration Mandrel probe.',
        page: 18
      }
    ],
    applicableScheme: 'Scheme-I (ISI Mark)',
    testingParameters: ['Small parts torque & tension test', 'Drop & impact resistance', 'Acoustic sound pressure level', 'Chemical phthalate limit'],
    relevanceKeywords: ['toys', 'children toys', 'board games', 'dolls', 'action figures', 'toy safety', 'is 9873', 'is9873'],
    officialDocUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is9873'
  },
  {
    id: 'is-14286',
    code: 'IS 14286 : 2010 / IS/IEC 61215',
    title: 'Crystalline Silicon Terrestrial Photovoltaic (PV) Modules — Design Qualification and Type Approval',
    category: 'Renewable Energy & Electronics',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: 'Mandatory under MNRE Solar QCO',
    qcoMinistry: 'Ministry of New & Renewable Energy (MNRE)',
    year: 2016,
    scope: 'Lays down requirements for design qualification and type approval of terrestrial crystalline silicon photovoltaic modules suitable for long-term outdoor operation.',
    keyClauses: [
      {
        number: 'Clause 10.1',
        title: 'Visual Inspection & Insulation Withstand',
        summary: 'PV modules subjected to 1000V + twice max system voltage with dry insulation resistance > 40 MΩ·m².',
        page: 15
      },
      {
        number: 'Clause 10.11',
        title: 'Thermal Cycling Test (-40°C to +85°C)',
        summary: '200 thermal cycles with current injection at peak temperature without exceeding 5% power degradation.',
        page: 24
      }
    ],
    applicableScheme: 'Scheme-II (CRS)',
    testingParameters: ['Hot spot endurance test', 'Damp heat exposure (85°C/85% RH for 1000h)', 'Mechanical load test (2400 Pa to 5400 Pa)', 'Hail impact test (25mm ice ball @ 23 m/s)'],
    relevanceKeywords: ['solar panel', 'photovoltaic', 'pv module', 'solar cell', 'renewable energy', 'inverter', 'is 14286', 'is/iec 61215'],
    officialDocUrl: 'https://www.crsbis.in/BIS/products.do'
  },
  {
    id: 'is-15844',
    code: 'IS 15844 (Part 1 & 2) : 2023',
    title: 'Footwear for General Purpose & Sports Footwear',
    category: 'Leather & Footwear',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: '1st July 2023 (Phase I & II Enforcement)',
    qcoMinistry: 'DPIIT, Footwear Quality Control Order',
    year: 2023,
    scope: 'Covers construction, material specification, upper/outsole bonding strength, flexural fatigue, and toxic chemical limits for all sports and lifestyle footwear.',
    keyClauses: [
      {
        number: 'Clause 5.1',
        title: 'Outsole Abrasion & Flex Resistance',
        summary: 'Outsole must withstand 30,000 flex cycles on Bennewart flex tester with cut growth under 4mm.',
        page: 8
      },
      {
        number: 'Clause 6.3',
        title: 'Upper to Sole Adhesion Strength',
        summary: 'Minimum peel strength between upper and sole must equal or exceed 3.0 N/mm of bonded width.',
        page: 13
      }
    ],
    applicableScheme: 'Scheme-I (ISI Mark)',
    testingParameters: ['Sole abrasion volume loss', 'Upper bond peel force', 'Slip resistance dynamic coefficient', 'Hazardous aromatic amines test'],
    relevanceKeywords: ['footwear', 'shoes', 'sneakers', 'sports shoes', 'leather shoes', 'sandals', 'is 15844', 'is15844'],
    officialDocUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is15844'
  },
  {
    id: 'is-1417',
    code: 'IS 1417 : 2016 (Amended 2023)',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness & Hallmarking',
    category: 'Precious Metals & Hallmarking',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: 'Mandatory nationwide across 343+ designated districts',
    qcoMinistry: 'Department of Consumer Affairs (DoCA)',
    year: 2023,
    scope: 'Specifies 6 standard purity grades for gold jewellery (14K585, 18K750, 20K833, 22K916, 23K958, 24K995) and mandates laser engraving of 6-digit alphanumeric HUID.',
    keyClauses: [
      {
        number: 'Clause 4.2',
        title: 'Permissible Grades of Fineness',
        summary: 'Gold articles sold to consumers must conform to specified fineness parts per thousand with zero negative tolerance in fire assay.',
        page: 5
      },
      {
        number: 'Clause 6.1',
        title: 'Three Mandatory Hallmarking Marks',
        summary: '1. BIS Triangular Logo, 2. Purity in Carat and Fineness (e.g. 22K916), 3. 6-digit alphanumeric HUID code unique to piece.',
        page: 9
      }
    ],
    applicableScheme: 'Hallmarking',
    testingParameters: ['Fire assay (Cupellation method)', 'X-Ray Fluorescence (XRF) screening', 'Density balance check', 'Laser HUID inscription auditing'],
    relevanceKeywords: ['gold', 'jewellery', 'hallmark', 'huid', 'silver', '22k', '18k', 'gold rate', 'is 1417', 'is1417'],
    officialDocUrl: 'https://www.manakonline.in/MANAK/hallmarking.do'
  },
  {
    id: 'is-16893',
    code: 'IS 16893 (Part 2 & 3) : 2018',
    title: 'Secondary Lithium Cells and Batteries for Use in Electric Vehicles',
    category: 'Automotive & Clean Mobility',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: 'Mandatory under Ministry of Heavy Industries / MoRTH AIS 156/038 alignment',
    qcoMinistry: 'Ministry of Road Transport and Highways (MoRTH)',
    year: 2018,
    scope: 'Prescribes safety tests including thermal runaway propagation, overcharge, external short circuit, nail penetration, and vibration withstand for electric vehicle lithium battery packs.',
    keyClauses: [
      {
        number: 'Clause 6.2',
        title: 'Thermal Propagation & Venting Safeguard',
        summary: 'Induced single-cell thermal runaway must not propagate to adjacent cells within 5 minutes, allowing passenger safe egress.',
        page: 21
      },
      {
        number: 'Clause 7.4',
        title: 'Drop and Mechanical Crush Test',
        summary: 'Pack subjected to 100 kN hydraulic ram crush without fire or explosion within 1 hour post-deformation.',
        page: 32
      }
    ],
    applicableScheme: 'Scheme-I (ISI Mark)',
    testingParameters: ['Thermal runaway propagation', 'Overcharge protection test', 'Mechanical shock and drop (1m)', 'Immersion IPX7 water ingress'],
    relevanceKeywords: ['ev battery', 'lithium ion', 'electric vehicle', 'bms', 'battery pack', 'two wheeler ev', 'is 16893', 'is16893'],
    officialDocUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is16893'
  },
  {
    id: 'is-4151',
    code: 'IS 4151 : 2020',
    title: 'Protective Helmets for Two-Wheeler Motorcyclists & Riders',
    category: 'Automotive Safety',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: '1st June 2021 (All helmets sold in India must bear ISI mark)',
    qcoMinistry: 'Ministry of Road Transport & Highways',
    year: 2020,
    scope: 'Defines shell rigidity, impact absorption, retention chin-strap tensile strength, peripheral vision angles, and audibility requirements for motorcycle helmets.',
    keyClauses: [
      {
        number: 'Clause 7.2',
        title: 'Impact Absorption Test',
        summary: 'Peak acceleration transmitted to headform dropped at 7.5 m/s onto flat and hemispherical steel anvils must not exceed 275 g.',
        page: 14
      },
      {
        number: 'Clause 8.3',
        title: 'Retention System Dynamic Displacement',
        summary: 'Drop weight on chin-strap mechanism must not exceed 35mm dynamic displacement or detach.',
        page: 18
      }
    ],
    applicableScheme: 'Scheme-I (ISI Mark)',
    testingParameters: ['Impact attenuation headform drop', 'Penetration cone drop test', 'Chin strap dynamic slippage', 'Peripheral vision field >105°'],
    relevanceKeywords: ['helmet', 'motorcycle helmet', 'bike helmet', 'two wheeler', 'protective helmet', 'is 4151', 'is4151'],
    officialDocUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is4151'
  },
  {
    id: 'is-14543',
    code: 'IS 14543 : 2024',
    title: 'Packaged Drinking Water (Other Than Packaged Natural Mineral Water)',
    category: 'Food Safety & Water',
    status: 'Mandatory QCO',
    qcoMandatory: true,
    qcoDate: 'Mandatory under Food Safety and Standards (FSSAI/BIS dual oversight)',
    qcoMinistry: 'Ministry of Health & Family Welfare / FSSAI',
    year: 2024,
    scope: 'Mandates strict limits on microbiological contaminants (Coliform, E.coli, Salmonella), heavy metals (Arsenic, Lead), pesticide residues, and remineralization requirements.',
    keyClauses: [
      {
        number: 'Clause 4.3',
        title: 'Microbiological Safety Parameters',
        summary: 'Zero colony-forming units (CFU) allowed per 250ml sample for E.coli, Faecal streptococci, and Pseudomonas aeruginosa.',
        page: 7
      },
      {
        number: 'Clause 5.1',
        title: 'Total Dissolved Solids (TDS) and Mineral Content',
        summary: 'TDS must stay within 75 mg/l to 500 mg/l; calcium min 20 mg/l, magnesium min 10 mg/l.',
        page: 10
      }
    ],
    applicableScheme: 'Scheme-I (ISI Mark)',
    testingParameters: ['Microbiological culture assays', 'ICP-MS heavy metal trace analysis', 'Gas chromatography for organochlorine pesticides', 'Plasticizer packaging migration'],
    relevanceKeywords: ['water', 'packaged drinking water', 'mineral water', 'bottled water', 'ro plant', 'water purification', 'is 14543', 'is14543'],
    officialDocUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is14543'
  }
];

export const CERTIFICATION_SCHEMES: CertificationScheme[] = [
  {
    id: 'scheme-1',
    name: 'Scheme-I (ISI Mark Scheme)',
    shortName: 'Product Certification (ISI)',
    badge: 'Most Common • 1,000+ Products',
    description: 'The premier national standard mark in India. Involves in-factory manufacturing audit, sample testing in BIS/NABL labs, independent factory surveillance, and grants the right to use the prestigious ISI emblem.',
    targetProducts: ['Steel products', 'Water bottles', 'Cement', 'Cables', 'Food items', 'Automotive safety gear', 'Toys', 'Footwear'],
    procedure: [
      { step: 1, title: 'Preliminary Standard Review', description: 'Confirm applicable Indian Standard (IS Code) and whether covered under mandatory Quality Control Order (QCO).' },
      { step: 2, title: 'In-house Lab Setup', description: 'Establish testing capabilities and calibrated testing equipment listed in the BIS Scheme of Testing and Inspection (STI).' },
      { step: 3, title: 'Online e-BIS Application', description: 'Submit Form-I on the Manakonline portal with company registration, factory layout, and manufacturing machinery details.' },
      { step: 4, title: 'BIS Factory Audit', description: 'BIS Inspection Officer visits facility, assesses Quality Assurance system, and seals samples for independent lab verification.' },
      { step: 5, title: 'Sample Testing & Grant', description: 'Upon passing independent lab test and scrutiny, CML License (Certification Marks License) is granted with ISI marking permission.' }
    ],
    timeline: '30 to 60 Days (Normal Route) / 30 Days (Simplified Route for MSMEs)',
    feeEstimate: '₹1,000 Application + ₹7,000 Inspection + ₹1,000/yr License + Lab Testing Fees (80% concession for Micro enterprises)',
    documents: ['Manufacturing Plant Layout', 'List of Machinery & Capacity', 'In-house Test Equipment & Calibration Certificates', 'Authorized Signatory POA', 'Raw material test certificates'],
    suitableFor: 'Domestic manufacturers with manufacturing facilities located in India.'
  },
  {
    id: 'scheme-2',
    name: 'Scheme-II (CRS - Compulsory Registration Scheme)',
    shortName: 'CRS (Electronics & IT)',
    badge: 'Self-Declaration • 70+ IT Categories',
    description: 'Streamlined scheme managed by MeitY and BIS for electronics, IT hardware, solar PV, and battery cells. Based on self-declaration of conformity following testing in BIS-recognized laboratories without preliminary factory inspection.',
    targetProducts: ['Laptops & Tablets', 'Mobile Phones', 'Power Banks', 'LED Lamps & Drivers', 'Smart Watches', 'Solar Inverters & PV Modules', 'CCTV Cameras'],
    procedure: [
      { step: 1, title: 'Sample Submission to Recognized Lab', description: 'Submit product test units to an Indian BIS-recognized NABL testing lab.' },
      { step: 2, title: 'Obtain Test Report', description: 'Receive successful test report in prescribed BIS format confirming safety compliance.' },
      { step: 3, title: 'Online CRS Portal Submission', description: 'File registration on crsbis.in with test report within 90 days of issuance.' },
      { step: 4, title: 'Document Scrutiny', description: 'BIS technical officer reviews test report, trademark affiliation, and Indian representative undertaking.' },
      { step: 5, title: 'Grant of R-Number', description: 'BIS issues unique Registration Number (R-XXXXXXXX) and CRS Standard Mark label authorization.' }
    ],
    timeline: '15 to 25 Working Days post test report issuance',
    feeEstimate: '₹53,000 per product category (Includes 2-year validity fee + processing fee)',
    documents: ['BIS Lab Test Report', 'Trademark Registration Certificate', 'Undertaking for Compliance', 'Authorized Indian Representative (AIR) documents for foreign applicants'],
    suitableFor: 'IT and electronics manufacturers (both domestic and overseas with an Indian office).'
  },
  {
    id: 'fmcs',
    name: 'FMCS (Foreign Manufacturers Certification Scheme)',
    shortName: 'FMCS (Overseas)',
    badge: 'Global Imports • Scheme-I Parallel',
    description: 'Enables overseas manufacturers exporting products to India under mandatory QCOs to obtain the ISI mark. Requires appointment of an Authorized Indian Representative (AIR) and physical inspection of overseas manufacturing plants.',
    targetProducts: ['Imported Steel & Alloys', 'Foreign Automotive components', 'Overseas Chemicals & Polymers', 'Foreign Medical devices', 'Imported Tyres'],
    procedure: [
      { step: 1, title: 'AIR Appointment', description: 'Appoint a resident Indian citizen or legally registered Indian entity as Authorized Indian Representative.' },
      { step: 2, title: 'Online FMCD Application', description: 'Submit comprehensive dossier on Manakonline FMCD module with full factory blueprints.' },
      { step: 3, title: 'Overseas Factory Audit', description: 'BIS technical delegation inspects the overseas manufacturing line and draws random production samples.' },
      { step: 4, title: 'Customs Clearance of Test Samples', description: 'Air-freight drawn samples to accredited BIS laboratory in India for rigorous testing.' },
      { step: 5, title: 'Grant of License & Performance Bank Guarantee', description: 'Submit Performance Bank Guarantee (PBG) of USD 10,000 and receive CML license.' }
    ],
    timeline: '90 to 180 Days (Subject to visa, factory audit scheduling, and test durations)',
    feeEstimate: 'USD $1,000 Application + Travel & Daily Allowance for 2 BIS Auditors + Lab Testing Fees + USD $10,000 refundable PBG',
    documents: ['Factory Business License', 'AIR Authorization Deed', 'Machinery Layout & Flowchart', 'Calibration Traceability to National Metrology', 'Previous 1 Year Internal Test Logs'],
    suitableFor: 'Foreign factories manufacturing goods intended for export into India.'
  },
  {
    id: 'hallmarking',
    name: 'Hallmarking Scheme (Gold & Silver)',
    shortName: 'HUID Hallmarking',
    badge: 'Consumer Protection • Mandatory',
    description: 'Statutory quality assurance guaranteeing certified purity in precious gold and silver jewellery. Every article is assayed and laser-inscribed with the BIS triangular hallmark and a 6-digit alphanumeric HUID code.',
    targetProducts: ['Gold rings, chains, bangles', 'Silver jewellery & artefacts', 'Gold coins & bullion medallions', 'Bridal jewellery sets'],
    procedure: [
      { step: 1, title: 'Jeweller Registration on Manakonline', description: 'Zero registration fee for jewellers with single or multiple retail outlets.' },
      { step: 2, title: 'Submission to Assaying & Hallmarking Centre (AHC)', description: 'Send raw or finished articles to a BIS-recognized Assaying & Hallmarking Centre.' },
      { step: 3, title: 'Sampling & Fire Assay', description: 'AHC performs XRF screening followed by definitive cupellation fire assay to test parts per thousand fineness.' },
      { step: 4, title: 'Laser Inscription of HUID', description: 'AHC generates 6-digit alphanumeric code from central BIS server and laser-inscribes it on the ornament.' },
      { step: 5, title: 'Consumer Verification', description: 'Customer verifies ornament authenticity, jeweller identity, and hallmarking date via the BIS CARE App.' }
    ],
    timeline: '24 to 48 Hours at recognized AHC centers',
    feeEstimate: 'Jeweller Registration: Free (as per latest govt incentive). Hallmarking fee: ₹45 per gold article, ₹35 per silver article (+ GST)',
    documents: ['Jeweller GSTIN / Trade License', 'PAN Card of Proprietor / Directors', 'Proof of Shop Ownership or Rent Agreement', 'Sale Invoice Template'],
    suitableFor: 'Gold & silver jewellery retailers, wholesalers, and bullion manufacturers.'
  }
];

export const TESTING_LABS: TestingLab[] = [
  {
    id: 'lab-central-sahibabad',
    name: 'BIS Central Laboratory (CL)',
    type: 'BIS Central Lab',
    city: 'Ghaziabad (Delhi NCR)',
    state: 'Uttar Pradesh',
    address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad - 201010',
    contactEmail: 'cl@bis.gov.in',
    phone: '+91 120 4177100',
    standardsTested: ['IS 17803 : 2022', 'IS 9873 (Part 1)', 'IS 4151 : 2020', 'IS 14543 : 2024', 'IS 6911', 'IS 1293'],
    productCapabilities: ['Mechanical & metallurgy', 'Thermal insulation testing', 'Food-contact material migration', 'Toy physical & chemical safety', 'Helmets impact attenuation'],
    turnaroundTime: '7 - 14 Business Days',
    rating: 4.9
  },
  {
    id: 'lab-western-mumbai',
    name: 'BIS Western Regional Laboratory (WROL)',
    type: 'BIS Regional Lab',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Manakalaya, E9, MIDC, Andheri (East), Mumbai - 400093',
    contactEmail: 'wrol@bis.gov.in',
    phone: '+91 22 28329295',
    standardsTested: ['IS 17803 : 2022', 'IS 15844 (Part 1 & 2)', 'IS 1417', 'IS 14543 : 2024', 'IS 13252'],
    productCapabilities: ['Plastics & polymers', 'Footwear flex & abrasion', 'Water microbiology', 'Chemical spectrometry', 'Precious metal assaying'],
    turnaroundTime: '10 - 18 Business Days',
    rating: 4.8
  },
  {
    id: 'lab-southern-chennai',
    name: 'BIS Southern Regional Laboratory (SROL)',
    type: 'BIS Regional Lab',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113',
    contactEmail: 'srol@bis.gov.in',
    phone: '+91 44 22541442',
    standardsTested: ['IS 14286', 'IS 16893', 'IS 15844', 'IS 17803 : 2022', 'IS 4151'],
    productCapabilities: ['Solar photovoltaic environmental chambers', 'Lithium-ion pack crush & thermal runaway', 'Electrical safety', 'Automotive safety gear'],
    turnaroundTime: '10 - 15 Business Days',
    rating: 4.8
  },
  {
    id: 'lab-eastern-kolkata',
    name: 'BIS Eastern Regional Laboratory (EROL)',
    type: 'BIS Regional Lab',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '1/14 C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054',
    contactEmail: 'erol@bis.gov.in',
    phone: '+91 33 23207085',
    standardsTested: ['IS 17803', 'IS 6911', 'IS 14543', 'IS 9873', 'IS 1293'],
    productCapabilities: ['Heavy metallurgy & steel grades', 'Civil engineering & cement', 'Water testing', 'Electrical switchgear'],
    turnaroundTime: '8 - 14 Business Days',
    rating: 4.7
  },
  {
    id: 'lab-nabl-bangalore',
    name: 'National Test House (NTH) & NABL Partner Facility',
    type: 'NABL Accredited Partner',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Peenya Industrial Area, 1st Stage, Bengaluru - 560058',
    contactEmail: 'blrlab@nth.gov.in',
    phone: '+91 80 28395562',
    standardsTested: ['IS 14286', 'IS 16893', 'IS 13252', 'IS 17803'],
    productCapabilities: ['Electronic safety (CRS scheme)', 'Battery safety & environmental cycling', 'Photovoltaic reliability testing'],
    turnaroundTime: '5 - 10 Business Days',
    rating: 4.9
  },
  {
    id: 'lab-nabl-pune',
    name: 'Automotive Research Association of India (ARAI)',
    type: 'NABL Accredited Partner',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Survey No. 102, Vetal Hill, Off Paud Road, Kothrud, Pune - 411038',
    contactEmail: 'info@araiindia.com',
    phone: '+91 20 30231111',
    standardsTested: ['IS 16893 (Part 2 & 3)', 'IS 4151 : 2020', 'AIS 156 / AIS 038'],
    productCapabilities: ['EV powertrain & battery nail penetration test', 'Helmets high-speed kinematic impact test', 'Chassis mechanical integrity'],
    turnaroundTime: '12 - 20 Business Days',
    rating: 5.0
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    code: 'ASK',
    title: 'Natural Language Question',
    subtitle: 'Freeform Query Input',
    description: 'Input any practical industry, manufacturing, or consumer query in conversational English, Hindi, or vernacular syntax without needing to memorize obscure standard nomenclature.',
    technicalDetails: 'Accepts raw text, product photographs, HS code fragments, or draft technical specifications.',
    badge: 'Intent Extraction',
    metric: '< 150ms Latency'
  },
  {
    step: '02',
    code: 'UNDERSTAND',
    title: 'Intent & Entity Extraction',
    subtitle: 'Semantic Product Disambiguation',
    description: 'Neural entity recognition pinpoints product taxonomy, end-use category, manufacturing materials (e.g. food-grade SS 304 vs ferritic 430), and jurisdiction constraints.',
    technicalDetails: 'Maps ambiguous colloquial terms (e.g. "sipper flask") to official Harmonized Commodity Description (HSN 7323 / 9617).',
    badge: 'NLP Parsing',
    metric: '99.2% Entity Accuracy'
  },
  {
    step: '03',
    code: 'RETRIEVE',
    title: 'Authorized BIS Lookup',
    subtitle: 'Standard & QCO Database Search',
    description: 'Queries vector embeddings of all 21,000+ active Indian Standards, Ministry Gazette Quality Control Orders (QCOs), and Scheme of Testing & Inspection (STI) manuals.',
    technicalDetails: 'Retrieves latest active amendments, preventing outdated or withdrawn standard recommendations.',
    badge: 'Official Gazette Sync',
    metric: 'Real-time Sync'
  },
  {
    step: '04',
    code: 'REASON',
    title: 'Synthesis & Gap Analysis',
    subtitle: 'Regulatory Logic Engine',
    description: 'Determines whether the product falls under mandatory certification or voluntary ISI mark, identifies relevant testing protocols, and calculates exemption thresholds.',
    technicalDetails: 'Evaluates MSME concession applicability, micro-enterprise fee rebates, and export-only exemptions.',
    badge: 'Rule Engine',
    metric: 'Deterministic Verification'
  },
  {
    step: '05',
    code: 'VERIFY',
    title: 'Document & Clause Cross-Ref',
    subtitle: 'Zero-Hallucination Citation',
    description: 'Every statement is cross-referenced directly against exact Clause numbers, tables, and Ministry notifications with page-level cryptographic audit trails.',
    technicalDetails: 'Guarantees transparent traceability with clickable "View Source" clause excerpts.',
    badge: 'Audit Transparency',
    metric: '100% Source Backed'
  },
  {
    step: '06',
    code: 'ACT',
    title: 'Actionable Steps & Services',
    subtitle: 'Ready-to-Execute Roadmap',
    description: 'Outputs a streamlined checklist: laboratory booking, testing parameter preparation, Manakonline portal links, and documentation kits ready for filing.',
    technicalDetails: 'Direct one-click connection to accredited labs, fee estimators, and e-BIS portals.',
    badge: 'Turnkey Compliance',
    metric: 'Filing-Ready'
  }
];

export const SAMPLE_HUID_DATABASE: HUIDRecord[] = [
  {
    huid: 'AB7921',
    jewellerName: 'Tanishq (Titan Company Ltd.) — South Extension',
    hallmarkingCenter: 'Delhi Assaying & Hallmarking Centre, Karol Bagh',
    ahcRegistrationNo: 'AHC-DL-0892',
    purity: '22K916 (91.6% Pure Gold)',
    metal: 'Gold',
    articleType: 'Handcrafted Bridal Bangle (Pair)',
    hallmarkedDate: '12th August 2024',
    status: 'Verified Valid'
  },
  {
    huid: 'CK4819',
    jewellerName: 'Malabar Gold & Diamonds — MG Road Bengaluru',
    hallmarkingCenter: 'Bengaluru Precision Assay Lab Pvt Ltd',
    ahcRegistrationNo: 'AHC-KA-1104',
    purity: '18K750 (75.0% Pure Gold)',
    metal: 'Gold',
    articleType: 'Diamond-Studded Pendant',
    hallmarkedDate: '24th January 2025',
    status: 'Verified Valid'
  },
  {
    huid: 'XY9902',
    jewellerName: 'Kalyan Jewellers — T Nagar Chennai',
    hallmarkingCenter: 'Madras Bullion & Hallmarking Service',
    ahcRegistrationNo: 'AHC-TN-0431',
    purity: '24K995 (99.5% Pure Gold Bullion)',
    metal: 'Gold',
    articleType: 'Stamped Gold Coin 10g',
    hallmarkedDate: '3rd February 2025',
    status: 'Verified Valid'
  },
  {
    huid: 'ZZ0000',
    jewellerName: 'Unregistered Entity (Suspected Counterfeit)',
    hallmarkingCenter: 'Non-Existent Centre',
    ahcRegistrationNo: 'REVOKED-000',
    purity: 'Claimed 22K (Tested < 68%)',
    metal: 'Gold',
    articleType: 'Chain',
    hallmarkedDate: 'Invalid Date',
    status: 'Revoked'
  }
];

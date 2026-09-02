# knowledge_base.py
"""
Structured Knowledge Base for Bureau of Indian Standards (BIS)
Contains IS Codes, Quality Control Orders (QCOs), Schemes, and Testing Labs.
"""

BIS_STANDARDS = [
    {
        "code": "IS 10500:2012",
        "title": "Drinking Water Specification (Second Revision)",
        "sector": "Food & Agriculture / Water",
        "mandatory_qco": True,
        "scope": "Prescribes requirements and methods of sampling and test for drinking water.",
        "key_clauses": [
            {"clause": "Table 1 (Cl. 4.1)", "param": "pH Value", "limit": "6.5 to 8.5 (No relaxation)"},
            {"clause": "Table 1 (Cl. 4.1)", "param": "Total Dissolved Solids (TDS)", "limit": "Max 500 mg/L (Permissible up to 2000 mg/L in absence of alternate source)"},
            {"clause": "Table 1 (Cl. 4.1)", "param": "Turbidity", "limit": "Max 1 NTU (Permissible up to 5 NTU)"},
            {"clause": "Table 2 (Cl. 4.2)", "param": "Total Coliform Bacteria", "limit": "Shall not be detectable in any 100 ml sample"},
            {"clause": "Table 2 (Cl. 4.2)", "param": "E. coli", "limit": "Shall not be detectable in any 100 ml sample"}
        ]
    },
    {
        "code": "IS 14543:2024",
        "title": "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
        "sector": "Food & Agriculture",
        "mandatory_qco": True,
        "scope": "Mandatory ISI mark Scheme I. Requires on-site microbiological and chemical testing labs.",
        "key_clauses": [
            {"clause": "Cl. 5.1", "param": "Packaging", "limit": "Food grade plastic or glass containers conforming to IS 15410"},
            {"clause": "Cl. 6.2", "param": "Microbiological", "limit": "Zero Coliform, Faecal streptococci, Pseudomonas aeruginosa"},
            {"clause": "Cl. 7.1", "param": "Shelf-life Labelling", "limit": "Best before date and batch numbering mandatory"}
        ]
    },
    {
        "code": "IS 1417:2016",
        "title": "Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking",
        "sector": "Metallurgical / Hallmarking",
        "mandatory_qco": True,
        "scope": "Mandatory 3-symbol Hallmarking on Gold Jewellery across 343+ notified districts in India.",
        "key_clauses": [
            {"clause": "Cl. 4.1", "param": "Permitted Purity Grades", "limit": "24K (999), 23K (958), 22K (916), 20K (833), 18K (750), 14K (585)"},
            {"clause": "Cl. 5.2", "param": "3-Symbol Hallmarking", "limit": "1. BIS Logo (Triangle), 2. Purity & Karat (e.g. 22K916), 3. 6-digit alphanumeric HUID"},
            {"clause": "Cl. 6.1", "param": "Assaying Method", "limit": "Fire Assay method conforming to IS 1418"}
        ]
    },
    {
        "code": "IS 13252 (Part 1):2010",
        "title": "Information Technology Equipment — Safety (General Requirements)",
        "sector": "Electronics & IT",
        "mandatory_qco": True,
        "scope": "Regulated under Compulsory Registration Scheme (CRS Scheme II). Mandatory for Laptops, Servers, POS Machines, Printers.",
        "key_clauses": [
            {"clause": "Cl. 1.5", "param": "Components Safety", "limit": "Critical components (SMPS, cords, batteries) must conform to respective IS"},
            {"clause": "Cl. 2.1", "param": "Electric Shock Protection", "limit": "SELV reliability and insulation barrier testing"},
            {"clause": "Cl. 4.5", "param": "Thermal Resistance", "limit": "Maximum permitted temperature rise under full rated load"}
        ]
    },
    {
        "code": "IS 16046 (Part 2):2018",
        "title": "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)",
        "sector": "Electronics & Energy",
        "mandatory_qco": True,
        "scope": "Mandatory CRS registration for smartphone batteries, power banks, portable electronics.",
        "key_clauses": [
            {"clause": "Cl. 7.3.1", "param": "External Short Circuit", "limit": "No fire, no explosion at ambient temperature (20±5)°C"},
            {"clause": "Cl. 7.3.2", "param": "Free Fall Test", "limit": "Drop from 1.0 m height onto concrete floor without leakage or rupture"},
            {"clause": "Cl. 7.3.4", "param": "Overcharge Test", "limit": "Charging at 2x rated current for specified duration without explosion"}
        ]
    },
    {
        "code": "IS 1786:2008",
        "title": "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (TMT Rebars)",
        "sector": "Civil Engineering & Steel",
        "mandatory_qco": True,
        "scope": "Mandatory Scheme I ISI Mark for all construction TMT rebars sold in India.",
        "key_clauses": [
            {"clause": "Table 1", "param": "Chemical Composition", "limit": "Carbon max 0.25% (Fe 500D), Sulphur max 0.040%, Phosphorus max 0.040%"},
            {"clause": "Table 3", "param": "0.2% Proof Stress", "limit": "Fe 500D: Min 500 N/mm²; Fe 550D: Min 550 N/mm²"},
            {"clause": "Table 3", "param": "Elongation at gauge length", "limit": "Min 16.0% for Fe 500D"}
        ]
    },
    {
        "code": "IS 4151:2020",
        "title": "Protective Helmets for Two-Wheeler Riders",
        "sector": "Automotive & Road Safety",
        "mandatory_qco": True,
        "scope": "Mandatory ISI marking. Selling non-ISI two-wheeler helmets in India is a criminal offence under BIS Act 2016.",
        "key_clauses": [
            {"clause": "Cl. 7.1", "param": "Weight Limit", "limit": "Maximum allowable weight is 1.2 kg (1200 grams)"},
            {"clause": "Cl. 8.1", "param": "Impact Absorption Test", "limit": "Peak acceleration shall not exceed 150g across all drop configurations"},
            {"clause": "Cl. 8.2", "param": "Retention System (Chinstrap)", "limit": "Dynamic displacement shall not exceed 35 mm under 15 kN force"}
        ]
    },
    {
        "code": "IS 9873 (Part 1):2019",
        "title": "Safety of Toys — Part 1: Mechanical and Physical Properties",
        "sector": "Consumer Products & Toys",
        "mandatory_qco": True,
        "scope": "Mandatory Scheme I for all domestic toy manufacturers and foreign imports.",
        "key_clauses": [
            {"clause": "Cl. 4.4", "param": "Small Parts Cylinder", "limit": "No part for toys intended for under 36 months shall fit inside test cylinder"},
            {"clause": "Cl. 4.5", "param": "Sharp Edges & Points", "limit": "No accessible hazardous sharp edges after drop/impact tests"}
        ]
    }
]

BIS_SCHEMES = [
    {
        "scheme_id": "Scheme-I",
        "name": "Product Certification Scheme (ISI Mark)",
        "governing_rules": "BIS (Conformity Assessment) Regulations, 2018, Scheme I",
        "target": "Domestic Manufacturers across 700+ mandatory QCO items and voluntary products.",
        "process": [
            "1. Submission of online Form-V on Manakonline portal with manufacturing & testing infrastructure details.",
            "2. Factory audit by BIS inspecting officer to verify manufacturing machinery, competency, and in-house testing lab.",
            "3. Drawing of independent factory samples and sending to BIS recognized/NABL accredited laboratories.",
            "4. Grant of License (CM/L - Certificate of Manufacturing License 7/8 digit number) upon passing all clauses.",
            "5. Mandatory continuous surveillance, periodic testing, and Scheme of Inspection and Testing (SIT) compliance."
        ]
    },
    {
        "scheme_id": "Scheme-II",
        "name": "Compulsory Registration Scheme (CRS)",
        "governing_rules": "BIS (Conformity Assessment) Regulations, 2018, Scheme II (MeitY / MNRE / MHI notified)",
        "target": "Electronics, Information Technology, Solar Inverters, LED drivers, and Mobile phones.",
        "process": [
            "1. Product sample submitted directly to BIS-recognized Indian NABL laboratory for testing against relevant IS.",
            "2. Receipt of official Test Report (valid for 90 days for registration filing).",
            "3. Online application on www.crsbis.in portal with test report, brand endorsement, and Indian Representative (AIR) for foreign brands.",
            "4. Grant of Registration number (R-XXXXXXXX) without mandatory pre-grant factory inspection.",
            "5. Label marking: Standard BIS CRS logo with 'IS XXXXX' and 'R-XXXXXXXX' displayed on product carton/body."
        ]
    },
    {
        "scheme_id": "Scheme-IV",
        "name": "Foreign Manufacturers Certification Scheme (FMCS)",
        "governing_rules": "BIS (Conformity Assessment) Regulations, 2018, Scheme IV",
        "target": "Overseas manufacturing units exporting ISI mandatory products to India.",
        "process": [
            "1. Submission of physical/digital application with appointment of Authorized Indian Representative (AIR).",
            "2. Pre-inspection audit charges and physical visit by BIS officers to the overseas manufacturing facility.",
            "3. Sample drawn during overseas inspection sent to BIS accredited lab in India.",
            "4. Performance Bank Guarantee (PBG) and annual marking fee payment.",
            "5. Grant of CM/L license to print ISI mark with overseas factory location details."
        ]
    },
    {
        "scheme_id": "Hallmarking",
        "name": "Hallmarking Scheme for Gold & Silver Artefacts",
        "governing_rules": "Section 14 & 16 of BIS Act, 2016 and Hallmarking Regulations",
        "target": "Jewellers and Assaying & Hallmarking Centres (AHCs).",
        "process": [
            "1. Jeweller obtains online zero-fee registration on Manakonline portal.",
            "2. Manufactured jewellery submitted to BIS-recognized Assaying & Hallmarking Centre (AHC).",
            "3. XRF screening + Fire Assay destructive/sampling testing to verify fineness (e.g. 91.6% for 22K).",
            "4. Laser marking of 3 authentic identifiers: BIS Logo, Karat/Purity (22K916), and unique 6-digit alphanumeric HUID.",
            "5. Consumer verification via BIS Care App entering the 6-digit HUID."
        ]
    }
]

BIS_TESTING_LABS = [
    {"name": "BIS Central Laboratory (CL)", "city": "Sahibabad, Ghaziabad", "state": "Uttar Pradesh", "scope": "Chemical, Electrical, Mechanical, Microbiological benchmark testing."},
    {"name": "BIS Western Regional Office Laboratory (WROL)", "city": "Mumbai", "state": "Maharashtra", "scope": "Electronics, Metals, Food products, Polymers."},
    {"name": "BIS Southern Regional Office Laboratory (SROL)", "city": "Chennai", "state": "Tamil Nadu", "scope": "Electrical cables, Transformers, Packaged water, Cement."},
    {"name": "BIS Eastern Regional Office Laboratory (EROL)", "city": "Kolkata", "state": "West Bengal", "scope": "Steel, TMT bars, Galvanized sheets, Chemical testing."},
    {"name": "BIS Northern Regional Office Laboratory (NROL)", "city": "Mohali", "state": "Punjab", "scope": "Automotive components, Safety footwear, Helmets, Textiles."}
]


def retrieve_relevant_context(query: str) -> str:
    """
    RAG Retrieval: Finds matching standards, schemes, and lab clauses based on keywords in the query.
    """
    q_lower = query.lower()
    matched_standards = []
    
    for std in BIS_STANDARDS:
        if (std["code"].lower() in q_lower or
            std["sector"].lower() in q_lower or
            any(word in q_lower for word in std["title"].lower().split()) or
            ("gold" in q_lower and "1417" in std["code"]) or
            ("water" in q_lower and ("10500" in std["code"] or "14543" in std["code"])) or
            ("helmet" in q_lower and "4151" in std["code"]) or
            ("steel" in q_lower and "1786" in std["code"]) or
            ("battery" in q_lower and "16046" in std["code"]) or
            ("electronics" in q_lower and "13252" in std["code"]) or
            ("toy" in q_lower and "9873" in std["code"])):
            matched_standards.append(std)

    matched_schemes = []
    for sc in BIS_SCHEMES:
        if (sc["scheme_id"].lower() in q_lower or 
            any(w in q_lower for w in sc["name"].lower().split()) or
            ("isi" in q_lower and "Scheme-I" in sc["scheme_id"]) or
            ("crs" in q_lower and "Scheme-II" in sc["scheme_id"]) or
            ("foreign" in q_lower and "Scheme-IV" in sc["scheme_id"]) or
            ("huid" in q_lower and "Hallmarking" in sc["scheme_id"]) or
            ("jewell" in q_lower and "Hallmarking" in sc["scheme_id"])):
            matched_schemes.append(sc)

    context_parts = []
    if matched_standards:
        context_parts.append("### RELEVANT INDIAN STANDARDS:")
        for s in matched_standards:
            clauses_str = "\n".join([f"   - {c['clause']} ({c['param']}): {c['limit']}" for c in s['key_clauses']])
            context_parts.append(f"**Standard:** {s['code']} — {s['title']}\n**Sector:** {s['sector']}\n**Mandatory QCO:** {s['mandatory_qco']}\n**Key Clauses:**\n{clauses_str}")

    if matched_schemes:
        context_parts.append("\n### RELEVANT CONFORMITY SCHEMES:")
        for sc in matched_schemes:
            proc_str = "\n".join([f"   {p}" for p in sc['process']])
            context_parts.append(f"**Scheme:** {sc['name']} ({sc['scheme_id']})\n**Target:** {sc['target']}\n**Process:**\n{proc_str}")

    return "\n\n".join(context_parts) if context_parts else "General BIS Regulations under BIS Act, 2016."
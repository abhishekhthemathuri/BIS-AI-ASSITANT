INSERT INTO bis_departments (dept_code, dept_name, description) VALUES
('CED', 'Civil Engineering Department', 'Structural steel, cement, pipes, timber, building materials'),
('ETD', 'Electrotechnical Department', 'Cables, transformers, switchgear, electric motors'),
('FAD', 'Food and Agriculture Department', 'Packaged water, dairy, baby food, agricultural products'),
('LITD', 'Electronics and IT Department', 'Computers, servers, displays, cell phones, batteries'),
('MED', 'Mechanical Engineering Department', 'Two-wheeler helmets, pressure cookers, gas cylinders'),
('MTD', 'Metallurgical Engineering Department', 'Gold hallmarking, silver fineness, alloy specifications')
ON CONFLICT (dept_code) DO NOTHING;

INSERT INTO certification_schemes (scheme_code, scheme_name, governing_regulation, mark_type, target_entities) VALUES
('SCHEME_I', 'Product Certification Scheme (ISI Mark)', 'BIS (Conformity Assessment) Regulations 2018, Scheme I', 'ISI Mark with CM/L number', 'Domestic manufacturers'),
('SCHEME_II', 'Compulsory Registration Scheme (CRS)', 'BIS (Conformity Assessment) Regulations 2018, Scheme II', 'BIS CRS Logo with R-number', 'Electronics and IT equipment'),
('SCHEME_IV', 'Foreign Manufacturers Certification Scheme (FMCS)', 'BIS (Conformity Assessment) Regulations 2018, Scheme IV', 'ISI Mark with overseas CM/L number', 'Overseas factories exporting to India'),
('HALLMARK', 'Hallmarking of Gold and Silver Jewellery', 'Section 14 & 16 of BIS Act, 2016', '3-Symbol Hallmark with 6-digit HUID', 'Jewellers and Assaying Centres')
ON CONFLICT (scheme_code) DO NOTHING;

INSERT INTO standards_catalog (standard_id, is_number, revision_year, title, dept_code, scope_summary) VALUES
('IS 10500:2012', 'IS 10500', 2012, 'Drinking Water Specification', 'FAD', 'Requirements and test methods for potable drinking water.'),
('IS 14543:2024', 'IS 14543', 2024, 'Packaged Drinking Water', 'FAD', 'Requirements for packaged drinking water in sealed containers.'),
('IS 1417:2016', 'IS 1417', 2016, 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking', 'MTD', 'Gold fineness and mandatory 3-symbol hallmarking with 6-digit HUID.'),
('IS 13252 (Part 1):2010', 'IS 13252 (Part 1)', 2010, 'Information Technology Equipment — Safety', 'LITD', 'Safety testing under Compulsory Registration Scheme (CRS).'),
('IS 16046 (Part 2):2018', 'IS 16046 (Part 2)', 2018, 'Secondary Lithium Cells and Batteries', 'LITD', 'Safety requirements for portable lithium batteries.'),
('IS 1786:2008', 'IS 1786', 2008, 'High Strength Deformed Steel Bars (TMT)', 'CED', 'TMT steel bars for concrete reinforcement.'),
('IS 4151:2020', 'IS 4151', 2020, 'Protective Helmets for Two-Wheeler Riders', 'MED', 'Safety, impact absorption, and 1.2 kg weight limit for motorcycle helmets.')
ON CONFLICT (standard_id) DO NOTHING;

INSERT INTO quality_control_orders (qco_id, qco_title, notifying_ministry, s_o_number, notification_date, effective_date, standard_id) VALUES
('QCO-HELMETS-2020', 'Two-Wheeled Motor Vehicles Helmets QCO', 'MoRTH', 'S.O. 4252(E)', '2020-11-26', '2021-06-01', 'IS 4151:2020'),
('QCO-HALLMARK-2020', 'Hallmarking of Gold Jewellery Order', 'Ministry of Consumer Affairs', 'S.O. 1305(E)', '2020-01-15', '2021-06-23', 'IS 1417:2016')
ON CONFLICT (qco_id) DO NOTHING;

INSERT INTO standard_test_clauses (standard_id, clause_number, parameter_name, unit_of_measurement, acceptable_limit, permissible_limit_relaxation, test_method_standard) VALUES
('IS 10500:2012', 'Table 1, Item 2', 'pH Value', 'pH units', '6.5 to 8.5', 'No relaxation', 'IS 3025 (Part 11)'),
('IS 10500:2012', 'Table 1, Item 4', 'Total Dissolved Solids (TDS)', 'mg/L', 'Max 500', 'Max 2000 (in absence of alternate source)', 'IS 3025 (Part 16)'),
('IS 10500:2012', 'Table 2, Item 1', 'E. coli Bacteria', 'Count/100ml', 'Shall not be detectable in 100 ml', 'No relaxation', 'IS 15185'),
('IS 1417:2016', 'Clause 4.1', '22 Karat Gold Fineness', 'ppt', '916.0 (91.6% pure)', 'No negative tolerance', 'IS 1418 (Fire Assay)'),
('IS 4151:2020', 'Clause 7.1', 'Total Helmet Weight', 'grams', 'Max 1200 g (1.2 kg)', '+50g for peak helmets', 'Physical Weighing'),
('IS 4151:2020', 'Clause 8.1', 'Impact Absorption Peak Acceleration', 'g', 'Shall not exceed 150g', 'No relaxation', 'Drop Test Tower');

INSERT INTO testing_laboratories (lab_id, lab_name, lab_type, address, city, state, contact_email) VALUES
('BIS-CL-01', 'BIS Central Laboratory', 'BIS_CENTRAL', 'Plot 20/9, Site IV, Sahibabad Industrial Area', 'Ghaziabad', 'Uttar Pradesh', 'cl@bis.gov.in'),
('BIS-WROL-01', 'BIS Western Regional Office Laboratory', 'BIS_REGIONAL', 'MIDC, Andheri East', 'Mumbai', 'Maharashtra', 'wrol@bis.gov.in')
ON CONFLICT (lab_id) DO NOTHING;
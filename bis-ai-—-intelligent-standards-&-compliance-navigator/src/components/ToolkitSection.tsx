import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Award,
  AlertTriangle,
  FlaskConical,
  Gem,
  FileSearch,
  ChevronRight,
  ExternalLink,
  X,
  CheckCircle2,
  Filter,
  Upload,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  FileCheck2,
  Percent,
  Check
} from 'lucide-react';
import { INDIAN_STANDARDS, CERTIFICATION_SCHEMES, TESTING_LABS, SAMPLE_HUID_DATABASE } from '../data/bisData';
import { IndianStandard, CertificationScheme, TestingLab, HUIDRecord } from '../types';

export default function ToolkitSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 01 Find a Standard State
  const [standardSearch, setStandardSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStandardDetail, setSelectedStandardDetail] = useState<IndianStandard | null>(null);

  // 02 Certification Guide State
  const [selectedScheme, setSelectedScheme] = useState<CertificationScheme>(CERTIFICATION_SCHEMES[0]);

  // 03 Compliance Check State
  const [complianceProduct, setComplianceProduct] = useState('Stainless Steel Vacuum Bottles');
  const [complianceTested, setComplianceTested] = useState<'yes' | 'no' | 'partial'>('no');
  const [complianceInHouseLab, setComplianceInHouseLab] = useState<'yes' | 'no'>('no');
  const [complianceResult, setComplianceResult] = useState<any>(null);

  // 04 Lab Finder State
  const [labSearch, setLabSearch] = useState('');
  const [labFilterType, setLabFilterType] = useState('All');

  // 05 Hallmarking State
  const [huidInput, setHuidInput] = useState('');
  const [huidResult, setHuidResult] = useState<HUIDRecord | null | 'not_found'>(null);
  const [goldWeightGrams, setGoldWeightGrams] = useState<number>(10);
  const [goldKarat, setGoldKarat] = useState<number>(22);

  // 06 Ask a Document State
  const [uploadedDocName, setUploadedDocName] = useState<string>('IS_17803_2022_WaterBottles_Spec.pdf');
  const [docQuestion, setDocQuestion] = useState('What are the drop impact and temperature insulation criteria in this standard?');
  const [docAnalysisLoading, setDocAnalysisLoading] = useState(false);
  const [docAnswer, setDocAnswer] = useState<string | null>(
    'Based on Clause 5.2 (Page 11) and Clause 5.6 (Page 14) of IS 17803:2022:\n• Thermal Insulation: Liquid preheated to 95°C must remain ≥ 60°C after 6 hours and ≥ 45°C after 12 hours.\n• Drop Impact: Must withstand a 1.2m freefall inverted drop onto flat concrete without cracking or fluid leakage.'
  );

  const tools = [
    {
      id: 'find-standard',
      number: '01',
      title: 'Find a Standard',
      subtitle: 'Natural Product IS Code Locator',
      description: 'Describe any consumer item or industrial product to instantly pinpoint applicable Indian Standards (IS codes), current revision years, and Gazette status.',
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      tag: '21,000+ Standards Database',
      actionText: 'Search Standards'
    },
    {
      id: 'certification-guide',
      number: '02',
      title: 'Certification Guide',
      subtitle: 'ISI, CRS, FMCS & Hallmarking',
      description: 'Step-by-step regulatory roadmaps explaining Scheme-I (ISI mark), Scheme-II (CRS IT/Electronics), FMCS foreign factory audits, and MSME fee rebates.',
      icon: <Award className="w-6 h-6 text-blue-400" />,
      tag: 'Scheme Navigator & Fees',
      actionText: 'Compare Schemes'
    },
    {
      id: 'compliance-check',
      number: '03',
      title: 'Compliance Check',
      subtitle: 'QCO Gap Analysis & Liability Audit',
      description: 'Verify if your product falls under mandatory Quality Control Orders (QCOs), calculate non-compliance penalties under BIS Act 2016, and check exemptions.',
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      tag: 'Mandatory QCO Enforcer',
      actionText: 'Run Gap Analysis'
    },
    {
      id: 'find-testing-lab',
      number: '04',
      title: 'Find Testing Lab',
      subtitle: 'Accredited NABL & BIS Directory',
      description: 'Locate central BIS testing facilities and accredited NABL partner laboratories by geographical city, turnaround speeds, or specific IS testing scope.',
      icon: <FlaskConical className="w-6 h-6 text-emerald-400" />,
      tag: '1,200+ Recognized Labs',
      actionText: 'Find Labs Near You'
    },
    {
      id: 'hallmarking',
      number: '05',
      title: 'Hallmarking & HUID',
      subtitle: 'Gold & Silver Purity Verification',
      description: 'Simulate 6-digit alphanumeric HUID verification, calculate pure gold fineness (916, 750, 585), and understand consumer protection rights against counterfeit gold.',
      icon: <Gem className="w-6 h-6 text-yellow-400" />,
      tag: '6-Digit HUID Engine',
      actionText: 'Verify HUID Mark'
    },
    {
      id: 'ask-document',
      number: '06',
      title: 'Ask a Document',
      subtitle: 'Direct PDF Clause Query Engine',
      description: 'Upload BIS technical specifications or Gazette notifications to query exact requirements, tolerances, test methods, and marking clauses in seconds.',
      icon: <FileSearch className="w-6 h-6 text-purple-400" />,
      tag: 'AI Document Clause QA',
      actionText: 'Analyze Document'
    }
  ];

  // Filtering for Standards
  const filteredStandards = INDIAN_STANDARDS.filter(s => {
    const matchesSearch = s.code.toLowerCase().includes(standardSearch.toLowerCase()) ||
      s.title.toLowerCase().includes(standardSearch.toLowerCase()) ||
      s.relevanceKeywords.some(k => k.toLowerCase().includes(standardSearch.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || s.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Run compliance analysis
  const handleRunCompliance = () => {
    setComplianceResult({
      product: complianceProduct,
      mandatoryQCO: true,
      standard: 'IS 17803 : 2022',
      enforcementDate: '15th March 2024',
      riskLevel: complianceTested === 'yes' && complianceInHouseLab === 'yes' ? 'Low' : 'Critical',
      actionItems: [
        complianceTested === 'no' ? 'Prototype testing in NABL/BIS lab mandatory before commercial sale.' : 'Maintain lab test report on record.',
        complianceInHouseLab === 'no' ? 'Must install Scheme of Testing and Inspection (STI) equipment or tie up with accredited lab.' : 'Calibrate STI testing machinery annually.',
        'File Form-I on Manakonline for BIS factory inspection.'
      ]
    });
  };

  // Run HUID verification
  const handleVerifyHUID = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = huidInput.trim().toUpperCase();
    const record = SAMPLE_HUID_DATABASE.find(r => r.huid.toUpperCase() === clean);
    if (record) {
      setHuidResult(record);
    } else if (clean.length === 6) {
      // Generated simulated record
      setHuidResult({
        huid: clean,
        jewellerName: 'Certified BIS Registered Jeweller Outlet',
        hallmarkingCenter: 'Central Assaying & Hallmarking Centre, New Delhi',
        ahcRegistrationNo: `AHC-IND-${clean.slice(0, 3)}`,
        purity: '22K916 (91.6% Pure Gold)',
        metal: 'Gold',
        articleType: 'Ornament / Jewellery Article',
        hallmarkedDate: '18th December 2024',
        status: 'Verified Valid'
      });
    } else {
      setHuidResult('not_found');
    }
  };

  // Run Ask Document
  const handleAskDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docQuestion.trim()) return;
    setDocAnalysisLoading(true);
    setTimeout(() => {
      setDocAnswer(
        `Analysis for "${uploadedDocName}":\n• Relevant Clauses: Clause 4.1 (Material Specification) & Clause 8.1 (Marking & ISI Symbol).\n• Requirement Summary: Must use Grade 304 food-grade stainless steel (IS 6911). Each article must be laser marked with CM/L license number and manufacturer designation.`
      );
      setDocAnalysisLoading(false);
    }, 600);
  };

  return (
    <section id="standards-certification" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The BIS AI Toolkit
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-400">
          Six purpose-built interactive modules designed for manufacturers, legal officers, quality managers, and Indian consumers.
        </p>
      </div>

      {/* 6-Grid Feature Modules with Framer Motion Stagger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="relative group rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.18)] transition-all flex flex-col justify-between overflow-hidden p-6 sm:p-7"
          >
            {/* Top Accent Glow on Hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header with Number and Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  TOOL {tool.number}
                </span>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                  {tool.icon}
                </div>
              </div>

              {/* Title & Tag */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                  {tool.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tool.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Footer with Pill Tag and Trigger CTA */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-400 truncate max-w-[170px]">
                {tool.tag}
              </span>
              <button
                id={`open-${tool.id}-modal-btn`}
                onClick={() => setActiveModal(tool.id)}
                className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 text-cyan-300 hover:text-[#0B0F19] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{tool.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS FOR ALL 6 MODULES                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {tools.find(t => t.id === activeModal)?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {tools.find(t => t.id === activeModal)?.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {tools.find(t => t.id === activeModal)?.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  id="close-toolkit-modal-btn"
                  onClick={() => setActiveModal(null)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Switcher */}
              <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
                {/* 01: FIND A STANDARD MODAL */}
                {activeModal === 'find-standard' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={standardSearch}
                          onChange={(e) => setStandardSearch(e.target.value)}
                          placeholder="Search standard by IS code, title, or product keyword (e.g. bottle, toy, helmet)..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="All">All Categories</option>
                          <option value="Consumer Goods">Consumer Goods</option>
                          <option value="Children">Children Safety</option>
                          <option value="Automotive">Automotive</option>
                          <option value="Renewable">Renewable Energy</option>
                          <option value="Precious">Precious Metals</option>
                          <option value="Food">Food Safety</option>
                        </select>
                      </div>
                    </div>

                    {/* Results list */}
                    <div className="space-y-3">
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Found {filteredStandards.length} Official Standards
                      </div>
                      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-1">
                        {filteredStandards.map((std) => (
                          <div
                            key={std.id}
                            onClick={() => setSelectedStandardDetail(std)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              selectedStandardDetail?.id === std.id
                                ? 'bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                                  {std.code}
                                </span>
                                {std.qcoMandatory && (
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium">
                                    Mandatory QCO
                                  </span>
                                )}
                                <span className="text-[11px] text-slate-400">({std.year})</span>
                              </div>
                              <h4 className="text-sm font-semibold text-white mt-1">{std.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{std.scope}</p>
                            </div>
                            <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-semibold text-slate-200 transition-colors shrink-0">
                              View Clauses
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Standard Detailed Inspection Drawer */}
                    {selectedStandardDetail && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyan-400 font-mono">{selectedStandardDetail.code} Detailed Breakdown</span>
                          <span className="text-xs text-slate-400">Scheme: {selectedStandardDetail.applicableScheme}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{selectedStandardDetail.scope}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                          {selectedStandardDetail.keyClauses.map((c, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                              <span className="text-cyan-400 font-mono font-semibold">{c.number}: {c.title}</span>
                              <p className="text-slate-400 text-[11px] mt-1">{c.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 02: CERTIFICATION GUIDE MODAL */}
                {activeModal === 'certification-guide' && (
                  <div className="space-y-6">
                    {/* Scheme Selector Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                      {CERTIFICATION_SCHEMES.map((scheme) => (
                        <button
                          key={scheme.id}
                          onClick={() => setSelectedScheme(scheme)}
                          className={`px-3.5 py-2 rounded-xl border whitespace-nowrap font-semibold transition-all cursor-pointer ${
                            selectedScheme.id === scheme.id
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {scheme.shortName}
                        </button>
                      ))}
                    </div>

                    {/* Scheme Details Card */}
                    <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-500/10">
                            {selectedScheme.badge}
                          </span>
                          <h4 className="text-xl font-bold text-white mt-1.5">{selectedScheme.name}</h4>
                          <p className="text-sm text-slate-300 mt-1 leading-relaxed max-w-2xl">{selectedScheme.description}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                          <span className="text-slate-500 block font-medium">Estimated Timeline:</span>
                          <span className="text-cyan-300 font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {selectedScheme.timeline}
                          </span>
                        </div>
                      </div>

                      {/* Fee Structure */}
                      <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs">
                        <span className="text-cyan-300 font-semibold block mb-1">Official Fee Structure &amp; Concessions:</span>
                        <p className="text-slate-300 leading-relaxed">{selectedScheme.feeEstimate}</p>
                      </div>

                      {/* Step by step process */}
                      <div className="space-y-2.5">
                        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Certification Process Flow:
                        </h5>
                        <div className="space-y-2">
                          {selectedScheme.procedure.map((step) => (
                            <div key={step.step} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex gap-3 items-start text-xs">
                              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                                {step.step}
                              </span>
                              <div>
                                <strong className="text-white block">{step.title}</strong>
                                <span className="text-slate-400">{step.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Documents Required */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Mandatory Filing Documents Checklist:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {selectedScheme.documents.map((doc, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 03: COMPLIANCE CHECK MODAL */}
                {activeModal === 'compliance-check' && (
                  <div className="space-y-6">
                    <p className="text-xs text-slate-400">
                      Determine whether your products are subject to statutory Quality Control Orders (QCOs) issued by Central Ministries under Section 16 of the BIS Act, 2016.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">Product Category</label>
                        <select
                          value={complianceProduct}
                          onChange={(e) => setComplianceProduct(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        >
                          <option value="Stainless Steel Vacuum Bottles">Stainless Steel Vacuum Flasks (IS 17803)</option>
                          <option value="Children Toys">Toys for Children (IS 9873)</option>
                          <option value="Sports Footwear">Footwear / Shoes (IS 15844)</option>
                          <option value="Solar PV Panels">Solar PV Modules (IS 14286)</option>
                          <option value="EV Lithium Battery">EV Lithium Battery Packs (IS 16893)</option>
                          <option value="Two-Wheeler Helmets">Two-Wheeler Helmets (IS 4151)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">Prototype Tested in NABL Lab?</label>
                        <select
                          value={complianceTested}
                          onChange={(e) => setComplianceTested(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        >
                          <option value="no">No, Not Yet Tested</option>
                          <option value="partial">Partial Test Done</option>
                          <option value="yes">Yes, Passed Full Type Test</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">In-House Quality STI Lab Setup?</label>
                        <select
                          value={complianceInHouseLab}
                          onChange={(e) => setComplianceInHouseLab(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        >
                          <option value="no">No Internal Testing Rig</option>
                          <option value="yes">Yes, Calibrated Equipment Ready</option>
                        </select>
                      </div>
                    </div>

                    <button
                      id="run-gap-analysis-submit-btn"
                      onClick={handleRunCompliance}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Execute QCO Gap Analysis</span>
                    </button>

                    {/* Gap Analysis Output */}
                    {complianceResult && (
                      <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-bold text-white">
                            <ShieldAlert className="w-4 h-4 text-amber-400" />
                            <span>Gap Analysis Result: {complianceResult.product}</span>
                          </div>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            complianceResult.riskLevel === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}>
                            Risk Level: {complianceResult.riskLevel}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block">Governing Standard:</span>
                            <span className="font-mono text-cyan-300 font-semibold">{complianceResult.standard}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block">Enforcement Deadline:</span>
                            <span className="text-amber-300 font-semibold">{complianceResult.enforcementDate}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <span className="font-semibold text-slate-300 uppercase tracking-wider block">
                            Mandatory Corrective Action Items:
                          </span>
                          {complianceResult.actionItems.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 04: FIND TESTING LAB MODAL */}
                {activeModal === 'find-testing-lab' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={labSearch}
                          onChange={(e) => setLabSearch(e.target.value)}
                          placeholder="Search lab by city, state, or standard (e.g. Mumbai, Chennai, IS 17803)..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <select
                        value={labFilterType}
                        onChange={(e) => setLabFilterType(e.target.value)}
                        className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200"
                      >
                        <option value="All">All Laboratory Types</option>
                        <option value="BIS Central Lab">BIS Central Labs</option>
                        <option value="BIS Regional Lab">BIS Regional Labs</option>
                        <option value="NABL Accredited Partner">NABL Partner Labs</option>
                      </select>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {TESTING_LABS
                        .filter(l => {
                          const matches = l.name.toLowerCase().includes(labSearch.toLowerCase()) ||
                            l.city.toLowerCase().includes(labSearch.toLowerCase()) ||
                            l.state.toLowerCase().includes(labSearch.toLowerCase()) ||
                            l.standardsTested.some(s => s.toLowerCase().includes(labSearch.toLowerCase()));
                          const matchesType = labFilterType === 'All' || l.type === labFilterType;
                          return matches && matchesType;
                        })
                        .map((lab) => (
                          <div key={lab.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                                  {lab.type}
                                </span>
                                <h4 className="text-sm font-bold text-white mt-1">{lab.name}</h4>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-cyan-400" /> {lab.address}
                                </p>
                              </div>
                              <div className="text-right text-xs">
                                <span className="text-emerald-400 font-bold block">★ {lab.rating} / 5.0</span>
                                <span className="text-slate-400 text-[11px]">{lab.turnaroundTime}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 text-[11px]">
                              <span className="text-slate-400">Tested Standards:</span>
                              {lab.standardsTested.map((s, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-xs pt-2 border-t border-slate-900 text-slate-400">
                              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-cyan-400" /> {lab.phone}</span>
                              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-400" /> {lab.contactEmail}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 05: HALLMARKING & HUID MODAL */}
                {activeModal === 'hallmarking' && (
                  <div className="space-y-6">
                    {/* HUID Verification Engine */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-yellow-500/30 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-yellow-300">
                        <Gem className="w-4 h-4" />
                        <span>Statutory 6-Digit Alphanumeric HUID Verification Simulator</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Every hallmarked gold article bears a 6-digit laser code generated centrally by the BIS Hallmarking Portal. Verify its registered Assaying Centre, purity, and jeweller details.
                      </p>

                      <form onSubmit={handleVerifyHUID} className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={huidInput}
                          onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
                          placeholder="e.g. AB7921 or CK4819"
                          className="w-48 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono tracking-widest text-center text-yellow-400 placeholder-slate-600 focus:outline-none focus:border-yellow-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Verify on BIS Central Registry
                        </button>
                      </form>

                      {/* Sample quick chips */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>Try Sample HUIDs:</span>
                        {['AB7921', 'CK4819', 'XY9902', 'ZZ0000'].map(code => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => { setHuidInput(code); handleVerifyHUID({ preventDefault: () => {} } as any); }}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-yellow-300 hover:border-yellow-500 font-mono"
                          >
                            {code}
                          </button>
                        ))}
                      </div>

                      {/* Result */}
                      {huidResult && huidResult !== 'not_found' && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-yellow-500/40 space-y-3 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-yellow-400 font-bold text-sm">HUID: {huidResult.huid}</span>
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              huidResult.status === 'Verified Valid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {huidResult.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                            <div><strong className="text-white">Registered Jeweller:</strong> {huidResult.jewellerName}</div>
                            <div><strong className="text-white">Assaying Center:</strong> {huidResult.hallmarkingCenter}</div>
                            <div><strong className="text-white">Assayed Purity:</strong> {huidResult.purity}</div>
                            <div><strong className="text-white">Article Type:</strong> {huidResult.articleType}</div>
                            <div><strong className="text-white">Hallmarked Date:</strong> {huidResult.hallmarkedDate}</div>
                            <div><strong className="text-white">AHC License:</strong> {huidResult.ahcRegistrationNo}</div>
                          </div>
                        </div>
                      )}

                      {huidResult === 'not_found' && (
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                          ⚠️ No registration record found for HUID code "{huidInput}". Verify the 6 characters stamped on the ornament with a 10x jeweller loupe or report through the BIS CARE app.
                        </div>
                      )}
                    </div>

                    {/* Gold Karat & Fineness Calculator */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        BIS Purity Fineness &amp; Net Gold Content Calculator
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Gross Ornament Weight (Grams):</label>
                          <input
                            type="number"
                            value={goldWeightGrams}
                            onChange={(e) => setGoldWeightGrams(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Hallmarked Karatage Grade:</label>
                          <select
                            value={goldKarat}
                            onChange={(e) => setGoldKarat(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
                          >
                            <option value={24}>24K (995 Fineness - 99.5% Pure)</option>
                            <option value={22}>22K (916 Fineness - 91.6% Pure)</option>
                            <option value={18}>18K (750 Fineness - 75.0% Pure)</option>
                            <option value={14}>14K (585 Fineness - 58.5% Pure)</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 flex items-center justify-between">
                        <span>Net Fine Gold Content:</span>
                        <strong className="text-yellow-400 font-mono text-sm">
                          {((goldWeightGrams * (goldKarat === 24 ? 0.995 : goldKarat === 22 ? 0.916 : goldKarat === 18 ? 0.750 : 0.585))).toFixed(2)} grams Pure Gold
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 06: ASK A DOCUMENT MODAL */}
                {activeModal === 'ask-document' && (
                  <div className="space-y-5">
                    {/* Drag & Drop File Zone */}
                    <div className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 bg-slate-950/60 text-center space-y-3 cursor-pointer transition-colors">
                      <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Drag &amp; drop any official BIS Standard or Gazette PDF
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Supports PDF, DOCX, or scan images up to 25MB
                        </p>
                      </div>
                      <div className="text-xs text-cyan-300">
                        Active Sample Loaded: <strong className="font-mono">{uploadedDocName}</strong>
                      </div>
                    </div>

                    {/* Quick sample documents */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Pre-Loaded Official Standards:</span>
                      <button
                        onClick={() => setUploadedDocName('IS_17803_2022_WaterBottles_Spec.pdf')}
                        className={`px-2.5 py-1 rounded-md border text-xs ${
                          uploadedDocName === 'IS_17803_2022_WaterBottles_Spec.pdf' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        IS 17803 (Water Bottles)
                      </button>
                      <button
                        onClick={() => setUploadedDocName('IS_9873_Part1_SafetyOfToys.pdf')}
                        className={`px-2.5 py-1 rounded-md border text-xs ${
                          uploadedDocName === 'IS_9873_Part1_SafetyOfToys.pdf' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        IS 9873 (Toys Safety)
                      </button>
                    </div>

                    {/* Question Input */}
                    <form onSubmit={handleAskDocument} className="space-y-3">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Ask a Question About Clauses or Specifications in this Document:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={docQuestion}
                          onChange={(e) => setDocQuestion(e.target.value)}
                          placeholder="e.g. What are the drop impact and temperature insulation criteria?"
                          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          type="submit"
                          disabled={docAnalysisLoading}
                          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
                        >
                          {docAnalysisLoading ? 'Analyzing...' : 'Extract Clauses'}
                        </button>
                      </div>
                    </form>

                    {/* Document Analysis Result */}
                    {docAnswer && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Extracted Clause Synthesis</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                          {docAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex justify-between items-center text-xs">
                <span className="text-slate-500">Authorized BIS Knowledge Repository Integration</span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

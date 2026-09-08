import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory,
  UserCheck,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Percent,
  FileCheck,
  ShieldCheck,
  Search,
  BookOpen,
  ArrowUpRight,
  AlertOctagon,
  Building,
  Scale
} from 'lucide-react';

export default function AudienceRoutes() {
  const [activeTab, setActiveTab] = useState<'industry' | 'consumer' | 'academic'>('industry');

  const tabs = [
    {
      id: 'industry',
      label: 'Industries & MSMEs',
      icon: <Factory className="w-4 h-4" />,
      tag: 'Manufacturing & Trade'
    },
    {
      id: 'consumer',
      label: 'Indian Consumers',
      icon: <UserCheck className="w-4 h-4" />,
      tag: 'Quality & Authenticity'
    },
    {
      id: 'academic',
      label: 'Students & Researchers',
      icon: <GraduationCap className="w-4 h-4" />,
      tag: 'R&D & Standardization'
    }
  ];

  return (
    <section id="audience-routes" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <Building className="w-3.5 h-3.5" />
          <span>Tailored Pathways</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          One Platform, Many Paths
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-400">
          Whether you are a manufacturer navigating mandatory Quality Control Orders, a citizen verifying an ISI mark, or a researcher examining technical standards.
        </p>
      </div>

      {/* Tabs Selector Bar */}
      <div className="flex justify-center mb-10">
        <div className="p-1.5 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 flex flex-wrap gap-2 max-w-xl shadow-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-[#0B0F19] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Panel Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'industry' && (
          <motion.div
            key="industry"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  MSME &amp; Micro Concession Workflows
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Take advantage of the Government of India's 80% special fee rebate on marking and application fees for micro-enterprises, plus simplified 30-day licensing tracks.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    80% concession on annual minimum marking fee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    50% rebate for registered women entrepreneurs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Fast-track Scheme of Testing &amp; Inspection (STI) setup
                  </li>
                </ul>
              </div>
              <a
                href="#ai-assistant"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Calculate MSME Rebate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Pre-Filing Documentation Kits
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Automated checklist generation for Manakonline portal submissions, including factory layout drafting, calibration schedules, and raw material traceability logs.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Automated Form-I checklist validation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Machinery &amp; testing capability inventory template
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Sample sealing &amp; dispatch guidelines
                  </li>
                </ul>
              </div>
              <a
                href="https://www.manakonline.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Manakonline e-BIS Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  FMCS &amp; Global Importers Desk
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Specialized protocols for overseas manufacturers and Indian importing houses ensuring customs clearance under mandatory Quality Control Orders.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Authorized Indian Representative (AIR) compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Air-cargo sample testing facilitation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Port customs clearance NOC assistance
                  </li>
                </ul>
              </div>
              <a
                href="#standards-certification"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Explore FMCS Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === 'consumer' && (
          <motion.div
            key="consumer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Consumer Card 1 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Verify ISI Mark (CML License Search)
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Verify if an ISI mark printed on packaged water, cement, or electronics is genuine or fraudulent by cross-referencing the 7 or 8-digit CML license number.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="text-gray-400 block mb-1">Format Example:</span>
                  <span className="font-mono text-cyan-300 font-bold">CM/L - 8920147</span>
                </div>
              </div>
              <a
                href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/knowyourcml"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Verify CML on BIS Connect</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Consumer Card 2 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mb-5">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  6-Digit Gold HUID Authenticator
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Never buy unhallmarked gold. Verify the 6-character laser inscription stamped on your rings, chains, or coins to see exact purity and testing center logs.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                    Guaranteed fire-assay tested purity
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                    Protects against deceptive alloy mixing
                  </li>
                </ul>
              </div>
              <a
                href="#standards-certification"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
              >
                <span>Launch HUID Checker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Consumer Card 3 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-5">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Report Counterfeit &amp; Citizen Grievance
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Found fake ISI marks, sub-standard helmets, or uncertified toys being sold in local markets? File an official complaint directly with the BIS Enforcement Cell.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    Anonymous citizen whistleblowing support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    Direct referral to BIS Branch Enforcement Officers
                  </li>
                </ul>
              </div>
              <a
                href="https://www.bis.gov.in/public-grievance/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <span>BIS Public Grievance Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === 'academic' && (
          <motion.div
            key="academic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Academic Card 1 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Academic Standards Portal
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Complimentary access to Indian Standards for university professors, research scholars, IITs/NITs, and engineering students through the Standards Club initiative.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    Standards Club educational mentorship
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    Full-text read-only campus IP access
                  </li>
                </ul>
              </div>
              <a
                href="https://www.services.bis.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Academic Standards Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Academic Card 2 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sectional Formulation Committees
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Participate in drafting future national standards. Review Wide Circulation Drafts (WCDs) and submit scientific comments to BIS Technical Sectional Committees.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Draft standards open for public review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Harmonization with ISO / IEC guidelines
                  </li>
                </ul>
              </div>
              <a
                href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/draft_standards"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Review Open Draft Standards</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Academic Card 3 */}
            <div className="p-7 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-5">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  ISO &amp; IEC Concordance Search
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Cross-map Indian Standards against international standard frameworks (e.g. IS/IEC 61215 for solar PV, IS/ISO 9001 for quality systems).
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Identical (IDT) and Modified (MOD) equivalency
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    WTO-TBT compliance harmonization
                  </li>
                </ul>
              </div>
              <a
                href="#standards-certification"
                className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Explore International Concordance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

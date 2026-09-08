import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  BookOpen,
  CornerDownLeft,
  Copy,
  Check,
  Building2,
  Scale
} from 'lucide-react';
import { INDIAN_STANDARDS } from '../data/bisData';
import { IndianStandard } from '../types';
import ViewSourceModal from './ViewSourceModal';

interface AIChatDemoProps {
  onOpenStandardModal?: (standard: IndianStandard) => void;
}

const DEFAULT_QUERY = "I manufacture stainless steel water bottles. Which Indian Standard applies and what certification requirements should I know?";

const QUICK_CHIPS = [
  { label: "Stainless Steel Water Bottles", query: "I manufacture stainless steel water bottles. Which Indian Standard applies and what certification requirements should I know?" },
  { label: "Solar PV Modules", query: "We are setting up a solar panel assembly line. What BIS CRS standard and testing applies?" },
  { label: "Footwear QCO", query: "What are the mandatory testing and ISI requirements for sports and lifestyle footwear under DPIIT QCO?" },
  { label: "Gold Jewellery HUID", query: "How does 6-digit HUID hallmarking work for 22K gold jewellery under IS 1417?" },
  { label: "Children Toys Safety", query: "What physical and mechanical safety standards apply to imported or manufactured toys under IS 9873?" },
  { label: "EV Battery Safety", query: "What are the mandatory Indian standards for EV two-wheeler lithium battery packs?" }
];

export default function AIChatDemo({ onOpenStandardModal }: AIChatDemoProps) {
  const [currentQuery, setCurrentQuery] = useState(DEFAULT_QUERY);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedStandardForSource, setSelectedStandardForSource] = useState<IndianStandard | null>(null);
  const [selectedClauseForSource, setSelectedClauseForSource] = useState<{
    number: string;
    title: string;
    summary: string;
    page: number;
  } | null>(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  // Active answer state
  const [activeStandard, setActiveStandard] = useState<IndianStandard>(INDIAN_STANDARDS[0]);
  const [matchScore, setMatchScore] = useState<number>(98);

  const handleQuerySubmit = (e?: React.FormEvent, customQueryText?: string) => {
    if (e) e.preventDefault();
    const query = customQueryText || currentQuery;
    if (!query.trim()) return;

    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matched = INDIAN_STANDARDS.find(std => 
        std.relevanceKeywords.some(kw => qLower.includes(kw.toLowerCase())) ||
        qLower.includes(std.code.toLowerCase()) ||
        qLower.includes(std.title.toLowerCase())
      );

      if (!matched) {
        // Fallback default or nearest match
        if (qLower.includes('solar') || qLower.includes('pv') || qLower.includes('panel')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-14286');
        } else if (qLower.includes('footwear') || qLower.includes('shoe')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-15844');
        } else if (qLower.includes('gold') || qLower.includes('huid') || qLower.includes('hallmark')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-1417');
        } else if (qLower.includes('toy') || qLower.includes('children')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-9873-1');
        } else if (qLower.includes('battery') || qLower.includes('ev') || qLower.includes('lithium')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-16893');
        } else if (qLower.includes('helmet') || qLower.includes('bike')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-4151');
        } else if (qLower.includes('water') || qLower.includes('packaged') || qLower.includes('drinking')) {
          matched = INDIAN_STANDARDS.find(s => s.id === 'is-14543');
        } else {
          matched = INDIAN_STANDARDS[0];
        }
      }

      if (matched) {
        setActiveStandard(matched);
        setMatchScore(matched.id === 'is-17803' ? 98 : Math.floor(Math.random() * 6) + 94);
      }
      setIsTyping(false);
    }, 450);
  };

  const handleChipClick = (chipQuery: string) => {
    setCurrentQuery(chipQuery);
    handleQuerySubmit(undefined, chipQuery);
  };

  const handleOpenSource = (standard: IndianStandard, clauseIndex: number = 0) => {
    setSelectedStandardForSource(standard);
    setSelectedClauseForSource(standard.keyClauses[clauseIndex] || null);
    setIsSourceModalOpen(true);
  };

  const copyToClipboard = () => {
    const textToCopy = `Recommended BIS Standard: ${activeStandard.code} — ${activeStandard.title}
Status: ${activeStandard.status} (${activeStandard.qcoDate || ''})
Scheme: ${activeStandard.applicableScheme}
Key Clauses:
${activeStandard.keyClauses.map(c => `- ${c.number} (${c.title}): ${c.summary}`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-assistant" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive BIS Intelligence Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ask BIS AI: Instant Standards &amp; Compliance Synthesis
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-400">
          Try the live simulation below. Ask any manufacturing, product, or trade question and receive source-backed regulatory guidance with clause-level citations.
        </p>
      </div>

      {/* Main Chat / Demo Card Container */}
      <div className="relative rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Terminal / Chat Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white/5 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span>BIS Knowledge Core v2.6</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                Gazette Synchronized
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-compliance-summary-btn"
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy compliance summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={() => handleOpenSource(activeStandard, 0)}
              className="px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Source Clauses</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="px-6 py-3 bg-black/20 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs backdrop-blur-md">
          <span className="text-gray-400 font-medium whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested Queries:
          </span>
          <div className="flex gap-2 whitespace-nowrap">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.query)}
                className={`px-3 py-1 rounded-full border transition-all text-xs font-medium cursor-pointer ${
                  currentQuery === chip.query
                    ? 'bg-cyan-500 text-[#0B0F19] font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-cyan-500/40 hover:bg-white/10 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interaction Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* User Prompt Message Bubble */}
          <div className="flex gap-3 items-start max-w-3xl">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 text-xs font-bold">
              Q
            </div>
            <div className="p-4 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 text-gray-200 text-sm sm:text-base leading-relaxed backdrop-blur-md">
              "{currentQuery}"
            </div>
          </div>

          {/* AI Response Output Card */}
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 text-sm backdrop-blur-md"
              >
                <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>Cross-referencing 21,000+ Indian Standards &amp; Central Gazette Quality Control Orders...</span>
              </motion.div>
            ) : (
              <motion.div
                key={activeStandard.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* 1. Recommended Standard Banner */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden hover:border-cyan-500/30 transition-all">
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs font-bold tracking-wide border border-cyan-500/30">
                          {activeStandard.code}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {matchScore}% Relevance
                        </span>
                        {activeStandard.qcoMandatory && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
                            Mandatory QCO
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {activeStandard.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed max-w-3xl">
                        {activeStandard.scope}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <button
                        id="view-full-standard-modal-btn"
                        onClick={() => onOpenStandardModal && onOpenStandardModal(activeStandard)}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Standard Specification</span>
                      </button>
                      <span className="text-[11px] text-gray-400">
                        Scheme: <strong className="text-cyan-300">{activeStandard.applicableScheme}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Reasoning Breakdown */}
                <div className="p-5 sm:p-6 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-widest">
                    <Scale className="w-4 h-4" />
                    <span>Regulatory Reasoning &amp; Technical Synthesis</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <div className="font-bold text-white mb-1 text-xs">1. Product Classification</div>
                      <p className="text-gray-400 leading-relaxed text-xs">
                        Classified under {activeStandard.category}. Governed by standard <span className="text-cyan-300 font-mono">{activeStandard.code}</span> for design integrity, volume tolerances, and leak resistance.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <div className="font-bold text-white mb-1 text-xs">2. Raw Material Mandate</div>
                      <p className="text-gray-400 leading-relaxed text-xs">
                        Requires verified conformity with input standards (e.g., food-contact safe raw materials, anti-leaching benchmarks, and metallurgical grade assaying).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <div className="font-bold text-white mb-1 text-xs">3. Mandatory QCO Enforcement</div>
                      <p className="text-gray-400 leading-relaxed text-xs">
                        <strong className="text-amber-300">{activeStandard.qcoDate || 'Enforced'}.</strong> Manufacturing or distributing without a valid BIS license constitutes a statutory offense under Section 29 of BIS Act 2016.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Actionable Next Steps (1 -> 2 -> 3 -> 4) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    Actionable Roadmap to Certification &amp; Compliance:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
                          STEP 01
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <div className="font-bold text-white mb-1">Standard &amp; STI Review</div>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Procure official standard and review Scheme of Testing and Inspection (STI) equipment requirements.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
                          STEP 02
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <div className="font-bold text-white mb-1">Check Scheme Path</div>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Verify if {activeStandard.applicableScheme} applies. Determine eligibility for simplified MSME concession (80% rebate).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
                          STEP 03
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <div className="font-bold text-white mb-1">Accredited Lab Testing</div>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Submit prototype samples to BIS Central/Regional lab or recognized NABL testing center for type testing report.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
                          STEP 04
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="font-bold text-white mb-1">e-BIS / Manakonline Filing</div>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Upload factory layout, machinery specs, test report, and pay nominal application fee on manakonline.in.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Source Transparency & Clause Citations */}
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Source Transparency (Direct Clause Audit)
                    </span>
                    <span className="text-[11px] text-gray-400">Click any clause to inspect original text</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStandard.keyClauses.map((clause, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOpenSource(activeStandard, idx)}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 text-left transition-all group flex items-start justify-between gap-3 cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-cyan-400">{clause.number}</span>
                            <span className="text-[11px] font-semibold text-white">{clause.title}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                            "{clause.summary}"
                          </p>
                        </div>
                        <span className="text-[10px] text-cyan-300/80 group-hover:text-cyan-300 shrink-0 font-medium flex items-center gap-0.5 mt-0.5 underline">
                          View Clause <ChevronRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Query Input Bar */}
        <div className="p-4 sm:p-5 bg-black/30 backdrop-blur-xl border-t border-white/10">
          <form onSubmit={(e) => handleQuerySubmit(e)} className="relative flex items-center bg-black/40 rounded-xl border border-white/10 focus-within:border-cyan-400 transition-all">
            <div className="pl-3.5 pr-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <input
              id="bis-ai-query-input"
              type="text"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="Ask about any product (e.g., steel water bottles, EV chargers, toys, footwear, gold)..."
              className="w-full px-2.5 py-3.5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-xs sm:text-sm"
            />
            <div className="pr-2 flex items-center gap-1.5 shrink-0">
              <button
                type="submit"
                id="submit-ai-query-btn"
                disabled={isTyping || !currentQuery.trim()}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-[#0B0F19] font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 px-1">
            <span>Natural language query support with live BIS semantic catalog resolution</span>
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 font-mono text-[10px]">Enter</kbd> to submit</span>
          </div>
        </div>
      </div>

      {/* View Source Modal */}
      <ViewSourceModal
        standard={selectedStandardForSource}
        clause={selectedClauseForSource}
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
      />
    </section>
  );
}

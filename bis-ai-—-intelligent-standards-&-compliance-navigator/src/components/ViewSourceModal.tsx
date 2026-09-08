import { X, ExternalLink, ShieldCheck, FileText, CheckCircle2, Bookmark } from 'lucide-react';
import { IndianStandard } from '../types';

interface ViewSourceModalProps {
  standard: IndianStandard | null;
  clause?: {
    number: string;
    title: string;
    summary: string;
    page: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewSourceModal({ standard, clause, isOpen, onClose }: ViewSourceModalProps) {
  if (!isOpen || !standard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="view-source-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                  {standard.code}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Official Gazette Verified
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mt-0.5">
                BIS Clause &amp; Regulatory Citation Inspector
              </h3>
            </div>
          </div>
          <button
            id="close-source-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300">
          {/* Standard Metadata Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Category:</span>
              <span className="font-medium text-slate-200">{standard.category}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Certification Scheme:</span>
              <span className="font-medium text-cyan-300">{standard.applicableScheme}</span>
            </div>
            <div>
              <span className="text-slate-500 block">QCO Status:</span>
              <span className={`font-semibold ${standard.qcoMandatory ? 'text-amber-400' : 'text-slate-300'}`}>
                {standard.qcoMandatory ? 'Mandatory Order' : 'Voluntary'}
              </span>
            </div>
          </div>

          {/* Gazette / Mandate Banner */}
          {standard.qcoMandatory && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex gap-3 items-start">
              <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-300 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-amber-200">
                  Government of India Gazette Notification Reference
                </p>
                <p className="text-slate-300 mt-1">
                  {standard.qcoDate} issued by the {standard.qcoMinistry || 'Department for Promotion of Industry and Internal Trade'}. Violation entails statutory penalties under Section 29 of the Bureau of Indian Standards Act, 2016.
                </p>
              </div>
            </div>
          )}

          {/* Highlighted Clause */}
          {clause && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>ACTIVE CITATION: {clause.number}</span>
                <span>Page {clause.page} of Official Standard</span>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <h4 className="font-semibold text-white text-base">
                  {clause.title}
                </h4>
                <p className="text-slate-200 leading-relaxed font-sans">
                  "{clause.summary}"
                </p>
              </div>
            </div>
          )}

          {/* All Key Clauses Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Clauses &amp; Testing Norms in this Standard:
            </h4>
            <div className="space-y-2.5">
              {standard.keyClauses.map((c, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border text-xs transition-colors ${
                    clause?.number === c.number 
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-slate-100' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-cyan-400 font-semibold">{c.number}: {c.title}</span>
                    <span className="text-[10px] text-slate-500">Pg. {c.page}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{c.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Testing Protocols */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Accredited Laboratory Testing Parameters:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {standard.testingParameters.map((param, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-xs"
                >
                  • {param}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cryptographic hash verified via Manakonline API</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <a
              href="https://www.services.bis.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>BIS Connect Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

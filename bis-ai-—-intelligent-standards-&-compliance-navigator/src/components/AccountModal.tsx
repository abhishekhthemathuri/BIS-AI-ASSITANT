import { useState } from 'react';
import { X, ShieldCheck, Lock, User, Building, CheckCircle2, ArrowRight } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [activeRole, setActiveRole] = useState<'msme' | 'consumer' | 'lab'>('msme');
  const [email, setEmail] = useState('');
  const [licenseOrGst, setLicenseOrGst] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="account-portal-modal"
        className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">e-BIS Unified Navigator ID</h3>
              <p className="text-[11px] text-slate-400">Manakonline &amp; Citizen Portal SSO</p>
            </div>
          </div>
          <button
            id="close-account-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveRole('msme')}
              className={`py-2 rounded-lg transition-all ${
                activeRole === 'msme'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MSME / Industry
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('consumer')}
              className={`py-2 rounded-lg transition-all ${
                activeRole === 'consumer'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Consumer
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('lab')}
              className={`py-2 rounded-lg transition-all ${
                activeRole === 'lab'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Auditor / Lab
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Authenticated Successfully!</h4>
              <p className="text-xs text-slate-400">
                Connected to National Standards Workspace &amp; Saved Query Bookmarks.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Official Email / Phone / Citizen ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. director@precisionsteel.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  {activeRole === 'msme' ? 'GSTIN / Udyam Registration No.' : activeRole === 'lab' ? 'NABL / BIS Lab ID' : 'City / Pincode'}
                </label>
                <input
                  type="text"
                  required
                  value={licenseOrGst}
                  onChange={(e) => setLicenseOrGst(e.target.value)}
                  placeholder={activeRole === 'msme' ? '07AAAAA0000A1Z5' : 'e.g. 110001 (New Delhi)'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Access Unified Compliance Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                By accessing this portal, you consent to digital verification via BIS Connect &amp; DigiLocker identity frameworks.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

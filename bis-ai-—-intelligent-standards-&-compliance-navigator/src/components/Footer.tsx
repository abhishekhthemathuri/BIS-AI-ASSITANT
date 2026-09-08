import {
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  BookOpen,
  FileText,
  Mail,
  Scale
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B0F19]/90 backdrop-blur-xl border-t border-white/10 pt-16 pb-12 text-gray-400 text-xs z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Mandatory AI Disclaimer Banner */}
        <div 
          id="ai-disclaimer-banner"
          className="p-5 rounded-2xl backdrop-blur-md bg-white/5 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-300"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Regulatory Advisory &amp; AI Information Disclaimer</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                STATUTORY NOTICE
              </span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              AI-generated guidance is based on available authorized BIS information. Always verify against latest official regulations, amendments, and Gazette notifications published by the Bureau of Indian Standards and relevant Union Ministries.
            </p>
          </div>
        </div>

        {/* Main Footer Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  BIS AI NAVIGATOR
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                  NATIONAL STANDARDS COGNITION
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Intelligent Standards &amp; Compliance Navigator democratizing Indian Standards (IS Codes), certification procedures, laboratory testing networks, and hallmarking integrity.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gazette Sync: Active &amp; Real-time</span>
            </div>
          </div>

          {/* Col 2: Product & Navigator */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product &amp; AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#ai-assistant" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>BIS AI Query Engine</span>
                </a>
              </li>
              <li>
                <a href="#standards-certification" className="hover:text-cyan-400 transition-colors">
                  Find a Standard (21,000+ Codes)
                </a>
              </li>
              <li>
                <a href="#standards-certification" className="hover:text-cyan-400 transition-colors">
                  Certification Scheme Selector
                </a>
              </li>
              <li>
                <a href="#standards-certification" className="hover:text-cyan-400 transition-colors">
                  Mandatory QCO Gap Analysis
                </a>
              </li>
              <li>
                <a href="#standards-certification" className="hover:text-cyan-400 transition-colors">
                  Find Recognized NABL &amp; BIS Labs
                </a>
              </li>
              <li>
                <a href="#standards-certification" className="hover:text-cyan-400 transition-colors">
                  Gold &amp; Silver HUID Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Resources & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Authorized Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span>BIS Connect Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Manakonline e-BIS Services</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span>CRS Electronic Portal</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Know Your Standard (KYS)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bis.gov.in/public-grievance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span>BIS Public Grievance Portal</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#ai-disclaimer-banner" className="hover:text-cyan-400 transition-colors">
                  AI Limitations &amp; Regulatory Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy &amp; Data Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Bureau of Indian Standards Act, 2016
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  DPIIT Quality Control Orders (QCO)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            © {currentYear} BIS AI — Intelligent Standards &amp; Compliance Navigator. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini &amp; Knowledge Graphs</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">v2.6.4 Production Release</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

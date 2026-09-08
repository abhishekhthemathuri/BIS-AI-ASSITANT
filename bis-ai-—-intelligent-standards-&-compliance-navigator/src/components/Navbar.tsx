import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  User,
  Sparkles,
  ChevronRight,
  Globe
} from 'lucide-react';
import AccountModal from './AccountModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'EN' | 'HI'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'AI Assistant', href: '#ai-assistant' },
    { label: 'Standards & Certification', href: '#standards-certification' },
    { label: 'Testing Labs & Hallmarking', href: '#standards-certification' },
    { label: 'Audience Portals', href: '#audience-routes' },
    { label: 'Workflow', href: '#workflow' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileDrawerOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'border-white/10 backdrop-blur-xl bg-black/40 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'border-white/10 backdrop-blur-md bg-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Branding */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] text-[#0B0F19] font-black group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xs tracking-tight">BIS</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight group-hover:text-cyan-300 transition-colors">
                  BIS AI
                </span>
                <span className="text-cyan-400 text-xs font-normal ml-1 tracking-widest uppercase opacity-80">
                  Intelligent Navigator
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-cyan-400 transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setActiveLang(prev => prev === 'EN' ? 'HI' : 'EN')}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
              title="Toggle language: English / Hindi"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeLang === 'EN' ? 'EN / हिंदी' : 'हिंदी / EN'}</span>
            </button>

            {/* Account / Portal Sign-in */}
            <button
              id="open-account-modal-navbar-btn"
              onClick={() => setAccountModalOpen(true)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs hover:bg-white/20 transition-all font-medium flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sign In</span>
            </button>

            {/* Quick Ask AI CTA */}
            <a
              href="#ai-assistant"
              onClick={(e) => handleNavClick(e, '#ai-assistant')}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] text-xs font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask BIS AI</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="open-mobile-drawer-btn"
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white backdrop-blur-md"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md sm:hidden animate-in fade-in duration-200">
          <div className="w-4/5 max-w-xs h-full bg-[#0B0F19]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-cyan-500 rounded-lg flex items-center justify-center text-[#0B0F19] font-extrabold text-xs">
                    BIS
                  </div>
                  <span className="font-bold text-white text-sm">BIS AI Navigator</span>
                </div>
                <button
                  id="close-mobile-drawer-btn"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-white/10 flex items-center justify-between transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  setAccountModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>e-BIS Sign In</span>
              </button>

              <a
                href="#ai-assistant"
                onClick={(e) => handleNavClick(e, '#ai-assistant')}
                className="w-full py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask BIS AI</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Account SSO Modal */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </>
  );
}

import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  BookOpen,
  Scale,
  Award,
  FlaskConical
} from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';

interface HeroSectionProps {
  onExploreStandards: () => void;
  onAskAI: () => void;
}

export default function HeroSection({ onExploreStandards, onAskAI }: HeroSectionProps) {
  const trustBadges = [
    { text: 'Source-backed answers', sub: 'Clause citations verified' },
    { text: 'Authorized BIS knowledge', sub: 'Central Gazette synchronized' },
    { text: 'Multilingual support', sub: 'English, Hindi & Vernacular' }
  ];

  const quickMetrics = [
    { label: 'Active Standards', value: '21,000+', icon: <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: 'Mandatory QCOs', value: '640+', icon: <Scale className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Recognized Labs', value: '1,200+', icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'Citation Accuracy', value: '99.4%', icon: <Award className="w-3.5 h-3.5 text-blue-400" /> }
  ];

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Three.js / React Three Fiber 3D Background */}
      <Hero3DCanvas />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Authorized Knowledge Network</span>
          <span className="text-cyan-400/40">•</span>
          <span className="text-gray-300 font-normal normal-case">Official Standards &amp; QCO Navigator</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
            Understand Indian Standards.
          </span>
          <br />
          <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            Navigate BIS
          </span>{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            with Confidence.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed"
        >
          Natural language query support for Indian Standards discovery, certification guidance, and source-backed answers.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Glowing Button */}
          <button
            id="hero-ask-bis-ai-btn"
            onClick={onAskAI}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#0B0F19]" />
            <span>Ask BIS AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Outline Button */}
          <button
            id="hero-explore-standards-btn"
            onClick={onExploreStandards}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Explore Standards</span>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs"
        >
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gray-300 shadow-sm"
            >
              <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="font-semibold text-white">{badge.text}</span>
              <span className="text-[10px] text-gray-400 hidden sm:inline">({badge.sub})</span>
            </div>
          ))}
        </motion.div>

        {/* Quick Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {quickMetrics.map((item, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-all text-left group"
            >
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1 group-hover:text-cyan-300 transition-colors">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

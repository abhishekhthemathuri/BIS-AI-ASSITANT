import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Cpu,
  Database,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/bisData';

export default function WorkflowSteps() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [
    <MessageSquare className="w-5 h-5 text-cyan-400" />,
    <Cpu className="w-5 h-5 text-blue-400" />,
    <Database className="w-5 h-5 text-teal-400" />,
    <BrainCircuit className="w-5 h-5 text-indigo-400" />,
    <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    <Zap className="w-5 h-5 text-amber-400" />
  ];

  return (
    <section id="workflow" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5" />
          <span>Deterministic Pipeline</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Intelligent Workflow
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-400">
          From unformatted colloquial queries to cryptographically verified, clause-level compliance roadmaps in under a second.
        </p>
      </div>

      {/* Interactive Progress Line & Step Nodes (Desktop & Tablet) */}
      <div className="relative mb-12 hidden md:block">
        {/* Glowing Background Connection Line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
        <motion.div
          className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 -translate-y-1/2 z-0 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeStepIndex / (WORKFLOW_STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        />

        {/* The 6 Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.code}
                onClick={() => setActiveStepIndex(idx)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'backdrop-blur-md bg-white/10 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-110'
                      : isCompleted
                      ? 'backdrop-blur-md bg-white/5 border-2 border-cyan-500/50 text-cyan-300'
                      : 'backdrop-blur-md bg-white/5 border border-white/10 text-gray-500 group-hover:border-white/20'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  ) : (
                    stepIcons[idx]
                  )}
                </div>

                <div className="mt-3 text-center">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold block">
                    STEP {step.step}
                  </span>
                  <span
                    className={`text-xs font-bold transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                  >
                    {step.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Showcase Card */}
      <motion.div
        key={activeStepIndex}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                PHASE {WORKFLOW_STEPS[activeStepIndex].step} : {WORKFLOW_STEPS[activeStepIndex].code}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                {WORKFLOW_STEPS[activeStepIndex].badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {WORKFLOW_STEPS[activeStepIndex].title}
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {WORKFLOW_STEPS[activeStepIndex].description}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <strong className="text-cyan-400 block mb-1">Architecture &amp; Engine Mechanics:</strong>
              <span>{WORKFLOW_STEPS[activeStepIndex].technicalDetails}</span>
            </div>
          </div>

          {/* Metric & Navigation CTA */}
          <div className="flex flex-col items-start lg:items-end gap-4 shrink-0 w-full lg:w-auto">
            <div className="p-4 rounded-xl bg-white/5 border border-cyan-500/30 text-center lg:text-right w-full lg:w-48">
              <span className="text-[11px] text-gray-400 block">Performance Metric</span>
              <strong className="text-lg font-mono text-cyan-300 font-bold block mt-0.5">
                {WORKFLOW_STEPS[activeStepIndex].metric}
              </strong>
            </div>

            <div className="flex items-center gap-2 w-full justify-between lg:justify-end">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-gray-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Previous Step
              </button>
              <button
                onClick={() =>
                  setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length)
                }
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <span>{activeStepIndex === WORKFLOW_STEPS.length - 1 ? 'Start Over' : 'Next Step'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Workflow Step Selector Pills */}
      <div className="grid grid-cols-3 gap-2 mt-6 md:hidden text-xs">
        {WORKFLOW_STEPS.map((step, idx) => (
          <button
            key={step.code}
            onClick={() => setActiveStepIndex(idx)}
            className={`p-2.5 rounded-xl border text-center font-mono font-bold transition-all ${
              activeStepIndex === idx
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : 'backdrop-blur-md bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            {step.step}. {step.code}
          </button>
        ))}
      </div>
    </section>
  );
}

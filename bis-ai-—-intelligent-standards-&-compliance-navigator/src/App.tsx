import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AIChatDemo from './components/AIChatDemo';
import ToolkitSection from './components/ToolkitSection';
import AudienceRoutes from './components/AudienceRoutes';
import WorkflowSteps from './components/WorkflowSteps';
import Footer from './components/Footer';
import ViewSourceModal from './components/ViewSourceModal';
import { IndianStandard } from './types';

export default function App() {
  const [inspectedStandard, setInspectedStandard] = useState<IndianStandard | null>(null);
  const [isStandardModalOpen, setIsStandardModalOpen] = useState(false);

  const handleOpenStandardModal = (standard: IndianStandard) => {
    setInspectedStandard(standard);
    setIsStandardModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-cyan-500 selection:text-[#0B0F19] relative overflow-x-hidden" style={{ background: 'radial-gradient(circle at top right, #1E293B 0%, #0B0F19 100%)' }}>
      {/* Dynamic Ambient Background Canvas Radial Gradient & Glow Pools */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at top right, #1E293B 0%, #0B0F19 80%)' }} />
      
      {/* Subtle Glowing Frosted Atmosphere Blobs */}
      <div className="fixed top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Main App Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <Navbar />

        {/* Hero Section with Interactive 3D Canvas */}
        <main className="flex-1">
          <HeroSection
            onAskAI={() => scrollToSection('ai-assistant')}
            onExploreStandards={() => scrollToSection('standards-certification')}
          />

          {/* Interactive BIS AI Chat / Demo Component */}
          <AIChatDemo onOpenStandardModal={handleOpenStandardModal} />

          {/* The BIS AI Toolkit (Interactive 6-Grid Section) */}
          <ToolkitSection />

          {/* Targeted Audience Routes ("One Platform, Many Paths") */}
          <AudienceRoutes />

          {/* The Intelligent Workflow Steps (01 ASK -> 06 ACT) */}
          <WorkflowSteps />
        </main>

        {/* Footer with Legal, Links, and AI Disclaimer */}
        <Footer />

        {/* Standard Detail / Clause Inspection Modal */}
        <ViewSourceModal
          standard={inspectedStandard}
          isOpen={isStandardModalOpen}
          onClose={() => setIsStandardModalOpen(false)}
        />
      </div>
    </div>
  );
}

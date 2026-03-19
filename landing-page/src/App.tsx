import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ClientLogosSection } from './components/ClientLogosSection';
import { FeaturesSection } from './components/FeaturesSection';
import { InteractiveSection } from './components/InteractiveSection';
import { PricingSection } from './components/PricingSection';
import { StatsSection } from './components/StatsSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTopButton } from './components/BackToTopButton';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-950">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <ClientLogosSection />
        <FeaturesSection />
        <InteractiveSection />
        <PricingSection />
        <StatsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

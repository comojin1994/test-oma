import './index.css';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { InteractiveSection } from './components/InteractiveSection';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <InteractiveSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

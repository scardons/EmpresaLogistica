import Header from '../src/components/Header';
import GreenBar from '../src/components/GreenBar';
import VideoSection from '../src/components/VideoSection';
import AuthButtons from '../src/components/AuthButtons';
import MainContent from '../src/components/MainContent';
import ContactSection from '../src/components/ContactSection';
import SolutionsSection from '../src/components/SolutionsSection';
import ScrollLinked from '../src/components/ScrollLinked';
import { ParticlesBackground } from './components/ParticlesBackground';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white">
          <ParticlesBackground />
      <Header />
      <GreenBar />
      <VideoSection />
      <AuthButtons />
      <MainContent />
      <ScrollLinked />
      <ContactSection />
      <SolutionsSection />
    </div>
  );
}

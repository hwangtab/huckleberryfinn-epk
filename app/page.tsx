import SectionIntro from './_components/SectionIntro';
import SectionNarrative from './_components/SectionNarrative';
import SectionProfile from './_components/SectionProfile';
import SectionMusic from './_components/SectionMusic';
import SectionConcert from './_components/SectionConcert';
import SectionFuture from './_components/SectionFuture';
import SectionPressKit from './_components/SectionPressKit';
import Footer from '@/components/layout/Footer';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';

export default function Home() {
  return (
    <AudioPlayerProvider>
      <main className="min-h-screen">
        <SectionIntro />
        <SectionNarrative />
        <SectionProfile />
        <SectionMusic />
        <SectionConcert />
        <SectionFuture />
        <SectionPressKit />
        <Footer />
      </main>
    </AudioPlayerProvider>
  );
}

import SectionIntro from './_components/SectionIntro';
import SectionNarrative from './_components/SectionNarrative';
import SectionProfile from './_components/SectionProfile';
import SectionMusicVideo from './_components/SectionMusicVideo';
import SectionMusic from './_components/SectionMusic';
import SectionProducerNote from './_components/SectionProducerNote';
import SectionConcert from './_components/SectionConcert';
// import SectionFuture from './_components/SectionFuture'; // 청년 프로젝트 섹션 - 추후 복원 예정
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
        <SectionMusicVideo />
        <SectionMusic />
        <SectionProducerNote />
        <SectionConcert />
        {/* <SectionFuture /> */}
        <SectionPressKit />
        <Footer />
      </main>
    </AudioPlayerProvider>
  );
}

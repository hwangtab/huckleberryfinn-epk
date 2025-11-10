import SectionIntro from './_components/SectionIntro';
import SectionNarrative from './_components/SectionNarrative';
import SectionGallery from './_components/SectionGallery';
import SectionProfile from './_components/SectionProfile';
import SectionMusicVideo from './_components/SectionMusicVideo';
import SectionAudioComparison from './_components/SectionAudioComparison';
import SectionProducerNote from './_components/SectionProducerNote';
import SectionConcert from './_components/SectionConcert';
// import SectionFuture from './_components/SectionFuture'; // 청년 프로젝트 섹션 - 추후 복원 예정
import SectionReviews from './_components/SectionReviews';
import Footer from '@/components/layout/Footer';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';

export default function Home() {
  return (
    <AudioPlayerProvider>
      <main className="min-h-screen">
        <SectionIntro />
        <SectionNarrative />
        <SectionGallery />
        <SectionProfile />
        <SectionMusicVideo />
        <SectionAudioComparison />
        <SectionProducerNote />
        <SectionReviews />
        <SectionConcert />
        {/* <SectionFuture /> */}
        <Footer />
      </main>
    </AudioPlayerProvider>
  );
}

import SectionIntro from './_components/SectionIntro';
import SectionNarrative from './_components/SectionNarrative';
import SectionMusic from './_components/SectionMusic';
import SectionConcert from './_components/SectionConcert';
import SectionFuture from './_components/SectionFuture';
import SectionPressKit from './_components/SectionPressKit';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionIntro />
      <SectionNarrative />
      <SectionMusic />
      <SectionConcert />
      <SectionFuture />
      <SectionPressKit />
      <Footer />
    </main>
  );
}

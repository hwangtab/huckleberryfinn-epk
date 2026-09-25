import SectionHero from './_components/album8/SectionHero';
import Ticker from './_components/album8/Ticker';
import SectionSingles from './_components/album8/SectionSingles';
import SectionStory from './_components/album8/SectionStory';
import SectionAlbum from './_components/album8/SectionAlbum';
import SectionConcert from './_components/album8/SectionConcert';
import SectionFunding from './_components/album8/SectionFunding';
import SectionBand from './_components/album8/SectionBand';
import SectionPress from './_components/album8/SectionPress';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <SectionHero />
      <Ticker />
      <SectionSingles />
      <SectionStory />
      <SectionAlbum />
      <SectionConcert />
      <SectionFunding />
      <SectionBand />
      <SectionPress />
      <Footer />
    </main>
  );
}

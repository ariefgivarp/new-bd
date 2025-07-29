import Hero from '@/components/Hero';
import TributeSection from '@/components/TributeSection';
import SmoothScrollWrapper from '@/components/SmoothScrollWrapper';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <SmoothScrollWrapper>
        <Hero />
        <TributeSection />
        <Footer />
      </SmoothScrollWrapper>
    </>
  );
}

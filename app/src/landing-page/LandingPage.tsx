import {
  navigation,
  footerNavigation,
} from './contentSections';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Generator from './components/Generator';
import BentoGrid from './components/BentoGrid';
import Pricing from './components/Pricing';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      <Header navigation={navigation} />
      <main className='isolate dark:bg-boxdark-2'>
        <Hero />
        <Features/>
        <Generator/>
        <Stats/>
        <BentoGrid/>
        <Testimonials/>
        <Pricing/>
        <FAQ/>
        <CTA/>
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}

import { Helmet } from 'react-helmet-async';
import { Suspense, lazy } from 'react';
import {
  navigation,
} from './contentSections';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load components
const Features = lazy(() => import('./components/Features'));
const Generator = lazy(() => import('./components/Generator'));
const BentoGrid = lazy(() => import('./components/BentoGrid'));
const Stats = lazy(() => import('./components/Stats'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Pricing = lazy(() => import('./components/Pricing'));
const FAQ = lazy(() => import('./components/FAQ'));
const CTA = lazy(() => import('./components/CTA'));

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Your Application - Main Title</title>
        <meta name="description" content="Your application description - Boost your productivity with our tool" />
        <meta name="keywords" content="app, productivity, tools, software" />
        <meta property="og:title" content="Your Application" />
        <meta property="og:description" content="Your application description for social media" />
      </Helmet>
      <div className='bg-white dark:text-white dark:bg-boxdark-2'>
        <Header navigation={navigation} />
        <main className='isolate dark:bg-boxdark-2'>
          <Hero />
          <Suspense fallback={<div>Loading...</div>}>
            <Features/>
            {/* <Generator/> */}
            <Stats/>
            {/* <BentoGrid/> */}
            <Testimonials/>
            <Pricing/>
            <FAQ/>
            <CTA/>
          </Suspense>
        </main>
      </div>
    </>
  );
}

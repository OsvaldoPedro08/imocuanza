import React from 'react';
import HeroSection from '../components/welcome/HeroSection';
import Highlights from '../components/welcome/Highligths';
import HowItWorks from '../components/welcome/HowItWorks';
import Transparency from '../components/welcome/Transparency';
import CallToAction from '../components/welcome/CallToAction';

const WelcomePage = () => {
  return (
    <main className="w-full min-h-screen bg-white">
      <HeroSection />
      <Highlights />
      <HowItWorks />
      <Transparency />
      <CallToAction />
    </main>
  );
};

export default WelcomePage;

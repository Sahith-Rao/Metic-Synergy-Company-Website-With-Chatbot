import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import Portfolio from '../components/Portfolio';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <WhyChooseUs />
      <Portfolio />
    </>
  );
};

export default Home; 
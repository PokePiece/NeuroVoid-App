import React from 'react'
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Masterpiece from './sections/Masterpiece';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Accomplishments from './sections/Accomplishments';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <About />
      <Accomplishments />
      <Masterpiece />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}

export default App;
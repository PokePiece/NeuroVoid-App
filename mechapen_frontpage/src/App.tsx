import Hero from './components/Hero'
import Features from './components/Features'
import Roadmap from './components/Roadmap'
import About from './components/About'
import Footer from './components/Footer'
import Source from './components/Source'

function App() {
  return (
    <main className="bg-primary text-white font-sans">
      <Hero />
      <Features />
      <Roadmap />
      <Source />
      <About />
      <Footer />
    </main>
  )
}

export default App
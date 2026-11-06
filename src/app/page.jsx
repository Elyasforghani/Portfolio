import dynamic from 'next/dynamic'
import Header from './components/Header'
import OldMastersHero from './components/OldMastersHero'
import Manifesto from './components/Manifesto'
import Footer from './components/Footer'

// Dynamic lazy-loading for below-the-fold sections to ensure optimal initial LCP
const ProjectIndex = dynamic(
  () => import('./components/ProjectIndex')
)

const EngineeringBento = dynamic(
  () => import('./components/EngineeringBento')
)

const EngineeringPhilosophy = dynamic(
  () => import('./components/EngineeringPhilosophy')
)

const ContactCTA = dynamic(() => import('./components/ContactCTA'))

export default function Page() {
  return (
    <div className="relative bg-[#14213d] text-[#f4ede0] min-h-screen selection:bg-[#f4ede0] selection:text-[#14213d]">
      {/* Top Floating Minimalist Editorial Header */}
      <Header />

      {/* Semantic Accessibility & SEO Landmark */}
      <main>
        {/* 01 / Monumental Old Masters Classical Diorama Hero */}
        <OldMastersHero />

        {/* 02 / Manifesto: Chemical Eng. to Full-Stack Architecture */}
        <Manifesto />

        {/* 03 / Selected Works: Curated Top 5 Flagships with Archive Gateway */}
        <ProjectIndex limit={5} />

        {/* 04 / Systems & Research Architecture Matrix */}
        <EngineeringBento />

        {/* 05 / Thermodynamic Laws & Software First Principles */}
        <EngineeringPhilosophy />

        {/* 06 / Kinetic Collaboration Call-To-Action with Inverted Marquees */}
        <ContactCTA />
      </main>

      {/* Studio Master Footer with Greenwich UTC Clock & Direct Contact Card */}
      <Footer />
    </div>
  )
}

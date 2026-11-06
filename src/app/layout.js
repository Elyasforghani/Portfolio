import '@fontsource-variable/syne';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/cinzel';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/monsieur-la-doulaise';
import "./globals.css";
import ScrollSmooth from './components/ScrollSmooth';
import SmartCursor from './components/SmartCursor';
import FilmGrain from './components/FilmGrain';
import CommandPalette from './components/CommandPalette';
import ScrollProgressBar from './components/ScrollProgressBar';
import DevTerminal from './components/DevTerminal';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import PageTransitionProvider from './components/PageTransitionProvider';



export const metadata = {
  metadataBase: new URL('https://elyasforghani.com'),
  title: {
    default: 'Elyas Forghani — Front-End & Creative Developer',
    template: '%s — Elyas Forghani',
  },
  description:
    'Portfolio of Elyas Forghani — front-end and creative developer. Next.js, TypeScript, Three.js and GSAP. Chemical engineer turned web developer. Client work, open-source projects and 3D experiments.',
  keywords: [
    'Elyas Forghani',
    'Full-Stack Engineer',
    'Chemical Engineering',
    'Three.js',
    'WebGL',
    'Next.js',
    'GSAP',
    'Tailwind CSS',
    'Creative Development',
  ],
  authors: [{ name: 'Elyas Forghani' }],
  openGraph: {
    type: 'website',
    siteName: 'Elyas Forghani — Spatial Realm',
    title: 'Elyas Forghani — Front-End & Creative Developer',
    description:
      'Front-end & creative development with Next.js, TypeScript, Three.js and GSAP. Chemical engineer turned web developer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elyas Forghani — Spatial Full-Stack Architect',
    description: 'Front-end & creative development with Next.js, Three.js and GSAP.',
  },
};

export const viewport = {
  themeColor: '#14213d',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={` antialiased`}>
      <body className="bg-[#14213d] text-[#f4ede0] selection:bg-[#f4ede0] selection:text-[#14213d] font-sans">
        <ScrollProgressBar />
        <FilmGrain />
        <SmartCursor />
        <CommandPalette />
        <DevTerminal />
        <KonamiEasterEgg />
        <ScrollSmooth>
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </ScrollSmooth>
      </body>
    </html>
  );
}

import {
  Syne,
  Space_Grotesk,
  Cinzel,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Monsieur_La_Doulaise,
} from 'next/font/google';
import "./globals.css";
import ScrollSmooth from './components/ScrollSmooth';
import SmartCursor from './components/SmartCursor';
import FilmGrain from './components/FilmGrain';
import CommandPalette from './components/CommandPalette';
import ScrollProgressBar from './components/ScrollProgressBar';
import DevTerminal from './components/DevTerminal';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import PageTransitionProvider from './components/PageTransitionProvider';

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne-src',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-src',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-cinzel-src',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans-src',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-src',
  display: 'swap',
});

const subTitleFont = Monsieur_La_Doulaise({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-subtitle-src',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://elyasforghani.dev'),
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
  const fontClasses = `${syne.variable} ${spaceGrotesk.variable} ${cinzel.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${subTitleFont.variable}`;

  return (
    <html lang="en" className={`${fontClasses} antialiased`}>
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

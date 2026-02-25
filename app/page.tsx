import { ThemeProvider } from '@/components/portfolio/ThemeContext';
import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Footer from '@/components/portfolio/Footer';
import EasterEggs from '@/components/portfolio/EasterEggs';

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>
      <Footer />
      <EasterEggs />
    </ThemeProvider>
  );
}

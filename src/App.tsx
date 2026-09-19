import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Message } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [adminMode, setAdminMode] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Pre-seed some mock client inquiry messages in localStorage if empty on launch
  useEffect(() => {
    const saved = localStorage.getItem('rushabh_contact_messages');
    if (!saved) {
      const seeds: Message[] = [
        {
          id: 'seed_msg_1',
          name: 'Sarah Jenkins',
          email: 's.jenkins@rebrandco.com',
          subject: 'Instagram Reels Campaign Partnership',
          message: 'Hi Rushabh! I stumbled across your Instagram profile and was incredibly impressed by your viral metrics. We are launching a premium beverage brand next month and need an expert to coordinate our Reels strategy and script hooks. Let me know your monthly rates and availability!',
          date: 'Jul 19, 2026, 11:32 AM',
          read: false,
        },
        {
          id: 'seed_msg_2',
          name: 'Vikram Malhotra',
          email: 'vikram@malhotratech.io',
          subject: 'Relational Web Portal Redesign',
          message: 'Hello Rushabh, we are looking to redesign our software onboarding dashboard to make it more intuitive and faster on mobile. Do you have availability to take on a React + Tailwind development project next month? Love your clean layouts.',
          date: 'Jul 18, 2026, 04:15 PM',
          read: true,
        },
      ];
      localStorage.setItem('rushabh_contact_messages', JSON.stringify(seeds));
    }
    updateUnreadCount();
  }, []);

  // Update navbar unread badges
  const updateUnreadCount = () => {
    const saved = localStorage.getItem('rushabh_contact_messages');
    if (saved) {
      try {
        const list: Message[] = JSON.parse(saved);
        const unreads = list.filter((m) => !m.read).length;
        setUnreadCount(unreads);
      } catch (e) {
        setUnreadCount(0);
      }
    } else {
      setUnreadCount(0);
    }
  };

  // Setup scroll observer to dynamically highlight the current active section in the header
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'portfolio', 'instagram', 'blog', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger roughly when section occupies main center screen area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Helper trigger to scroll clients to contact block on button taps
  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="portfolio-root" className="min-h-screen bg-brand-dark text-gray-100 font-sans antialiased overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Floating Sparkle glow overlay on top left corner */}
      <div className="absolute top-0 left-0 w-[40%] aspect-square bg-gradient-to-br from-brand-pink/5 via-brand-purple/5 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Header Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        adminMode={adminMode}
        setAdminMode={setAdminMode}
        unreadCount={unreadCount}
      />

      {/* Main sections */}
      <main>
        <Hero onNavToContact={handleScrollToContact} />
        <About />
        <Services />
        <Portfolio />
        <Blog adminMode={adminMode} />
        <Contact adminMode={adminMode} onMessageReceived={updateUnreadCount} />
      </main>

      {/* Bottom Footer block */}
      <Footer />

      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

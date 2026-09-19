import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle, Send, Users, Sparkles, TrendingUp, Heart } from 'lucide-react';

interface HeroProps {
  onNavToContact: () => void;
}

export default function Hero({ onNavToContact }: HeroProps) {
  const [metrics, setMetrics] = useState({ followers: 12480, reach: 452900, engagement: 8.9 });
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const roles = [
    'Social Media Strategist',
    'Creative Digital Creator',
    'Website UI/UX Designer',
    'Performance Marketer',
  ];

  // Rotate roles
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleTimer);
  }, []);

  // Increment simulated metrics slightly to look alive and highly professional
  useEffect(() => {
    const metricTimer = setInterval(() => {
      setMetrics((prev) => ({
        followers: prev.followers + (Math.random() > 0.7 ? 1 : 0),
        reach: prev.reach + Math.floor(Math.random() * 5),
        engagement: parseFloat((prev.engagement + (Math.random() > 0.5 ? 0.01 : -0.01)).toFixed(2)),
      }));
    }, 4000);
    return () => clearInterval(metricTimer);
  }, []);

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/vajirnath007/', icon: 'Instagram', color: 'hover:text-brand-pink hover:bg-brand-pink/10' },
    { name: 'Twitter', url: 'https://x.com/RushabhV1718', icon: 'Twitter', color: 'hover:text-brand-cyan hover:bg-brand-cyan/10' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rushabh-vajirnath-918582205', icon: 'Linkedin', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
    { name: 'Facebook', url: 'https://www.facebook.com/vajirnath007', icon: 'Facebook', color: 'hover:text-blue-600 hover:bg-blue-600/10' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8s]" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full bg-brand-purple/15 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Greeting badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-brand-pink" />
                Available for Projects
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-white mb-6 uppercase italic leading-[0.9]">
              Scaling Brands
              <br />
              <span className="text-brand-pink relative">
                In the Digital
              </span>
              <br />
              <span className="text-white">
                Universe
              </span>
            </h1>

            {/* Dynamic Role Carousel */}
            <div className="h-8 mb-6 overflow-hidden flex items-center">
              <span className="text-lg font-medium text-gray-400 mr-2">We are a</span>
              <div className="relative h-full flex items-center">
                {roles.map((role, idx) => (
                  <span
                    key={role}
                    className={`absolute left-0 text-lg font-bold text-brand-pink tracking-wide uppercase transition-all duration-500 ease-in-out whitespace-nowrap ${
                      idx === activeRoleIndex
                        ? 'opacity-100 translate-y-0 filter blur-0 scale-100'
                        : 'opacity-0 translate-y-4 filter blur-sm scale-95'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Introduction Paragraph */}
            <p className="font-sans text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed">
              Hey, We are <strong className="text-white">Aarush Media Group</strong>. I design modern high-performance websites, engineer viral social campaigns, and execute full-funnel digital marketing strategies that turn attention into revenue. Let’s make your brand impossible to ignore.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href="https://wa.me/918767344352"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-green-500 text-white font-sans text-sm font-bold shadow-lg shadow-green-500/10 hover:bg-green-600 hover:scale-[1.02] transition-all uppercase tracking-wider"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onNavToContact}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-pink hover:bg-white text-black font-sans text-sm font-black border border-brand-pink hover:border-white transition-all uppercase tracking-widest"
              >
                <Send className="h-4.5 w-4.5" />
                <span>Get Started Now</span>
              </button>
            </div>

            {/* Quick social channel list */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-2">Follow Me:</span>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all ${link.color}`}
                    title={`Connect on ${link.name}`}
                  >
                    {link.name === 'Instagram' && (
                      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    )}
                    {link.name === 'Twitter' && (
                      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {link.name === 'LinkedIn' && (
                      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {link.name === 'Facebook' && (
                      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Right Content (High-fidelity interactive metrics widget) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[360px] lg:max-w-none">
              {/* Decorative radial lighting behind the widget */}
              <div className="absolute inset-0 bg-brand-pink/10 rounded-3xl blur-3xl" />

              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden group">
                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#E0FF00]" />
                    <div className="h-3 w-3 rounded-full bg-white/40" />
                    <div className="h-3 w-3 rounded-full bg-white/15" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 tracking-wider">LIVETRACKING_CAMPAIGNS.TSX</span>
                </div>

                {/* Main Client Stats Grid */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-brand-pink" />
                        Combined Brand Followers
                      </span>
                      <span className="text-xs font-mono text-green-400 font-semibold flex items-center">
                        +2.4% today
                      </span>
                    </div>
                    <p className="font-display font-bold text-3xl text-white tracking-tight">
                      {metrics.followers.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-brand-pink" />
                        Organic Reach (Past 30d)
                      </span>
                      <span className="text-xs font-mono text-[#E0FF00] font-semibold flex items-center">
                        +14.8%
                      </span>
                    </div>
                    <p className="font-display font-bold text-3xl text-white tracking-tight">
                      {metrics.reach.toLocaleString()}+
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <Heart className="h-3.5 w-3.5 text-brand-pink" />
                        Avg Engagement Rate
                      </span>
                      <span className="text-xs font-mono text-gray-400 font-semibold flex items-center">
                        Target &gt; 5%
                      </span>
                    </div>
                    <p className="font-display font-bold text-3xl text-white tracking-tight">
                      {metrics.engagement}%
                    </p>
                  </div>
                </div>

                {/* Growth trendline visualization */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-mono text-gray-500">REALTIME_GROWTH_PULSE</span>
                    <span className="text-[11px] font-mono text-black bg-[#E0FF00] px-2 py-0.5 rounded font-bold">STREAMING</span>
                  </div>
                  {/* Interactive mock wave */}
                  <div className="h-12 flex items-end gap-1.5 justify-between">
                    {[30, 45, 35, 60, 50, 75, 45, 65, 85, 70, 95, 110].map((val, i) => (
                      <div
                        key={i}
                        className="w-full rounded-t-sm bg-brand-pink opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{
                          height: `${val}%`,
                          animation: `pulse 1.5s ease-in-out infinite alternate`,
                          animationDelay: `${i * 120}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating aesthetic card overlay */}
              <div className="absolute -bottom-6 -right-6 glass-card border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3 max-w-[200px] animate-bounce duration-[4s]">
                <div className="h-9 w-9 rounded-xl bg-brand-pink/15 flex items-center justify-center text-brand-pink">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Services</p>
                  <p className="text-xs font-bold text-white leading-tight">Digital Marketing & Web Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

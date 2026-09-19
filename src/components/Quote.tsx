import { useMemo, useState } from 'react';
import { Check, Minus, Plus, Send, Globe, Video, FileText, Search } from 'lucide-react';

const WHATSAPP_NUMBER = '918767344352';

type PackageId = 'silver' | 'gold' | 'platinum' | null;

interface PackageDef {
  id: Exclude<PackageId, null>;
  name: string;
  price: number;
  reelsIncluded: number;
  features: string[];
  highlight?: boolean;
}

const PACKAGES: PackageDef[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 15000,
    reelsIncluded: 0,
    features: [
      'Daily design posts',
      'Custom event designs',
      'Custom offer designs',
      'Regular posting & scheduling',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 25000,
    reelsIncluded: 3,
    features: [
      'Everything in Silver',
      'Sales designs',
      '3 reels / month',
      'Regular posting & scheduling',
    ],
    highlight: true,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 40000,
    reelsIncluded: 5,
    features: [
      'Everything in Silver + Gold',
      '5 reels / month',
      'Website designing & development',
      'Website content posting & updates',
    ],
  },
];

const EXTRA_REEL_PRICE = 1500;
const EXTRA_PAGE_PRICE = 3000;
const WEBSITE_PRICE = 14999;
const GOOGLE_BUSINESS_PRICE = 9999;

function Stepper({
  value,
  onChange,
  min = 0,
  max = 50,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Decrease"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center font-display font-bold text-white">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Increase"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function Quote() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId>(null);
  const [extraReels, setExtraReels] = useState(0);
  const [websiteDev, setWebsiteDev] = useState(false);
  const [websiteCount, setWebsiteCount] = useState(1);
  const [extraPages, setExtraPages] = useState(0);
  const [googleBusiness, setGoogleBusiness] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const pkg = PACKAGES.find((p) => p.id === selectedPackage) || null;

  const monthlyTotal = useMemo(() => {
    let total = 0;
    if (pkg) total += pkg.price;
    total += extraReels * EXTRA_REEL_PRICE;
    if (googleBusiness) total += GOOGLE_BUSINESS_PRICE;
    return total;
  }, [pkg, extraReels, googleBusiness]);

  const oneTimeTotal = useMemo(() => {
    let total = 0;
    if (websiteDev) {
      total += WEBSITE_PRICE * websiteCount;
      total += extraPages * EXTRA_PAGE_PRICE;
    }
    return total;
  }, [websiteDev, websiteCount, extraPages]);

  const hasSelection = pkg || extraReels > 0 || websiteDev || googleBusiness;

  const buildMessage = () => {
    const lines: string[] = [];
    lines.push(`Hi Rushabh! I'd like a quotation for the following:`);
    lines.push('');
    if (pkg) {
      lines.push(`• ${pkg.name} Package — ₹${pkg.price.toLocaleString('en-IN')}/month`);
    }
    if (extraReels > 0) {
      lines.push(`• Extra Reels: ${extraReels} × ₹${EXTRA_REEL_PRICE.toLocaleString('en-IN')} = ₹${(extraReels * EXTRA_REEL_PRICE).toLocaleString('en-IN')}/month`);
    }
    if (googleBusiness) {
      lines.push(`• Google Business Management (incl. SEO) — ₹${GOOGLE_BUSINESS_PRICE.toLocaleString('en-IN')}/month`);
    }
    if (websiteDev) {
      lines.push(`• Website Development: ${websiteCount} website(s) × ₹${WEBSITE_PRICE.toLocaleString('en-IN')} = ₹${(WEBSITE_PRICE * websiteCount).toLocaleString('en-IN')} (one-time)`);
      if (extraPages > 0) {
        lines.push(`• Extra Pages: ${extraPages} × ₹${EXTRA_PAGE_PRICE.toLocaleString('en-IN')} = ₹${(extraPages * EXTRA_PAGE_PRICE).toLocaleString('en-IN')} (one-time)`);
      }
    }
    lines.push('');
    if (monthlyTotal > 0) lines.push(`Monthly Total: ₹${monthlyTotal.toLocaleString('en-IN')}`);
    if (oneTimeTotal > 0) lines.push(`One-Time Total: ₹${oneTimeTotal.toLocaleString('en-IN')}`);
    lines.push('');
    if (name) lines.push(`Name: ${name}`);
    if (phone) lines.push(`Phone: ${phone}`);
    if (notes) lines.push(`Notes: ${notes}`);
    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="quote" className="relative py-24 px-6 md:px-12 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-pink">
            Get A Quote
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-white">
            Build Your Custom Package
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Pick a package, add what you need, and get an instant quotation sent straight to WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: configurator */}
          <div className="lg:col-span-2 space-y-10">
            {/* Packages */}
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4">1. Choose a Monthly Package</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PACKAGES.map((p) => {
                  const active = selectedPackage === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setSelectedPackage(active ? null : p.id)}
                      className={`text-left p-5 rounded-2xl border transition-colors ${
                        active
                          ? 'border-brand-pink bg-brand-pink/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-white">{p.name}</span>
                        {active && (
                          <span className="h-5 w-5 rounded-full bg-brand-pink flex items-center justify-center shrink-0">
                            <Check className="h-3.5 w-3.5 text-white" />
                          </span>
                        )}
                      </div>
                      <p className="font-display font-bold text-xl text-white mb-3">
                        ₹{p.price.toLocaleString('en-IN')}
                        <span className="text-xs text-gray-500 font-sans font-normal">/month</span>
                      </p>
                      <ul className="space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-gray-400">
                            <Check className="h-3 w-3 text-brand-pink mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Don't need a package? Skip this and just add the services you need below.
              </p>
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4">2. Add Extras</h3>
              <div className="space-y-4">
                {/* Extra Reels */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-brand-pink/15 flex items-center justify-center shrink-0">
                      <Video className="h-4.5 w-4.5 text-brand-pink" />
                    </span>
                    <div>
                      <p className="text-white text-sm font-semibold">Extra Reels</p>
                      <p className="text-xs text-gray-500">₹{EXTRA_REEL_PRICE.toLocaleString('en-IN')} per reel / month</p>
                    </div>
                  </div>
                  <Stepper value={extraReels} onChange={setExtraReels} />
                </div>

                {/* Google Business */}
                <label className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-brand-purple/15 flex items-center justify-center shrink-0">
                      <Search className="h-4.5 w-4.5 text-brand-purple" />
                    </span>
                    <div>
                      <p className="text-white text-sm font-semibold">Google Business Management (incl. SEO)</p>
                      <p className="text-xs text-gray-500">₹{GOOGLE_BUSINESS_PRICE.toLocaleString('en-IN')} / month</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={googleBusiness}
                    onChange={(e) => setGoogleBusiness(e.target.checked)}
                    className="h-5 w-5 accent-brand-pink shrink-0"
                  />
                </label>

                {/* Website Dev */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-4">
                  <label className="flex items-center justify-between gap-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="h-9 w-9 rounded-lg bg-brand-pink/15 flex items-center justify-center shrink-0">
                        <Globe className="h-4.5 w-4.5 text-brand-pink" />
                      </span>
                      <div>
                        <p className="text-white text-sm font-semibold">Website Development</p>
                        <p className="text-xs text-gray-500">₹{WEBSITE_PRICE.toLocaleString('en-IN')} per website (one-time, up to 5-6 pages)</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={websiteDev}
                      onChange={(e) => setWebsiteDev(e.target.checked)}
                      className="h-5 w-5 accent-brand-pink shrink-0"
                    />
                  </label>

                  {websiteDev && (
                    <div className="pl-12 space-y-4 pt-1 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">Number of websites</p>
                        <Stepper value={websiteCount} onChange={setWebsiteCount} min={1} max={20} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-gray-500" />
                          <p className="text-xs text-gray-400">Extra pages (₹{EXTRA_PAGE_PRICE.toLocaleString('en-IN')}/page)</p>
                        </div>
                        <Stepper value={extraPages} onChange={setExtraPages} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: summary + form */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="sticky top-24 p-6 rounded-2xl border border-white/10 bg-brand-card space-y-5"
            >
              <h3 className="font-display font-bold text-white text-lg">Your Quotation</h3>

              <div className="space-y-2 text-sm">
                {pkg && (
                  <div className="flex justify-between text-gray-300">
                    <span>{pkg.name} Package</span>
                    <span>₹{pkg.price.toLocaleString('en-IN')}/mo</span>
                  </div>
                )}
                {extraReels > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Extra Reels × {extraReels}</span>
                    <span>₹{(extraReels * EXTRA_REEL_PRICE).toLocaleString('en-IN')}/mo</span>
                  </div>
                )}
                {googleBusiness && (
                  <div className="flex justify-between text-gray-300">
                    <span>Google Business Mgmt</span>
                    <span>₹{GOOGLE_BUSINESS_PRICE.toLocaleString('en-IN')}/mo</span>
                  </div>
                )}
                {websiteDev && (
                  <div className="flex justify-between text-gray-300">
                    <span>Website × {websiteCount}</span>
                    <span>₹{(WEBSITE_PRICE * websiteCount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                {websiteDev && extraPages > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Extra Pages × {extraPages}</span>
                    <span>₹{(extraPages * EXTRA_PAGE_PRICE).toLocaleString('en-IN')}</span>
                  </div>
                )}
                {!hasSelection && (
                  <p className="text-gray-500 text-xs italic">Select a package or add-on to see your quote.</p>
                )}
              </div>

              {(monthlyTotal > 0 || oneTimeTotal > 0) && (
                <div className="pt-3 border-t border-white/10 space-y-1">
                  {monthlyTotal > 0 && (
                    <div className="flex justify-between font-display font-bold text-white">
                      <span>Monthly Total</span>
                      <span>₹{monthlyTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {oneTimeTotal > 0 && (
                    <div className="flex justify-between font-display font-bold text-white">
                      <span>One-Time Total</span>
                      <span>₹{oneTimeTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-pink/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-pink/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <textarea
                  placeholder="Anything else we should know? (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-pink/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!hasSelection}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
              >
                <Send className="h-4 w-4" />
                Send Quotation on WhatsApp
              </button>

              <p className="text-[10px] text-gray-500 text-center">
                Prices exclusive of GST. Valid for 15 days from quote date.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

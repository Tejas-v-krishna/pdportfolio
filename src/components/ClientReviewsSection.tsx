import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

interface ReviewItem {
  id: string;
  num: string;
  client: string;
  location: string;
  category: 'ui-ux' | 'web-dev' | 'branding' | 'all';
  categoryLabel: string;
  rating: number;
  testimonial: string;
  projectYear: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    num: '01',
    client: 'Aarav Mehta',
    location: 'Bengaluru',
    category: 'ui-ux',
    categoryLabel: 'UI/UX & Product',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Tejas simplified our entire SaaS workflow. He doesn’t just design screens—he genuinely thinks through user friction like a founder.'
  },
  {
    id: 'rev-2',
    num: '02',
    client: 'Rohan Sharma',
    location: 'Mumbai',
    category: 'web-dev',
    categoryLabel: 'Webflow & Frontend',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Insanely fast and detailed. The responsiveness and subtle micro-interactions made our product feel leagues ahead.'
  },
  {
    id: 'rev-3',
    num: '03',
    client: 'Pooja Iyer',
    location: 'Bengaluru',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    rating: 5,
    projectYear: '2024',
    testimonial: 'He gave our brand a distinct, high-end identity that our users loved immediately. Working with him felt completely effortless.'
  },
  {
    id: 'rev-4',
    num: '04',
    client: 'Ananya Verma',
    location: 'Delhi NCR',
    category: 'ui-ux',
    categoryLabel: 'Mobile App UX',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Super thoughtful with edge cases and ergonomics. Our onboarding completion jumped significantly right after shipping his redesign.'
  },
  {
    id: 'rev-5',
    num: '05',
    client: 'Vikramaditya Rao',
    location: 'Hyderabad',
    category: 'web-dev',
    categoryLabel: 'Frontend & Motion',
    rating: 5,
    projectYear: '2024',
    testimonial: 'A rare designer who understands code and motion deeply. Clean handoff, zero back-and-forth—he just gets it.'
  }
];

const CREDENTIALS = [
  'Top Rated Product Designer',
  'High rate of returning clients (98%)',
  'Startups & Founders across India',
  'Clean Figma systems & dev handoff',
  'Since 2019 on the market'
];

const FILTERS = [
  { id: 'all', label: 'All Reviews' },
  { id: 'ui-ux', label: 'UI/UX Design' },
  { id: 'web-dev', label: 'Development' },
  { id: 'branding', label: 'Branding' }
] as const;

export default function ClientReviewsSection() {
  const [filter, setFilter] = useState<'all' | 'ui-ux' | 'web-dev' | 'branding'>('all');

  const filteredReviews = filter === 'all' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.category === filter);

  return (
    <section id="reviews" className="py-24 border-t hairline-border bg-[#09090b] text-white">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* LEFT SIDEBAR: Heading, Description, Filter Pills & Verified Highlights (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-zinc-500 mb-4">[ 05 — TESTIMONIALS ]</div>
              
              <SplitTextReveal 
                text="What Clients Say"
                as="h2"
                direction="bottom"
                mode="slide"
                splitBy="chars"
                stagger={0.025}
                randomize={false}
                className="font-heading text-4xl uppercase font-bold tracking-tighter mb-4"
              />

              <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8 max-w-sm">
                Kind words from founders and product teams across India on collaboration, systems, and execution.
              </p>

              {/* Filter Pills matching ExperienceGrid skill pills style */}
              <div className="flex flex-wrap gap-2 mb-10">
                {FILTERS.map((f) => {
                  const isActive = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={`px-3 py-1 border rounded-full font-tech text-[10px] uppercase tracking-widest transition-all duration-200 interactive cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-semibold border-white'
                          : 'border-white/15 text-zinc-400 hover:text-white hover:border-zinc-400 bg-transparent'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimalist Brutalist Metric & Verified Highlights */}
            <div className="pt-8 border-t hairline-border flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-bold tracking-tight text-white">5.00</span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">[ 100% CSAT ]</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[ VERIFIED HIGHLIGHTS ]</div>
                {CREDENTIALS.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-light text-zinc-400">
                    <span className="text-zinc-600 mt-0.5 text-[9px]">▫</span>
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT MAIN LIST: Testimonial Rows matching ExperienceGrid item layout (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-0">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b hairline-border first:border-t lg:first:border-t-0 last:border-b-0 hover:bg-white/[0.02] transition-colors -mx-6 px-6 cursor-pointer interactive group"
                >
                  {/* Left sub-column: Number, Location, Year, Category badge */}
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <div className="font-tech text-xs tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors">
                      {rev.num} // {rev.location}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase">
                      [ {rev.projectYear} ]
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-2.5 py-0.5 border hairline-border rounded-full font-tech text-[10px] uppercase tracking-wider text-zinc-400 group-hover:border-zinc-500 transition-colors">
                        {rev.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right sub-column: Client Name, Stars, Testimonial Quote */}
                  <div className="md:col-span-9 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl text-white">
                        <SplitTextReveal 
                          text={rev.client}
                          direction="bottom"
                          mode="slide"
                          splitBy="chars"
                          stagger={0.025}
                          randomize={false}
                        />
                      </h3>
                      <div className="flex items-center gap-1 text-zinc-500 group-hover:text-zinc-300 transition-colors text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>

                    <div className="font-mono text-[10px] text-zinc-400 uppercase">
                      [ ENDORSEMENT ]
                    </div>

                    <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed mt-2 group-hover:text-zinc-200 transition-colors whitespace-pre-line">
                      "{rev.testimonial}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

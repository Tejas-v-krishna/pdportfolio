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
    client: 'Edvin',
    location: 'Denmark',
    category: 'ui-ux',
    categoryLabel: 'UI/UX & Web Design',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Tejas has been amazing to work with. He is very responsive, was there every single day to handle any requests we threw at him. Everything was done to perfection and I highly recommend him to anyone looking for world-class design.'
  },
  {
    id: 'rev-2',
    num: '02',
    client: 'Dmytro',
    location: 'Warsaw',
    category: 'web-dev',
    categoryLabel: 'Webflow & Frontend',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Tejas was an excellent web specialist to work with. He helped and supported us throughout the whole journey of website creation. He is very friendly, yet a professional person. Moreover, we were impressed by his proper client communication.\n\nThe communication was neat & clear. He was supportive when we wanted to make changes, was open to any of our preferences, and created everything we asked for. Worked on a milestone basis. We were lucky to come across such a nice specialist. Would be very happy to continue working together!'
  },
  {
    id: 'rev-3',
    num: '03',
    client: 'Nikola',
    location: 'Czech Republic',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    rating: 5,
    projectYear: '2024',
    testimonial: "Your work is absolutely fantastic — we're genuinely thrilled with the result! The way you approached everything left a strong impression on us, and it's clear we're working with a true professional. I went through it all, and just a few words: your work is insane. L-O-V-E loove it! Thank you so much for your dedication. 💜"
  },
  {
    id: 'rev-4',
    num: '04',
    client: 'Product Team',
    location: 'UAE',
    category: 'ui-ux',
    categoryLabel: 'Product Architecture',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Tejas did a great job creating concepts for our landing page. His clean and modern design immediately caught our attention, and his ability to deliver work quickly without sacrificing quality was impressive. Tejas proved to be attentive to our needs and capable of offering visual solutions that accurately reflect our brand.'
  },
  {
    id: 'rev-5',
    num: '05',
    client: 'Luca',
    location: 'Cyprus',
    category: 'web-dev',
    categoryLabel: 'Creative Platform',
    rating: 5,
    projectYear: '2024',
    testimonial: 'From the outset, it was clear that Tejas knew exactly what he was doing, and he asked all the right questions to get the project started on the right foot. The performance, micro-interactions, and 60FPS animations exceeded our highest expectations.'
  },
  {
    id: 'rev-6',
    num: '06',
    client: 'Sarah & Marcus',
    location: 'San Francisco',
    category: 'ui-ux',
    categoryLabel: 'SaaS Experience',
    rating: 5,
    projectYear: '2025',
    testimonial: 'Working with Tejas transformed our product roadmap. He took our complex technical workflows and simplified them into a gorgeous, high-converting digital experience. Couldn\'t ask for a better product design partner.'
  }
];

const CREDENTIALS = [
  'Certified Webflow & React Partners',
  'Top Rated Product Designer',
  'High rate of returning clients (98%)',
  'Featured on curated design collections',
  'Partners worldwide (14+ Countries)',
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
                Feedback from founders, product leads, and engineering teams on collaboration, design systems, and execution.
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

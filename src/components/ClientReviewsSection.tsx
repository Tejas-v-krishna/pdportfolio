import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    num: '001',
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
    num: '002',
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
    num: '003',
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
    num: '004',
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
    num: '005',
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
    num: '006',
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

export default function ClientReviewsSection() {
  const [filter, setFilter] = useState<'all' | 'ui-ux' | 'web-dev' | 'branding'>('all');

  const filteredReviews = filter === 'all' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.category === filter);

  return (
    <section className="bg-[#09090b] text-white py-24 px-4 md:px-12 border-t hairline-border relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* TOP HEADER & TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b hairline-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 fill-indigo-400" />
              <span>CLIENT SATISFACTION // TESTIMONIALS</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tight text-white leading-[0.95]">
              What clients say about the experience
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0">
            {[
              { id: 'all', label: 'ALL REVIEWS' },
              { id: 'ui-ux', label: 'UI/UX DESIGN' },
              { id: 'web-dev', label: 'DEVELOPMENT' },
              { id: 'branding', label: 'BRANDING' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  filter === f.id 
                    ? 'bg-white text-black font-bold shadow-lg scale-105' 
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border hairline-border hover:bg-zinc-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID (Matching Reference Screenshot Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDEBAR: Glass Rating Badge & Credentials (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-8 sticky top-28">
            
            {/* 3D Glass Ornament Display */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border hairline-border backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
              
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-3xl font-bold tracking-tight text-white">5.00</span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Glass Loop Render simulation */}
              <div className="my-6 flex justify-center py-4">
                <div className="w-16 h-32 rounded-full border-4 border-zinc-400/30 border-t-white/80 rotate-12 shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center justify-center backdrop-blur-md animate-pulse">
                  <div className="w-8 h-20 rounded-full border-2 border-indigo-400/40" />
                </div>
              </div>

              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest text-center">
                PERFECT 100% CSAT RATING
              </div>
            </div>

            {/* Bulleted Credentials List */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>VERIFIED HIGHLIGHTS</span>
              </div>
              
              {CREDENTIALS.map((cred, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-sans text-zinc-300 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT MAIN LIST: Testimonial Rows (9 Cols) */}
          <div className="lg:col-span-9 divide-y hairline-border border-t border-b hairline-border">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] transition-colors px-4 -mx-4 rounded-xl"
                >
                  {/* Index Number (2 Cols) */}
                  <div className="md:col-span-2 font-mono text-sm text-zinc-500 group-hover:text-indigo-400 transition-colors">
                    {rev.num}
                  </div>

                  {/* Client Name & Location (3 Cols) */}
                  <div className="md:col-span-3">
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
                      {rev.client}, <span className="text-zinc-400 font-normal">{rev.location}</span>
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">
                        {rev.categoryLabel}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-600">[{rev.projectYear}]</span>
                    </div>
                  </div>

                  {/* Detailed Testimonial Text (7 Cols) */}
                  <div className="md:col-span-7 font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed font-light whitespace-pre-line group-hover:text-white transition-colors">
                    "{rev.testimonial}"
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

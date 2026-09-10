import { motion } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

interface ReviewItem {
  id: string;
  num: string;
  client: string;
  location: string;
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
    categoryLabel: 'Frontend & Motion',
    rating: 5,
    projectYear: '2024',
    testimonial: 'A rare designer who understands code and motion deeply. Clean handoff, zero back-and-forth—he just gets it.'
  }
];

export default function ClientReviewsSection() {
  return (
    <section id="reviews" className="py-24 border-t hairline-border bg-[#09090b] text-white">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* LEFT SIDEBAR: Heading & Description (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
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

            <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-sm">
              Kind words from founders and product teams across India on collaboration, systems, and execution.
            </p>
          </div>

          {/* RIGHT MAIN LIST: Testimonial Rows (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-0">
            {REVIEWS.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35 }}
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
          </div>

        </div>
      </div>
    </section>
  );
}

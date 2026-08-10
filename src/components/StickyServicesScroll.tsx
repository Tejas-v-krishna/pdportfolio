import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

export interface ServiceItem {
  id: string;
  num: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  bgHex: string;
  textColor: string;
  subTextColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  image: string;
  metrics: { label: string; val: string }[];
  process: { step: string; title: string; desc: string }[];
  deliverables: string[];
  turnaround: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ui-ux',
    num: '01',
    category: 'PRODUCT & INTERFACE DESIGN',
    title: 'UI/UX & Digital\nProduct Design',
    subtitle: 'Every interaction justified. Interfaces where minimal visual noise meets maximal functional impact.',
    description: 'The process begins with ruthless reduction—shaping hierarchy, navigation, and logic before a single token is defined. Only then does it evolve into a highly-performant, conversion-driven visual system.',
    bgHex: '#F3F4F6', // Light Pearl Grey
    textColor: 'text-zinc-950',
    subTextColor: 'text-zinc-600',
    borderColor: 'border-zinc-300/80',
    badgeBg: 'bg-zinc-200/80',
    badgeText: 'text-zinc-800',
    accentColor: '#18181b',
    image: '/services/service_uiux.jpg',
    metrics: [
      { label: 'DELIVERY SPRINT', val: '2-4 WEEKS' },
      { label: 'ACCESSIBILITY', val: 'WCAG 2.1 AA' },
      { label: 'PROTOTYPE RATE', val: '60 FPS MOTION' }
    ],
    process: [
      { step: '01', title: 'Systematic Logic', desc: 'Mapping extreme edge cases & wireframes.' },
      { step: '02', title: 'Visual Primitives', desc: 'Defining a brutalist, flexible token system.' },
      { step: '03', title: 'Spring Physics', desc: 'Crafting micro-interactions that feel tangible.' }
    ],
    deliverables: ['Figma Design System', 'Component Libraries', 'Interactive Wireframes', 'Usability Testing', 'Design Tokens'],
    turnaround: '2-4 Weeks Sprint'
  },
  {
    id: 'web-dev',
    num: '02',
    category: 'ENGINEERING & ARCHITECTURE',
    title: 'Webflow\nDevelopment',
    subtitle: 'Code architecture perfectly matched to the Figma layout. Built for extreme performance.',
    description: 'I don\'t just design; I ship. Approved concepts are transformed into production-ready DOM structures, combining clean semantic code with scalable CMS databases for long-term viability.',
    bgHex: '#D1D5DB', // Platinum Silver Grey
    textColor: 'text-zinc-950',
    subTextColor: 'text-zinc-700',
    borderColor: 'border-zinc-400/80',
    badgeBg: 'bg-zinc-300/90',
    badgeText: 'text-zinc-900',
    accentColor: '#0f172a',
    image: '/services/service_webdev.jpg',
    metrics: [
      { label: 'LIGHTHOUSE SCORE', val: '99/100 PERF' },
      { label: 'FRAME RATE', val: '60 FPS SMOOTH' },
      { label: 'STACK', val: 'REACT / VITE / GSAP' }
    ],
    process: [
      { step: '01', title: 'Clean DOM Structures', desc: 'Semantic CSS & HTML built for speed.' },
      { step: '02', title: 'Motion Sync', desc: 'Hardware-accelerated GSAP & scroll triggers.' },
      { step: '03', title: 'Data Architecture', desc: 'Connecting flexible CMS logic that lasts.' }
    ],
    deliverables: ['Custom React/Next App', 'Webflow CMS Build', 'GLSL/Canvas Animations', 'SEO & OpenGraph', 'Speed Optimization'],
    turnaround: '3-5 Weeks Sprint'
  },
  {
    id: 'brand-identity',
    num: '03',
    category: 'BRAND STRATEGY & IDENTITY',
    title: 'Brand Identity\n& Visual System',
    subtitle: 'Marks that refuse to be ignored. Typography-first branding with absolute authority.',
    description: 'Memorable brand personalities shaped through minimalist logomarks, deeply curated color spaces, and bespoke typography guidelines that carry weight across physical and digital mediums.',
    bgHex: '#9CA3AF', // Mid Slate Steel Grey
    textColor: 'text-zinc-950',
    subTextColor: 'text-zinc-800',
    borderColor: 'border-zinc-500/80',
    badgeBg: 'bg-zinc-400/80',
    badgeText: 'text-zinc-950',
    accentColor: '#09090b',
    image: '/services/service_brand.jpg',
    metrics: [
      { label: 'LOGOMARK VARIANTS', val: 'VECTOR & 3D' },
      { label: 'TYPOGRAPHY SPECS', val: 'CUSTOM PAIRINGS' },
      { label: 'ASSET EXPORTS', val: 'SVG / PRINT / WEB' }
    ],
    process: [
      { step: '01', title: 'Aesthetic Alignment', desc: 'Defining a striking industry archetype.' },
      { step: '02', title: 'Timeless Marks', desc: 'Drafting uncompromising vector logomarks.' },
      { step: '03', title: 'Strict Guidelines', desc: 'Packaging grid rules & font hierarchies.' }
    ],
    deliverables: ['Vector Logomark Suite', 'Typography Hierarchy', 'Color Palette Tokens', 'Brand Guidelines Book', 'Social & Press Kits'],
    turnaround: '3-4 Weeks Sprint'
  },
  {
    id: 'product-strategy',
    num: '04',
    category: 'END-TO-END CREATION',
    title: 'Product Architecture\n& Strategy',
    subtitle: 'Taking full ownership from the initial concept definition to final market release.',
    description: 'Design and development are treated as one continuous system. The gap between engineering and aesthetics is completely erased, resulting in a coherent, intuitive product evolution.',
    bgHex: '#4B5563', // Slate Gunmetal Grey
    textColor: 'text-zinc-50',
    subTextColor: 'text-zinc-200',
    borderColor: 'border-zinc-500/60',
    badgeBg: 'bg-zinc-600/80',
    badgeText: 'text-zinc-100',
    accentColor: '#ffffff',
    image: '/services/service_product.jpg',
    metrics: [
      { label: 'DEVELOPMENT LIFECYCLE', val: 'END-TO-END' },
      { label: 'SYSTEM COHERENCE', val: 'UNIFIED ARCH' },
      { label: 'QA VERIFICATION', val: '100% COVERAGE' }
    ],
    process: [
      { step: '01', title: 'Unforgiving Scoping', desc: 'Defining exact business & user specs.' },
      { step: '02', title: 'End-to-End Pipeline', desc: 'Continuous sync between design & code.' },
      { step: '03', title: 'Post-Release Audit', desc: 'Performance tracking & ruthless optimization.' }
    ],
    deliverables: ['Product Specs Document', 'Full Product UI/UX', 'Production Codebase', 'Analytics Setup', 'Maintenance Roadmap'],
    turnaround: '6-8 Weeks Sprint'
  },
  {
    id: 'creative-direction',
    num: '05',
    category: 'SPATIAL & CREATIVE DIRECTION',
    title: 'Creative Direction\n& Spatial Design',
    subtitle: 'Expanding the grid into physical space with strict environmental aesthetics.',
    description: 'High-impact poster series, interactive WebGL scenes, and 3D architectural branding that respects the exact same uncompromising rules as our digital interfaces.',
    bgHex: '#1F2937', // Dark Iron Charcoal Grey
    textColor: 'text-white',
    subTextColor: 'text-zinc-300',
    borderColor: 'border-zinc-600/60',
    badgeBg: 'bg-zinc-700/80',
    badgeText: 'text-zinc-100',
    accentColor: '#f4f4f5',
    image: '/services/service_uiux.jpg',
    metrics: [
      { label: '3D ENVIRONMENTS', val: 'BLENDER / THREE.JS' },
      { label: 'EDITORIAL FORMAT', val: 'LARGE FORM PRINT' },
      { label: 'TOUCHPOINTS', val: 'PHYSICAL + DIGITAL' }
    ],
    process: [
      { step: '01', title: 'Spatial Briefing', desc: 'Defining raw scale, lighting, and material.' },
      { step: '02', title: 'Photoreal Simulation', desc: 'Rendering physical interactions in 3D.' },
      { step: '03', title: 'Production Specs', desc: 'Precise handoff for print & fabrication.' }
    ],
    deliverables: ['3D Spatial Renderings', 'Editorial Poster Series', 'Exhibition Signage', 'Interactive 3D Web Scenes', 'Material Specifications'],
    turnaround: '4-6 Weeks Sprint'
  }
];

interface SingleCardProps {
  item: ServiceItem;
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
  onContactClick?: () => void;
}

function ServiceCard({ item, index, total, containerProgress, onContactClick }: SingleCardProps) {
  // Range where card index gets covered by the NEXT card (index + 1)
  const isLast = index === total - 1;
  const segments = Math.max(1, 2 * (total - 1));
  const startCover = (2 * index + 1) / segments;
  const endCover = (2 * index + 2) / segments;

  // 3D Skew & Flip Transforms when next card covers this card
  const rotateX = useTransform(
    containerProgress,
    [startCover, endCover],
    [0, isLast ? 0 : -24]
  );
  // Alternate skew direction based on index (even indices lean one way, odd the other)
  const skewDirection = index % 2 === 0 ? -3.5 : 3.5;
  const skewY = useTransform(
    containerProgress,
    [startCover, endCover],
    [0, isLast ? 0 : skewDirection]
  );
  const scale = useTransform(
    containerProgress,
    [startCover, endCover],
    [1, isLast ? 1 : 0.88]
  );
  const translateY = useTransform(
    containerProgress,
    [startCover, endCover],
    [0, isLast ? 0 : -45]
  );
  const brightness = useTransform(
    containerProgress,
    [startCover, endCover],
    [1, isLast ? 1 : 0.4]
  );

  // Split description into two paragraphs for the layout
  const descSentences = item.description.split('.').filter(Boolean).map(s => s.trim() + '.');
  const p1 = descSentences[0] || item.description;
  const p2 = descSentences.slice(1).join(' ') || item.subtitle;

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.15, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className={`sticky top-0 h-screen w-full overflow-hidden pointer-events-auto ${isLast ? '' : 'mb-[100vh]'}`}>
      <motion.div
        style={{
          rotateX: isLast ? 0 : rotateX,
          skewY: isLast ? 0 : skewY,
          scale: isLast ? 1 : scale,
          y: isLast ? 0 : translateY,
          filter: isLast ? 'brightness(1)' : `brightness(${brightness.get()})`,
          backgroundColor: item.bgHex,
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
        }}
        className={`w-full h-screen rounded-none flex flex-col justify-between transition-shadow duration-300 relative overflow-hidden`}
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          className="w-full max-w-[2000px] mx-auto h-full flex flex-col justify-between pt-16 lg:pt-24"
        >
          
          {/* Top Section: Title & Number */}
          <div className="flex-1 flex justify-between items-start px-6 md:px-12 w-full">
            <div className={`font-sans text-[10vw] lg:text-[7.5vw] font-medium leading-[0.85] tracking-tighter whitespace-pre-line ${item.textColor}`}>
              <SplitTextReveal 
                text={item.title}
                direction="bottom"
                mode="slide"
                splitBy="chars"
                stagger={0.015}
                triggerOnScroll={true}
              />
            </div>
            <div className={`font-sans text-[10vw] lg:text-[7.5vw] font-medium leading-[0.8] tracking-tighter opacity-30 ${item.textColor}`}>
              <SplitTextReveal 
                text={item.num}
                direction="bottom"
                mode="slide"
                splitBy="chars"
                stagger={0.03}
                triggerOnScroll={true}
              />
            </div>
          </div>

          {/* Bottom Section: Grid Layout */}
          <div className={`w-full border-t ${item.borderColor} flex flex-col lg:flex-row h-auto lg:h-[45vh]`}>
            
            {/* Approach Label */}
            <div className={`w-full lg:w-[15%] px-6 md:px-12 py-6 lg:py-8 border-b lg:border-b-0 lg:border-r ${item.borderColor}`}>
              <motion.span variants={contentVariants} className={`inline-block text-sm md:text-base font-medium opacity-80 ${item.textColor}`}>Approach</motion.span>
            </div>

            {/* First Text Column */}
            <div className={`w-full lg:w-[25%] px-6 lg:px-8 py-6 lg:py-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${item.borderColor}`}>
              <div className={`space-y-6 text-sm md:text-base lg:text-lg leading-relaxed opacity-80 ${item.textColor}`}>
                <motion.p variants={contentVariants}>{p1}</motion.p>
                <motion.p variants={contentVariants}>{p2}</motion.p>
              </div>
              <motion.div variants={contentVariants} className="mt-12 lg:mt-0">
                <button 
                  onClick={onContactClick} 
                  className={`text-sm md:text-base font-medium border-b pb-1 hover:opacity-60 transition-opacity inline-block ${item.textColor} ${item.borderColor}`}
                >
                  Discuss implementation
                </button>
              </motion.div>
            </div>

            {/* Second Text Column */}
            <div className={`w-full lg:w-[25%] px-6 lg:px-8 py-6 lg:py-8 border-b lg:border-b-0 lg:border-r ${item.borderColor}`}>
              <div className={`space-y-6 text-sm md:text-base lg:text-lg leading-relaxed opacity-80 ${item.textColor}`}>
                <motion.p variants={contentVariants}>{item.process[0].desc}</motion.p>
                <motion.p variants={contentVariants}>{item.process[1].desc}</motion.p>
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-[35%] h-[40vh] lg:h-full relative overflow-hidden bg-black/10">
              <motion.img 
                variants={imageVariants}
                src={item.image} 
                alt={item.title.replace('\n', ' ')}
                className="absolute inset-0 w-full h-full object-cover object-left-top origin-center"
              />
            </div>

          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}


interface StickyServicesScrollProps {
  onContactClick?: () => void;
}

export default function StickyServicesScroll({ onContactClick }: StickyServicesScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div className="relative bg-[#09090b] text-white">
      
      {/* SECTION INTRO HEADER - ABSOLUTE TYPOGRAPHIC LAYOUT */}
      <div className="relative w-full h-[100svh] bg-[#09090b] overflow-hidden">
        
        {/* TOP CENTER: Massive Text */}
        <div className="absolute top-[12%] left-[10%] md:top-[15%] md:left-[25%] flex flex-col z-10">
          <h2 className="font-sans font-medium text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-[-0.05em] text-white">
            Core
          </h2>
          <h2 className="font-sans font-medium text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-[-0.05em] text-white md:ml-[5vw]">
            services
          </h2>
        </div>

        {/* BOTTOM LEFT: Massive Text */}
        <div className="absolute bottom-[10%] left-[5%] md:bottom-[15%] md:left-[8%] flex flex-col z-10">
          <h2 className="font-sans font-medium text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] text-white">
            Yeah, I can
          </h2>
          <h2 className="font-sans font-medium text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] text-white ml-[10vw]">
            do all this.
          </h2>
        </div>


        {/* CENTER RIGHT: "I refuse to compromise..." */}
        <div className="absolute top-[50%] right-[10%] md:top-[45%] md:right-[12%] z-10 flex flex-col gap-0.5 max-w-[280px]">
          <p className="font-sans text-[11px] md:text-sm text-white tracking-wide">
            I refuse to compromise on aesthetics.
          </p>
          <p className="font-sans text-[11px] md:text-sm text-[#878787] tracking-wide">
            Every detail must justify its existence.
          </p>
          <div className="ml-6 md:ml-8 mt-1.5 flex flex-col gap-0.5">
            <p className="font-sans text-[11px] md:text-sm text-[#878787] tracking-wide">
              If a layout feels off,
            </p>
            <p className="font-sans text-[11px] md:text-sm text-white tracking-wide">
              it gets rebuilt from scratch.
            </p>
          </div>
        </div>



      </div>

      {/* STICKY 3D SCROLL CONTAINER */}
      <div 
        ref={containerRef} 
        className="relative"
      >
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard
            key={service.id}
            item={service}
            index={index}
            total={SERVICES_DATA.length}
            containerProgress={scrollYProgress}
            onContactClick={onContactClick}
          />
        ))}
      </div>

    </div>
  );
}

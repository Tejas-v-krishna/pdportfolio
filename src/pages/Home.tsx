import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../sections/Hero';
import { Philosophy } from '../sections/Philosophy';
import { SelectedWork } from '../sections/SelectedWork';
import { Archive } from '../sections/Archive';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { ShapeBullseye, ShapeClover, ShapeHookStar, ShapeWave } from '../components/shapes/DecoShapes';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const cloverRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const bullseyeRef = useRef<HTMLDivElement>(null);
  const hookStarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clover Shape Timeline
      if (cloverRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        })
        .to(cloverRef.current, { x: '42vw', y: '95vh', scale: 1.2, rotation: 180, ease: 'power1.inOut' })
        .to(cloverRef.current, { x: '-15vw', y: '210vh', scale: 0.9, rotation: 360, ease: 'power1.inOut' })
        .to(cloverRef.current, { x: '35vw', y: '330vh', scale: 1.1, rotation: 540, ease: 'power1.inOut' })
        .to(cloverRef.current, { x: '-12vw', y: '450vh', scale: 0.8, rotation: 720, ease: 'power1.inOut' });
      }

      // 2. Wave Shape Timeline
      if (waveRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          }
        })
        .to(waveRef.current, { x: '-52vw', y: '85vh', scale: 1.1, rotation: -180, ease: 'power1.inOut' })
        .to(waveRef.current, { x: '2vw', y: '205vh', scale: 0.9, rotation: -360, ease: 'power1.inOut' })
        .to(waveRef.current, { x: '-62vw', y: '300vh', scale: 1.2, rotation: -540, ease: 'power1.inOut' })
        .to(waveRef.current, { x: '-5vw', y: '415vh', scale: 1.0, rotation: -720, ease: 'power1.inOut' });
      }

      // 3. Bullseye Shape Timeline
      if (bullseyeRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8,
          }
        })
        .to(bullseyeRef.current, { x: '68vw', y: '75vh', scale: 1.2, rotation: 270, ease: 'power1.inOut' })
        .to(bullseyeRef.current, { x: '8vw', y: '180vh', scale: 0.8, rotation: 540, ease: 'power1.inOut' })
        .to(bullseyeRef.current, { x: '4vw', y: '290vh', scale: 1.3, rotation: 810, ease: 'power1.inOut' })
        .to(bullseyeRef.current, { x: '55vw', y: '420vh', scale: 0.9, rotation: 1080, ease: 'power1.inOut' });
      }

      // 4. HookStar Shape Timeline
      if (hookStarRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
          }
        })
        .to(hookStarRef.current, { x: '-42vw', y: '60vh', scale: 0.9, rotation: -180, ease: 'power1.inOut' })
        .to(hookStarRef.current, { x: '-68vw', y: '190vh', scale: 1.2, rotation: -360, ease: 'power1.inOut' })
        .to(hookStarRef.current, { x: '8vw', y: '275vh', scale: 1.0, rotation: -540, ease: 'power1.inOut' })
        .to(hookStarRef.current, { x: '-48vw', y: '410vh', scale: 0.8, rotation: -720, ease: 'power1.inOut' });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full pt-10 overflow-x-hidden">
      {/* Global Animated Floating Background Shapes */}
      {/* Clover Shape - Starts top left */}
      <div 
        ref={cloverRef} 
        className="absolute left-[22%] top-[200px] hidden md:block w-12 h-12 opacity-20 text-green-500 z-10 pointer-events-none"
      >
        <div className="animate-spin-slow w-full h-full">
          <ShapeClover className="w-full h-full" />
        </div>
      </div>

      {/* Wave Shape - Starts top right */}
      <div 
        ref={waveRef} 
        className="absolute right-[8%] top-[250px] hidden md:block w-16 h-16 opacity-15 text-pink-500 z-10 pointer-events-none"
      >
        <div className="animate-spin-slow-reverse w-full h-full">
          <ShapeWave className="w-full h-full" />
        </div>
      </div>

      {/* Bullseye Shape - Starts middle left */}
      <div 
        ref={bullseyeRef} 
        className="absolute left-[5%] top-[400px] hidden md:block w-16 h-16 opacity-15 text-blue-500 z-10 pointer-events-none"
      >
        <div className="animate-spin-slow w-full h-full">
          <ShapeBullseye className="w-full h-full" />
        </div>
      </div>

      {/* HookStar Shape - Starts bottom right */}
      <div 
        ref={hookStarRef} 
        className="absolute right-[18%] top-[600px] hidden md:block w-14 h-14 opacity-20 text-purple-500 z-10 pointer-events-none"
      >
        <div className="animate-spin-slow-reverse w-full h-full">
          <ShapeHookStar className="w-full h-full" />
        </div>
      </div>

      {/* Content sections */}
      <Hero />
      <Philosophy />
      <SelectedWork />
      <Archive />
      <About />
      <Contact />
    </main>
  );
};

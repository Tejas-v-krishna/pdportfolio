import React from 'react';
import { CreativeBanner } from '../sections/CreativeBanner';
import { AboutStory } from '../sections/AboutStory';

export const About: React.FC = () => {
  return (
    <main className="relative z-10 w-full pt-32 pb-10 flex flex-col gap-8">
      
      {/* First Section: Biography, Journey and Values */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 w-full flex flex-col gap-8">
        
        {/* Bio Block */}
        <div className="skew-on-scroll bg-white rounded-[3rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row gap-16">
          <div className="md:w-2/3">
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-[var(--color-text-dark)] leading-tight mb-8">
              Design is how I think.<br />
              Building is how I prove it.
            </h1>
            <div className="text-lg opacity-80 leading-relaxed space-y-6">
              <p>
                I grew up as a kid who wanted to know how everything worked, taking apart toys to see what was inside. Without that curiosity, I probably wouldn't be a designer today.
              </p>
              <p>
                Along the way, I realized that understanding systems wasn't enough. I cared just as much about how people experienced them. That's when UI/UX design clicked for me.
              </p>
              <p>
                My background in engineering and design has shaped how I work. I believe that a great product isn't just about how it looks, but how it feels to use.
              </p>
              <p>
                Today, I work as a UI/UX Designer & Researcher Intern at Trams, while pursuing my CS&E degree. I'm exploring how we can build interfaces that are powerful, empathetic, and truly helpful.
              </p>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col gap-8">
            <div className="w-full aspect-square rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-xl">
              <img src="https://placehold.co/800x800/EFEFEF/1A1A18?text=Tejas" alt="Tejas" className="w-full h-full object-cover" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-bold text-lg text-[var(--color-text-dark)] mb-4">Education</h3>
              <div className="space-y-4 text-sm opacity-80">
                <div>
                  <div className="font-semibold">Lovely Professional University</div>
                  <div>B.Tech Computer Science & Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Journey */}
        <div className="skew-on-scroll bg-white rounded-[3rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-4">My journey</h2>
          <p className="text-lg opacity-80 mb-12 max-w-2xl">
            Some highlights of my career so far.
          </p>
          <div className="relative flex flex-col gap-4 items-center">
            {/* Visual stairs */}
            <div className="w-full max-w-lg bg-[var(--color-text-dark)] text-white rounded-full px-6 py-4 flex justify-between mr-auto">
              <span className="font-mono text-xs opacity-70">2022</span>
              <span className="font-medium">Started CS&E Degree @ LPU</span>
            </div>
            <div className="w-full max-w-lg bg-[var(--color-text-dark)] text-white rounded-full px-6 py-4 flex justify-between ml-12 mr-auto">
              <span className="font-mono text-xs opacity-70">2023</span>
              <span className="font-medium">Founded Bold Cursor</span>
            </div>
            <div className="w-full max-w-lg bg-[var(--color-text-dark)] text-white rounded-full px-6 py-4 flex justify-between ml-24 mr-auto">
              <span className="font-mono text-xs opacity-70">2024</span>
              <span className="font-medium">Graphic Designer @ University Club</span>
            </div>
            <div className="w-full max-w-lg bg-[var(--color-text-dark)] text-white rounded-full px-6 py-4 flex justify-between ml-36 mr-auto">
              <span className="font-mono text-xs opacity-70">Present</span>
              <span className="font-medium">UI/UX Intern @ Trams</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="p-8 sm:p-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-4">Values I believe in.</h2>
          <p className="text-lg opacity-80 mb-12 max-w-2xl">
            The way I work is shaped as much by values as it is by craft.
          </p>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-16 border-t border-gray-200 pt-8">
              <div className="font-mono text-sm opacity-50">01</div>
              <h3 className="font-display font-bold text-2xl w-full md:w-1/3">Disagree, but commit.</h3>
              <p className="opacity-80 flex-1 leading-relaxed">It's healthy to debate and push back on decisions during the exploration phase. But once a direction is chosen, I fully commit to executing it and moving forward together as a team.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-16 border-t border-gray-200 pt-8">
              <div className="font-mono text-sm opacity-50">02</div>
              <h3 className="font-display font-bold text-2xl w-full md:w-1/3">A sports-team mindset.</h3>
              <p className="opacity-80 flex-1 leading-relaxed">We succeed and fail together. I believe in lifting up my teammates, covering for them when needed, and keeping the collective goal above individual ego.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-16 border-t border-gray-200 pt-8">
              <div className="font-mono text-sm opacity-50">03</div>
              <h3 className="font-display font-bold text-2xl w-full md:w-1/3">Be kind, be true, be you.</h3>
              <p className="opacity-80 flex-1 leading-relaxed">Empathy goes a long way. I try to bring my authentic self to work and create an environment where others feel comfortable doing the same.</p>
            </div>
          </div>
        </div>

      </section>

      {/* Story Animation Section */}
      <AboutStory />

      {/* Full-Width Showcase Marquee Banner */}
      <CreativeBanner />

      {/* Second Section: Outside Work & CTA */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 w-full flex flex-col gap-8">
        
        {/* Outside Work */}
        <div className="skew-on-scroll bg-white rounded-[3rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-8">What I do outside of work.</h2>
            <h4 className="font-display font-bold text-xl mb-4">I invest a lot in community.</h4>
            <p className="opacity-80 mb-8 leading-relaxed">
              Meeting people, mentoring designers, and building community is a big part of who I am. I regularly participate in design meetups and help moderate online design communities.
            </p>
            <h4 className="font-display font-bold text-xl mb-4">I am also a music enthusiast.</h4>
            <p className="opacity-80 leading-relaxed">
              When I'm not designing, I'm probably listening to shoegaze, discovering new artists, or experimenting with making my own music. It's a great way to reset my creative energy.
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col gap-6">
            <div className="w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden">
              <img src="https://placehold.co/800x450/EFEFEF/1A1A18?text=Community" alt="Community" className="w-full h-full object-cover" />
            </div>
            <div className="w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden">
              <img src="https://placehold.co/800x450/EFEFEF/1A1A18?text=Music" alt="Music" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Let's talk CTA */}
        <div className="skew-on-scroll bg-white rounded-[3rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-6 max-w-2xl">
            Let's talk if you're building something that makes life a little better.
          </h2>
          <p className="text-lg opacity-80 mb-12 max-w-2xl">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about design.
          </p>
          
          {/* Adplist Mock */}
          <div className="w-full max-w-xl bg-black rounded-3xl p-8 flex items-center gap-8 text-left text-white shadow-xl transform transition-transform hover:scale-105">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
              <img src="https://placehold.co/200x200/333/FFF?text=Tejas" alt="Tejas" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm opacity-60 mb-1">Book a session with me</div>
              <div className="font-display font-bold text-2xl sm:text-3xl">I'm <span className="text-blue-400">mentoring</span> on adplist.org</div>
            </div>
          </div>
        </div>

      </section>
      
    </main>
  );
};

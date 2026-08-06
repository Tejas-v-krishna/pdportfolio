import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show the banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[9999] max-w-[520px] w-[calc(100%-3rem)] bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-7 md:p-8 shadow-2xl"
          style={{ 
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9)'
          }}
        >
          {/* Header Badge */}
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span>[ COOKIES & PRIVACY ]</span>
          </div>

          {/* High-Readability Body Text */}
          <p className="text-zinc-200 text-sm md:text-base leading-relaxed mb-7 font-sans">
            By clicking <strong className="text-white font-semibold">"Accept"</strong>, you agree to storing cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. View our <a href="#" className="text-white hover:text-zinc-300 underline font-medium transition-colors">Privacy Policy</a> for details.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-sans pt-2 border-t border-white/10">
            <button 
              onClick={() => {}} 
              className="text-sm text-zinc-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer interactive"
            >
              Preferences
            </button>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleReject}
                className="px-6 py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-sm transition-colors cursor-pointer interactive"
              >
                Reject
              </button>
              <button 
                onClick={handleAccept}
                className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-colors cursor-pointer interactive shadow-lg"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

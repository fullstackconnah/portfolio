import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
  const [isTypingDone, setIsTypingDone] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center relative z-10 px-6">
<div className="bg-black border border-green-500 text-[#39FF14] font-mono text-lg md:text-xl p-6 rounded-md shadow-lg max-w-xl w-full animate-terminal">
<p> <Typewriter
        words={[
          'Authenticating...',
          'User verified: Connah',
          'Session ID: 0xC0D3C0NN4H',
          'Loading environment...',
          'Status: Terminal ready. Awaiting input.'
        ]}
        loop={1}
        typeSpeed={45}
        delaySpeed={800}
        deleteSpeed={0}
        cursor
        cursorStyle="█"
        cursorBlinking
        onLoopDone={() => setIsTypingDone(true)}
      /></p>
      </div>

      {/* Reveal main CTA after animation if you want */}
      <div className={`mt-6 transition-opacity duration-1000 ${isTypingDone ? 'opacity-100' : 'opacity-0'}`}>
        <a
          href="#projects"
          className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded transition"
        >
          View My Work
        </a>
      </div>
    </section>
  );
}
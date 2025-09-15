import AsciiTitle from './AsciiTitle';

const asciiArt = [
  '    ______                        __         __         ',
  '   / ____/___  ____  ____  ____ _/ /_   ____/ /__ _   __',
  '  / /   / __ \\/ __ \\/ __ \\/ __ `/ __ \\ / __  / _ \\ | / /',
  ' / /___/ /_/ / / / / / / / /_/ / / / // /_/ /  __/ |/ / ',
  ' \\____/\\____/_/ /_/_/ /_/\\__,_/_/ /_(_)__,_/\\___/|___/  '
];

export default function HeroSection({ onReboot, setIsTearing, setIsShattering }) {
  const scrollToContent = () => {
    const contentElement = document.getElementById('main-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[calc(90vh)] flex flex-col justify-center text-[#39FF14] font-mono px-4">
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">

          <div className="space-y-8">
            <div className="opacity-0 animate-crt-turn-on" style={{ animationDelay: '0.1s' }}>
              <AsciiTitle asciiArt={asciiArt} />
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToContent()}
                className="opacity-0 animate-crt-turn-on px-6 py-3 bg-transparent border-2 border-[#39FF14] text-[#39FF14] font-mono text-sm rounded-md hover:bg-[#39FF14] hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_#39FF14]/30 hover:shadow-[0_0_20px_#39FF14]/60"
                style={{ animationDelay: '0.5s' }}
              >
                &gt; Explore Portfolio
              </button>

              <a
                href="/projects"
                className="opacity-0 animate-crt-turn-on px-6 py-3 bg-transparent border-2 border-[#39FF14]/60 text-[#39FF14]/80 font-mono text-sm rounded-md hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: '0.7s' }}
              >
                &gt; View Projects
              </a>

              <a
                href="/services"
                className="opacity-0 animate-crt-turn-on px-6 py-3 bg-transparent border-2 border-[#39FF14]/60 text-[#39FF14]/80 font-mono text-sm rounded-md hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: '0.9s' }}
              >
                &gt; Services
              </a>
            </div>
          </div>

          <div className="lg:flex hidden justify-end items-center">
            <div className="opacity-0 animate-crt-turn-on space-y-6 text-right pr-8" style={{ animationDelay: '1.1s' }}>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#39FF14]">Web Developer & IT Services</h2>
                <p className="text-[#39FF14]/80 text-sm">Custom solutions for small business</p>
              </div>

              <div className="space-y-2">
                <p className="text-[#39FF14]/60 text-sm font-mono">Services offered:</p>
                <div className="space-y-1 text-sm text-[#39FF14]/80">
                  <p>Custom Websites</p>
                  <p>IT Support & Consulting</p>
                  <p>Business Solutions</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={scrollToContent}
          className="animate-slow-bounce cursor-pointer group"
          aria-label="Scroll to content"
        >
        <div className="text-center">
          <div className="text-[#39FF14]/70 group-hover:text-[#39FF14] transition-colors duration-300">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6 1.41-1.41z"/>
            </svg>
            <div className="text-sm font-mono">Scroll Down</div>
          </div>
        </div>
        </button>
      </div>

    </section>
  );
}
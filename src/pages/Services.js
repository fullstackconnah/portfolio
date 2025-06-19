import AsciiTitle from '../components/AsciiTitle';
import { useNavigate } from 'react-router-dom';
import '../css/TerminalCard.css';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

const asciiArt = [
'   _____ __________ _    _______________________   _____   ______',
'  / ___// ____/ __ \\ |  / /  _/ ____/ ____/ ___/  /  _/ | / /  _/',
'  \\__ \\/ __/ / /_/ / | / // // /   / __/  \\__ \\   / //  |/ // /  ',
' ___/ / /___/ _, _/| |/ // // /___/ /___ ___/ / _/ // /|  // /   ',
'/____/_____/_/ |_| |___/___/\\____/_____//____(_)___/_/ |_/___/   '
                                                                 
];

export default function ServicesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
    <>
      <Helmet>
        <title>services.ini | Connah.dev</title>
        <meta name="description" content="Custom web development, WordPress, e-commerce, hosting, and a clear project life cycle. Get a free quote for your next project with Connah.dev." />
      </Helmet>
      <div className="min-h-screen text-[#39FF14] font-mono">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

          {/* ASCII Title */}
          <div className="mb-10">
            <AsciiTitle asciiArt={asciiArt} />
          </div>

          {/* Return Link */}
          <p
            onClick={() => navigate(-1)}
            className="text-green-400 font-mono text-sm underline cursor-pointer hover:text-[#39FF14] transition mb-6"
          >
            &gt; return
          </p>

          {/* Main neon container */}
          <div className="rounded-lg border border-[#39FF14] shadow-[0_0_30px_#39FF14] bg-black/40 backdrop-blur-sm p-6 md:p-10 space-y-10">

            {/* Intro */}
            <p className="text-lg leading-relaxed text-[#aaffaa]">
              Need a trusted partner for clean, efficient web development?
              I build tailored solutions so you can focus on what you do best.
            </p>

            {/* Section: What I Do */}
            <div className="bg-black/50 border border-[#39FF14]/40 rounded-md shadow-[0_0_10px_#39FF14]/20 p-6 space-y-4">
              <h2 className="text-2xl font-bold hover:animate-flicker transition">
                &gt; What I Do<span className="animate-blink">_</span>
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg">
                <li><span className="text-green-300 font-semibold">Custom websites & apps:</span> Bespoke builds for your brand.</li>
                <li><span className="text-green-300 font-semibold">WordPress builds & support:</span> Easy-to-manage sites with ongoing care.</li>
                <li><span className="text-green-300 font-semibold">E-commerce stores:</span> Secure, user-friendly online shops.</li>
                <li><span className="text-green-300 font-semibold">Hosting & CI/CD deployment:</span> Smooth updates and stable hosting.</li>
                <li><span className="text-green-300 font-semibold">Technical advice & code reviews:</span> Keep your project healthy long-term.</li>
              </ul>
            </div>

            {/* Section: How It Works */}
            <div className="bg-black/50 border border-[#39FF14]/40 rounded-md shadow-[0_0_10px_#39FF14]/20 p-6 space-y-4">
              <h2 className="text-2xl font-bold hover:animate-flicker transition">
                &gt; How It Works<span className="animate-blink">_</span>
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-lg">
                <li>Chat about your goals</li>
                <li>Get a clear, tailored quote</li>
                <li>Build & refine together</li>
                <li>Launch & support</li>
              </ol>
            </div>

            {/* Section: Project Life Cycle */}
            <div className="bg-black/50 border border-[#39FF14]/40 rounded-md shadow-[0_0_10px_#39FF14]/20 p-6 space-y-4">
              <h2 className="text-2xl font-bold hover:animate-flicker transition">
                &gt; Project Life Cycle<span className="animate-blink">_</span>
              </h2>
              <div className="relative border-l-4 border-[#39FF14] pl-8 space-y-12">
                {[
                  {
                    title: 'Discovery & Planning',
                    detail: 'We clarify your goals, target audience and core features.',
                  },
                  {
                    title: 'Design & Prototype',
                    detail: 'Wireframes and mockups bring your ideas to life visually.',
                  },
                  {
                    title: 'Build & Test',
                    detail: 'I develop iteratively, sharing progress for your feedback.',
                  },
                  {
                    title: 'Launch & Support',
                    detail: 'Go live confidently, with post-launch tweaks and care.',
                  },
                ].map((item, index) => (
                  <div key={item.title} className="relative pl-12">
                    <div className="absolute -left-7 top-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#39FF14] text-[#39FF14] font-bold text-sm bg-black">
                      {index + 1}
                    </div>
                    <p className="font-bold text-[#39FF14] text-lg">{item.title}</p>
                    <p className="text-[#aaffaa] leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Why Choose Me */}
            <div className="bg-black/50 border border-[#39FF14]/40 rounded-md shadow-[0_0_10px_#39FF14]/20 p-6 space-y-4">
              <h2 className="text-2xl font-bold hover:animate-flicker transition">
                &gt; Why Choose Me<span className="animate-blink">_</span>
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg">
                <li>Clean, efficient code — easy to maintain and scale.</li>
                <li>Transparent pricing — no hidden surprises.</li>
                <li>Performance & security best practices.</li>
                <li>Long-term partnership — I’m here after launch.</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
                {
                title: 'Starter Site',
                features: ['1–3 pages', 'Mobile responsive', 'Basic contact form'],
                price: 'from $800 AUD',
                },
                {
                title: 'Business Site',
                features: ['4–8 pages', 'Blog & CMS', 'SEO ready'],
                price: 'from $1500 AUD',
                },
                {
                title: 'E-commerce',
                features: ['Online shop', 'Secure payments', 'Product management', 'Training included'],
                price: 'from $2500 AUD',
                },
            ].map((pkg) => (
                <div
                key={pkg.title}
                className={`
                    border border-[#39FF14]/40 
                    rounded-md 
                    p-6 
                    bg-black/50 
                    shadow-inner 
                    hover:shadow-[0_0_25px_#39FF14]/40 
                    transition 
                    transform 
                    hover:-translate-y-1 
                    space-y-3
                    ${pkg.title === 'Business Site' ? 'ring-2 ring-[#39FF14]/70' : ''}
                `}
                >
                <h3 className="text-xl font-bold text-[#39FF14]">{pkg.title}</h3>
                <ul className="list-none space-y-1 text-[#aaffaa] mb-2">
                    {pkg.features.map((feat) => (
                    <li key={feat}>- {feat}</li>
                    ))}
                </ul>
                <p className="font-extrabold text-green-300 text-lg">{pkg.price}</p>
                </div>
            ))}
            </div>
            <p className="text-sm text-[#aaffaa] pb-4 text-center italic">
            *Prices are starting points and may vary based on project scope and requirements.
            </p>

            {/* Section: FAQ */}
            <div className="bg-black/50 border border-[#39FF14]/40 rounded-md shadow-[0_0_10px_#39FF14]/20 p-6 space-y-6">
              <h2 className="text-2xl font-bold hover:animate-flicker transition">
                &gt; FAQ<span className="animate-blink">_</span>
              </h2>
              <ul className="space-y-6 text-lg">
                <li>
                  <p className="text-green-300 font-semibold">How long does a project take?</p>
                  <p>Most sites take 2–6 weeks, depending on size and complexity.</p>
                </li>
                <li>
                  <p className="text-green-300 font-semibold">Can you help with hosting and domains?</p>
                  <p>Yes — I can set up or migrate your hosting and domains securely.</p>
                </li>
                <li>
                  <p className="text-green-300 font-semibold">Can I update my site myself?</p>
                  <p>Absolutely — I build with user-friendly tools and provide training if needed.</p>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
                <p>Get a Free Quote</p>
                <p className="mt-4 text-sm">Email: <a href="mailto:connah.trotman00@gmail.com" className="underline hover:text-green-300">connah.trotman00@gmail.com</a></p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
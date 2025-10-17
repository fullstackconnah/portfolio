import AsciiTitle from '../components/common/AsciiTitle.jsx';
import { useNavigate } from 'react-router-dom';
import '../css/TerminalCard.css';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

          { }
          <div className="mb-10">
            <AsciiTitle asciiArt={asciiArt} />
          </div>

          { }
          <p
            onClick={() => navigate(-1)}
            className="text-green-400 font-mono text-sm underline cursor-pointer hover:text-[#39FF14] transition mb-6"
          >
            &gt; return
          </p>

          <div className="space-y-12">
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
                <span className="text-[#39FF14]/80 text-sm">services-overview.txt</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">cat services-overview.txt</span>
                </div>
                <div className="bg-black/30 border-l-4 border-[#39FF14]/60 pl-6 py-4">
                  <p className="text-[#39FF14] text-xl leading-relaxed font-medium">
                    Need a trusted partner for clean, efficient web development?
                  </p>
                  <p className="text-[#39FF14]/90 text-lg leading-relaxed mt-2">
                    I build tailored solutions so you can focus on what you do best.
                  </p>
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
                <span className="text-[#39FF14]/80 text-sm">service-catalog.json</span>
                <span className="text-[#39FF14]/60 text-xs">5 items</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">node -e "console.log(JSON.stringify(services, null, 2))"</span>
                </div>
                <div className="space-y-6">
                  {[
                    { name: 'Custom websites & apps', desc: 'Bespoke builds for your brand' },
                    { name: 'WordPress builds & support', desc: 'Easy-to-manage sites with ongoing care' },
                    { name: 'E-commerce stores', desc: 'Secure, user-friendly online shops' },
                    { name: 'Hosting & CI/CD deployment', desc: 'Smooth updates and stable hosting' },
                    { name: 'Technical advice & code reviews', desc: 'Keep your project healthy long-term' }
                  ].map((service, index) => (
                    <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-4 hover:border-[#39FF14]/40 transition-colors">
                      <div className="flex items-start space-x-4">
                        <span className="text-[#39FF14]/70 text-base font-mono bg-[#39FF14]/10 px-3 py-1 rounded">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-[#39FF14] font-bold text-lg mb-2">{service.name}</h3>
                          <p className="text-[#39FF14]/80 text-base leading-relaxed">{service.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
                <span className="text-[#39FF14]/80 text-sm">workflow.sh</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">./workflow.sh --steps</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Chat about your goals',
                    'Get a clear, tailored quote',
                    'Build & refine together',
                    'Launch & support'
                  ].map((step, index) => (
                    <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-5 hover:border-[#39FF14]/40 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#39FF14]/20 border border-[#39FF14] rounded-full flex items-center justify-center">
                          <span className="text-[#39FF14] font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[#39FF14] font-semibold text-base">{step}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
                <span className="text-[#39FF14]/80 text-sm">project-pipeline.log</span>
                <span className="text-[#39FF14]/60 text-xs">4 phases</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">tail -f project-pipeline.log</span>
                </div>
                <div className="space-y-8">
                  {[
                    {
                      title: 'Discovery & Planning',
                      detail: 'We clarify your goals, target audience and core features.',
                      status: 'INIT'
                    },
                    {
                      title: 'Design & Prototype',
                      detail: 'Wireframes and mockups bring your ideas to life visually.',
                      status: 'BUILD'
                    },
                    {
                      title: 'Build & Test',
                      detail: 'I develop iteratively, sharing progress for your feedback.',
                      status: 'TEST'
                    },
                    {
                      title: 'Launch & Support',
                      detail: 'Go live confidently, with post-launch tweaks and care.',
                      status: 'DEPLOY'
                    }
                  ].map((phase, index) => (
                    <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-6 hover:border-[#39FF14]/40 transition-colors relative">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#39FF14]/20 border-2 border-[#39FF14] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[#39FF14] font-bold text-lg">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-[#39FF14]/70 text-sm font-mono bg-[#39FF14]/10 px-3 py-1 rounded">
                              [{phase.status}]
                            </span>
                            <h3 className="text-[#39FF14] font-bold text-lg">{phase.title}</h3>
                          </div>
                          <p className="text-[#39FF14]/80 text-base leading-relaxed">{phase.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
                <span className="text-[#39FF14]/80 text-sm">competitive-advantages.md</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">markdown competitive-advantages.md</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Clean, efficient code — easy to maintain and scale',
                    'Transparent pricing — no hidden surprises',
                    'Performance & security best practices',
                    'Long-term partnership — I\'m here after launch'
                  ].map((advantage, index) => (
                    <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-5 hover:border-[#39FF14]/40 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#39FF14]/20 border border-[#39FF14] rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-[#39FF14] text-lg">✓</span>
                        </div>
                        <p className="text-[#39FF14]/90 text-base leading-relaxed">{advantage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
                <span className="text-[#39FF14]/80 text-sm">pricing-table.csv</span>
                <span className="text-[#39FF14]/60 text-xs">3 packages</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">cat pricing-table.csv | column -t -s ','</span>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Starter Site',
                      features: ['1–3 pages', 'Mobile responsive', 'Basic contact form'],
                      price: 'from $800 AUD',
                      highlight: false
                    },
                    {
                      title: 'Business Site',
                      features: ['4–8 pages', 'Blog & CMS', 'SEO ready'],
                      price: 'from $1500 AUD',
                      highlight: true
                    },
                    {
                      title: 'E-commerce',
                      features: ['Online shop', 'Secure payments', 'Product management', 'Training included'],
                      price: 'from $2500 AUD',
                      highlight: false
                    }
                  ].map((pkg, index) => (
                    <div
                      key={pkg.title}
                      className={`border-2 rounded-lg p-8 transition-all hover:scale-105 ${
                        pkg.highlight
                          ? 'border-[#39FF14] shadow-[0_0_25px_#39FF14]/50 bg-[#39FF14]/5'
                          : 'border-[#39FF14]/40 bg-black/30 hover:border-[#39FF14]/70'
                      }`}
                    >
                      <div className="text-center space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-[#39FF14] mb-2">{pkg.title}</h3>
                          {pkg.highlight && (
                            <span className="bg-[#39FF14]/20 border border-[#39FF14]/60 text-[#39FF14] text-xs px-3 py-1 rounded-full">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="space-y-4">
                          {pkg.features.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              <div className="w-5 h-5 bg-[#39FF14]/20 border border-[#39FF14] rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-[#39FF14] text-sm">✓</span>
                              </div>
                              <span className="text-[#39FF14]/90 text-base text-left">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-6 border-t border-[#39FF14]/30">
                          <p className="text-[#39FF14] font-bold text-2xl">{pkg.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center bg-black/30 border border-[#39FF14]/20 rounded-lg p-4">
                  <p className="text-[#39FF14]/70 text-base">
                    <span className="text-[#39FF14] font-mono">[INFO]</span> Prices are starting points and may vary based on project scope.
                  </p>
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
                <span className="text-[#39FF14]/80 text-sm">faq-database.sql</span>
                <span className="text-[#39FF14]/60 text-xs">3 entries</span>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">SELECT question, answer FROM faq WHERE popular = true;</span>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      question: 'How long does a project take?',
                      answer: 'Most sites take 2–6 weeks, depending on size and complexity.'
                    },
                    {
                      question: 'Can you help with hosting and domains?',
                      answer: 'Yes — I can set up or migrate your hosting and domains securely.'
                    },
                    {
                      question: 'Can I update my site myself?',
                      answer: 'Absolutely — I build with user-friendly tools and provide training if needed.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-black/30 border border-[#39FF14]/20 rounded-lg p-6 hover:border-[#39FF14]/40 transition-colors">
                      <h3 className="text-[#39FF14] font-bold text-lg mb-4">{faq.question}</h3>
                      <p className="text-[#39FF14]/90 text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            { }
            <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
              <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center">
                <span className="text-[#39FF14]/80 text-sm">contact.sh</span>
              </div>
              <div className="p-8 text-center">
                <div className="flex items-center justify-center mb-8">
                  <span className="text-[#39FF14] mr-2 text-lg">$</span>
                  <span className="text-[#39FF14]/80 text-base">./contact.sh --get-quote</span>
                </div>
                <div className="bg-black/30 border-2 border-[#39FF14]/40 rounded-lg p-8 max-w-md mx-auto">
                  <div className="space-y-6">
                    <h2 className="text-[#39FF14] font-bold text-2xl">Get a Free Quote</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-[#39FF14]/80 text-lg">Email:</span>
                        <a
                          href="mailto:info@connah.com.au"
                          className="text-[#39FF14] text-lg font-semibold underline hover:text-green-300 transition-colors hover:scale-105"
                        >
                          info@connah.com.au
                        </a>
                      </div>
                      <div className="border-t border-[#39FF14]/30 pt-4">
                        <p className="text-[#39FF14]/80 text-base">
                          <span className="text-[#39FF14] font-mono">[SUCCESS]</span> Ready to start your project? Let's chat!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
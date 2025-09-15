import { Link } from 'react-router-dom';

export default function ServicesSnapshotSection() {
  const services = [
    { name: 'Custom websites & web apps' },
    { name: 'WordPress builds & ongoing care' },
    { name: 'E-commerce stores with secure payments' },
    { name: 'Hosting, CI/CD, and deployment pipelines' },
    { name: 'Technical consulting & performance reviews' }
  ];

  return (
    <section className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden">
      <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-6 py-2 flex items-center justify-between">
        <span className="text-[#39FF14]/80 text-sm">services.exe</span>
        <span className="text-[#39FF14]/60 text-xs">pid: 1337</span>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-[#39FF14] mr-2">$</span>
          <span className="text-[#39FF14]/80">./services --list --verbose</span>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-[#39FF14]/90 text-sm leading-relaxed">
            <span className="text-[#39FF14]/60">[INFO]</span> Fast, secure, and easy-to-manage websites — built just for your business.
          </p>
          <p className="text-[#39FF14]/90 text-sm leading-relaxed">
            <span className="text-[#39FF14]/60">[INFO]</span> Simple landing pages to powerful online stores — clear and hassle-free.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-[#39FF14]/80 text-sm font-bold mb-3">Available Services:</p>
          {services.map((service, index) => (
            <div key={index} className="flex items-start space-x-3 group">
              <span className="text-[#39FF14]/60 text-xs mt-1 font-mono">
                [{(index + 1).toString().padStart(2, '0')}]
              </span>
              <div className="flex-1">
                <span className="text-[#39FF14]/90 text-sm group-hover:text-[#39FF14] transition-colors">
                  {service.name}
                </span>
              </div>
              <span className="text-[#39FF14]/40 text-xs">✓</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[#39FF14]/20 pt-4">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 bg-transparent border-2 border-[#39FF14] px-4 py-2 rounded text-[#39FF14] text-sm font-mono transition-all duration-300 hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_20px_#39FF14]/60 hover:scale-105"
          >
            <span>&gt;_</span>
            <span>Execute --view-all</span>
          </Link>

          <div className="text-right">
            <p className="text-[#39FF14]/60 text-xs">
              Runtime: 5+ years
            </p>
            <p className="text-[#39FF14]/60 text-xs">
              Status: Active across Australia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
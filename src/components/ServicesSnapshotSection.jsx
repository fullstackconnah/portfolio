import { Link } from 'react-router-dom';

export default function ServicesSnapshotSection() {
  return (
    <section className="mb-14 mt-8 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
      <h2 className="text-2xl font-bold mb-3 text-[#39FF14]">Services</h2>

      <p className="text-[#39FF14]/90 mb-2 leading-relaxed">
        Fast, secure, and easy-to-manage websites — built just for your business.
      </p>

      <p className="text-[#39FF14]/90 mb-4 leading-relaxed">
        Whether you need a simple landing page, a powerful online store, or ongoing site care — I make it clear and hassle-free.
      </p>

      <ul className="list-disc list-inside text-[#39FF14]/90 mb-6 space-y-2">
        <li>Custom websites & web apps</li>
        <li>WordPress builds & ongoing care</li>
        <li>E-commerce stores with secure payments</li>
        <li>Hosting, CI/CD, and deployment pipelines</li>
        <li>Technical consulting & performance reviews</li>
      </ul>

      <Link 
        to="/services"
        className="inline-block border border-[#39FF14] px-6 py-3 rounded transition transform hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_15px_#39FF14] hover:scale-105"
      >
        <span className="mr-2">&gt;_</span> View Full Services
      </Link>

      <p className="text-[#39FF14]/70 text-sm mt-4">
        5+ years of experience — trusted by businesses across Australia.
      </p>
    </section>
  );
}
export default function FinalCTA() {
  return (
    <section className="text-center mt-14 bg-[#0d0d0d] border border-[#39FF14] rounded-lg p-6 shadow-[0_0_10px_#39FF14]">
      <p className="text-[#39FF14]/90 mb-4 text-lg">
        Ready to launch your project? Let’s make it happen.
      </p>
      <a
        href="/contact"
        className="inline-block border border-[#39FF14] px-8 py-4 rounded transition transform hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_15px_#39FF14] hover:scale-105"
      >
        <span className="mr-2">&gt;_</span> Request a Free Quote
      </a>
    </section>
  );
}
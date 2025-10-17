import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { use3DTilt } from '../../hooks/use3DTilt';

export default function ContactTerminal() {
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.3 });
  const [tiltRef, tiltStyle, glareStyle] = use3DTilt({ maxTilt: 5, scale: 1.01 });
  const [showModal, setShowModal] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const email = 'info@connah.com.au';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickSend = () => {
    if (quickMessage.trim()) {
      setForm(prev => ({ ...prev, message: quickMessage }));
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://uplinkmessage-vydrt4666a-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: 'Contact from Homepage' }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');

      setTimeout(() => {
        setForm({ name: '', email: '', message: '' });
        setQuickMessage('');
        setStatus('idle');
        setShowModal(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStatus('idle');
  };

  return (
    <>
      <div
        ref={scrollRef}
        className={`scroll-fade-in ${inView ? 'in-view' : ''} h-full`}
      >
        <div
          ref={tiltRef}
          className="h-full"
          style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
        >
          <section
            className="relative bg-black border border-[#39FF14] rounded-lg shadow-[0_0_20px_#39FF14]/40 font-mono overflow-hidden h-full flex flex-col"
          >
            {/* Glare effect */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                ...glareStyle,
                mixBlendMode: 'overlay',
                zIndex: 100
              }}
            />

            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-4 py-2 flex items-center justify-between relative z-10 pointer-events-none">
              <span className="text-[#39FF14]/80 text-sm">uplink.sh</span>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
                <span className="text-[#39FF14]/60 text-xs">ready</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col space-y-4 relative z-10">
              <div className="flex items-center pointer-events-none">
                <span className="text-[#39FF14] mr-2 text-sm">$</span>
                <span className="text-[#39FF14]/80 text-xs">./quick_connect</span>
              </div>

              {/* Direct Email Section */}
              <div className="space-y-2">
                <div className="text-[#39FF14]/60 text-xs pointer-events-none">{'>'} direct_link</div>
                <div className="bg-[#0f0f0f] border border-[#39FF14]/40 rounded p-3 space-y-2 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#39FF14] text-lg">✉</span>
                      <a
                        href={`mailto:${email}`}
                        className="text-[#39FF14]/90 text-sm hover:text-[#39FF14] hover:underline transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="px-2 py-1 text-xs border border-[#39FF14]/40 rounded hover:border-[#39FF14] hover:bg-[#39FF14]/10 transition-all text-[#39FF14]/80 hover:text-[#39FF14]"
                    >
                      {copied ? '✓ copied' : 'copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Message Section */}
              <div className="flex-1 flex flex-col space-y-2">
                <div className="text-[#39FF14]/60 text-xs pointer-events-none">{'>'} quick_message</div>
                <div className="flex-1 flex flex-col space-y-2 pointer-events-auto">
                  <input
                    type="text"
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuickSend()}
                    className="w-full bg-black/50 border border-[#39FF14]/40 text-[#39FF14] px-3 py-2 text-sm rounded focus:outline-none focus:border-[#39FF14] focus:shadow-[0_0_10px_#39FF14]/30 transition-all duration-300"
                    placeholder="Type a quick message..."
                  />
                  <button
                    onClick={handleQuickSend}
                    disabled={!quickMessage.trim()}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-transparent border border-[#39FF14] px-4 py-2 rounded text-[#39FF14] text-sm font-mono transition-all duration-300 hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_15px_#39FF14]/60 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span>→</span>
                    <span>Send Message</span>
                  </button>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="pt-3 border-t border-[#39FF14]/20 pointer-events-none">
                <div className="text-[#39FF14]/60 text-xs flex items-center justify-between">
                  <span>Avg response: ~6hrs</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse"></span>
                    <span>AVAILABLE</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Full Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-black border-2 border-[#39FF14] rounded-lg shadow-[0_0_40px_#39FF14]/60 max-w-md w-full font-mono">
            {/* Modal Header */}
            <div className="bg-[#1a1a1a] border-b border-[#39FF14]/30 px-4 py-3 flex items-center justify-between">
              <span className="text-[#39FF14] text-sm font-bold">FULL_MESSAGE.exe</span>
              <button
                onClick={handleCloseModal}
                className="text-[#39FF14]/60 hover:text-[#39FF14] transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center space-y-3 py-8">
                  <div className="text-[#39FF14] text-5xl animate-bounce">✓</div>
                  <div className="text-[#39FF14] text-base text-center">
                    Message transmitted successfully!
                  </div>
                  <div className="text-[#39FF14]/60 text-sm text-center">
                    I'll respond within 24 hours
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center mb-4">
                    <span className="text-[#39FF14] mr-2 text-sm">$</span>
                    <span className="text-[#39FF14]/80 text-xs">./send_full_message</span>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[#39FF14]/60 text-xs flex items-center">
                      <span className="mr-2">{'>'}</span>
                      <span>name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-[#39FF14]/40 text-[#39FF14] px-3 py-2 text-sm rounded focus:outline-none focus:border-[#39FF14] focus:shadow-[0_0_10px_#39FF14]/30 transition-all duration-300"
                      placeholder="Your name..."
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-[#39FF14]/60 text-xs flex items-center">
                      <span className="mr-2">{'>'}</span>
                      <span>email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-[#39FF14]/40 text-[#39FF14] px-3 py-2 text-sm rounded focus:outline-none focus:border-[#39FF14] focus:shadow-[0_0_10px_#39FF14]/30 transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label className="text-[#39FF14]/60 text-xs flex items-center">
                      <span className="mr-2">{'>'}</span>
                      <span>message</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-[#39FF14]/40 text-[#39FF14] px-3 py-2 text-sm rounded focus:outline-none focus:border-[#39FF14] focus:shadow-[0_0_10px_#39FF14]/30 transition-all duration-300 resize-none"
                      placeholder="Your message..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-transparent border border-[#39FF14] px-4 py-2.5 rounded text-[#39FF14] text-sm font-mono transition-all duration-300 hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_15px_#39FF14]/60 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="inline-block w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>→</span>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-red-400 text-xs mt-2 text-center">
                        Transmission failed. Please try again.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

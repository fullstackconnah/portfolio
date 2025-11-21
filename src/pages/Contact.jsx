import { useState } from 'react';
import AsciiTitle from '../components/common/AsciiTitle.jsx';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const asciiArt = [
'   __  ______  __    _____   ____ __  _____ __  __',
'  / / / / __ \\/ /   /  _/ | / / //_/ / ___// / / /',
' / / / / /_/ / /    / //  |/ / ,<    \\__ \\/ /_/ / ',
'/ /_/ / ____/ /____/ // /|  / /| |_ ___/ / __  /  ',
'\\____/_/   /_____/___/_/ |_/_/ |_(_)____/_/ /_/   '
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

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
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Connah Trotman | Get a Free Quote</title>
        <meta name="description" content="Get in touch for a free quote on your web development project. Fast response within 24 hours. Email: info@connah.com.au" />
      </Helmet>
      <div className="min-h-screen text-[#39FF14] font-mono px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <AsciiTitle asciiArt={asciiArt} />
        </div>

        <p
          onClick={() => navigate(-1)}
          className="text-green-400 font-mono text-sm underline cursor-pointer hover:text-[#39FF14] transition mb-6"
        >
          &gt; return
        </p>

        <div className="rounded-lg border border-[#39FF14] p-6 md:p-8 shadow-[0_0_25px_#39FF14] bg-black/40 backdrop-blur-md">
          <div className="mb-6">
            <h2 className="text-[#39FF14] text-2xl font-bold mb-2">Let's Work Together</h2>
            <p className="text-[#39FF14]/90 text-lg mb-4">
              Ready to start your project? Fill out the form below and I'll get back to you within 24 hours.
            </p>
            <p className="text-[#39FF14]/50 text-xs font-mono">
              ~/contact $ send-message.sh
            </p>
          </div>
          {status === 'success' ? (
            <div className="text-center p-8">
              <div className="text-6xl mb-4">✓</div>
              <p className="text-[#39FF14] text-xl font-bold mb-2">Message Sent!</p>
              <p className="text-[#39FF14]/80">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#39FF14] text-base font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Sarah Johnson"
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#39FF14] text-base font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g., sarah@example.com"
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#39FF14] text-base font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g., New website project"
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#39FF14] text-base font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#39FF14] text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#2de60d] transition shadow-lg"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && <p className="text-red-400 mt-2">Transmission failed. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

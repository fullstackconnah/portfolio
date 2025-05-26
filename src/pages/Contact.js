import { useState } from 'react';
import AsciiTitle from '../components/AsciiTitle';
import { useNavigate } from 'react-router-dom';

const asciiArt = [
'   __  ______  __    _____   ____ __  _____ __  __',
'  / / / / __ \\/ /   /  _/ | / / //_/ / ___// / / /',
' / / / / /_/ / /    / //  |/ / ,<    \\__ \\/ /_/ / ',
'/ /_/ / ____/ /____/ // /|  / /| |_ ___/ / __  /  ',
'\\____/_/   /_____/___/_/ |_/_/ |_(_)____/_/ /_/   '                                              
]


export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
          <p className="text-sm text-[#39FF14]/80 mb-6">
            guest@connah.dev:~$ <span className="text-[#39FF14]/60">run uplink.sh</span>
          </p>
          {status === 'success' ? (
            <p className="text-[#39FF14]/80">Message transmitted. Awaiting reply...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-1">&gt; name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">&gt; email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">&gt; subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">&gt; message:</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-black border border-[#39FF14]/50 text-[#39FF14] p-2 rounded focus:outline-none focus:border-[#39FF14]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="border border-[#39FF14] text-[#39FF14] px-4 py-2 rounded hover:bg-[#39FF14] hover:text-black transition shadow-[0_0_10px_#39FF14]"
              >
                {status === 'loading' ? 'Transmitting...' : 'Transmit Message'}
              </button>
              {status === 'error' && <p className="text-red-400 mt-2">Transmission failed. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

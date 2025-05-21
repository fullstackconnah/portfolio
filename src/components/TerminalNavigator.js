import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const bootSequence = [
  'Authenticating...',
  'User verified: GUEST',
  'Session ID: 0xC0D3C0NN4H',
  'Loading environment...',
  'Status: Terminal ready. Awaiting input. Type help for commands'
];

const commandList = [
  'help', 'about', 'projects', 'contact', 'login', 'admin',
  'clear', 'history', 'echo', 'cd', 'ls'
];

export default function TerminalNavigator() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [autocompleteMatches, setAutocompleteMatches] = useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);

  useEffect(() => {
    const idxRef = { current: 0 };
    const interval = setInterval(() => {
      if (idxRef.current < bootSequence.length) {
        const line = bootSequence[idxRef.current];
        setLines(prev => [...prev, line]);
        idxRef.current += 1;
      } else {
        clearInterval(interval);
        setIsBootComplete(true);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const escapeHTML = (str) =>
    str.replace(/[&<>"]'/g, match => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match]
    ));

  const commands = {
    help: [
      'Available commands:',
      'about        → Learn more about me',
      'projects     → See my project portfolio',
      'contact      → Get in touch',
      'login        → Admin login screen',
      'admin        → Go to admin dashboard',
      'clear        → Clear the terminal',
      'history      → Show command history',
      'echo [msg]   → Repeat a message',
      'cd [route]   → Navigate to route',
      'ls           → List available routes'
    ],
    about: () => navigate('/about'),
    projects: () => navigate('/projects'),
    contact: () => navigate('/contact'),
    login: () => navigate('/login'),
    admin: () => navigate('/admin'),
    clear: () => setLines(['$']),
    history: () => setLines(prev => [...prev.filter(l => l !== '$'), ...history.map((h, i) => `${i + 1}: ${h}`), '$']),
    ls: () => setLines(prev => [...prev.filter(l => l !== '$'), '> ls', 'about/', 'projects/', 'contact/', 'login/', 'admin/'])
  };

  const handleCommand = (cmd) => {
    const normalized = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(null);

    if (normalized.startsWith('echo ')) {
      const msg = escapeHTML(cmd.slice(5));
      setLines(prev => [...prev.filter(l => l !== '$'), `> ${cmd}`, msg]);
      return;
    }

    if (normalized.startsWith('cd ')) {
      const path = cmd.slice(3).trim();
      setLines(prev => [...prev.filter(l => l !== '$'), `> ${cmd}`, `navigating to /${path}`]);
      navigate(`/${path}`);
      return;
    }

    if (commands[normalized]) {
      if (typeof commands[normalized] === 'function') {
        commands[normalized]();
        setLines(prev => [...prev.filter(l => l !== '$'), `> ${cmd}`]);
      } else {
        setLines(prev => [...prev.filter(l => l !== '$'), `> ${cmd}`, ...commands[normalized]]);
      }
    } else {
      setLines(prev => [...prev.filter(l => l !== '$'), `> ${cmd}`, 'Command not found. Try "help".']);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = input.trim();
      let matches = autocompleteMatches;

      if (autocompleteMatches.length === 0 || !autocompleteMatches[0].startsWith(currentInput)) {
        matches = commandList.filter(cmd => cmd.startsWith(currentInput));
        setAutocompleteMatches(matches);
        setAutocompleteIndex(0);
      }

      if (matches.length > 0) {
        setInput(matches[autocompleteIndex % matches.length]);
        setAutocompleteIndex(prev => prev + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const newIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setInput(history[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      if (history.length > 0 && historyIndex !== null) {
        const newIndex = Math.min(history.length, historyIndex + 1);
        setInput(history[newIndex] || '');
        setHistoryIndex(newIndex >= history.length ? null : newIndex);
      }
    } else {
      setAutocompleteMatches([]);
      setAutocompleteIndex(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
    setAutocompleteMatches([]);
    setAutocompleteIndex(0);
  };

  return (
<div className="bg-black text-[#39FF14] p-3 sm:p-4 border border-[#39FF14] rounded-lg shadow-[0_0_10px_#39FF14] font-mono mt-6 sm:mt-8 h-[40vh] max-h-[50vh] sm:h-[500px] sm:max-h-[500px] overflow-hidden flex flex-col text-xs sm:text-sm">
    <div
    ref={scrollRef}
    className="flex-1 overflow-y-auto whitespace-pre-wrap break-words leading-tight mb-2 pr-2 scrollbar-thin scrollbar-thumb-[#39FF14]/60 scrollbar-track-transparent"
    >
        {lines.map((line, i) => {
          if (line.includes('Type help for commands')) {
            return (
              <div key={i} className="leading-relaxed">
                Status: Terminal ready. Awaiting input. Type{' '}
                <span className="text-[#39FF14] underline animate-pulse font-bold drop-shadow-[0_0_5px_#39FF14]">
                  help
                </span>{' '}
                for commands
              </div>
            );
          }
          return <div key={i} className="leading-relaxed">{line}</div>;
        })}
      </div>

      {isBootComplete && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-[#39FF14]">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-black text-[#39FF14] outline-none flex-1 w-full text-sm sm:text-base"
            autoFocus
          />
        </form>
      )}
    </div>
  );
}

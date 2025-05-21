// components/TerminalNavigator.js
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TerminalNavigator() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState(['Welcome to connah.dev CLI. Type "help" for options.']);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [autocompleteMatches, setAutocompleteMatches] = useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const commandList = [
    'help', 'about', 'projects', 'contact', 'login', 'admin', 'clear', 'history', 'echo', 'cd', 'ls'
  ];

  const escapeHTML = (str) =>
    str.replace(/[&<>"']/g, (match) => (
      {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[match]
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
    clear: () => setLines([]),
    history: () => setLines(prev => [...prev, ...history.map((h, i) => `${i + 1}: ${h}`)]),
    ls: () => setLines(prev => [...prev, '> ls', 'about/', 'projects/', 'contact/', 'login/', 'admin/'])
  };

  const handleCommand = (cmd) => {
    const normalized = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(null);

    if (normalized.startsWith('echo ')) {
      const message = escapeHTML(cmd.slice(5));
      setLines(prev => [...prev, `> ${escapeHTML(cmd)}`, message]);
      return;
    }

    if (normalized.startsWith('cd ')) {
      const path = cmd.slice(3).trim();
      setLines(prev => [...prev, `> ${escapeHTML(cmd)}`, `navigating to /${path}`]);
      navigate(`/${path}`);
      return;
    }

    if (commands[normalized]) {
      if (typeof commands[normalized] === 'function') {
        commands[normalized]();
        setLines(prev => [...prev, `> ${escapeHTML(cmd)}`]);
      } else {
        setLines(prev => [...prev, `> ${escapeHTML(cmd)}`, ...commands[normalized]]);
      }
    } else {
      setLines(prev => [...prev, `> ${escapeHTML(cmd)}`, 'Command not found. Try "help".']);
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
        setAutocompleteIndex((prev) => prev + 1);
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="bg-black text-[#39FF14] p-4 border border-[#39FF14] rounded-lg shadow-[0_0_10px_#39FF14] font-mono mt-8 h-[400px] max-h-[400px] overflow-hidden flex flex-col">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto whitespace-pre-wrap mb-2 pr-2 scrollbar-thin scrollbar-thumb-[#39FF14]/60 scrollbar-track-transparent"
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed">{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-[#39FF14]">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-black text-[#39FF14] outline-none flex-1"
          autoFocus
        />
      </form>
    </div>
  );
}

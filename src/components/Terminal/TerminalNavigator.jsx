import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/TerminalCard.css'

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

const idleMessages = [
  '> scanning subspace noise...',
  '> memory check complete...',
  '> link-layer handshake stabilized...',
  '> buffer overflow averted...',
  '> recalibrating flux node...',
  '> uplink handshake secured...',
  '> entropy levels nominal...',
  '> bypass capacitor warming...',
  '> idle circuit engaged...',
  '> validating memory sectors...',
  '> spectral scan in progress...',
  '> ambient interference within limits...',
  '> harmonizing data pulse...',
  '> neural latency below threshold...'
];

export default function TerminalNavigator({ onReboot, setIsTearing, setIsShattering }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const idleTimer = useRef(null);

  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [autocompleteMatches, setAutocompleteMatches] = useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());


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

  useEffect(() => {
    idleTimer.current = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > 30000) {
        const msg = `[idle] ${idleMessages[Math.floor(Math.random() * idleMessages.length)]}`;
        
        setLines(prev => {
          const lastLine = prev[prev.length - 1];
          if (lastLine && lastLine === msg) return prev;
  
          const nonIdleLines = prev.filter(line => !line.startsWith('[idle]'));
          const recentIdleLines = prev.filter(line => line.startsWith('[idle]')).slice(-1);
          return [...nonIdleLines, ...recentIdleLines, msg];
        });
  
        setLastActivity(now);
      }
    }, 5000);
    return () => clearInterval(idleTimer.current);
  }, [lastActivity]);

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
      'ls           → List available routes',
      'fortune      → Print a nerdy fortune',
      'sudo         → Try it... you won’t',
      'reboot       → Restart terminal',
      'sysinfo      → View system stats',
      'whoami       → Reveal identity',
      'uptime       → Show time since launch',
      'version      → Print OS version'
    ],
    about: () => navigate('/about'),
    projects: () => navigate('/projects'),
    contact: () => navigate('/contact'),
    login: () => navigate('/login'),
    admin: () => navigate('/admin'),
    clear: () => setLines(['$']),
    history: () => setLines(prev => [...prev.filter(l => l !== '$'), ...history.map((h, i) => `${i + 1}: ${h}`), '$']),
    ls: () => setLines(prev => [...prev.filter(l => l !== '$'), '> ls', 'about/', 'projects/', 'contact/', 'login/', 'admin/']),

    whoami: () =>
      setLines(prev => [...prev.filter(l => l !== '$'), '> whoami', 'User: GUEST (conn4h)']),
  
    uptime: () => {
      const seconds = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
      const minutes = Math.floor(seconds / 60);
      const uptime = `${minutes}m ${seconds % 60}s`;
      setLines(prev => [...prev.filter(l => l !== '$'), '> uptime', `Session Uptime: ${uptime}`]);
    },
  
    version: () =>
      setLines(prev => [...prev.filter(l => l !== '$'), '> version', 'ConnahOS v1.0.3']),
  
    sysinfo: () => {
      const info = [
        'System Info:',
        `OS: ConnahOS`,
        `CPU: Quantum Cores (4)`,
        `Memory: 16MB VRAM`,
        `Uptime: ${(Math.floor(performance.now() / 1000))}s`,
        `Theme: Matrix Green`,
        `User: GUEST`
      ];
      setLines(prev => [...prev.filter(l => l !== '$'), '> sysinfo', ...info]);
    },
  
    sudo: () =>
      setLines(prev => [...prev.filter(l => l !== '$'), '> sudo', 'Permission denied. You are not the root.']),
  
    fortune: () => {
      const fortunes = [
        "A bug in the hand is worth two in production.",
        "Commit often, push rarely, regret always.",
        "There is no cloud. It’s just someone else’s computer.",
        "rm -rf / — because you like danger.",
        "You had me at undefined is not a function.",
        "404: Fortune not found."
      ];
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setLines(prev => [...prev.filter(l => l !== '$'), '> fortune', fortune]);
    },
  
    reboot: () => {
      setLines(prev => [...prev.filter(l => l !== '$'), '> reboot', 'System rebooting...']);
      setTimeout(() => {
        if (onReboot) {
          onReboot();
        }
      }, 1000);
    },

    'rm -rf /': () => {
      const fakeFiles = [
        '/boot/initrd.img',
        '/usr/bin/bash',
        '/etc/passwd',
        '/var/www/html',
        '/home/conn4h/portfolio.js',
        '/dev/null',
        '/system32/kernel.sys',
        '/matrix/core.memory',
        '/root/.secrets',
        '/goodbye.txt'
      ];
      
      setLines(prev => [...prev, '> rm -rf /', 'Initiating mass deletion...']);
      
      let index = 0;
      
      function deleteNext() {
        if (index < fakeFiles.length) {
          if (index === 0) {
            setTimeout(() => {
              setIsTearing(true);
              index++;
              deleteNext();
            }, 2000);
          } else {
            index++;
            setTimeout(deleteNext, 500);
          }
          setLines(prev => [...prev, `deleting ${fakeFiles[index]}...`]);

        } else {
          setTimeout(() => {
            setLines([
              '',
              '*** SYSTEM FAILURE ***',
              'Kernel panic: too much swag',
              'Memory leak detected in sector 69',
              '',
              '> rebooting...'
            ]);
            setIsTearing(false);
            setTimeout(() => {
              setIsShattering(true);
              setTimeout(() => {
                setIsShattering(false);
                if (onReboot) onReboot();
              }, 5000);
            }, 1600);
          }, 3000);
        }
      }
      setTimeout(deleteNext, 500);
    }
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

    if (cmd.trim() === 'rm -rf /') {
      commands['rm -rf /']();
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
            const baseClass =
                "leading-relaxed opacity-0 animate-fadeIn";
            const delayStyle = {
                animationDelay: `${i * 0.05}s`,
                animationFillMode: 'forwards'
            };

            if (line === 'Status: Terminal ready. Awaiting input. Type help for commands') {
              return (
                <div
                  key={i}
                  className={`${baseClass}`}
                  style={delayStyle}
                >
                  Status: Terminal ready. Awaiting input. Type{' '}
                  <button
                    type="button"
                    onClick={() => handleCommand('help')}
                    className="text-[#39FF14] underline animate-pulse font-bold drop-shadow-[0_0_5px_#39FF14] hover:brightness-150 focus:outline-none"
                  >
                    help
                  </button>{' '}
                  for commands
                </div>
              );
            }
            return (
                <div
                key={i}
                className={`${baseClass}`}
                style={delayStyle}
                >
                {line}
                </div>
            );
        })}
      </div>

      {isBootComplete && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#39FF14]/40 pt-2 mt-2">
            <span className="text-[#39FF14] font-bold drop-shadow-[0_0_4px_#39FF14]">$</span>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-[#39FF14] outline-none flex-1 border-b border-[#39FF14] placeholder:text-[#39FF14]/40 caret-[#39FF14]"
                placeholder="Enter command..."
                autoFocus
            />
        </form>
      )}
    </div>
  );
}

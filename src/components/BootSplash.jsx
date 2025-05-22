import { useEffect, useState, useRef } from 'react';

const bootSequence = [
  { text: '> sudo init --launch', className: '' },
  { text: 'Booting Connah.dev OS v1.0.3...', className: '' },
  { text: '> systemctl --start modules', className: '' },
  { text: 'Initializing system modules...', className: '' },
  { text: '> echo "Detecting hardware..."', className: '' },
  { text: 'Detecting hardware... OK', className: '' },
  { text: 'Allocating memory... 16384MB OK', className: '' },
  { text: 'Mapping cognitive modules... COMPLETE', className: '' },
  { text: 'Verifying developer profile... FAILED', className: 'text-red-500 animate-pulse' },
  { text: 'Reattempting handshake...', className: '' },
  { text: 'Verifying developer profile... PASSED', className: 'text-[#39FF14]' },
  { text: 'Loading interface...', className: '' },
  { text: 'Finalizing...', className: '' },
  { text: 'Welcome.', className: '' },
];

export default function BootSplash({ onFinish }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    const typeNextLine = () => {
      if (current.current >= bootSequence.length) {
        setProgress(100);
        setTimeout(onFinish, 1000);
        return;
      }

      const delay = Math.floor(Math.random() * 400) + 300;

      setTimeout(() => {
        setLines(prev => [...prev, bootSequence[current.current]]);
        current.current++;

        const totalLines = bootSequence.length;
        const newProgress = Math.floor((current.current / totalLines) * 100);
        setProgress(newProgress);
        typeNextLine();
      }, delay);
    };

    typeNextLine();
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black text-[#39FF14] font-mono p-6 z-[9999] flex flex-col items-center justify-center space-y-6">
      <div className="text-sm sm:text-base max-w-md w-full space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre ${line?.className || ''}`}>
            {line?.text || ''}
          </div>
        ))}
      </div>

      {/* Retro-styled CSS loading bar */}
      <div className="w-full max-w-md mt-4 border border-[#39FF14] bg-black h-4 overflow-hidden relative">
        <div
          className="h-full bg-[#39FF14] transition-all duration-200"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 4px #39FF14, 0 0 8px #39FF14',
          }}
        />
        {/* Optional scanline effect (add keyframes to global CSS if desired) */}
        {/* <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,255,0,0.1) 2px)] animate-[scanline_2s_linear_infinite]" /> */}
      </div>

      <div className="text-xs text-green-400 mt-1 animate-pulse">
        {progress}%
      </div>
    </div>
  );
}
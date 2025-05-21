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
  const totalTime = useRef(0);
  const maxTime = 4000;

  useEffect(() => {
    const typeNextLine = () => {
      if (current.current >= bootSequence.length) {
        setTimeout(onFinish, 1200);
        return;
      }

      const delay = Math.floor(Math.random() * 400) + 400;
      totalTime.current += delay;

      setTimeout(() => {
        setLines(lines => [...lines, bootSequence[current.current]]);
        const newProgress = Math.min(
          Math.round((totalTime.current / maxTime) * 100),
          100
        );
        setProgress(newProgress);

        current.current++;
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

      <div className="w-full max-w-md h-3 border border-[#39FF14] mt-4">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: '#39FF14',
            boxShadow: '0 0 8px #39FF14, inset 0 0 1px #39FF14',
            borderRadius: '2px'
          }}
        />
      </div>

      <div className="text-xs text-green-400 mt-1 animate-pulse">
        {progress}%
      </div>
    </div>
  );
}
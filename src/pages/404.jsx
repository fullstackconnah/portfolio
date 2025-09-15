import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
      <div className="h-screen bg-black text-[#39FF14] font-mono flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold mb-2">[ SYSTEM FAULT ]</h1>
        <p className="mb-4">Unrecognized command or missing file.</p>
        <p className="mb-4">Try <span className="text-green-300">cd /</span> or reboot.</p>
        <Link to="/" className="mt-4 text-sm underline hover:text-green-300">
          Reboot →
        </Link>
      </div>
    );
  }
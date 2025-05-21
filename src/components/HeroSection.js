import TerminalNavigator from './TerminalNavigator';

const asciiArt = [
  '    ______                        __         __         ',
  '   / ____/___  ____  ____  ____ _/ /_   ____/ /__ _   __',
  '  / /   / __ \\/ __ \\/ __ \\/ __ `/ __ \\ / __  / _ \\ | / /',
  ' / /___/ /_/ / / / / / / / /_/ / / / // /_/ /  __/ |/ / ',
  ' \\____/\\____/_/ /_/_/ /_/\\__,_/_/ /_(_)__,_/\\___/|___/  '
];

export default function Hero() {
  return (
    <section className="p-4">
      <div className="w-full px-2 sm:px-4 flex justify-center">
        <pre className="ascii-logo text-[10px] sm:text-sm md:text-base font-mono text-[#39FF14] leading-none whitespace-pre text-center">
          {asciiArt.join('\n')}
        </pre>
      </div>
      <TerminalNavigator />
    </section>
  );
}
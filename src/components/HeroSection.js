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
      <pre className="text-[#39FF14] font-mono text-sm leading-tight mb-4">
        {asciiArt.join('\n')}
      </pre>
      <TerminalNavigator />
    </section>
  );
}
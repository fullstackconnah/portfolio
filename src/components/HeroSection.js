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
      <pre className="text-[10px] sm:text-sm md:text-base lg:text-lg leading-none tracking-tight overflow-x-auto">
        {asciiArt.join('\n')}
      </pre>
      <TerminalNavigator />
    </section>
  );
}
import AsciiTitle from './AsciiTitle';
import TerminalNavigator from './Terminal/TerminalNavigator';

const asciiArt = [
  '    ______                        __         __         ',
  '   / ____/___  ____  ____  ____ _/ /_   ____/ /__ _   __',
  '  / /   / __ \\/ __ \\/ __ \\/ __ `/ __ \\ / __  / _ \\ | / /',
  ' / /___/ /_/ / / / / / / / /_/ / / / // /_/ /  __/ |/ / ',
  ' \\____/\\____/_/ /_/_/ /_/\\__,_/_/ /_(_)__,_/\\___/|___/  '
];

export default function HeroSection({ onReboot, setIsTearing, setIsShattering }) {
  return (
    <section className="p-4 text-[#39FF14] font-mono">
      <AsciiTitle asciiArt={asciiArt} />
      <TerminalNavigator  onReboot={onReboot} setIsTearing={ setIsTearing } setIsShattering={ setIsShattering } />
    </section>
  );
}
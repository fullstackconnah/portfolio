import TerminalNavigator from './TerminalNavigator';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-start min-h-[70vh] text-left relative z-10 px-6 pt-16 md:pt-24">
      <div className="w-full">
        <TerminalNavigator />
      </div>
    </section>
  );
}
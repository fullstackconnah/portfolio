import TerminalNavigator from '../Terminal/TerminalNavigator';

export default function AboutSection({ onReboot, setIsTearing, setIsShattering }) {
  return (
    <section>
      <TerminalNavigator onReboot={onReboot} setIsTearing={setIsTearing} setIsShattering={setIsShattering} />
    </section>
  );
}
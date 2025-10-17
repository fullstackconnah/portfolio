import TerminalNavigator from '../Terminal/TerminalNavigator';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { use3DTilt } from '../../hooks/use3DTilt';

export default function AboutSection({ onReboot, setIsTearing, setIsShattering }) {
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.2 });
  const [tiltRef, tiltStyle, glareStyle] = use3DTilt({ maxTilt: 5, scale: 1.01 });

  return (
    <div
      ref={scrollRef}
      className={`scroll-slide-left ${inView ? 'in-view' : ''}`}
    >
      <div
        ref={tiltRef}
        style={{
          ...tiltStyle,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        <section style={{ position: 'relative', isolation: 'isolate' }}>
          { }
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              ...glareStyle,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <TerminalNavigator onReboot={onReboot} setIsTearing={setIsTearing} setIsShattering={setIsShattering} />
          </div>
        </section>
      </div>
    </div>
  );
}
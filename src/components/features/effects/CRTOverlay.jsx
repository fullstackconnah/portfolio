import { useEffect, useRef } from 'react';

export default function CRTOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawStaticNoise = (time) => {
      const intensity = 0.02 + Math.sin(time * 0.003) * 0.008;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 16) {
        if (Math.random() > 0.98) {
          const noise = Math.random() * 255;
          data[i] = noise;
          data[i + 1] = noise;
          data[i + 2] = noise;
          data[i + 3] = intensity * 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const drawScanlines = (time) => {
      const flicker = Math.random() > 0.95 ? 0.05 : 0;
      const baseOpacity = 0.1 + flicker;

      for (let y = 0; y < height; y += 2) {
        if (Math.random() > 0.998) continue;

        const intensity = baseOpacity + (Math.sin(y * 0.1 + time * 0.001) * 0.02);
        ctx.fillStyle = `rgba(0, 0, 0, ${intensity})`;
        ctx.fillRect(0, y, width, 1);
      }
    };

    let trackingOffset = 0;
    let trackingIntensity = 0.2;
    let horizontalShift = 0;
    let trackingActive = false;
    let trackingDuration = 0;


    const drawTrackingLines = (time) => {

      if (!trackingActive && Math.random() > 0.998) {
        trackingActive = true;
        trackingDuration = 2000 + Math.random() * 3000;
      }

      if (trackingActive) {
        trackingDuration -= 16;
        if (trackingDuration <= 0) {
          trackingActive = false;
        }
      }

      if (!trackingActive) return;

      trackingOffset = (trackingOffset + 0.8) % (height + 100);


      if (Math.random() > 0.995) {
        trackingIntensity = 0.15 + Math.random() * 0.3;
      }


      const topBandHeight = 50 + Math.sin(time * 0.002) * 25;
      const topY = trackingOffset - topBandHeight;


      const chromaticLayers = [
        { offsetX: -3, offsetY: -1, color: [255, 50, 50], opacity: 0.4 * trackingIntensity },
        { offsetX: 0, offsetY: 0, color: [0, 0, 0], opacity: 0.9 * trackingIntensity },
        { offsetX: 3, offsetY: 1, color: [50, 100, 255], opacity: 0.4 * trackingIntensity }
      ];

      chromaticLayers.forEach(layer => {
        ctx.save();
        const displacement = Math.sin(time * 0.005) * 12 + Math.random() * 6;
        ctx.translate(displacement + layer.offsetX, layer.offsetY);

        const gradient = ctx.createLinearGradient(0, topY, 0, topY + topBandHeight);
        const [r, g, b] = layer.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${layer.opacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${layer.opacity})`);
        gradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, ${layer.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, topY, width, topBandHeight);


        if (Math.random() > 0.7) {
          const tearY = topY + Math.random() * topBandHeight;
          const tearDisplace = Math.random() * 30 - 15;
          ctx.save();
          ctx.translate(tearDisplace, 0);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${layer.opacity * 0.6})`;
          ctx.fillRect(0, tearY, width, 3);
          ctx.restore();
        }

        ctx.restore();
      });


      for (let i = 0; i < 150; i++) {
        const x = Math.random() * width;
        const y = topY + Math.random() * topBandHeight;
        const size = Math.random() * 3 + 1;
        const noiseColor = Math.random() > 0.6 ?
          `rgba(255, 255, 255, ${Math.random() * 0.4})` :
          `rgba(0, 255, 100, ${Math.random() * 0.2})`;
        ctx.fillStyle = noiseColor;
        ctx.fillRect(x, y, size, size);
      }


      const bottomStart = height - 70;
      const numBottomLines = 3 + Math.floor(Math.random() * 3);

      for (let i = 0; i < numBottomLines; i++) {
        const y = bottomStart + (i * 4) + Math.sin(time * 0.003 + i) * 3;
        const lineHeight = 2 + Math.random() * 4;
        const displacement = Math.sin(time * 0.004 + i * 0.5) * 10;
        const verticalJitter = Math.random() * 2 - 1;

        ctx.save();
        ctx.translate(displacement, verticalJitter);



        ctx.fillStyle = `rgba(255, 100, 100, ${0.08 + Math.random() * 0.08})`;
        ctx.fillRect(-1, y, width, lineHeight);


        const opacity = 0.25 + Math.random() * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(0, y, width, lineHeight);


        ctx.fillStyle = `rgba(100, 150, 255, ${0.08 + Math.random() * 0.08})`;
        ctx.fillRect(1, y, width, lineHeight);


        for (let x = 0; x < width; x += 8) {
          if (Math.random() > 0.65) {
            const color = Math.random() > 0.5 ?
              `rgba(255, 255, 255, 0.4)` :
              `rgba(0, 255, 150, 0.3)`;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 2, lineHeight);
          }
        }

        ctx.restore();
      }
    };

    let brightnessFlicker = 1.0;

    const drawTapeWarping = (time) => {
      if (Math.random() > 0.998) {
        brightnessFlicker = 0.7 + Math.random() * 0.3;
      } else {
        brightnessFlicker = Math.min(1.0, brightnessFlicker + 0.02);
      }

      if (brightnessFlicker < 1.0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${1.0 - brightnessFlicker})`;
        ctx.fillRect(0, 0, width, height);
      }


      if (Math.random() > 0.997) {
        horizontalShift = (Math.random() - 0.5) * 20;
      } else {
        horizontalShift *= 0.9;
      }


      const waveAmplitude = 2 + Math.sin(time * 0.001) * 1;
      const waveFrequency = 0.01;

      for (let y = 0; y < height; y += 4) {
        const waveOffset = Math.sin(y * waveFrequency + time * 0.002) * waveAmplitude;
        const totalOffset = waveOffset + horizontalShift;

        if (Math.abs(totalOffset) > 0.5) {

          ctx.fillStyle = `rgba(0, 0, 0, ${Math.abs(totalOffset) * 0.02})`;
          ctx.fillRect(totalOffset > 0 ? 0 : width + totalOffset, y, Math.abs(totalOffset), 4);
        }
      }
    };


    const drawVignette = () => {

      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.9, 'rgba(0, 0, 0, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);


      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, 3);
      ctx.fillRect(0, height - 3, width, 3);
      ctx.fillRect(0, 0, 3, height);
      ctx.fillRect(width - 3, 0, 3, height);
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      drawStaticNoise(time);
      drawScanlines(time);
      drawTrackingLines(time);
      drawTapeWarping(time);
      drawVignette();

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      { }
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          backdropFilter: 'brightness(1.0)',
          WebkitBackdropFilter: 'brightness(1.0)',
        }}
      />

      { }
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0.6,
        }}
      />
    </>
  );
}

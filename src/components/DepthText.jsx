import React, { useEffect, useRef, useState, useMemo } from 'react';
import './DepthText.css';

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return { r: 11, g: 23, b: 36 };
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
};

const interpolateColor = (color1, color2, factor) => {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));
  return `rgb(${r}, ${g}, ${b})`;
};

export default function DepthText({
  text = 'COMPLEX DATA.',
  layers = 26,
  depth = 1.8,
  faceColor = '#0B1724',
  depthColor = '#00A8D6',
  tilt = 3.5,
  pointerTracking = true,
  smoothing = 0.12,
  perspective = 1100,
  autoOrbit = false,
  orbitSpeed = 0,
  fontSize = 'clamp(2.2rem, 5.5vw, 5.5rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  shadow = true,
  className = '',
  style
}) {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Pre-calculate layer colors and transform offsets
  const layerData = useMemo(() => {
    const items = [];
    for (let i = 0; i < layers; i++) {
      const progress = i / Math.max(1, layers - 1);
      const isFront = i === layers - 1;
      const color = isFront ? faceColor : interpolateColor(depthColor, faceColor, progress);
      const zOffset = (i - (layers - 1)) * depth;
      items.push({
        index: i,
        isFront,
        color,
        zOffset
      });
    }
    return items;
  }, [layers, depth, faceColor, depthColor]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return undefined;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) return undefined;

    let animationFrame = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let orbitAngle = 0;

    const handlePointerMove = (e) => {
      if (!pointerTracking) return;
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized delta from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Invert Y for standard natural 3D tilt
      targetRotateX = Math.max(-tilt, Math.min(tilt, -deltaY * tilt));
      targetRotateY = Math.max(-tilt, Math.min(tilt, deltaX * tilt));
    };

    const handlePointerLeave = () => {
      if (!autoOrbit) {
        targetRotateX = 0;
        targetRotateY = 0;
      }
    };

    const updateStage = () => {
      if (autoOrbit) {
        orbitAngle += orbitSpeed * 0.02;
        targetRotateX = Math.sin(orbitAngle) * (tilt * 0.5);
        targetRotateY = Math.cos(orbitAngle) * tilt;
      }

      // Smooth lerp towards target tilt
      currentRotateX += (targetRotateX - currentRotateX) * smoothing;
      currentRotateY += (targetRotateY - currentRotateY) * smoothing;

      if (stage) {
        stage.style.transform = `rotateX(${currentRotateX.toFixed(3)}deg) rotateY(${currentRotateY.toFixed(3)}deg)`;
      }

      animationFrame = window.requestAnimationFrame(updateStage);
    };

    window.addEventListener('pointermove', handlePointerMove);
    wrapper.addEventListener('pointerleave', handlePointerLeave);
    animationFrame = window.requestAnimationFrame(updateStage);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      wrapper.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [tilt, pointerTracking, smoothing, autoOrbit, orbitSpeed]);

  return (
    <div
      ref={wrapperRef}
      className={`depth-text-wrapper ${className}`}
      style={{
        perspective: `${perspective}px`,
        fontSize,
        fontWeight,
        fontFamily,
        ...style
      }}
      aria-label={text}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="depth-text-sr">{text}</span>
      <div ref={stageRef} className="depth-text-stage" aria-hidden="true">
        {layerData.map((layer) => (
          <span
            key={layer.index}
            className={`depth-text-layer ${layer.isFront ? 'depth-text-layer--front' : ''}`}
            style={{
              color: layer.color,
              transform: `translate3d(0, 0, ${layer.zOffset}px)`,
              textShadow:
                layer.isFront && shadow
                  ? '0 6px 18px rgba(0, 168, 214, 0.18), 0 2px 4px rgba(11, 23, 36, 0.08)'
                  : 'none'
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

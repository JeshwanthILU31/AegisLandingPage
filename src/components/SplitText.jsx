import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text = '',
  tag: Tag = 'p',
  className = '',
  style = {},
  splitType = 'words', // 'words' | 'chars'
  delay = 50,
  duration = 0.75,
  ease = 'power3.out',
  from = { opacity: 0, y: 28 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'center',
  onLetterAnimationComplete
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const elements = container.querySelectorAll('.split-item');

    if (reducedMotion) {
      gsap.set(elements, to);
      return;
    }

    // Initial state setup
    gsap.set(elements, from);

    // Trigger animation immediately if visible in viewport or via ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            if (onLetterAnimationComplete) onLetterAnimationComplete();
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [text, delay, duration, ease, from, to, onLetterAnimationComplete]);

  // Render split items based on splitType
  const renderContent = () => {
    if (splitType === 'chars') {
      const words = text.split(' ');
      return words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="split-item inline-block will-change-transform">
              {char}
            </span>
          ))}
        </span>
      ));
    }

    // Default 'words' splitting
    const words = text.split(' ');
    return words.map((word, index) => (
      <span
        key={index}
        className="split-item inline-block will-change-transform mr-[0.25em] last:mr-0"
      >
        {word}
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef}
      className={`split-text ${className}`}
      style={{ textAlign, display: Tag === 'span' ? 'inline-block' : 'block', ...style }}
      aria-label={text}
    >
      <span className="sr-only absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0">
        {text}
      </span>
      <span aria-hidden="true" className="inline-block">
        {renderContent()}
      </span>
    </Tag>
  );
}

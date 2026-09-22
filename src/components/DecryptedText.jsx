import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view', // 'view' | 'hover'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolledIntoView, setIsScrolledIntoView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextChar = (char) => {
      if (char === ' ') return ' ';
      if (useOriginalCharsOnly) {
        const chars = Array.from(text).filter(c => c !== ' ');
        return chars[Math.floor(Math.random() * chars.length)] || char;
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const shouldAnimate =
      (animateOn === 'view' && isScrolledIntoView && !hasAnimated) ||
      (animateOn === 'hover' && isHovering);

    if (shouldAnimate) {
      const textArr = Array.from(text);
      const len = textArr.length;

      interval = setInterval(() => {
        if (sequential) {
          const progress = Math.min(len, Math.floor(currentIteration / 2));
          const result = textArr.map((char, index) => {
            if (char === ' ') return ' ';
            if (revealDirection === 'start' && index < progress) return char;
            if (revealDirection === 'end' && index >= len - progress) return char;
            return getNextChar(char);
          });
          setDisplayText(result.join(''));
          if (progress >= len) {
            clearInterval(interval);
            if (animateOn === 'view') setHasAnimated(true);
          }
        } else {
          if (currentIteration >= maxIterations) {
            setDisplayText(text);
            clearInterval(interval);
            if (animateOn === 'view') setHasAnimated(true);
          } else {
            setDisplayText(
              textArr.map((char) => (char === ' ' ? ' ' : getNextChar(char))).join('')
            );
          }
        }
        currentIteration++;
      }, speed);
    } else if (!isHovering && animateOn === 'hover') {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    isHovering,
    isScrolledIntoView,
    hasAnimated,
    animateOn,
  ]);

  useEffect(() => {
    if (animateOn !== 'view') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrolledIntoView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animateOn]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </motion.span>
  );
}

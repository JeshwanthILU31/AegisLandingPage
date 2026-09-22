import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  suffix = '+',
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof delay === 'number' && delay > 0) {
        const timeout = setTimeout(() => {
          motionValue.set(direction === 'down' ? from : to);
        }, delay * 1000);
        return () => clearTimeout(timeout);
      }
      motionValue.set(direction === 'down' ? from : to);
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const hasDecimals = to % 1 !== 0;
        const formatted = Intl.NumberFormat('en-US', {
          minimumFractionDigits: hasDecimals ? 1 : 0,
          maximumFractionDigits: hasDecimals ? 1 : 0,
        }).format(Number(latest.toFixed(hasDecimals ? 1 : 0)));

        ref.current.textContent = separator
          ? `${formatted.replace(/,/g, separator)}${suffix}`
          : `${formatted}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator, to, suffix]);

  return <span className={className} ref={ref}>{from}{suffix}</span>;
}

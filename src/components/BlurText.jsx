import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function BlurText({
  text = '',
  delay = 0.05,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top', // 'top' | 'bottom'
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -16 : 16,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-flex flex-wrap ${className}`}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block mr-[0.25em]"
        >
          {el === ' ' ? '\u00A0' : el}
        </motion.span>
      ))}
    </motion.span>
  );
}

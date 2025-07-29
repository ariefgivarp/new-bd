'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
      });
    }

    return () => {
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScrollWrapper;

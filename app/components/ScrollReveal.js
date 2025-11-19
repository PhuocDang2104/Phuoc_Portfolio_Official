'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length === 0) return;

    // Nếu browser không có IntersectionObserver → show hết luôn
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => {
        el.classList.add('reveal-show');
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-show');
            obs.unobserve(entry.target); // chỉ chơi 1 lần cho mỗi element
          }
        });
      },
      { threshold: 0.2 },
    );

    revealEls.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  // Không render gì, chỉ side-effect
  return null;
}

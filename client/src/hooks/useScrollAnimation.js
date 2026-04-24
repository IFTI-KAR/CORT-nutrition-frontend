import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  useEffect(() => {
    // Refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const revealFromBelow = (targets, options = {}) => {
    gsap.from(targets, {
      opacity: 0,
      y: 70,
      duration: 1.1,
      ease: "power3.out",
      stagger: options.stagger || 0,
      scrollTrigger: {
        trigger: options.trigger || targets,
        start: "top 85%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        ...options.scrollTrigger,
      },
    });
  };

  const revealFromLeft = (target, options = {}) => {
    gsap.from(target, {
      opacity: 0,
      x: -80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: options.trigger || target,
        start: "top 80%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        ...options.scrollTrigger,
      },
    });
  };

  const revealFromRight = (target, options = {}) => {
    gsap.from(target, {
      opacity: 0,
      x: 80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: options.trigger || target,
        start: "top 80%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        ...options.scrollTrigger,
      },
    });
  };

  const parallax = (target, yPercent = -20) => {
    gsap.to(target, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  };

  return { revealFromBelow, revealFromLeft, revealFromRight, parallax };
}

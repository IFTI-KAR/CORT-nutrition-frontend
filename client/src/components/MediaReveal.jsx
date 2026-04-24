import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function MediaReveal({ src, type = "image", alt = "", className = "", poster = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  if (type === "video") {
    return (
      <video
        ref={ref}
        className={`warm-filter ${className}`}
        src={src}
        autoPlay={false}
        muted
        playsInline
        loop
        poster={poster}
        style={{ opacity: 0 }}
      />
    );
  }

  return (
    <img
      ref={ref}
      className={`warm-filter ${className}`}
      src={src}
      alt={alt}
      loading="lazy"
      style={{ opacity: 0 }}
    />
  );
}

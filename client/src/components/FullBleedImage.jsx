import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FullBleedImage() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ken Burns parallax
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Quote fade in
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="full-bleed"
      style={{
        height: "80vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        ref={imgRef}
        src="/media/images/nutrition-banner.jpg"
        alt="Corn field at dusk — a civilization defined by what it grows"
        className="warm-filter"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "115%",
          objectFit: "cover",
          top: "-7.5%",
        }}
      />

      <div className="full-bleed-quote">
        <div ref={quoteRef} style={{ textAlign: "center", padding: "0 2rem", maxWidth: "800px" }}>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              color: "var(--silk-cream)",
              lineHeight: 1.3,
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            "A civilization is judged<br />by what it grows."
          </p>
          <span
            className="mono-label"
            style={{ color: "var(--corn-gold)", letterSpacing: "0.3em" }}
          >
            — Editorial Attribution
          </span>
        </div>
      </div>
    </section>
  );
}

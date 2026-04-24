import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function CornOrigin() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        x: -80,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.from(imgRef.current, {
        opacity: 0,
        x: 80,
        scale: 0.96,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Parallax on image
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="section"
      style={{ background: "var(--soft-white)", overflow: "hidden" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        {/* Text block */}
        <div
          ref={textRef}
          style={{
            padding: "6rem 5rem 6rem 8vw",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <span className="mono-label" style={{ color: "var(--corn-gold)" }}>
            01 / Origin
          </span>
          <span className="gold-divider" />
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--deep-soil)" }}
          >
            Born in the Americas
          </h2>
          <p className="body-text">
            Over 9,000 years ago, in the fertile valleys of what is now southern Mexico, indigenous farmers
            transformed a wild grass called <em>teosinte</em> into one of the world's most vital crops. Through
            millennia of careful cultivation, corn — or <em>maize</em> — became the lifeblood of entire
            civilizations, from the Aztec Empire to the Maya.
          </p>
          <p className="body-text">
            Today, corn is grown on every continent except Antarctica, feeding billions of people and powering
            economies. Its journey from a humble grass to a global staple is one of agriculture's greatest stories.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <span
              className="mono-label"
              style={{ color: "var(--burnt-amber)", fontSize: "0.8rem" }}
            >
              9,000+ years of cultivation
            </span>
          </div>
        </div>

        {/* Image */}
        <div
          style={{
            height: "100%",
            minHeight: "100vh",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            ref={imgRef}
            src="/media/images/hero-corn-field.jpg"
            alt="Vast corn field at golden hour"
            className="warm-filter"
            style={{
              width: "100%",
              height: "115%",
              objectFit: "cover",
              position: "absolute",
              top: "-7.5%",
              left: 0,
            }}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <style>{`
        @media (max-width: 768px) {
          #origin > div {
            grid-template-columns: 1fr !important;
          }
          #origin > div > div:first-child {
            padding: 4rem 2rem !important;
          }
          #origin > div > div:last-child {
            min-height: 60vw !important;
            height: 60vw !important;
          }
        }
      `}</style>
    </section>
  );
}

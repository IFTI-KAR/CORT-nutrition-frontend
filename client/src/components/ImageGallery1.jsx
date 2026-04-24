import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ImageGallery1() {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const label1Ref = useRef(null);
  const label2Ref = useRef(null);
  const label3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = [img1Ref.current, img2Ref.current, img3Ref.current];
      const labels = [label1Ref.current, label2Ref.current, label3Ref.current];

      imgs.forEach((img, i) => {
        gsap.from(img, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1.1,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: img,
            start: "top 88%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      labels.forEach((label, i) => {
        gsap.from(label, {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          duration: 0.9,
          delay: i * 0.2 + 0.3,
          scrollTrigger: {
            trigger: label,
            start: "top 90%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery-1"
      className="section"
      style={{ background: "var(--silk-cream)", padding: "8rem 6vw", minHeight: "100vh" }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "0.5rem" }}>05 / Gallery</span>
        <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          The Anatomy of a Kernel
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Large image — left */}
        <div style={{ gridRow: "span 2", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
          <img
            ref={img1Ref}
            src="/media/images/corn-closeup-01.jpg"
            alt="Close-up of golden corn kernels"
            className="warm-filter"
            style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "500px" }}
          />
          <span
            ref={label1Ref}
            className="mono-label"
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              color: "var(--silk-cream)",
              background: "rgba(26,18,8,0.5)",
              backdropFilter: "blur(8px)",
              padding: "0.4rem 0.8rem",
            }}
          >
            Texture
          </span>
        </div>

        {/* Medium image — right top */}
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px", marginTop: "4rem" }}>
          <img
            ref={img2Ref}
            src="/media/images/corn-closeup-02.jpg"
            alt="Corn in sunlit field"
            className="warm-filter"
            style={{ width: "100%", height: "280px", objectFit: "cover" }}
          />
          <span
            ref={label2Ref}
            className="mono-label"
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              color: "var(--silk-cream)",
              background: "rgba(26,18,8,0.5)",
              backdropFilter: "blur(8px)",
              padding: "0.4rem 0.8rem",
            }}
          >
            Color
          </span>
        </div>

        {/* Small image — right bottom */}
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "2px" }}>
          <img
            ref={img3Ref}
            src="/media/images/corn-varieties.jpg"
            alt="Diversity of corn varieties"
            className="warm-filter"
            style={{ width: "100%", height: "220px", objectFit: "cover" }}
          />
          <span
            ref={label3Ref}
            className="mono-label"
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              color: "var(--silk-cream)",
              background: "rgba(26,18,8,0.5)",
              backdropFilter: "blur(8px)",
              padding: "0.4rem 0.8rem",
            }}
          >
            Diversity
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #gallery-1 > div:last-child { grid-template-columns: 1fr !important; }
          #gallery-1 > div:last-child > div:first-child { grid-row: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

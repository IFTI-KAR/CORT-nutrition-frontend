import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATIC_VARIETIES = [
  { _id: "1", name: "Yellow Sweet Corn", color: "#F5C842", origin: "United States", flavorProfile: "Sweet, juicy, tender — the classic summer corn", image: "corn-varieties.jpg" },
  { _id: "2", name: "Blue Corn", color: "#4A5A8A", origin: "Southwestern USA & Mexico", flavorProfile: "Earthy, slightly nutty with a dense texture", image: "corn-closeup-01.jpg" },
  { _id: "3", name: "White Corn", color: "#E8E0D0", origin: "Mexico & Central America", flavorProfile: "Mild, starchy with a subtle sweetness", image: "corn-closeup-02.jpg" },
  { _id: "4", name: "Purple Corn", color: "#5B2D8E", origin: "Peru & Andes", flavorProfile: "Bold, berry-like with deep antioxidant notes", image: "corn-harvest.jpg" },
];

export default function Varieties({ varietiesData }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const items = varietiesData?.length ? varietiesData : STATIC_VARIETIES;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.parentElement.offsetWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Title
      gsap.from(sectionRef.current.querySelector(".varieties-title"), {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="varieties"
      style={{
        background: "var(--deep-soil)",
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <div
        className="varieties-title"
        style={{
          padding: "0 8vw",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "baseline",
          gap: "2rem",
          flexShrink: 0,
        }}
      >
        <span className="eyebrow">06 / Varieties</span>
        <h2
          className="section-title"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "var(--silk-cream)",
          }}
        >
          Four Faces of Corn
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div style={{ overflow: "hidden", flexShrink: 0 }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            paddingLeft: "8vw",
            paddingRight: "8vw",
            willChange: "transform",
          }}
        >
          {items.map((variety) => (
            <div key={variety._id} className="variety-card" style={{ borderTop: `3px solid ${variety.color}` }}>
              <img
                src={`/media/images/${variety.image}`}
                alt={variety.name}
              />
              <div className="variety-card-overlay">
                <span className="mono-label" style={{ color: variety.color, marginBottom: "0.75rem" }}>
                  {variety.origin}
                </span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--silk-cream)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.1,
                  }}
                >
                  {variety.name}
                </h3>
                <p className="body-text" style={{ color: "rgba(250,243,224,0.7)", fontSize: "0.95rem" }}>
                  {variety.flavorProfile}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "1.5rem 8vw 0",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexShrink: 0,
        }}
      >
        <span className="mono-label" style={{ color: "var(--muted-sage)" }}>
          Scroll to explore →
        </span>
      </div>
    </section>
  );
}

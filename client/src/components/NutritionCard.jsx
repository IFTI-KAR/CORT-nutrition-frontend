import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATIC_NUTRITION = {
  per100g: {
    calories: 86,
    protein: 3.2,
    fiber: 2.4,
    vitaminC: 6.8,
    folate: 42,
    potassium: 270,
  },
};

const STATS = [
  { key: "calories", label: "Calories", unit: "kcal", value: 86, icon: "🔥" },
  { key: "protein", label: "Protein", unit: "g", value: 3.2, icon: "💪" },
  { key: "fiber", label: "Fiber", unit: "g", value: 2.4, icon: "🌾" },
  { key: "vitaminC", label: "Vitamin C", unit: "mg", value: 6.8, icon: "🍋" },
  { key: "folate", label: "Folate", unit: "mcg", value: 42, icon: "🧬" },
  { key: "potassium", label: "Potassium", unit: "mg", value: 270, icon: "⚡" },
];

export default function NutritionFacts({ nutritionData }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const counterRefs = useRef([]);
  const animated = useRef(false);

  const stats = nutritionData?.per100g
    ? STATS.map((s) => ({ ...s, value: nutritionData.per100g[s.key] ?? s.value }))
    : STATS;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Cards stagger
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Counter animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        once: true,
        onEnter: () => {
          if (animated.current) return;
          animated.current = true;
          counterRefs.current.forEach((el, i) => {
            if (!el) return;
            const target = stats[i].value;
            const isDecimal = target % 1 !== 0;
            gsap.to({ val: 0 }, {
              val: target,
              duration: 2.2,
              ease: "power2.out",
              onUpdate() {
                el.textContent = isDecimal
                  ? this.targets()[0].val.toFixed(1)
                  : Math.ceil(this.targets()[0].val);
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      id="nutrition"
      className="section"
      style={{ background: "var(--deep-soil)", padding: "8rem 8vw" }}
    >
      {/* Title */}
      <div ref={titleRef} style={{ marginBottom: "5rem", textAlign: "center" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "1rem" }}>
          04 / Nutrition
        </span>
        <h2
          className="section-title"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "var(--silk-cream)" }}
        >
          What's Inside
        </h2>
        <span className="gold-divider" style={{ margin: "1.5rem auto 0" }} />
        <p
          className="body-text"
          style={{ color: "var(--muted-sage)", marginTop: "1.5rem", maxWidth: "500px", margin: "1.5rem auto 0" }}
        >
          Per 100g of fresh sweet corn
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            ref={(el) => (cardsRef.current[i] = el)}
            className="nutrition-card"
            style={{
              gridColumn: i === 0 ? "span 2" : "span 1",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>{stat.icon}</span>
              <span className="mono-label" style={{ color: "var(--muted-sage)" }}>per 100g</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
              <span
                className="counter-value"
                ref={(el) => (counterRefs.current[i] = el)}
              >
                0
              </span>
              <span
                className="mono-label"
                style={{ color: "var(--burnt-amber)", fontSize: "0.85rem" }}
              >
                {stat.unit}
              </span>
            </div>
            <p
              className="mono-label"
              style={{ color: "var(--silk-cream)", marginTop: "0.75rem", fontSize: "0.8rem" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #nutrition .nutrition-card:first-child { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

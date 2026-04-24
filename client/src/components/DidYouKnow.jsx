import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function DidYouKnow() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const subRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main statement letter-by-letter
      gsap.from(textRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Supporting text
      gsap.from(subRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Counter for 4000+
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: 4000,
            duration: 2.5,
            ease: "power2.out",
            onUpdate() {
              if (numRef.current) {
                numRef.current.textContent = Math.ceil(this.targets()[0].val).toLocaleString() + "+";
              }
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="did-you-know"
      className="section grain-overlay"
      style={{
        background: "var(--corn-gold)",
        padding: "8rem 8vw",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span className="mono-label" style={{ color: "var(--deep-soil)", opacity: 0.6, display: "block", marginBottom: "3rem" }}>
          10 / Did You Know
        </span>

        {/* Giant number */}
        <div
          ref={numRef}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(5rem, 18vw, 16rem)",
            fontWeight: 900,
            color: "var(--deep-soil)",
            lineHeight: 0.9,
            marginBottom: "2rem",
            opacity: 0.15,
            position: "absolute",
            right: "5vw",
            top: "50%",
            transform: "translateY(-50%)",
            userSelect: "none",
          }}
        >
          0+
        </div>

        <h2
          ref={textRef}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            fontWeight: 900,
            color: "var(--deep-soil)",
            lineHeight: 1.0,
            maxWidth: "800px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Corn is in{" "}
          <span style={{ fontStyle: "italic", textDecoration: "underline", textDecorationColor: "rgba(26,18,8,0.3)" }}>
            4,000+ products
          </span>{" "}
          you use every single day.
        </h2>

        <div
          ref={subRef}
          style={{ marginTop: "3rem", maxWidth: "560px", position: "relative", zIndex: 1 }}
        >
          <p
            className="body-text"
            style={{ color: "rgba(26,18,8,0.65)", fontSize: "1.1rem" }}
          >
            From breakfast cereals to biofuel, from adhesives to pharmaceuticals — corn's reach into modern
            civilization is staggering. It's in your toothpaste, your car, your clothes, and your medicine cabinet.
          </p>
          <span className="gold-divider" style={{ background: "var(--deep-soil)", opacity: 0.3, marginTop: "2rem" }} />
        </div>
      </div>
    </section>
  );
}

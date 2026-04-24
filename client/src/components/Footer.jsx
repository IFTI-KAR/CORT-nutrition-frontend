export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background: "var(--deep-soil)",
        padding: "6rem 8vw 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corn SVG */}
      <svg
        className="footer-stalk"
        viewBox="0 0 100 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M50 300 Q50 200 50 150 Q30 120 20 80 Q50 100 50 150 Q70 120 80 80 Q50 100 50 150 Q50 50 50 0" stroke="#F5C842" strokeWidth="3" fill="none" />
        <ellipse cx="50" cy="130" rx="25" ry="50" stroke="#F5C842" strokeWidth="2" fill="none" />
        <line x1="40" y1="100" x2="60" y2="160" stroke="#F5C842" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="115" x2="65" y2="145" stroke="#F5C842" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="130" x2="65" y2="130" stroke="#F5C842" strokeWidth="1" opacity="0.5" />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Logo & tagline */}
        <div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              color: "var(--corn-gold)",
              lineHeight: 0.9,
              marginBottom: "1rem",
            }}
          >
            CORN
          </h2>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              color: "var(--muted-sage)",
              fontSize: "1.1rem",
            }}
          >
            From Soil to Sustenance
          </p>
        </div>

        {/* Nav row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2rem",
            borderTop: "1px solid rgba(245,200,66,0.15)",
            paddingTop: "2rem",
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {["Origin", "Nutrition", "Varieties", "Benefits", "Recipes"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="mono-label"
                    style={{
                      color: "var(--muted-sage)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      fontSize: "0.7rem",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--corn-gold)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--muted-sage)")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ textAlign: "right" }}>
            <p
              className="mono-label"
              style={{ color: "rgba(125,144,112,0.5)", fontSize: "0.6rem", lineHeight: 1.8 }}
            >
              Nutrition data: USDA FoodData Central
            </p>
            <p
              className="mono-label"
              style={{ color: "rgba(125,144,112,0.5)", fontSize: "0.6rem" }}
            >
              © {year} CORN. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

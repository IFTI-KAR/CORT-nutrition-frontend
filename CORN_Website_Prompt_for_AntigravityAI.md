# 🌽 CORN — Full-Stack Scrolling Experience
## Complete Build Prompt & Documentation for Antigravity AI

---

## PROJECT OVERVIEW

Build a **stunning, fully scrolling MERN stack website** about **Corn and its Nutrition**. The site uses a cinematic scroll-driven animation system where images and videos provided by the client appear **one by one** as the user scrolls down the page. The priority is an **exceptional, award-worthy frontend** — think Awwwards, CSS Design Awards level — paired with a clean Express/MongoDB backend.

---

## TECH STACK

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Animation | GSAP (GreenSock) + ScrollTrigger |
| Styling | Tailwind CSS + custom CSS variables |
| Video | HTML5 `<video>` with lazy loading |
| Image Optimization | React lazy loading + Intersection Observer |
| Fonts | Google Fonts / Adobe Fonts (see Typography section) |
| State | React Context API or Zustand |
| Routing | React Router v6 |

---

## AESTHETIC DIRECTION

**Theme:** Organic Luxury — earthy gold, deep forest green, warm cream. NOT a generic food site. Think a **high-fashion editorial spread** about corn.

**Mood:** Cinematic. Slow. Deliberate. Every scroll reveals something beautiful.

**Reference vibes:** Editorial fashion magazines, luxury olive oil brands, botanical encyclopedias.

### Color Palette (CSS Variables)
```css
:root {
  --corn-gold: #F5C842;
  --husk-green: #3B5323;
  --silk-cream: #FAF3E0;
  --burnt-amber: #C8702A;
  --deep-soil: #1A1208;
  --soft-white: #FEFDF8;
  --muted-sage: #7D9070;
  --translucent-gold: rgba(245, 200, 66, 0.12);
}
```

### Typography
- **Display / Hero Font:** `Freight Display Pro` or `Canela` — serif with editorial elegance
- **Section Headers:** `Playfair Display` (Google Fonts fallback) — bold, high contrast
- **Body Copy:** `Lora` — warm, readable serif
- **Accent / Labels:** `Space Mono` or `DM Mono` — monospace for data/nutrition facts
- **NO Inter, NO Roboto, NO Arial**

---

## FRONTEND ARCHITECTURE

### Page Sections (scroll order)

Each section is a **full-viewport panel** that activates on scroll.

```
1.  HERO              — Full-screen video autoplay, title fade-in
2.  CORN ORIGIN       — Split screen: text left, image right (parallax)
3.  VIDEO SCENE 1     — Cinematic full-width video with caption overlay
4.  NUTRITION FACTS   — Animated counter cards (protein, fiber, vitamins)
5.  IMAGE GALLERY 1   — Staggered image reveal (3 images pop in sequence)
6.  VARIETIES         — Horizontal scroll carousel (Yellow, Blue, White, Purple corn)
7.  VIDEO SCENE 2     — Second video, reversed layout
8.  HEALTH BENEFITS   — Vertical timeline with icons
9.  IMAGE GALLERY 2   — Full-bleed editorial image with text overlay
10. DID YOU KNOW      — Bold typography statement screen
11. RECIPE TEASER     — Card grid (3 recipes from DB)
12. OUTRO / FOOTER    — Logo, credits, sources
```

---

## SCROLL ANIMATION SYSTEM

Use **GSAP ScrollTrigger** for all scroll-driven animations.

### Core Animation Patterns

#### 1. Media Reveal (Images & Videos appear one by one)
```javascript
// Each media element starts invisible and animates in when scrolled into view
gsap.from(".media-reveal", {
  scrollTrigger: {
    trigger: ".media-reveal",
    start: "top 85%",
    end: "top 40%",
    scrub: false,
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 60,
  scale: 0.96,
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.15   // for grouped images
});
```

#### 2. Pinned Video Sections
```javascript
// Video section stays pinned while content scrolls over it
ScrollTrigger.create({
  trigger: ".video-section",
  start: "top top",
  end: "+=100%",
  pin: true,
  scrub: true
});
```

#### 3. Parallax on Images
```javascript
gsap.to(".parallax-img", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-img",
    scrub: true
  }
});
```

#### 4. Text Character Animation (Section Titles)
```javascript
// Split text into characters, animate each one
import { SplitText } from "gsap/SplitText";
const split = new SplitText(".section-title", { type: "chars" });
gsap.from(split.chars, {
  opacity: 0,
  y: 80,
  rotationX: -90,
  stagger: 0.03,
  duration: 0.8,
  ease: "back.out(1.7)",
  scrollTrigger: { trigger: ".section-title", start: "top 75%" }
});
```

#### 5. Nutrition Counter Animation
```javascript
// Numbers count up when scrolled into view
ScrollTrigger.create({
  trigger: ".nutrition-section",
  start: "top center",
  onEnter: () => animateCounters()
});

function animateCounters() {
  document.querySelectorAll(".counter").forEach(el => {
    gsap.to({ val: 0 }, {
      val: el.dataset.target,
      duration: 2,
      ease: "power2.out",
      onUpdate() { el.textContent = Math.ceil(this.targets()[0].val); }
    });
  });
}
```

---

## MEDIA HANDLING

### Image Placement Rules
All client-provided images are placed in `/client/public/media/images/`. Name them semantically:

```
/client/public/media/images/
  hero-corn-field.jpg
  corn-closeup-01.jpg
  corn-closeup-02.jpg
  corn-varieties.jpg
  nutrition-banner.jpg
  corn-harvest.jpg
  recipe-01.jpg
  recipe-02.jpg
  recipe-03.jpg
  (add more as provided)
```

### Video Placement Rules
All client-provided videos go in `/client/public/media/videos/`. Use `.mp4` format:

```
/client/public/media/videos/
  hero-loop.mp4        ← autoplay, muted, loop (Hero section)
  corn-growth.mp4      ← Video Scene 1 (with play-on-scroll)
  harvest-footage.mp4  ← Video Scene 2 (with play-on-scroll)
```

### React Media Component
```jsx
// MediaReveal.jsx — Reusable component for scroll-triggered media
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function MediaReveal({ src, type = "image", alt = "", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      scale: 0.97,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 88%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  if (type === "video") {
    return (
      <video
        ref={ref}
        className={`media-reveal ${className}`}
        src={src}
        autoPlay={false}
        muted
        playsInline
        loop
      />
    );
  }

  return (
    <img
      ref={ref}
      className={`media-reveal ${className}`}
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
}
```

### Video Play-on-Scroll (for Scene Sections)
```javascript
// Video starts playing when it enters viewport, pauses when it leaves
useEffect(() => {
  ScrollTrigger.create({
    trigger: videoRef.current,
    start: "top center",
    end: "bottom center",
    onEnter: () => videoRef.current.play(),
    onLeave: () => videoRef.current.pause(),
    onEnterBack: () => videoRef.current.play(),
    onLeaveBack: () => videoRef.current.pause()
  });
}, []);
```

---

## BACKEND ARCHITECTURE

### Folder Structure
```
/corn-website
├── /client                  ← React + Vite frontend
│   ├── /public
│   │   └── /media
│   │       ├── /images
│   │       └── /videos
│   ├── /src
│   │   ├── /components
│   │   │   ├── Hero.jsx
│   │   │   ├── MediaReveal.jsx
│   │   │   ├── NutritionCard.jsx
│   │   │   ├── VideoScene.jsx
│   │   │   ├── Varieties.jsx
│   │   │   ├── HealthBenefits.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── /pages
│   │   │   └── Home.jsx
│   │   ├── /hooks
│   │   │   └── useScrollAnimation.js
│   │   ├── /context
│   │   │   └── AppContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
│
├── /server                  ← Node.js + Express backend
│   ├── /models
│   │   ├── Nutrition.js
│   │   ├── Recipe.js
│   │   └── CornVariety.js
│   ├── /routes
│   │   ├── nutritionRoutes.js
│   │   ├── recipeRoutes.js
│   │   └── varietyRoutes.js
│   ├── /controllers
│   │   ├── nutritionController.js
│   │   ├── recipeController.js
│   │   └── varietyController.js
│   ├── /config
│   │   └── db.js
│   ├── /seed
│   │   └── seedData.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## MONGODB MODELS

### Nutrition Model
```javascript
// /server/models/Nutrition.js
const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  per100g: {
    calories: Number,       // 86 kcal
    carbohydrates: Number,  // 19g
    protein: Number,        // 3.2g
    fat: Number,            // 1.2g
    fiber: Number,          // 2.4g
    sugar: Number,          // 3.2g
    vitaminC: Number,       // 6.8mg
    vitaminB1: Number,      // 0.2mg
    folate: Number,         // 42mcg
    magnesium: Number,      // 37mg
    potassium: Number,      // 270mg
    phosphorus: Number      // 89mg
  },
  glycemicIndex: Number,    // 52
  antioxidants: [String],   // ["lutein", "zeaxanthin", "beta-carotene"]
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Nutrition", nutritionSchema);
```

### Recipe Model
```javascript
// /server/models/Recipe.js
const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,          // filename from /media/images/
  prepTime: String,
  difficulty: String,     // "Easy" | "Medium" | "Hard"
  ingredients: [String],
  steps: [String],
  nutritionHighlight: String,
  tags: [String]
});
```

### CornVariety Model
```javascript
// /server/models/CornVariety.js
const varietySchema = new mongoose.Schema({
  name: String,           // "Yellow Sweet Corn"
  color: String,          // hex or color name
  origin: String,
  uses: [String],
  flavorProfile: String,
  image: String
});
```

---

## API ENDPOINTS

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/nutrition` | Get full nutrition data |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get single recipe |
| GET | `/api/varieties` | Get all corn varieties |
| GET | `/api/varieties/:id` | Get single variety |

### Express Server Setup
```javascript
// server/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/nutrition", require("./routes/nutritionRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));
app.use("/api/varieties", require("./routes/varietyRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌽 Corn API running on port ${PORT}`));
```

---

## SECTION-BY-SECTION FRONTEND SPECS

### Section 1 — HERO
```
- Full-screen (100vw × 100vh)
- Background: hero-loop.mp4 (autoplay, muted, loop, object-fit: cover)
- Dark overlay: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(26,18,8,0.7))
- Centered text:
    - Eyebrow: "The Golden Grain" — Space Mono, 14px, letter-spacing: 0.3em, --corn-gold
    - Title: "CORN" — Playfair Display, 18vw, color: --silk-cream, font-weight: 700
    - Subtitle: "From Soil to Sustenance" — Lora italic, 1.4rem, --muted-sage
- Bottom: animated scroll indicator (bouncing arrow or grain animation)
- Animation: Title word splits into characters, each drops in from top with spring ease
```

### Section 2 — CORN ORIGIN
```
- 50/50 split layout
- Left: text block
    - Section number: "01" in --corn-gold, Space Mono
    - Heading: "Born in the Americas"
    - Body: paragraph about corn's 9,000-year history from Mexico
- Right: hero-corn-field.jpg with parallax scroll (moves at 60% scroll speed)
- On scroll: text slides in from left, image slides in from right
```

### Section 3 — VIDEO SCENE 1
```
- Full-width pinned section (100vw × 100vh)
- Video: corn-growth.mp4
- Video plays when section enters center of viewport
- Caption overlay (bottom-left):
    - "From seed to stalk — 60 to 100 days"
    - Lora italic, large, white with text shadow
- Grain texture overlay on top of video (CSS: mix-blend-mode: overlay)
```

### Section 4 — NUTRITION FACTS
```
- Background: --deep-soil
- Section title: "What's Inside" (animated character split)
- 6 animated stat cards arranged in asymmetric grid:
    - Calories: 86 kcal / 100g
    - Protein: 3.2g
    - Fiber: 2.4g
    - Vitamin C: 6.8mg
    - Folate: 42mcg
    - Potassium: 270mg
- Each card: number counts up from 0 when scrolled into view
- Card style: gold border, dark background, mono font for numbers, serif for labels
- Cards stagger-animate in (delay: 0.1s each)
- Data fetched from GET /api/nutrition
```

### Section 5 — IMAGE GALLERY 1
```
- 3 images staggered in asymmetric grid:
    - corn-closeup-01.jpg — large, left-aligned
    - corn-closeup-02.jpg — medium, right, offset top
    - corn-varieties.jpg — small, bottom-right
- Each image appears with opacity fade + Y translate as scroll passes
- Images have a subtle sepia/warm color grading via CSS filter
- Between images: floating text label ("Texture", "Color", "Diversity")
```

### Section 6 — VARIETIES CAROUSEL
```
- Horizontal scroll section (overflow-x: scroll or GSAP horizontal scroll)
- 4 cards: Yellow, Blue, White, Purple corn
- Each card:
    - Full-height image background
    - Variety name in large serif
    - Origin + flavor profile
    - Color accent border matching corn color
- Triggered by: user scrolls down = carousel moves right
- Data from GET /api/varieties
```

### Section 7 — VIDEO SCENE 2
```
- Full-width, reversed layout from Scene 1
- Video: harvest-footage.mp4
- Text overlay top-right: "Harvested by hand, grown with purpose"
- Video plays on scroll enter
```

### Section 8 — HEALTH BENEFITS
```
- Background: --silk-cream
- Vertical timeline design
- 5 benefits with icons and expanding text:
    1. Eye Health — Lutein & Zeaxanthin
    2. Digestive Health — Dietary Fiber
    3. Energy Source — Complex Carbohydrates
    4. Heart Health — Folate & Potassium
    5. Immune Boost — Vitamin C & Antioxidants
- Timeline line draws itself as you scroll (SVG stroke animation)
- Each benefit item fades in when its anchor hits center viewport
```

### Section 9 — FULL BLEED IMAGE
```
- nutrition-banner.jpg at 100vw × 80vh, object-fit: cover
- Parallax: image moves at 70% scroll speed (Ken Burns effect)
- Text overlay: large quote
    "A civilization is judged by what it grows."
    — editorial attribution
- Text fades in after image settles
```

### Section 10 — DID YOU KNOW
```
- Background: --corn-gold
- Text: dark --deep-soil
- Single bold statement, massive typography (10vw+):
    "Corn is in 4,000+ products you use daily."
- Smaller supporting text below
- Page-width text that animates in letter by letter
```

### Section 11 — RECIPES
```
- Background: --soft-white
- Title: "From Field to Table"
- 3 recipe cards in responsive grid
- Each card: image, title, prep time, difficulty badge
- Cards slide up staggered on scroll
- Data from GET /api/recipes
- "View Recipe" button links to modal or detail page
```

### Section 12 — FOOTER
```
- Background: --deep-soil
- Corn stalk SVG illustration (decorative, bottom)
- Site name, tagline, credits
- Nutrition data source attribution
- Minimal nav links
```

---

## CSS GLOBAL SETUP

```css
/* index.css */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background-color: var(--soft-white);
  color: var(--deep-soil);
  font-family: 'Lora', Georgia, serif;
  overflow-x: hidden;
}

/* Smooth scroll container for GSAP */
.smooth-wrapper {
  overflow: hidden;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
}

.smooth-content {
  will-change: transform;
}

/* Section defaults */
.section {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Media defaults */
img, video {
  display: block;
  max-width: 100%;
}

video {
  object-fit: cover;
}
```

---

## SMOOTH SCROLL SETUP (Lenis)

```javascript
// Use Lenis for buttery-smooth scroll momentum
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## PERFORMANCE REQUIREMENTS

- All images served as `.webp` or optimized `.jpg` (compress to < 300KB each)
- Videos: H.264 encoded `.mp4`, max 10MB each
- Hero video: max 5MB, use `preload="metadata"` for non-hero videos
- Implement `loading="lazy"` on all below-fold images
- Use `React.lazy()` + `Suspense` for route-level code splitting
- ScrollTrigger: use `invalidateOnRefresh: true` for responsive safety
- Target: Lighthouse Performance Score > 85

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm — tablet portrait */ }
@media (min-width: 768px)  { /* md — tablet landscape */ }
@media (min-width: 1024px) { /* lg — desktop */ }
@media (min-width: 1280px) { /* xl — large desktop */ }
@media (min-width: 1536px) { /* 2xl — ultra wide */ }
```

On mobile:
- Horizontal carousel becomes vertical stack
- Split sections become single-column
- Hero title font size: clamp(3rem, 15vw, 12rem)
- Animations are simplified (no parallax, lighter transitions)
- Video autoplay disabled on mobile data (detect with Network API)

---

## ENVIRONMENT VARIABLES

```env
# .env (root)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/corn-db
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
}
```

---

## PACKAGE DEPENDENCIES

### Client (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "gsap": "^3.12.5",
    "@studio-freight/lenis": "^1.0.42",
    "axios": "^1.6.7",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "vite": "^5.1.4",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35"
  }
}
```

### Server (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.3",
    "mongoose": "^8.2.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.4",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

## SEED DATA (Example)

```javascript
// server/seed/seedData.js
const recipes = [
  {
    title: "Elote (Mexican Street Corn)",
    image: "recipe-01.jpg",
    prepTime: "15 min",
    difficulty: "Easy",
    ingredients: ["4 ears corn", "mayonnaise", "cotija cheese", "chili powder", "lime"],
    steps: ["Grill corn", "Coat with mayo", "Roll in cheese", "Sprinkle chili + lime"],
    nutritionHighlight: "High in Fiber & Vitamin C",
    tags: ["Mexican", "Grilled", "Street Food"]
  },
  {
    title: "Creamy Corn Chowder",
    image: "recipe-02.jpg",
    prepTime: "35 min",
    difficulty: "Medium",
    ingredients: ["6 ears corn", "potato", "heavy cream", "onion", "thyme"],
    steps: ["Sauté onion", "Add potatoes + corn", "Pour cream", "Simmer 20 min"],
    nutritionHighlight: "Rich in Potassium & Folate",
    tags: ["Soup", "Comfort Food", "Winter"]
  },
  {
    title: "Blue Corn Tortillas",
    image: "recipe-03.jpg",
    prepTime: "20 min",
    difficulty: "Medium",
    ingredients: ["2 cups blue masa harina", "warm water", "salt"],
    steps: ["Mix masa + water", "Form balls", "Press flat", "Cook on comal 2 min each side"],
    nutritionHighlight: "Antioxidant-rich Anthocyanins",
    tags: ["Mexican", "Gluten-Free", "Traditional"]
  }
];
```

---

## DELIVERABLES CHECKLIST

- [ ] Full MERN project folder structure created
- [ ] All 12 scroll sections implemented
- [ ] GSAP ScrollTrigger animations on every section
- [ ] Lenis smooth scroll integrated
- [ ] Media files integrated (images + videos provided by client)
- [ ] All media appears one by one on scroll
- [ ] MongoDB models: Nutrition, Recipe, CornVariety
- [ ] REST API: 5 endpoints working
- [ ] Seed data populated
- [ ] Responsive design (mobile + desktop)
- [ ] Performance optimized (lazy load, compressed media)
- [ ] Environment variables documented
- [ ] README with setup instructions

---

## NOTES FOR ANTIGRAVITY AI

1. **The client will provide all images and videos** — do not generate placeholder images. Use descriptive `alt` text and filename references as shown above.
2. **Frontend quality is the #1 priority** — animations must be smooth, typography must be intentional, spacing must feel editorial.
3. **Every scroll event must trigger something** — no dead zones where nothing animates.
4. **The scroll speed should feel cinematic** — use Lenis momentum with `duration: 1.4` or higher.
5. **Color grading** — apply warm CSS filters (`sepia(0.15) saturate(1.2)`) to images for visual cohesion.
6. **Sound (optional enhancement)** — subtle ambient sound toggle (corn field wind) if client approves.
7. **Dark/Light mode** — not required but can be added as a bonus toggle.

---

*Document prepared for Antigravity AI | Project: CORN Nutrition Website | Stack: MERN | Type: Scroll Animation Experience*

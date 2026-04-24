import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a className="nav-logo" href="/">CORN</a>
      <ul className="nav-links">
        <li><a href="#origin" onClick={(e) => { e.preventDefault(); scrollTo("origin"); }}>Origin</a></li>
        <li><a href="#nutrition" onClick={(e) => { e.preventDefault(); scrollTo("nutrition"); }}>Nutrition</a></li>
        <li><a href="#varieties" onClick={(e) => { e.preventDefault(); scrollTo("varieties"); }}>Varieties</a></li>
        <li><a href="#benefits" onClick={(e) => { e.preventDefault(); scrollTo("benefits"); }}>Benefits</a></li>
        <li><a href="#recipes" onClick={(e) => { e.preventDefault(); scrollTo("recipes"); }}>Recipes</a></li>
      </ul>
    </nav>
  );
}

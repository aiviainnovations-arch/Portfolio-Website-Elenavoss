import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "@/utils/scroll";

const LINKS = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Films", id: "films" },
  { label: "Journal", id: "journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id: string) => {
    setOpen(false);
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500`}
      style={{
        backdropFilter: scrolled ? "blur(10px)" : "none",
        background: scrolled ? "rgba(243,239,231,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(31,29,26,0.08)" : "1px solid transparent",
      }}
    >
      <nav className="container-editorial flex items-center justify-between h-20">
        <button
          onClick={() => (location.pathname === "/" ? scrollToId("hero") : navigate("/"))}
          className="font-display text-lg tracking-wide"
          data-cursor="Home"
        >
          ELENA VOSS
        </button>

        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => goToSection(link.id)}
                className="eyebrow hover:text-charcoal text-clay transition-colors"
                data-cursor="Open"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => goToSection("contact")}
          className="eyebrow border border-charcoal/30 px-5 py-2.5 rounded-full hover:bg-charcoal hover:text-ivory transition-colors hidden md:inline-block"
          data-cursor="Open"
        >
          Let&rsquo;s Talk
        </button>

        <button
          className="md:hidden eyebrow"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-ivory border-t border-charcoal/10">
          <ul className="container-editorial py-6 flex flex-col gap-5">
            {[...LINKS, { label: "Contact", id: "contact" }].map((link) => (
              <li key={link.id}>
                <button onClick={() => goToSection(link.id)} className="font-display text-2xl">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

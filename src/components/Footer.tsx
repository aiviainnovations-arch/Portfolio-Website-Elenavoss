const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Vimeo", href: "#" },
  { label: "Email", href: "mailto:hello@elenavoss.studio" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-ivory">
      <div className="container-editorial py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="font-display text-3xl">ELENA VOSS</p>
            <p className="eyebrow mt-2">Photographer &amp; Visual Storyteller</p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="eyebrow hover:text-charcoal text-clay transition-colors" data-cursor="Open">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 pt-6 border-t border-charcoal/10 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-clay">
            &copy; {new Date().getFullYear()} Elena Voss Studio (fictional). All rights reserved.
          </p>
          <p className="text-xs tracking-widest2 uppercase text-clay">AIVA Portfolio Concept</p>
        </div>
      </div>
    </footer>
  );
}

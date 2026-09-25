import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import Process from "@/sections/Process";
import About from "@/sections/About";
import Films from "@/sections/Films";
import Journal from "@/sections/Journal";
import Contact from "@/sections/Contact";
import { scrollToId } from "@/utils/scroll";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      requestAnimationFrame(() => scrollToId(state.scrollTo!));
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <>
      <Hero />
      <SelectedWork />
      <Process />
      <About />
      <Films />
      <Journal />
      <Contact />
    </>
  );
}

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Home from "@/pages/Home";
import ProjectCase from "@/pages/ProjectCase";

function ScrollToTopOnNavigate() {
  const location = useLocation();
  useEffect(() => {
    if (!location.state || !(location.state as { scrollTo?: string }).scrollTo) {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollToTopOnNavigate />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectCase />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

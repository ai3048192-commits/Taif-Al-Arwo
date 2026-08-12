import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Sectors from "./pages/Sectors";
import ArticlesSection from "./pages/ArticlesSection";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import AboutSection from "./pages/AboutSection";
import About from "./pages/About";
import Articles from "./pages/Articles"; // صفحة المقالات المنفصلة

// مكون يمثل الصفحة الرئيسية لتجميع محتوى الرئيسية
function MainContent() {
  return (
    <>
      <Home />
      <AboutSection />
      <About />
       <ArticlesSection />
      <Sectors />
      <Services />
      <FAQ />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-[#0b1329] min-h-screen text-white">
        <Header />

        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={<MainContent />} />

          {/* صفحة المقالات لوحدها */}
          <Route path="/articles" element={<Articles />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

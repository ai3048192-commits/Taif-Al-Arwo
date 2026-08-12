import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  UserCheck,
  Briefcase,
  BookOpen,
  PhoneCall,
  Home,
} from "lucide-react";
import logoImage from "../assets/logoo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(location.pathname);

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/", type: "route", icon: Home },
    { name: "من نحن", href: "#about", type: "hash", icon: UserCheck },
    { name: "خدماتنا", href: "#services", type: "hash", icon: Briefcase },
    { name: "المقالات", href: "/articles", type: "route", icon: BookOpen },
    { name: "تواصل", href: "#contact", type: "hash", icon: PhoneCall },
  ];

  const handleNavClick = (e, link) => {
    if (link.type === "hash") {
      e.preventDefault();
      setActiveSection(link.href);
      setMobileMenuOpen(false);

      if (location.pathname !== "/") {
        navigate("/" + link.href);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setActiveSection(link.href);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-xl border-b border-[#E9B18B]/30 shadow-2xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* الشعار بحجم كبير جداً وواضح تماماً */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => setActiveSection("/")}
        >
          <div className="transition-transform duration-500 group-hover:scale-105">
            <img
              src={logoImage}
              alt="شعار المحامية طيف العروي"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain filter drop-shadow-lg"
            />
          </div>
        </Link>

        {/* روابط التنقل للشاشات الكبيرة */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 text-base font-bold transition-all duration-300 group rounded-xl cursor-pointer ${
                  isActive
                    ? "text-[#E9B18B]"
                    : "text-stone-200 hover:text-[#E9B18B]"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {link.name}
                </span>

                <span
                  className={`absolute bottom-0 right-3 left-3 h-0.5 bg-gradient-to-r from-transparent via-[#E9B18B] to-transparent transition-all duration-300 rounded-full ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                ></span>
              </a>
            );
          })}
        </nav>

        {/* زر الإجراء السريع (Call to Action) */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, { href: "#contact", type: "hash" })}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-stone-950 overflow-hidden shadow-lg bg-[#E9B18B] hover:bg-[#dfa077] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span>احجز استشارتك</span>
            <ArrowRight className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform rotate-180 text-stone-950" />
          </a>
        </div>

        {/* زر القائمة للهواتف المحمولة */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative p-3 rounded-xl bg-stone-900/80 backdrop-blur-md border border-[#E9B18B]/40 text-[#E9B18B] focus:outline-none transition-all shadow-md active:scale-95"
          aria-label="القائمة"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* القائمة المنسدلة للهواتف المحمولة */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 bg-stone-950 border border-[#E9B18B]/40 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 rounded-2xl mt-2">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <span className="text-xs font-bold text-[#E9B18B] uppercase tracking-widest">
              قائمة التنقل
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9B18B] animate-ping"></span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link, idx) => {
              const IconComponent = link.icon;
              const isActive = activeSection === link.href;
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center justify-between px-4 py-3 text-base transition-all duration-300 group rounded-xl cursor-pointer ${
                    isActive
                      ? "text-[#E9B18B] bg-stone-900 font-bold border-r-4 border-[#E9B18B]"
                      : "text-stone-200 hover:text-[#E9B18B] hover:bg-stone-900/50 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? "bg-[#133E2E] text-[#E9B18B]"
                          : "bg-stone-900 text-stone-400 group-hover:bg-[#133E2E] group-hover:text-[#E9B18B]"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-[#E9B18B] transition-colors rotate-180" />
                </a>
              );
            })}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, { href: "#contact", type: "hash" })}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#E9B18B] text-stone-950 rounded-xl text-base font-bold shadow-lg hover:bg-[#dfa077] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>احجز استشارتك الآن</span>
              <ArrowRight className="w-4 h-4 rotate-180 text-stone-950" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
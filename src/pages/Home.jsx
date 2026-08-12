import { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpLeft, ShieldCheck, Scale, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [heroData, setHeroData] = useState({
    title: "شريكك القانوني الموثوق للأفراد والشركات والمستثمرين",
    description: "نجمع بين الخبرة القانونية والنهج العملي لتقديم حلول فعالة تحقق أفضل النتائج بما يحقق تطلعات عملائنا.",
    logo_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching hero data:", error);
      } else if (data && data.length > 0) {
        setHeroData({
          title: data[0].title || heroData.title,
          description: data[0].description || heroData.description,
          logo_url: data[0].logo_url || heroData.logo_url
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative text-white min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 sm:py-36"
      dir="rtl"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroData.logo_url || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"}
          alt="مكتب محاماة فخم"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-900/75 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#E9B18B_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-start text-right max-w-4xl space-y-6 animate-[slideInRight_1s_ease-out]">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#E9B18B]/50 bg-stone-900/80 backdrop-blur-xl shadow-lg">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: "#E9B18B" }}
            ></span>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-stone-200 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5" style={{ color: "#E9B18B" }} />
              <span>المحامية طيف العروي • صرح قانوني معتمد</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.3] text-white drop-shadow-lg">
            {loading ? (
              <span className="flex items-center gap-2 text-stone-400 text-lg">
                <Loader2 className="animate-spin w-6 h-6 text-[#E9B18B]" /> جاري تحميل البيانات...
              </span>
            ) : (
              <>
                {heroData.title}
              </>
            )}
          </h1>

          <p className="text-stone-300 sm:text-2xl lg:text-3xl font-light leading-relaxed max-w-2xl drop-shadow border-r-2 border-[#E9B18B] pr-3">
            {heroData.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#services"
              className="group relative sm:text-2xl lg:text-2xl inline-flex items-center justify-center gap-2.5 px-7 py-3 text-white font-semibold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 text-sm overflow-hidden border border-[#E9B18B]/40 bg-stone-900/90"
            >
              <span>خدماتنا</span>
              <ArrowUpLeft
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                style={{ color: "#E9B18B" }}
              />
            </a>

            <a
              href="#contact"
              className="group relative inline-flex items-center sm:text-2xl lg:text-2xl justify-center gap-2.5 px-7 py-3 font-semibold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 text-sm backdrop-blur-xl border border-[#E9B18B] text-stone-950 overflow-hidden"
              style={{ backgroundColor: "#E9B18B" }}
            >
              <span>تواصل معنا</span>
              <ArrowLeft className="w-5 h-5 text-stone-950 transform transition-transform duration-300 group-hover:-translate-x-1" />
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 sm:text-2xl lg:text-3xl text-xs text-stone-400 font-mono border-t border-stone-800/80 w-full max-w-lg">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" style={{ color: "#E9B18B" }} />
              <span>خبرة واسعة</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-stone-600"></div>
            <div>سرية تامة وحماية مطلقة</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
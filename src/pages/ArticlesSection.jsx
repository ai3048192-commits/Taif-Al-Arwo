import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Building2, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ArticlesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [article, setArticle] = useState(null);
  const [corporateContent, setCorporateContent] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    fetchLatestArticle();
    fetchCorporateContent();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // جلب أحدث بيانات النموذج الثاني (كيف أبدأ شركتك) من Supabase
  const fetchLatestArticle = async () => {
    try {
      const { data } = await supabase
        .from('articles_section')
        .select('*')
        .order('id', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setArticle(data[0]);
      }
    } catch (err) {
      console.error("Error fetching article section:", err);
    }
  };

  // جلب أحدث بيانات النموذج الثالث (شركاء النجاح) من Supabase
  const fetchCorporateContent = async () => {
    try {
      const { data } = await supabase
        .from('corporate_section')
        .select('*')
        .order('id', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setCorporateContent(data[0]);
      }
    } catch (err) {
      console.error("Error fetching corporate section:", err);
    }
  };

  // القيم الافتراضية في حال كانت القاعدة فارغة
  const displayTitle = article?.title || "كيف أبدأ تأسيس شركتي؟";
  const displayDesc = article?.description || "ابدأ بحجز جلسة استشارية معنا - ندرس نشاطك ونحدد لك الهيكل القانوني الأمثل لشركتك.";
  const displayImage = article?.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop";

  const displayCorpTitle = corporateContent?.title || "شريك نجاح أعمالك الاستثمارية";
  const displayCorpDesc = corporateContent?.description || "نقدم الدعم القانوني للشركات والمستثمرين بروح الشراكة، من خلال حلول قانونية مدروسة تواكب احتياجات أعمالكم، وتحمي مصالحكم، وتدعم استدامة نموكم.";

  const getFormattedCorpTitle = () => {
    if (!displayCorpTitle) return "";
    if (displayCorpTitle.startsWith("شريك نجاح ")) {
      return displayCorpTitle.replace("شريك نجاح ", "");
    }
    return displayCorpTitle;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] text-stone-900 py-32 sm:py-44 overflow-hidden border-b border-stone-200/60" 
      dir="rtl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#133E2E_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.015] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#E9B18B]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* الجانب الأيمن (النموذج الثاني: كيف أبدأ شركتك) */}
          <div className={`lg:col-span-6 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative group rounded-[2.5rem] overflow-hidden border-2 border-[#E9B18B]/40 shadow-2xl bg-stone-950 transition-all duration-500 hover:border-[#133E2E]/60">
              
              <div className="absolute inset-0 z-0">
                <img 
                  src={displayImage} 
                  alt={displayTitle} 
                  className="w-full h-full object-cover object-center filter brightness-[0.3] contrast-[105%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 sm:p-12 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/60 text-[#E9B18B] flex items-center justify-center shadow-xl backdrop-blur-md">
                  <HelpCircle className="w-7 h-7" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-snug drop-shadow-md">
                    {displayTitle}
                  </h3>
                  
                  <div className="p-6 rounded-2xl bg-stone-900/90 border border-[#E9B18B]/30 text-stone-100 text-lg sm:text-xl font-light leading-relaxed space-y-2 backdrop-blur-xl shadow-2xl">
                    <span className="font-bold text-[#E9B18B] block text-sm tracking-wider uppercase">الخارطة القانونية:</span>
                    <p>{displayDesc}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="tel:+966536939093" 
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E9B18B] hover:bg-[#dfa077] text-stone-950 font-extrabold rounded-2xl transition-all duration-300 shadow-lg shadow-[#E9B18B]/20 hover:scale-[1.02] text-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000"></div>
                    <span>ابدأ جلستك الاستشارية الآن</span>
                    <ArrowLeft className="w-5 h-5 text-stone-950 transform group-hover/btn:-translate-x-1.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* الجانب الأيسر (النموذج الثالث: شركاء النجاح) */}
          <div className={`lg:col-span-6 space-y-7 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            
            <div className="inline-flex items-center gap-2.5 bg-white border border-[#E9B18B]/50 text-[#133E2E] px-5 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-sm uppercase">
              <Building2 className="w-5 h-5 text-[#E9B18B]" />
              <span>قطاع الشركات والمستثمرين</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 leading-[1.2]">
                شريك نجاح <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#133E2E] via-[#245c47] to-[#133E2E]">
                  {getFormattedCorpTitle()}
                </span>
              </h2>
            </div>

            <p className="text-stone-700 text-xl sm:text-2xl font-light leading-[1.8] bg-white/80 p-7 rounded-3xl border border-[#E9B18B]/30 shadow-xs backdrop-blur-md">
              {displayCorpDesc}
            </p>

            <div className="pt-2">
              <a 
                href="#corporate-services" 
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#133E2E] hover:bg-[#0f3225] text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-[#133E2E]/15 hover:scale-[1.02] text-lg overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                <span>تصفح الخدمات</span>
                <ArrowLeft className="w-5 h-5 text-[#E9B18B] transform group-hover:-translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Scale, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase'; // تأكد من مسار الـ supabase

export default function WhyUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // جلب أحدث سجل مضاف من قاعدة البيانات
    const fetchLatestWhyUs = async () => {
      const { data, error } = await supabase
        .from('why_us')
        .select('*')
        .order('id', { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        setCurrentItem(data[0]);
      }
    };

    fetchLatestWhyUs();

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // البيانات الافتراضية في حال لم تقم بإضافة سجلات بعد
  const dataToDisplay = currentItem ? {
    title: currentItem.title,
    description: currentItem.description,
    mainImage: currentItem.main_image || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop",
    featureImage: currentItem.feature_image,
    featureDesc: currentItem.feature_desc || "استشارات تضمن حقوقك بكل دقة"
  } : {
    title: "نتميز بخبرة راسخة وخدمات قانونية متكاملة",
    description: "نقدم خدمات قانونية ترتكز على الخبرة والدقة، وفهم عميق للأنظمة المعمول بها في المملكة العربية السعودية.",
    mainImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop",
    featureImage: null,
    featureDesc: "استشارات تضمن حقوقك بكل دقة"
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#FDFBF7] via-[#FAF6EE] to-[#FDFBF7] text-stone-900 py-20 sm:py-28 overflow-hidden border-b border-[#E9B18B]/20" 
      dir="rtl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#133E2E_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.015] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E9B18B]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* الجانب الأيمن: النصوص والمميزات */}
          <div className={`lg:col-span-7 space-y-6 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#E9B18B]/40 text-[#133E2E] px-4 py-2 rounded-full font-bold tracking-wide shadow-sm">
              <Sparkles className="w-5 h-4 text-[#E9B18B]" />
              <span>ما يميزنا</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-900 leading-[1.35]">
              {dataToDisplay.title}
            </h2>

            <div className="relative bg-white/75 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#E9B18B]/30 shadow-[0_10px_30px_rgba(19,62,46,0.03)] space-y-3">
              <div className="absolute -top-3 right-6 px-3.5 py-1 bg-[#133E2E] text-white font-bold rounded-full tracking-wider uppercase shadow-sm text-xs">
                رؤيتنا المهنية
              </div>
              <p className="text-stone-700 text-sm sm:text-base font-light leading-[1.8]">
                {dataToDisplay.description}
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="#services" 
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#133E2E] hover:bg-[#0f3225] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#133E2E]/15 hover:scale-[1.02] text-sm sm:text-base overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                <span>اعرف أكثر عن خدماتنا</span>
                <ArrowLeft className="w-4 h-4 text-[#E9B18B] transform group-hover:-translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* الجانب الأيسر: الصورة والكارت المصغر */}
          <div className={`lg:col-span-5 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#E9B18B]/30 via-transparent to-transparent rounded-[2.5rem] blur-xl opacity-70"></div>

              <div className="relative rounded-3xl overflow-hidden border-2 border-[#E9B18B]/50 shadow-xl bg-white group">
                <img 
                  src={dataToDisplay.mainImage} 
                  alt="صورة القسم" 
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center contrast-[95%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent opacity-80"></div>

                <div className="absolute bottom-5 right-5 left-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E9B18B]/50 flex items-center gap-3.5 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-[#133E2E] border border-[#E9B18B]/50 flex items-center justify-center text-[#E9B18B] shrink-0 shadow-sm overflow-hidden">
                    {dataToDisplay.featureImage ? (
                      <img src={dataToDisplay.featureImage} alt="Icon" className="w-full h-full object-cover" />
                    ) : (
                      <Scale className="w-4.5 h-4.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-stone-900 text-xs sm:text-sm font-bold">معايير مهنية عالية</h4>
                    <p className="text-stone-600 text-[11px] sm:text-xs font-light">{dataToDisplay.featureDesc}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
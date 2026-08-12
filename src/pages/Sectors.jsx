import React, { useState, useEffect } from "react";
import {
  Building,
  Globe,
  ShieldCheck,
  FileText,
  Gavel,
  Scale,
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  UserCheck,
  Store,
  Factory,
  Users2,
  PhoneCall,
  MapPin,
  Share2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ServicesAndSectorsSection() {
  const [servicesList, setServicesList] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    address: "",
    twitter: ""
  });
  const [loading, setLoading] = useState(true);

  // جلب البيانات من Supabase عند تحميل المكون
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        // 1. جلب الخدمات
        const { data: services, error: srvError } = await supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: false });
        if (srvError) throw srvError;
        setServicesList(services || []);

        // 2. جلب القطاعات
        const { data: sectors, error: secError } = await supabase
          .from("sectors")
          .select("*")
          .order("created_at", { ascending: false });
        if (secError) throw secError;
        setSectorsList(sectors || []);

        // 3. جلب بيانات التواصل
        const { data: contact, error: cntError } = await supabase
          .from("contact_info")
          .select("*")
          .limit(1)
          .maybeSingle();
        if (contact) {
          setContactInfo(contact);
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []);

  if (loading) {
    return (
      <div className="py-32 bg-[#FAF7F2] text-stone-900 flex items-center justify-center gap-3" dir="rtl">
        <Loader2 className="w-6 h-6 animate-spin text-[#133E2E]" />
        <span className="text-lg font-bold">جاري تحميل المحتوى...</span>
      </div>
    );
  }

  return (
    <section
      id="services-sectors"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] text-stone-900 overflow-hidden border-t border-stone-200/60"
      dir="rtl"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#133E2E_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.015]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E9B18B]/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-36">
        
        {/* ================= القسم الأول: خدماتنا القانونية ================= */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white border border-[#E9B18B]/50 text-[#133E2E] px-5 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-sm uppercase">
                <Scale className="w-4 h-4 text-[#E9B18B]" />
                <span>خبرة قضائية وحلول دقيقة</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900">
                خدماتنا القانونية
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesList.length === 0 ? (
              <p className="text-stone-500 text-center col-span-full">لا توجد خدمات مضافة حالياً.</p>
            ) : (
              servicesList.map((srv) => (
                <div
                  key={srv.id}
                  className="group relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-[#E9B18B]/30 hover:border-[#133E2E]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9B18B]/50 to-transparent group-hover:via-[#133E2E] transition-all duration-500"></div>

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/60 flex items-center justify-center text-[#E9B18B] shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                        {srv.icon && srv.icon.startsWith("http") ? (
                          <img src={srv.icon} alt={srv.title} className="w-full h-full object-cover" />
                        ) : (
                          <Building className="w-7 h-7" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-bold tracking-wider text-[#133E2E] bg-[#FAF7F2] px-4 py-1.5 rounded-full border border-[#E9B18B]/40 uppercase">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-[#133E2E] transition-colors tracking-wide">
                      {srv.title}
                    </h3>

                    <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed mb-8">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-stone-200 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="text-sm font-bold text-stone-600 group-hover:text-[#133E2E] flex items-center gap-2 transition-colors"
                    >
                      {srv.metric || "طلب استشارة خاصة"}
                    </a>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E9B18B]/40 flex items-center justify-center text-[#133E2E] group-hover:bg-[#133E2E] group-hover:text-[#E9B18B] transition-all duration-300 shadow-sm">
                      <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= القسم الثاني: القطاعات التي نخدمها ================= */}
        <div className="space-y-12 pt-12 border-t border-stone-200">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-white border border-[#E9B18B]/50 text-[#133E2E] px-5 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-sm uppercase">
              <Sparkles className="w-4 h-4 text-[#E9B18B]" />
              <span>شمولية وخبرة قطاعية واسعة</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900">
              القطاعات التي نخدمها
            </h2>
            <p className="text-stone-700 text-lg sm:text-xl font-normal leading-relaxed">
              نوفر حلولاً قانونية مخصصة تلبي الاحتياجات الفريدة لمختلف القطاعات والأفراد باحترافية تامة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sectorsList.length === 0 ? (
              <p className="text-stone-500 text-center col-span-full">لا توجد قطاعات مضافة حالياً.</p>
            ) : (
              sectorsList.map((sector) => (
                <div
                  key={sector.id}
                  className="group relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-[#E9B18B]/30 hover:border-[#133E2E]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9B18B]/50 to-transparent group-hover:via-[#133E2E] transition-all duration-500"></div>

                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/60 flex items-center justify-center text-[#E9B18B] shadow-lg group-hover:scale-110 transition-all duration-500 overflow-hidden">
                      {sector.icon && sector.icon.startsWith("http") ? (
                        <img src={sector.icon} alt={sector.title} className="w-full h-full object-cover" />
                      ) : (
                        <Briefcase className="w-8 h-8" />
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-stone-900 group-hover:text-[#133E2E] transition-colors">
                          {sector.title}
                        </h3>
                        {sector.tag && (
                          <span className="text-[10px] font-bold bg-[#FAF7F2] text-[#133E2E] px-3 py-1 rounded-full border border-[#E9B18B]/40">
                            {sector.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed">
                        {sector.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#133E2E]">
                      {sector.metric || "خدمات مخصصة"}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E9B18B]/40 flex items-center justify-center text-[#133E2E] group-hover:bg-[#133E2E] group-hover:text-[#E9B18B] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= القسم الثالث: الدعوة للاستشارة والتواصل ================= */}
        <div className="relative rounded-[3rem] bg-stone-950 border-2 border-[#E9B18B]/40 p-8 sm:p-14 shadow-2xl overflow-hidden text-right">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#E9B18B]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-[#E9B18B] 
              font-bold text-sm uppercase tracking-wider bg-stone-900 px-5 py-2 rounded-full border border-[#E9B18B]/30">
                <Scale className="w-4 h-4" /> جاهزون لدعمك قانونياً
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                هل تحتاج إلى استشارة قانونية؟ <br />
                <span className="text-[#E9B18B]">تواصل معانا الآن</span>
              </h3>
              <p className="text-stone-300 text-lg sm:text-xl font-light max-w-xl leading-relaxed">
                فريقنا من المستشارين والقضاة السابقين جاهز لدراسة موقفك القانوني وتقديم الحلول الفورية والآمنة لحماية حقوقك وأعمالك.
              </p>

              <div className="pt-2">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E9B18B] hover:bg-[#dfa077] text-stone-950 font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-[#E9B18B]/20 hover:scale-[1.02] text-lg"
                >
                  <span>احجز جلستك الاستشارية</span>
                  <ArrowLeft className="w-5 h-5 text-stone-950" />
                </a>
              </div>
            </div>

            {/* بيانات التواصل الديناميكية */}
            <div className="lg:col-span-5 space-y-6 bg-stone-900/95 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-[#E9B18B]/30 shadow-2xl relative overflow-hidden group/box">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#133E2E]/40 rounded-full blur-3xl pointer-events-none"></div>

              <h4 className="text-xl font-bold text-white border-b border-stone-800/80 pb-4 flex items-center justify-between">
                <span>قنوات التواصل المباشر</span>
                <span className="w-2 h-2 rounded-full bg-[#E9B18B] animate-pulse"></span>
              </h4>

              <div className="space-y-6 text-stone-200 text-base">
                {/* الاتصال */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/50 flex items-center justify-center text-[#E9B18B] shrink-0 shadow-md group-hover/item:scale-105 group-hover/item:border-[#E9B18B] transition-all duration-300">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-stone-400 font-light">
                      اتصل بنا مباشرة
                    </span>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="font-mono font-bold text-white text-lg hover:text-[#E9B18B] transition-colors dir-ltr inline-block"
                    >
                      {contactInfo.phone || "غير متوفر"}
                    </a>
                  </div>
                </div>

                {/* الموقع */}
                <div className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/50 flex items-center justify-center text-[#E9B18B] shrink-0 shadow-md group-hover/item:scale-105 group-hover/item:border-[#E9B18B] transition-all duration-300 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-stone-400 font-light">
                      الموقع الرسمي
                    </span>
                    <span className="font-medium text-white text-sm sm:text-base leading-relaxed block">
                      {contactInfo.address || "غير متوفر"}
                    </span>
                  </div>
                </div>

                {/* السوشيال ميديا */}
                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/50 flex items-center justify-center text-[#E9B18B] shrink-0 shadow-md group-hover/item:scale-105 group-hover/item:border-[#E9B18B] transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-stone-400 font-light">
                      شبكات التواصل الاجتماعي
                    </span>
                    <div className="flex items-center gap-4 mt-1.5">
                      <a
                        href={contactInfo.twitter || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#E9B18B] hover:text-white font-bold text-sm bg-stone-800/80 hover:bg-[#133E2E] px-3.5 py-1.5 rounded-xl border border-[#E9B18B]/30 transition-all duration-300 shadow-sm"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span>رابط المنصة</span>
                      </a>
                    </div>
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
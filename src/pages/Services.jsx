import React, { useState, useEffect } from "react";
import {
  Building,
  UserCheck,
  Scale,
  ArrowUpRight,
  MessageSquare,
  Loader2,
  Sparkles,
  Layers
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ServicesAndSectorsSection() {
  const [activeTab, setActiveTab] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("law_services")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      const list = data || [];
      setServicesList(list);

      // تعيين أول قسم كـ أكتيف تلقائياً عند تحميل البيانات لأول مرة
      if (list.length > 0 && !activeTab) {
        setActiveTab(list[0].category?.trim().toLowerCase() || "");
      }
    } catch (error) {
      console.error("خطأ في جلب الخدمات:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (serviceTitle) => {
    const phoneNumber = "966536939093";
    const message = `مرحباً، أود طلب استشارة قانونية بخصوص خدمة: "${serviceTitle}". يرجى إفادتي بالتفاصيل.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // استخراج جميع الأقسام الفريدة الموجودة في قاعدة البيانات ديناميكياً
  const categories = Array.from(
    new Set(servicesList.map((s) => s.category?.trim().toLowerCase()).filter(Boolean))
  );

  // تصفية الخدمات بناءً على القسم النشط حالياً
  const displayList = servicesList.filter(
    (srv) => srv.category?.trim().toLowerCase() === activeTab.toLowerCase()
  );

  if (loading) {
    return (
      <section className="py-36 bg-[#FAF7F2] text-stone-900 flex items-center justify-center gap-3" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-[#133E2E]" />
        <span className="text-xl font-bold">جاري تحميل الخدمات القانونية...</span>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] text-stone-900 overflow-hidden border-t border-stone-200/60"
      dir="rtl"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#133E2E_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.015]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E9B18B]/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 bg-white border border-[#E9B18B]/50 text-[#133E2E] px-6 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-sm uppercase">
              <Scale className="w-4 h-4 text-[#E9B18B]" />
              <span>خبرة قضائية وحلول دقيقة</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900">
              خدماتنا القانونية المتخصصة
            </h2>
            <p className="text-stone-700 text-lg sm:text-xl font-normal leading-relaxed">
              اختر التصنيف المناسب لاستعراض خدماتنا الاحترافية الموجهة خصيصاً لتلبية احتياجاتكم.
            </p>
          </div>

          {/* أزرار التبديل تتولد تلقائياً وديناميكياً حسب ما تضيفه في لوحة التحكم */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center p-2 bg-stone-200/70 backdrop-blur-xl rounded-2xl border border-stone-300 shadow-inner gap-2">
              {categories.map((cat) => {
                const isSelected = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-7 py-3.5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center gap-2.5 cursor-pointer uppercase ${
                      isSelected
                        ? "bg-[#133E2E] text-[#E9B18B] shadow-lg scale-105"
                        : "text-stone-700 hover:text-stone-900 bg-transparent"
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* عرض البطاقات الخاصة بالقسم المحدد فقط */}
          {displayList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
              {displayList.map((srv) => (
                <div
                  key={srv.id}
                  className="group relative bg-white/90 backdrop-blur-xl p-8 sm:p-9 rounded-[2.5rem] border border-[#E9B18B]/30 hover:border-[#133E2E]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9B18B]/50 to-transparent group-hover:via-[#133E2E] transition-all duration-500"></div>

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/60 flex items-center justify-center text-[#E9B18B] shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                        {srv.icon && srv.icon.startsWith("http") ? (
                          <img src={srv.icon} alt={srv.title} className="w-full h-full object-cover" />
                        ) : (
                          <Scale className="w-7 h-7" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-bold tracking-wider text-[#133E2E] bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#E9B18B]/40 uppercase">
                        {srv.tag || "خدمة قانونية"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-[#133E2E] transition-colors tracking-wide">
                      {srv.title}
                    </h3>

                    <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed mb-8">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-stone-200">
                    <a
                      href={getWhatsAppLink(srv.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl bg-[#133E2E] hover:bg-[#0f3225] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md group/btn"
                    >
                      <MessageSquare className="w-5 h-5 text-[#E9B18B]" />
                      <span>{srv.metric || "اطلب استشارة"}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#E9B18B] transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-3xl border border-stone-200">
              <Sparkles className="w-12 h-12 text-[#E9B18B] mx-auto mb-4 animate-pulse" />
              <p className="text-stone-600 text-lg font-bold">لا توجد خدمات مضافة في هذا القسم حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
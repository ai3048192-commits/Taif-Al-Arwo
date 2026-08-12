import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowLeft, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from "../lib/supabase";

export default function CorporateFoundationFAQsSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqsList, setFaqsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("law_faqs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      const list = data || [];
      setFaqsList(list);
      if (list.length > 0) {
        setOpenIndex(list[0].id);
      }
    } catch (error) {
      console.error("خطأ في جلب الأسئلة:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const getWhatsAppLink = (questionText) => {
    const phoneNumber = "966570083142";
    const message = `مرحباً، أود الاستفسار بخصوص السؤال: "${questionText}"`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // تقسيم الأسئلة إلى أزواج (كل صف يحتوي على بطاقتين) لتوزيع متناسق
  const faqsPairs = [];
  for (let i = 0; i < faqsList.length; i += 2) {
    faqsPairs.push(faqsList.slice(i, i + 2));
  }

  if (loading) {
    return (
      <section className="py-36 bg-[#FAF7F2] text-stone-900 flex items-center justify-center gap-3" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-[#133E2E]" />
        <span className="text-xl font-bold">جاري تحميل الأسئلة الشائعة...</span>
      </section>
    );
  }

  return (
    <section className="relative py-28 lg:py-40 bg-gradient-to-b from-[#FDFBF7] via-[#FAF7F2] to-[#F4EFE6] text-stone-900 overflow-hidden" dir="rtl">
      
      {/* خلفية فنية هادئة مريحة للعين */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#E9B18B]/15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#133E2E]/10 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* الترويسة العليا */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-white/80 border border-[#E9B18B]/50 text-[#133E2E] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#E9B18B]" />
            <span>استشارات وتوجيهات قانونية متكاملة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            الأسئلة الشائعة والخدمات القانونية
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            كل ما تحتاجه معرفته بخطوات واضحة، دقيقة، ومصممة براحة تامة لعين القارئ.
          </p>
        </div>

        {/* شبكة الصفوف (كل صف يحتوي على بطاقتين مستقلتين تماماً) */}
        {faqsList.length > 0 ? (
          <div className="space-y-6">
            {faqsPairs.map((pair, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {pair.map((faq) => {
                  const isOpen = openIndex === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className={`transition-all duration-500 rounded-3xl border flex flex-col backdrop-blur-sm ${
                        isOpen 
                          ? 'bg-white/95 border-[#133E2E]/40 shadow-2xl shadow-stone-300/50 ring-2 ring-[#133E2E]/5 transform -translate-y-1' 
                          : 'bg-white/60 hover:bg-white/90 border-stone-200/80 shadow-md hover:shadow-lg'
                      } overflow-hidden`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full flex items-center justify-between p-6 sm:p-7 text-right cursor-pointer gap-5 group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                            isOpen ? 'bg-[#133E2E] text-[#E9B18B]' : 'bg-[#FAF7F2] text-[#133E2E] group-hover:bg-[#133E2E]/10'
                          }`}>
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-[10px] text-[#133E2E] font-bold mb-1 uppercase tracking-wider">
                              {faq.category}
                            </span>
                            <span className="text-base sm:text-lg font-bold text-stone-800 tracking-tight leading-snug">
                              {faq.question}
                            </span>
                          </div>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#133E2E] text-[#E9B18B]' : 'bg-[#FAF7F2] text-stone-500 border border-stone-200'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 sm:px-7 pb-7 pt-2 space-y-6 border-t border-stone-100/80 bg-white animate-in fade-in duration-300">
                          <p className="text-stone-600 text-sm sm:text-base font-light leading-[1.9] pt-2">
                            {faq.answer}
                          </p>

                          <div>
                            <a 
                              href={getWhatsAppLink(faq.question)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-2xl bg-[#FAF7F2] hover:bg-[#133E2E] text-stone-800 hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 border border-[#E9B18B]/30 group/btn shadow-sm"
                            >
                              <MessageSquare className="w-4 h-4 text-[#133E2E] group-hover/btn:text-[#E9B18B]" />
                              <span>مناقشة التفاصيل عبر الواتساب</span>
                              <ArrowLeft className="w-4 h-4 text-[#133E2E] group-hover/btn:text-[#E9B18B] transform group-hover/btn:-translate-x-1 transition-transform mr-auto" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-stone-200">
            <p className="text-stone-600 text-lg font-bold">لا توجد أسئلة شائعة مضافة حالياً.</p>
          </div>
        )}

        {/* بطاقة تواصل سفلية راقية */}
        <div className="bg-gradient-to-r from-white via-[#FAF7F2] to-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-md text-center space-y-5 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#E9B18B]/10 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            تستهدف تأسيس منشأة وتحتاج لاستشارة خاصة؟
          </h3>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto">
            فريقنا القانوني جاهز دائماً لمساعدتك في اتخاذ الخطوة الصحيحة بكل ثقة واطمئنان.
          </p>
          <div className="pt-2">
            <a 
              href="https://wa.me/966570083142" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#133E2E] hover:bg-[#0f3225] text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-[#133E2E]/10 text-sm sm:text-base group"
            >
              <MessageSquare className="w-5 h-5 text-[#E9B18B]" />
              <span>تحدث مع مستشارنا الآن</span>
              <ArrowLeft className="w-4 h-4 text-[#E9B18B] transform group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
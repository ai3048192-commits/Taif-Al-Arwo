import React from "react";
import { Scale, Eye, FileText, CheckCircle2 } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section
      id="about" 
      className="relative py-28 lg:py-36 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] text-stone-900 overflow-hidden border-t border-stone-200/60"
      dir="rtl"
    >
      {/* خلفية جمالية هادئة ومنسجمة مع الهوية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#133E2E_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.015]"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#E9B18B]/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* عنوان القسم الرئيسي */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E9B18B]/50 text-[#133E2E] px-5 py-2 rounded-full text-sm font-bold tracking-wider shadow-sm uppercase">
            <Scale className="w-4 h-4 text-[#E9B18B]" />
            <span>نبذة عن الكيان القانوني</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900">
            من نحن
          </h2>
          <p className="text-stone-700 text-lg sm:text-xl font-normal leading-relaxed">
            مكتب قانوني متخصص يقدم خدمات قانونية متكاملة للأفراد والشركات
            والمستثمرين وفق أعلى المعايير المهنية ويضم نخبة من الكفاءات
            القانونية.
          </p>
        </div>

        {/* شبكة الرؤية والرسالة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* كارد الرؤية */}
          <div className="group relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-[#E9B18B]/30 hover:border-[#133E2E]/60 transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9B18B]/50 to-transparent group-hover:via-[#133E2E] transition-all duration-500"></div>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/60 flex items-center justify-center text-[#E9B18B] shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-7 h-7" />
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-stone-900 group-hover:text-[#133E2E] transition-colors">
                  الرؤية
                </h3>
                <p className="text-stone-700 text-lg font-normal leading-[1.9]">
                  أن نكون من المكاتب القانونية الرائدة في المملكة العربية
                  السعودية من خلال تقديم خدمات قانونية تعزز الثقة وترتقي بتجربة
                  العميل وتسهم في ترسيخ العدالة وسيادة القانون.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between text-sm font-bold text-[#133E2E]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E9B18B]" />
                ريادة وتميز مؤسسي
              </span>
              <span>رؤية 2030</span>
            </div>
          </div>

          {/* كارد الرسالة */}
          <div className="group relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-[#E9B18B]/30 hover:border-[#133E2E]/60 transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9B18B]/50 to-transparent group-hover:via-[#133E2E] transition-all duration-500"></div>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#133E2E] border border-[#E9B18B]/60 flex items-center justify-center text-[#E9B18B] shadow-lg group-hover:scale-110 transition-transform duration-500">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-stone-900 group-hover:text-[#133E2E] transition-colors">
                  الرسالة
                </h3>
                <p className="text-stone-700 text-lg font-normal leading-[1.9]">
                  تقديم حلول قانونية متكاملة ترتكز على الخبرة والاحترافية، بما
                  يحفظ حقوق عملائنا، ويحمي مصالحهم، ويعزز الثقة من خلال الالتزام
                  بأعلى المعايير المهنية ومبادئ العدالة.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between text-sm font-bold text-[#133E2E]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E9B18B]" />
                حماية وحفظ للحقوق
              </span>
              <span>احترافية وموثوقية</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
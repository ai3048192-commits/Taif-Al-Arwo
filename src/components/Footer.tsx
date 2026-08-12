import React from 'react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import logoImage from "../assets/logoo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [ 
    { name: "الرئيسية", href: "#home" },
    { name: "من نحن", href: "#about" },
    { name: "خدماتنا", href: "#services" },
    { name: "الأسئلة الشائعة", href: "#faqs" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  const servicesLinks = [
    { name: "تأسيس الشركات", href: "#services" },
    { name: "تأسيس الشركات الأجنبية", href: "#services" },
    { name: "التراخيص والاستثمار", href: "#services" },
    { name: "الحوكمة والامتثال", href: "#services" },
    { name: "الاستشارات القانونية", href: "#services" },
  ];

  return (
    <footer className="relative bg-[#0b1f17] text-white overflow-hidden border-t border-[#E9B18B]/30" dir="rtl">
      
      {/* خلفية جمالية هادئة تتناسب مع الهوية البصرية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#E9B18B_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.03]"></div>
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#E9B18B]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12">
        
        {/* شبكة الفوتر الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* العمود الأول: الشعار (4 أعمدة) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="transition-transform duration-500 hover:scale-105 inline-block">
              <img 
                src={logoImage} 
                alt="شعار المحامية طيف العروي" 
                className="w-36 h-36 sm:w-44 sm:h-44 object-contain filter drop-shadow-lg"
              />
            </div>

            <p className="text-stone-300 text-base leading-relaxed font-normal">
              مكتب قانوني متخصص يقدم خدمات قانونية متكاملة للأفراد والشركات والمستثمرين وفق أعلى المعايير المهنية، ويضم نخبة من الكفاءات القانونية المعتمدة لترسيخ العدالة وحماية مصالحك.
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة (2 عمود) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-lg font-bold text-white border-r-2 border-[#E9B18B] pr-3">
              روابط سريعة
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-stone-300 hover:text-[#E9B18B] text-base transition-colors flex items-center gap-2.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9B18B]/50 group-hover:bg-[#E9B18B] transition-colors"></span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: أبرز الخدمات (3 أعمدة) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-lg font-bold text-white border-r-2 border-[#E9B18B] pr-3">
              أبرز الخدمات
            </h4>
            <ul className="space-y-3.5">
              {servicesLinks.map((service, idx) => (
                <li key={idx}>
                  <a 
                    href={service.href}
                    className="text-stone-300 hover:text-[#E9B18B] text-base transition-colors flex items-center gap-2.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9B18B]/50 group-hover:bg-[#E9B18B] transition-colors"></span>
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الرابع: معلومات التواصل (3 أعمدة) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-lg font-bold text-white border-r-2 border-[#E9B18B] pr-3">
              تواصل معنا
            </h4>
            <div className="space-y-4 text-stone-300 text-base">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E9B18B] shrink-0 mt-1" />
                <span className="leading-relaxed">المملكة العربية السعودية، المدينة المنورة، حي الشريبات، طريق الأمير عبدالمجيد بن عبدالعزيز</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-[#E9B18B] shrink-0" />
                <a href="tel:+966536939093" className="font-mono hover:text-[#E9B18B] transition-colors" dir="ltr">
                  +966 53 693 9093
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E9B18B] shrink-0" />
                <span>taifalarwi.law@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* الشريط السفلي لحقوق الطبع والنشر */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-stone-300 gap-4">
          <p>
            جميع الحقوق محفوظة © {currentYear} المكتب القانوني. تم التطوير بعناية فائقة.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#E9B18B] transition-colors">سياسة الخصوصية</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#E9B18B] transition-colors">الشروط والأحكام</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
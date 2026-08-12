import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  PhoneCall,
  Send,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  FileText,
  Share2,
  MessageSquarePlus,
  Loader2,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consultationType, setConsultationType] = useState(
    "استشارة قانونية عامة",
  );
  const [customCase, setCustomCase] = useState("");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalConsultationType = 
        consultationType === "اكتب قضيتك" && customCase.trim() !== "" 
          ? customCase 
          : consultationType;

      const { error } = await supabase
        .from('consultation_requests')
        .insert([
          {
            name: name,
            phone: phone,
            consultation_type: finalConsultationType,
            message: message,
            status: 'active'
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      setName("");
      setPhone("");
      setMessage("");
      setCustomCase("");
    } catch (error) {
      console.error('خطأ أثناء إرسال الطلب:', error);
      alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى: ' + (error.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: <FaXTwitter className="w-5 h-5" />, name: "منصة إكس", href: "https://x.com/tiaflaw" },
  ];

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative py-28 lg:py-36 bg-[#FAF7F2] overflow-hidden border-t border-stone-200 text-stone-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* عنوان القسم */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#133E2E]/10 text-[#133E2E] text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#E9B18B]" />
            <span>نحن هنا لخدمتك ودعمك قانونياً</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 mb-4 leading-tight">
            احجز استشارتك <span className="text-[#133E2E]">القانونية الآن</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            املأ النموذج أدناه بدقة، وسيتواصل معك نخبة من مستشارينا بكل سرية واحترافية.
          </p>
        </div>

        {/* الكارت الموحد المقسم (Split Card Layout) */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* الجانب الأيسر (معلومات التواصل بأسلوب فخم وداكن) */}
          <div className="lg:col-span-5 bg-[#133E2E] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#E9B18B]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-10 left-10 text-white/5 pointer-events-none">
              <Scale className="w-56 h-56" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex p-3.5 rounded-2xl bg-white/10 text-[#E9B18B] mb-8 border border-white/10 shadow-md">
                <PhoneCall className="w-6 h-6 -scale-x-100" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">معلومات التواصل</h3>
              <p className="text-stone-300 text-base mb-10 leading-relaxed font-normal">
                يسعدنا زيارتكم لمكتبنا أو التواصل معنا عبر القنوات الرسمية خلال ساعات العمل.
              </p>

              <div className="space-y-6 text-base">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-[#E9B18B] shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white text-base mb-1 font-bold">العنوان الرئيسي</strong>
                    <span className="text-stone-300 leading-relaxed block text-sm sm:text-base">
                      المملكة العربية السعودية، المدينة المنورة، حي الشريبات، طريق الأمير عبدالمجيد بن عبدالعزيز
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-[#E9B18B] shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white text-base mb-1 font-bold">البريد الإلكتروني</strong>
                    <span className="text-stone-300 text-sm sm:text-base">taifalarwi.law@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-[#E9B18B] shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white text-base mb-1 font-bold">ساعات العمل</strong>
                    <span className="text-stone-300 text-sm sm:text-base">الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً</span>
                  </div>
                </div>
              </div>
            </div>

            {/* الخريطة المصغرة وشبكات التواصل في الأسفل */}
            <div className="relative z-10 mt-10 pt-8 border-t border-white/15">
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-inner">
                <iframe
                  title="موقع المكتب على خريطة جوجل"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.237241289196!2d39.6112!3d24.4709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI4JzE1LjIiTiAzOcKwMzYnNDAuMyJF!5e0!3m2!1sar!2ssa!4v1650000000000!5m2!1sar!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-300 font-medium">تابعنا على المنصات الرقمية</span>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#E9B18B] hover:text-[#133E2E] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* الجانب الأيمن (النموذج) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 bg-white flex flex-col justify-center">
            
            {submitted ? (
              <div className="py-20 text-center space-y-6 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-[#133E2E] text-[#E9B18B] rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  تم إرسال طلبك بنجاح!
                </h3>
                <p className="text-stone-600 max-w-md mx-auto text-base leading-relaxed">
                  شكراً لتواصلك معنا. تم حفظ طلبك وسيقوم فريقنا القانوني بمراجعته والاتصال بك في أقرب وقت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-8 py-3.5 rounded-xl bg-[#133E2E] text-[#E9B18B] hover:bg-[#0f3225] text-base font-bold transition-all cursor-pointer shadow-md"
                >
                  إرسال استشارة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* الاسم الكريم */}
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-2.5">
                      الاسم الكريم <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-stone-400">
                        <User className="w-5 h-5" />
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أدخل اسمك الثلاثي"
                        className="w-full bg-[#FAF7F2] border border-stone-200 rounded-2xl pr-12 pl-4 py-3.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#133E2E] focus:ring-1 focus:ring-[#133E2E] text-base font-normal transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* رقم الجوال */}
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-2.5">
                      رقم الجوال <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-stone-400">
                        <Phone className="w-5 h-5 -scale-x-100" />
                      </span>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full bg-[#FAF7F2] border border-stone-200 rounded-2xl pr-4 pl-12 py-3.5 text-stone-900 placeholder-stone-400 text-right focus:outline-none focus:border-[#133E2E] focus:ring-1 focus:ring-[#133E2E] text-base font-normal transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* نوع الاستشارة */}
                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2.5">
                    نوع الاستشارة المطلوبة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-200 rounded-2xl px-4 py-3.5 text-stone-900 focus:outline-none focus:border-[#133E2E] focus:ring-1 focus:ring-[#133E2E] text-base font-normal transition-all shadow-inner cursor-pointer"
                  >
                    <option value="استشارة قانونية عامة">استشارة قانونية عامة</option>
                    <option value="تأسيس الشركات">تأسيس الشركات</option>
                    <option value="قضايا تجارية">قضايا تجارية</option>
                    <option value="تركات ومواريث">تركات ومواريث</option>
                    <option value="اكتب قضيتك">اكتب قضيتك بنفسك...</option>
                  </select>
                </div>

                {/* حقل مخصص يظهر عند اختيار اكتب قضيتك */}
                {consultationType === "اكتب قضيتك" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-bold text-[#133E2E] mb-2.5 flex items-center gap-2">
                      <MessageSquarePlus className="w-5 h-5 text-[#E9B18B]" />
                      <span>اكتب تفاصيل قضيتك أو تخصصك بدقة</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customCase}
                      onChange={(e) => setCustomCase(e.target.value)}
                      placeholder="مثال: نزاع عقاري تجاري، قضية عمالية..."
                      className="w-full bg-[#FAF7F2] border border-[#133E2E]/40 rounded-2xl px-4 py-3.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#133E2E] text-base font-normal transition-all shadow-inner"
                    />
                  </div>
                )}

                {/* تفاصيل الاستفسار */}
                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2.5">
                    تفاصيل وملخص الاستفسار <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute top-4 right-4 pointer-events-none text-stone-400">
                      <FileText className="w-5 h-5" />
                    </span>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اشرح باختصار موضوع الاستشارة..."
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-2xl pr-12 pl-4 py-3.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#133E2E] focus:ring-1 focus:ring-[#133E2E] text-base font-normal transition-all shadow-inner resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* ملاحظة السرية */}
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                  <ShieldCheck className="w-5 h-5 text-[#133E2E] shrink-0" />
                  <span>جميع بياناتك تحظى بالسرية التامة وفقاً لنظام المحاماة السعودي.</span>
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex items-center justify-center gap-3 bg-[#133E2E] hover:bg-[#0f3225] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#133E2E]/10 text-base cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#E9B18B]" />
                      <span>جاري حفظ الطلب بالداشبورد...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال الطلب وحجز الموعد</span>
                      <Send className="w-5 h-5 text-[#E9B18B] transform group-hover:-translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, X, Bookmark, ExternalLink, BookOpen, Clock, UserCheck, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ArticlesSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("law_articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticlesList(data || []);
    } catch (error) {
      console.error("خطأ في جلب المقالات:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-28 text-stone-900 flex items-center justify-center gap-3 bg-white" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-[#133E2E]" />
        <span className="text-xl font-bold">جاري تحميل المقالات والتحليلات القانونية...</span>
      </div>
    );
  }

  return (
    <section id="articles" dir="rtl" className="pt-36 sm:pt-44 pb-28 bg-white relative overflow-hidden">
      
      {/* خلفية جمالية خفيفة متناسقة مع الألوان */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#133E2E]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E9B18B]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* رأس القسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-stone-200/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#133E2E]/5 text-[#133E2E] text-sm font-extrabold tracking-wider mb-4 border border-[#133E2E]/10">
              <Sparkles className="w-4 h-4 text-[#E9B18B]" />
              <span>الوعي القانوني</span>
            </div>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              المقالات والمدونة القانونية
            </h3>
          </div>
          <p className="mt-4 md:mt-0 text-stone-600 text-base max-w-md leading-relaxed">
            إضاءات معرفية وتفسيرات مبسطة لأحدث الأنظمة واللوائح والقرارات في المملكة العربية السعودية.
          </p>
        </div>

        {/* شبكة المقالات */}
        {articlesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articlesList.map((article, index) => (
              <article 
                key={article.id}
                className="bg-stone-50/80 border border-stone-200/90 rounded-3xl p-8 flex flex-col justify-between hover:border-[#133E2E]/40 hover:bg-white hover:-translate-y-1.5 transition-all duration-500 group shadow-sm hover:shadow-2xl relative overflow-hidden"
              >
                {/* شريط علوي خفيف للبطاقة */}
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-transparent via-[#133E2E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-black tracking-widest text-stone-400 font-mono">
                      0{index + 1}
                    </span>
                    <span className="px-4 py-1.5 bg-[#133E2E]/5 text-[#133E2E] text-xs font-bold rounded-xl border border-[#133E2E]/10">
                      {article.category}
                    </span>
                  </div>

                  <h4 className="text-2xl font-extrabold text-stone-900 group-hover:text-[#133E2E] transition-colors leading-snug mb-4">
                    {article.title}
                  </h4>

                  <p className="text-stone-600 text-sm leading-relaxed mb-8 line-clamp-3">
                    {article.desc}
                  </p>
                </div>

                <div>
                  <div className="mb-5 pt-4 border-t border-stone-200/60 text-xs text-stone-500 font-medium flex items-center justify-between">
                    <span className="text-stone-400">المصدر:</span>
                    <span className="text-stone-700 font-bold truncate max-w-[180px]">{article.source_name || "المكتب القانوني"}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#E9B18B]" />
                      <span>{article.date}</span>
                    </div>

                    <button 
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#133E2E] hover:text-[#E9B18B] transition-colors cursor-pointer group/btn py-1 px-3 rounded-lg hover:bg-[#133E2E]/5"
                    >
                      <span>اقرأ كاملًا</span>
                      <ArrowLeft className="w-4 h-4 transform group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200 shadow-inner">
            <p className="text-stone-600 text-lg font-bold">لا توجد مقالات منشورة حالياً.</p>
          </div>
        )}

      </div>

      {/* نافذة قراءة المقال التفصيلية */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] max-w-3xl w-full p-8 sm:p-12 shadow-2xl relative border border-stone-100 max-h-[90vh] overflow-y-auto">
            
            {/* زر الإغلاق */}
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 left-6 p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors shadow-sm cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* تصنيف المقال ومعلومات الكاتب */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 pr-2">
              <span className="px-3.5 py-1.5 bg-[#133E2E]/10 text-[#133E2E] text-xs font-bold rounded-xl flex items-center gap-1.5 border border-[#133E2E]/10">
                <Bookmark className="w-3.5 h-3.5 text-[#E9B18B]" />
                {selectedArticle.category}
              </span>
              <span className="px-3.5 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium rounded-xl flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E9B18B]" />
                {selectedArticle.read_time}
              </span>
              <span className="px-3.5 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium rounded-xl flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#133E2E]" />
                {selectedArticle.author || "المحامية طيف العروي"}
              </span>
            </div>

            {/* عنوان المقال الرئيسي */}
            <h4 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-6 leading-tight">
              {selectedArticle.title}
            </h4>

            {/* تاريخ النشر */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-8 pb-6 border-b border-stone-200 font-medium">
              <Calendar className="w-4 h-4 text-[#E9B18B]" />
              <span>تاريخ النشر: {selectedArticle.date}</span>
            </div>

            {/* المحتوى التفصيلي */}
            <div className="text-stone-700 text-base sm:text-lg leading-loose space-y-8">
              {selectedArticle.overview && (
                <div className="font-bold text-stone-900 text-lg sm:text-xl leading-relaxed bg-stone-50/80 p-6 sm:p-8 rounded-2xl border-r-4 border-[#133E2E] border-y border-l border-stone-200/60 shadow-sm">
                  {selectedArticle.overview}
                </div>
              )}

              {selectedArticle.sections && selectedArticle.sections.map((section, idx) => (
                <div key={idx} className="space-y-3 pt-2">
                  <h5 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E9B18B] shrink-0"></span>
                    {section.subtitle}
                  </h5>
                  <p className="text-stone-600 leading-relaxed pr-5 text-base">
                    {section.text}
                  </p>
                </div>
              ))}

              {selectedArticle.conclusion && (
                <div className="text-stone-800 font-medium pt-6 border-t border-stone-200/80 bg-[#133E2E]/[0.02] p-6 rounded-2xl border border-[#133E2E]/10">
                  {selectedArticle.conclusion}
                </div>
              )}
              
              {/* صندوق المصدر والرابط الرسمي */}
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-stone-600">
                  <span className="font-extrabold text-stone-900 block mb-1 text-sm">المصدر الرسمي المعتمد:</span>
                  <span className="text-stone-700 font-medium">{selectedArticle.source_name || "المكتب القانوني"}</span>
                </div>
                {selectedArticle.source_url && (
                  <a 
                    href={selectedArticle.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#133E2E] text-white text-sm font-bold rounded-xl hover:bg-[#0f3225] transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#E9B18B]" />
                    <span>اطلع على المصدر</span>
                    <ExternalLink className="w-4 h-4 text-[#E9B18B]" />
                  </a>
                )}
              </div>
            </div>

            {/* زر الإغلاق السفلي */}
            <div className="mt-10 pt-6 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-extrabold transition-all shadow-lg cursor-pointer"
              >
                إغلاق المقال
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
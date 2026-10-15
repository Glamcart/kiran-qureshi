import React from 'react';
import { journalArticles } from '../data/journal';
import { JournalArticle } from '../types';
import { Clock, Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface JournalPageProps {
  onSelectArticle: (article: JournalArticle) => void;
  onExploreProducts: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  onSelectArticle,
  onExploreProducts
}) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A62970] mb-2">
          <BookOpen className="w-3.5 h-3.5 text-[#D7B77A]" />
          <span>The Veloura Journal</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#38203F] tracking-tight">
          Mindful Beauty & <span className="italic text-[#A62970]">Rituals</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#777078] mt-2 leading-relaxed">
          Expert skincare philosophies, formulation breakdowns, and Parisienne makeup rituals curated by our in-house dermatologists and artists.
        </p>
      </div>

      {/* Hero Featured Article */}
      {journalArticles.length > 0 && (
        <div
          onClick={() => onSelectArticle(journalArticles[0])}
          className="bg-white border border-[#EDE2E9] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer mb-12 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#FCF4F7]">
              <img
                src={journalArticles[0].image}
                alt={journalArticles[0].title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#FCF4F7] text-[#A62970] border border-[#EDE2E9] mb-3">
                  Editor's Pick · {journalArticles[0].category}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#38203F] group-hover:text-[#A62970] transition-colors leading-tight mb-3">
                  {journalArticles[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-[#777078] leading-relaxed mb-6">
                  {journalArticles[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDE2E9] flex items-center justify-between text-xs text-[#777078]">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-[#242026]">{journalArticles[0].author}</span>
                  <span>·</span>
                  <span>{journalArticles[0].readTime}</span>
                </div>
                <div className="flex items-center gap-1 text-[#A62970] font-bold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {journalArticles.slice(1).map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex flex-col justify-between bg-white border border-[#EDE2E9] rounded-2xl overflow-hidden hover:border-[#A62970]/40 hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="relative aspect-[4/3] bg-[#FCF4F7] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold uppercase tracking-wider text-[#851C5A] px-2.5 py-1 rounded-full shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-[#777078] mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A62970]" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-editorial text-lg font-semibold text-[#242026] group-hover:text-[#A62970] transition-colors leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#777078] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A62970] group-hover:text-[#851C5A] transition-colors">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Editorial Callout */}
      <div className="mt-16 p-8 bg-gradient-to-r from-[#F8EAF1] via-[#FCF4F7] to-[#FFF9F4] rounded-3xl border border-[#EDE2E9] text-center max-w-xl mx-auto">
        <Sparkles className="w-6 h-6 text-[#D7B77A] mx-auto mb-2" />
        <h3 className="font-editorial text-xl font-semibold text-[#38203F] mb-1">
          Ready to experience the rituals?
        </h3>
        <p className="text-xs text-[#777078] mb-5">
          Explore the cruelty-free formulations developed in collaboration with our master colorists.
        </p>
        <button
          onClick={onExploreProducts}
          className="bg-[#A62970] hover:bg-[#851C5A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          Discover The Catalog
        </button>
      </div>

    </div>
  );
};

import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { journalArticles } from '../data/journal';
import { JournalArticle } from '../types';

interface JournalSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
  onViewAllArticles: () => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  onSelectArticle,
  onViewAllArticles
}) => {
  return (
    <section aria-labelledby="journal-heading" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-[#EDE2E9]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A62970] mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#D7B77A]" />
            <span>Editorial Journal</span>
          </div>
          <h2 id="journal-heading" className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#38203F]">
            The Beauty <span className="italic text-[#A62970]">Edit</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#777078] mt-1">
            Fresh inspiration and mindful rituals for your everyday glow.
          </p>
        </div>

        <button
          onClick={onViewAllArticles}
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#A62970] hover:text-[#851C5A] transition-colors group cursor-pointer self-start sm:self-auto"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {journalArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex flex-col justify-between bg-white border border-[#EDE2E9] rounded-2xl overflow-hidden hover:border-[#A62970]/40 hover:shadow-lg transition-all duration-300"
          >
            <div>
              {/* Image with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] bg-[#FCF4F7] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                
                {/* Category chip */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#851C5A] px-2.5 py-1 rounded-full shadow-xs">
                  {article.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-[#777078] mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A62970]" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#242026] group-hover:text-[#A62970] transition-colors leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#777078] line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Read Story link */}
            <div className="px-5 pb-5 pt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A62970] group-hover:text-[#851C5A] transition-colors">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
};

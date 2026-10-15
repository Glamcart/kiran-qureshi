import React from 'react';
import { X, Clock, Calendar, User, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { JournalArticle } from '../types';
import { useToast } from '../context/ToastContext';

interface JournalArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const JournalArticleModal: React.FC<JournalArticleModalProps> = ({
  article,
  onClose,
  onExploreProducts
}) => {
  const { showToast } = useToast();

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article link copied to clipboard', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EDE2E9] z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Top Controls */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-[#777078] hover:text-[#242026] shadow-md transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-[#777078] hover:text-[#242026] shadow-md transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-[#777078] hover:text-[#242026] shadow-md transition-colors"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-[#FCF4F7] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#A62970] text-white">
              {article.category}
            </span>
            <h2 id="article-modal-title" className="font-editorial text-2xl sm:text-3xl font-semibold mt-2 leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Article Meta */}
        <div className="px-6 sm:px-10 py-4 bg-[#FCF4F7] border-b border-[#EDE2E9] flex flex-wrap items-center justify-between gap-4 text-xs text-[#777078]">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#A62970]" />
            <span className="font-medium text-[#242026]">{article.author}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A62970]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A62970]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Content Prose */}
        <div className="p-6 sm:p-10 max-h-[50vh] overflow-y-auto space-y-4 text-sm text-[#242026] leading-relaxed">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="first:text-base first:font-medium first:text-[#38203F]">
              {paragraph}
            </p>
          ))}

          {/* Curated ritual box */}
          <div className="mt-8 p-6 bg-[#F8EAF1]/60 rounded-2xl border border-[#EDE2E9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#851C5A] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
                <span>Featured Ritual Essentials</span>
              </div>
              <h4 className="font-editorial text-base font-semibold text-[#38203F]">
                Elevate your daily glow with the products mentioned in this edit
              </h4>
            </div>
            <button
              onClick={() => {
                onClose();
                onExploreProducts();
              }}
              className="bg-[#A62970] hover:bg-[#851C5A] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-xs"
            >
              Shop The Edit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

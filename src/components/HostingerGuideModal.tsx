import React, { useState } from 'react';
import { X, Copy, Check, Server, Upload, Globe, Shield } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface HostingerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedHtaccess, setCopiedHtaccess] = useState(false);
  const [copiedBuild, setCopiedBuild] = useState(false);

  if (!isOpen) return null;

  const handleCopyHtaccess = () => {
    navigator.clipboard.writeText(siteConfig.hostingerDeployment.htaccessContent);
    setCopiedHtaccess(true);
    setTimeout(() => setCopiedHtaccess(false), 2500);
  };

  const handleCopyBuild = () => {
    navigator.clipboard.writeText('npm run build');
    setCopiedBuild(true);
    setTimeout(() => setCopiedBuild(false), 2500);
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
        aria-labelledby="hostinger-guide-title"
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2E9] z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#2E1738] to-[#851C5A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D7B77A]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 id="hostinger-guide-title" className="font-editorial text-xl sm:text-2xl font-semibold">
                Hostinger Deployment Guide
              </h3>
              <p className="text-xs text-[#D8B4C8]">
                Production static hosting ready for public_html
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-xs text-[#242026]">
          
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-[#FCF4F7] border border-[#A62970] text-[#A62970] font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-[#38203F] mb-1">
                Compile the Production Bundle
              </h4>
              <p className="text-[#777078] mb-2 leading-relaxed">
                Run the build command to generate optimized static HTML, CSS, JavaScript, and assets into the <code>dist/</code> folder.
              </p>
              <div className="flex items-center justify-between bg-slate-900 text-slate-100 px-3.5 py-2.5 rounded-xl font-mono text-xs">
                <span>npm run build</span>
                <button
                  onClick={handleCopyBuild}
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedBuild ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBuild ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-[#FCF4F7] border border-[#A62970] text-[#A62970] font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-[#38203F] mb-1">
                Upload to Hostinger File Manager
              </h4>
              <p className="text-[#777078] mb-2 leading-relaxed">
                Log into Hostinger <strong>hPanel</strong> &gt; <strong>File Manager</strong>. Navigate to your domain's <code>public_html/</code> directory. Upload the contents of your local <code>dist/</code> folder directly into <code>public_html/</code> (including <code>index.html</code>, <code>assets/</code>, and bundled images).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-[#FCF4F7] border border-[#A62970] text-[#A62970] font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-[#38203F] mb-1">
                Create the .htaccess Fallback Rule
              </h4>
              <p className="text-[#777078] mb-2 leading-relaxed">
                Because this is a single-page React application, Hostinger needs a standard <code>.htaccess</code> file in <code>public_html/</code> to route browser refreshes smoothly back to <code>index.html</code> without 404 errors.
              </p>

              <div className="relative bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto">
                <pre>{siteConfig.hostingerDeployment.htaccessContent}</pre>
                <button
                  onClick={handleCopyHtaccess}
                  className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-1 text-[11px] transition-colors"
                >
                  {copiedHtaccess ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHtaccess ? 'Copied' : 'Copy Rule'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-[#FCF4F7] border border-[#A62970] text-[#A62970] font-bold flex items-center justify-center shrink-0">
              4
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-[#38203F] mb-1">
                Enable Free SSL & Domain in Hostinger
              </h4>
              <p className="text-[#777078] leading-relaxed">
                In hPanel, navigate to <strong>Security &gt; SSL</strong> and activate your Lifetime Free SSL certificate. The website will immediately load over secure HTTPS.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FCF4F7] border-t border-[#EDE2E9] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

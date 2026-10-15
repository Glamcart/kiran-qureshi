import React, { useState } from 'react';
import { X, User, Package, MapPin, Award, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface DemoAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoAccountModal: React.FC<DemoAccountModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'profile' | 'signin' | 'register'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Signed in successfully to demonstration session', 'success');
    setTab('profile');
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
        aria-labelledby="account-modal-title"
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#EDE2E9] z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FCF4F7] hover:bg-[#EDE2E9] text-[#777078] hover:text-[#242026] flex items-center justify-center transition-colors"
          aria-label="Close account modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-[#FCF4F7] border-b border-[#EDE2E9] text-center">
          <div className="w-12 h-12 rounded-full bg-[#F8EAF1] border border-[#A62970]/30 text-[#A62970] mx-auto flex items-center justify-center mb-2">
            <User className="w-6 h-6" />
          </div>
          <h3 id="account-modal-title" className="font-editorial text-2xl font-semibold text-[#38203F]">
            Veloura Beauty Club
          </h3>
          <p className="text-xs text-[#777078] mt-0.5">
            Demonstration Member Portal & Order Management
          </p>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-2 mt-4 bg-white/70 p-1 rounded-xl border border-[#EDE2E9] max-w-xs mx-auto">
            <button
              onClick={() => setTab('profile')}
              className={`flex-1 py-1 px-3 text-xs font-semibold rounded-lg transition-colors ${
                tab === 'profile'
                  ? 'bg-[#A62970] text-white shadow-xs'
                  : 'text-[#777078] hover:text-[#242026]'
              }`}
            >
              Demo Profile
            </button>
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-1 px-3 text-xs font-semibold rounded-lg transition-colors ${
                tab === 'signin'
                  ? 'bg-[#A62970] text-white shadow-xs'
                  : 'text-[#777078] hover:text-[#242026]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-1 px-3 text-xs font-semibold rounded-lg transition-colors ${
                tab === 'register'
                  ? 'bg-[#A62970] text-white shadow-xs'
                  : 'text-[#777078] hover:text-[#242026]'
              }`}
            >
              Join Free
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {tab === 'profile' && (
            <div className="space-y-5">
              {/* Member Status Card */}
              <div className="bg-gradient-to-r from-[#F8EAF1] to-[#FFF9F4] p-4 rounded-2xl border border-[#EDE2E9] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#851C5A] uppercase tracking-wider">
                    <Award className="w-4 h-4 text-[#D7B77A]" />
                    <span>Veloura Gold Tier Member</span>
                  </div>
                  <div className="text-sm font-semibold text-[#242026] mt-0.5">
                    Elena Laurent
                  </div>
                  <div className="text-xs text-[#777078]">elena.laurent@example.com</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#A62970]">280 Points</div>
                  <div className="text-[10px] text-[#777078]">$15 reward ready</div>
                </div>
              </div>

              {/* Sample Orders */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#777078] mb-2.5 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#A62970]" />
                  <span>Recent Order History</span>
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-[#FCF4F7]/60 rounded-xl border border-[#EDE2E9] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#242026]">Order #VB-2026-8921</div>
                      <div className="text-[#777078] text-[11px]">2 items · Delivered Oct 10, 2026</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#38203F]">$43.98</div>
                      <span className="text-[10px] font-semibold text-[#287A52] flex items-center gap-0.5 justify-end">
                        <CheckCircle2 className="w-3 h-3" /> Delivered
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Address */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#777078] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A62970]" />
                  <span>Primary Shipping Address</span>
                </h4>
                <div className="p-3 bg-white rounded-xl border border-[#EDE2E9] text-xs text-[#777078]">
                  <div className="font-medium text-[#242026]">Elena Laurent</div>
                  <div>742 Evergreen Terrace, Apt 4B</div>
                  <div>New York, NY 10001, United States</div>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3 bg-[#F8EAF1]/70 rounded-xl border border-[#A62970]/20 flex items-start gap-2 text-xs text-[#851C5A]">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  This demonstration account profile showcases the finished client-side user experience. Connect your authentication API or Supabase/Firebase backend whenever you want real user accounts.
                </span>
              </div>
            </div>
          )}

          {(tab === 'signin' || tab === 'register') && (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#242026] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3.5 py-2.5 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242026] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3.5 py-2.5 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                {tab === 'signin' ? 'Sign In to Demo Account' : 'Create Free Demo Account'}
              </button>

              <p className="text-[11px] text-[#777078] text-center">
                Client-ready storefront demo. No password will be stored.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

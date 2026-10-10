import React, { useState } from 'react';
import { Smartphone, Download, X, Share, PlusSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t, language } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled) {
    return (
      <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>{t.activeStandalone}</strong></span>
        </div>
        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-full font-medium">Active</span>
      </div>
    );
  }

  if (dismissed && !showIOSGuide) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white rounded-2xl p-4 shadow-lg shadow-emerald-700/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
              <img src="/logo.png" alt="TreeHealthAI Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-base">
                <span>{t.installAppPhone}</span>
                <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full font-semibold">{t.freeApp}</span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {t.worksOffline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isInstallable && (
              <button
                onClick={install}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-md transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                {t.installNow}
              </button>
            )}

            {isIOS && (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-md transition active:scale-95"
              >
                <Share className="w-4 h-4" />
                {t.installOnIphone}
              </button>
            )}

            {!isInstallable && !isIOS && (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-md transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                {t.howToInstall}
              </button>
            )}

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Install Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>{language === 'or' ? 'ମୋବାଇଲ୍ ଫୋନରେ ଇନଷ୍ଟଲ କରନ୍ତୁ' : language === 'hi' ? 'मोबाइल फोन पर इंस्टॉल करें' : 'Install on Any Mobile Device'}</span>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-sm text-gray-600">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {language === 'or'
                    ? 'TreeHealthAI ଏକ ନିରାପଦ Progressive Web App (PWA)। ଏହା ଆପଣଙ୍କ ଫୋନ୍ ହୋମ୍ ସ୍କ୍ରିନରେ ସିଧାସଳଖ ଇନଷ୍ଟଲ ହୁଏ ଏବଂ ବିଲରେ ଅଫଲାଇନ୍ କାମ କରେ।'
                    : language === 'hi'
                    ? 'TreeHealthAI एक सुरक्षित Progressive Web App (PWA) है। यह आपके फोन के होम स्क्रीन पर सीधे इंस्टॉल होता है और खेत में ऑफलाइन भी काम करता है।'
                    : 'TreeHealthAI is a secure Progressive Web App (PWA). It installs directly to your home screen with zero storage bloat, instant launch, and offline caching.'}
                </p>
              </div>

              {/* iOS Safari Guide */}
              <div className="border border-gray-200 rounded-xl p-3.5 space-y-2.5">
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">iOS</span>
                  <span>Apple iPhone / iPad (Safari)</span>
                </div>
                <ol className="text-xs space-y-2 list-decimal list-inside pl-1 text-gray-600">
                  <li>{language === 'or' ? 'ସଫାରୀ (Safari) ବ୍ରାଉଜରରେ ଏହି ୱେବସାଇଟ୍ ଖୋଲନ୍ତୁ।' : language === 'hi' ? 'सफारी (Safari) ब्राउज़र में यह वेबसाइट खोलें।' : 'Open this website in Safari browser.'}</li>
                  <li className="flex items-center gap-1.5 flex-wrap">
                    <span>{language === 'or' ? 'ତଳେ ଥିବା' : language === 'hi' ? 'नीचे दिए गए' : 'Tap the'}</span>
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-800">
                      <Share className="w-3 h-3" /> Share
                    </span>
                    <span>{language === 'or' ? 'ବଟନ୍ ଟ୍ୟାପ୍ କରନ୍ତୁ।' : language === 'hi' ? 'बटन पर टैप करें।' : 'button.'}</span>
                  </li>
                  <li className="flex items-center gap-1.5 flex-wrap">
                    <span>{language === 'or' ? 'ତଳକୁ ସ୍କ୍ରୋଲ୍ କରି' : language === 'hi' ? 'नीचे स्क्रॉल करके' : 'Scroll down and select'}</span>
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-800">
                      <PlusSquare className="w-3 h-3" /> Add to Home Screen
                    </span>
                    <span>{language === 'or' ? 'ବାଛନ୍ତୁ।' : language === 'hi' ? 'चुनें।' : '.'}</span>
                  </li>
                  <li>{language === 'or' ? 'ଉପରେ Add କ୍ଲିକ୍ କରନ୍ତୁ। ଆପ୍ ପ୍ରସ୍ତୁତ!' : language === 'hi' ? 'ऊपर Add पर टैप करें। ऐप तैयार है!' : 'Tap Add. Done!'}</li>
                </ol>
              </div>

              {/* Android / Chrome Guide */}
              <div className="border border-gray-200 rounded-xl p-3.5 space-y-2.5">
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">Android</span>
                  <span>Android (Chrome / Samsung Internet)</span>
                </div>
                <ol className="text-xs space-y-2 list-decimal list-inside pl-1 text-gray-600">
                  <li>{language === 'or' ? 'କ୍ରୋମର ୩ଟି ବିନ୍ଦୁ (⋮) ମେନୁ ଟ୍ୟାପ୍ କରନ୍ତୁ।' : language === 'hi' ? 'क्रोम के 3 डॉट्स (⋮) मेनू पर टैप करें।' : 'Tap the three dots (⋮) menu in Chrome.'}</li>
                  <li>{language === 'or' ? '"Install app" କିମ୍ବା "Add to Home screen" ଟ୍ୟାପ୍ କରନ୍ତୁ।' : language === 'hi' ? '"Install app" या "Add to Home screen" चुनें।' : 'Tap "Install app" or "Add to Home screen".'}</li>
                  <li>{language === 'or' ? 'ନିଶ୍ଚିତ କରନ୍ତୁ। ଆପଣଙ୍କ ଫୋନରେ ଆପ୍ ଆସିଯିବ!' : language === 'hi' ? 'पुष्टि करें। ऐप आपके फोन पर आ जाएगा!' : 'Confirm installation.'}</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-sm transition"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

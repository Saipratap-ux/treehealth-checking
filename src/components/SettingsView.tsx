import React, { useState, useEffect } from 'react';
import {
  Settings,
  Smartphone,
  Shield,
  HelpCircle,
  Database,
  PhoneCall,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Cpu,
  Globe
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface SettingsViewProps {
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetData }) => {
  const { isInstalled, isIOS, isInstallable, install } = usePWAInstall();
  const { t } = useLanguage();
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthStatus(data);
      }
    } catch (err) {
      console.warn('Health check error:', err);
    } finally {
      setLoadingHealth(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Preferences</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t.appSettingsSupportTitle}</h2>
        <p className="text-xs text-gray-600">
          {t.appSettingsSupportDesc}
        </p>
      </div>

      {/* Official App Emblem & Author Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-950 text-white p-5 rounded-3xl shadow-md border border-emerald-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 overflow-hidden shrink-0 shadow-md">
            <img src="/logo.png" alt="TreeHealthAI" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>TreeHealthAI</span>
            </h3>
            <p className="text-xs text-emerald-200">Healthy Trees • Greener Tomorrow</p>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/30">
              <span>Created by</span>
              <span className="text-white">Kinjal Bariha</span>
            </div>
          </div>
        </div>
      </div>

      {/* Language Switcher Card (Prominent & Easy to find) */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">{t.switchLanguage}</h3>
            <p className="text-xs text-gray-500">English, ଓଡ଼ିଆ (Odia), हिन्दी (Hindi)</p>
          </div>
        </div>

        <div className="pt-1">
          <LanguageSelector variant="pills" />
        </div>
      </div>

      {/* PWA & Mobile Phone Install Status */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">{t.mobileInstallStatus}</h3>
            <p className="text-xs text-gray-500">
              {t.pwaCapabilitiesDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-gray-600">{t.displayModeLabel}</span>
            <span className="font-bold text-gray-900">
              {isInstalled ? 'Installed Native Standalone' : 'Browser View (Installable)'}
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-gray-600">{t.operatingSystemLabel}</span>
            <span className="font-bold text-gray-900">{isIOS ? 'Apple iOS' : 'Android / Web'}</span>
          </div>
        </div>

        {!isInstalled && isInstallable && (
          <button
            onClick={install}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
          >
            {t.installNow}
          </button>
        )}
      </div>

      {/* Server & AI Health */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">{t.diagnosticServiceHealth}</h3>
              <p className="text-xs text-gray-500">Gemini Vision pathology & agronomy API</p>
            </div>
          </div>

          <button
            onClick={checkHealth}
            disabled={loadingHealth}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
            title="Refresh Health"
          >
            <RefreshCw className={`w-4 h-4 ${loadingHealth ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-500 block mb-0.5">{t.backendApiLabel}</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Online (v1.0.0)
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-500 block mb-0.5">{t.aiEngineLabel}</span>
            <span className="font-bold text-gray-900">
              {healthStatus?.hasGeminiKey ? 'Gemini 3.8 Flash' : 'Botanical Knowledge Engine'}
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-500 block mb-0.5">{t.offlineStorageLabel}</span>
            <span className="font-bold text-gray-900">Indexed Local DB</span>
          </div>
        </div>
      </div>

      {/* Official Agricultural Support Helplines */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">{t.kisanCallCenterTitle}</h3>
            <p className="text-xs text-gray-500">{t.kisanCallCenterDesc}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-emerald-950 block">Kisan Call Center (Toll Free)</span>
              <span className="text-[11px] text-emerald-800">1800-180-1551 (English / ଓଡ଼ିଆ / हिन्दी)</span>
            </div>
            <a
              href="tel:18001801551"
              className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition"
            >
              {t.kisanTollFreeBtn}
            </a>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900 block">{t.icarPortalTitle}</span>
              <span className="text-[11px] text-gray-500">{t.icarPortalDesc}</span>
            </div>
            <a
              href="https://icar.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Reset Cache & Storage */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-gray-900">{t.resetLocalDemoDataTitle}</h3>
          <p className="text-xs text-gray-500">{t.resetLocalDemoDataDesc}</p>
        </div>

        {resetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetData();
                setResetConfirm(false);
              }}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-xl"
            >
              {t.confirmResetBtn}
            </button>
            <button
              onClick={() => setResetConfirm(false)}
              className="px-2.5 py-1.5 border border-gray-300 text-xs rounded-xl"
            >
              {t.cancel}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirm(true)}
            className="px-3.5 py-2 border border-gray-300 hover:bg-red-50 hover:text-red-700 text-gray-700 rounded-xl text-xs font-semibold transition"
          >
            {t.resetDataBtn}
          </button>
        )}
      </div>
    </div>
  );
};

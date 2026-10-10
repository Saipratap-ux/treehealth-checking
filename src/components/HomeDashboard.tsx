import React from 'react';
import {
  Camera,
  Upload,
  Droplets,
  Sprout,
  HeartPulse,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Beaker,
  CheckCircle2,
  Clock,
  Globe
} from 'lucide-react';
import { PlantProfile, CareTask, DiagnosisResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface HomeDashboardProps {
  plants: PlantProfile[];
  tasks: CareTask[];
  recentScans: DiagnosisResult[];
  onNavigateTab: (tab: string, cropHint?: string) => void;
  onToggleTask: (id: string) => void;
  onSelectDiagnosis: (diagnosis: DiagnosisResult) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  plants,
  tasks,
  recentScans,
  onNavigateTab,
  onToggleTask,
  onSelectDiagnosis,
}) => {
  const { t, language } = useLanguage();

  const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 3);
  const healthyCount = plants.filter((p) => p.healthStatus === 'healthy').length;
  const stressCount = plants.filter((p) => p.healthStatus === 'mild_stress' || p.healthStatus === 'moderate_disease').length;
  const severeCount = plants.filter((p) => p.healthStatus === 'severe_disease').length;

  const quickSymptoms = [
    {
      label: language === 'or' ? 'ହଳଦିଆ ପତ୍ର (କ୍ଲୋରୋସିସ୍)' : language === 'hi' ? 'पीले पत्ते (क्लोरोसिस)' : 'Yellow Leaves (Chlorosis)',
      crop: language === 'or' ? 'ଟମାଟୋ' : language === 'hi' ? 'टमाटर' : 'Tomato',
    },
    {
      label: language === 'or' ? 'କଳା / ବାଦାମୀ ଦାଗ' : language === 'hi' ? 'काले / भूरे धब्बे' : 'Dark Leaf Spots',
      crop: language === 'or' ? 'ଟମାଟୋ' : language === 'hi' ? 'टमाटर' : 'Tomato',
    },
    {
      label: language === 'or' ? 'ଧଳା ପାଉଡର ଫିମ୍ପି' : language === 'hi' ? 'सफेद पाउडर फफूंद' : 'White Powdery Coating',
      crop: language === 'or' ? 'ଗୋଲାପ' : language === 'hi' ? 'गुलाब' : 'Rose',
    },
    {
      label: language === 'or' ? 'ପତ୍ର କୁଞ୍ଚନ (ମୋଡ଼ି ହେବା)' : language === 'hi' ? 'पत्ती मुड़ना (कर्ल)' : 'Leaf Curling',
      crop: language === 'or' ? 'ଲଙ୍କା' : language === 'hi' ? 'मिर्च' : 'Chili',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Language Quick Switcher Bar */}
      <div className="bg-white/95 backdrop-blur-md border border-emerald-200/90 rounded-2xl p-2.5 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
          <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.switchLanguage}</span>
        </div>
        <LanguageSelector variant="pills" />
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-800 via-green-800 to-teal-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl shadow-emerald-900/10">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-3 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Healthy Trees • Greener Tomorrow</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {t.heroTitle}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Author Credit Badge */}
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-xs font-bold text-emerald-200 border border-emerald-400/30">
                <span>🌿 Created by</span>
                <span className="text-amber-300 underline underline-offset-2">Kinjal Bariha</span>
              </span>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 text-center">
                <span className="text-lg sm:text-2xl font-extrabold block">{plants.length}</span>
                <span className="text-[10px] sm:text-xs text-emerald-200 uppercase font-semibold tracking-wider">{t.savedPlantsCount}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 text-center">
                <span className="text-lg sm:text-2xl font-extrabold block">{pendingTasks.length}</span>
                <span className="text-[10px] sm:text-xs text-emerald-200 uppercase font-semibold tracking-wider">{t.tasksDueCount}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 text-center">
                <span className="text-lg sm:text-2xl font-extrabold block">{recentScans.length}</span>
                <span className="text-[10px] sm:text-xs text-emerald-200 uppercase font-semibold tracking-wider">{t.aiScansCount}</span>
              </div>
            </div>
          </div>

          {/* Official Emblem Logo Display */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-white p-1 hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="TreeHealthAI Official Logo"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual CTAs: Scan Camera & Upload */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateTab('scan')}
          className="group p-5 sm:p-6 bg-gradient-to-br from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-3xl shadow-lg shadow-emerald-700/20 text-left transition transform active:scale-[0.99] flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">1-Tap Live</span>
          </div>

          <div className="mt-6 space-y-1">
            <h3 className="text-lg font-extrabold flex items-center gap-1.5">
              <span>{t.scanSickLeafCardTitle}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </h3>
            <p className="text-xs text-emerald-100">
              {t.scanSickLeafCardDesc}
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('scan')}
          className="group p-5 sm:p-6 bg-white hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-400 rounded-3xl shadow-sm text-left transition transform active:scale-[0.99] flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-semibold">Gallery</span>
          </div>

          <div className="mt-6 space-y-1">
            <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-1.5">
              <span>{t.uploadPhotoCardTitle}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition" />
            </h3>
            <p className="text-xs text-gray-600">
              {t.uploadPhotoCardDesc}
            </p>
          </div>
        </button>
      </div>

      {/* Quick Symptom Trigger Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-bold uppercase tracking-wider text-gray-500">{t.noticeLeafDistress}</span>
          <span>{t.tapToLoad}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickSymptoms.map((s, i) => (
            <button
              key={i}
              onClick={() => onNavigateTab('scan', s.crop)}
              className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200 text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Health Overview & Upcoming Reminders Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Plant Health Status Summary */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3 md:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900">{t.healthOverview}</h3>
            <button
              onClick={() => onNavigateTab('plants')}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              {t.viewAll}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t.healthyPlants}
              </span>
              <span className="font-bold">{healthyCount}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-amber-600" /> {t.mildStressPlants}
              </span>
              <span className="font-bold">{stressCount}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 text-red-900 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" /> {t.criticalCarePlants}
              </span>
              <span className="font-bold">{severeCount}</span>
            </div>
          </div>
        </div>

        {/* Due Care Reminders */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{t.upcomingCareTasks}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('planner')}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              {t.carePlannerLink}
            </button>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl">
              {t.noTasksDue}
            </div>
          ) : (
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-emerald-200 bg-gray-50/70 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="w-5 h-5 rounded-md border border-gray-300 hover:border-emerald-600 flex items-center justify-center transition"
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                    <div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-1">{task.title}</p>
                      <p className="text-[11px] text-gray-500">
                        {task.plantName} • {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg transition"
                  >
                    {t.done}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Scans Strip */}
      {recentScans.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900">{t.recentPlantDiagnoses}</h3>
            <button
              onClick={() => onNavigateTab('history')}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              {t.fullHistoryLink}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recentScans.slice(0, 3).map((scan) => (
              <div
                key={scan.id}
                onClick={() => onSelectDiagnosis(scan)}
                className="p-3.5 bg-white rounded-2xl border border-gray-200 hover:border-emerald-400 transition cursor-pointer shadow-sm flex items-center gap-3 group"
              >
                {scan.imagePreviewUrl && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={scan.imagePreviewUrl}
                      alt={scan.plantName}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{scan.plantName}</h4>
                  <p className="text-[11px] text-emerald-800 font-medium truncate">
                    {scan.likelyCauses[0]?.name || 'Routine Check'}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {new Date(scan.timestamp).toLocaleDateString()} • {scan.confidence}% match
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

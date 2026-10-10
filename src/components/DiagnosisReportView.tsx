import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Printer,
  CalendarPlus,
  BookmarkCheck,
  RotateCcw,
  Sparkles,
  Droplets,
  Sun,
  Beaker,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { DiagnosisResult, PlantProfile, CareTask } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DiagnosisReportViewProps {
  diagnosis: DiagnosisResult;
  onSaveToMyPlants: (plant: Partial<PlantProfile>) => void;
  onScheduleReminder: (tasks: Partial<CareTask>[]) => void;
  onResetScan: () => void;
  isSaved?: boolean;
}

export const DiagnosisReportView: React.FC<DiagnosisReportViewProps> = ({
  diagnosis,
  onSaveToMyPlants,
  onScheduleReminder,
  onResetScan,
  isSaved = false,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'cultural' | 'nutrient'>('organic');
  const [remindersAdded, setRemindersAdded] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(isSaved);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  // Status badge coloring
  const getStatusBadge = () => {
    switch (diagnosis.healthStatus) {
      case 'healthy':
        return {
          label: t.healthy,
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
        };
      case 'mild_stress':
        return {
          label: t.mildStress,
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <HeartPulse className="w-5 h-5 text-amber-600" />,
        };
      case 'moderate_disease':
        return {
          label: t.infected,
          color: 'bg-orange-100 text-orange-800 border-orange-300',
          icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
        };
      case 'severe_disease':
        return {
          label: t.critical,
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
        };
      default:
        return {
          label: t.healthy,
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: <Sparkles className="w-5 h-5 text-gray-600" />,
        };
    }
  };

  const status = getStatusBadge();

  // Print PDF handler
  const handlePrint = () => {
    window.print();
  };

  // Add auto reminders
  const handleAddReminders = () => {
    const today = new Date();
    const wateringDue = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();
    const followUpDue = new Date(today.getTime() + (diagnosis.followUpDays || 4) * 24 * 60 * 60 * 1000).toISOString();

    const tasksToCreate: Partial<CareTask>[] = [
      {
        plantName: diagnosis.plantName,
        type: 'watering',
        title: `Soil moisture check for ${diagnosis.plantName}`,
        dueDate: wateringDue,
        completed: false,
        notes: diagnosis.treatmentPlan.wateringAdvice,
      },
      {
        plantName: diagnosis.plantName,
        type: 'inspection',
        title: `Follow-up foliar inspection (${diagnosis.followUpDays || 4} days)`,
        dueDate: followUpDue,
        completed: false,
        notes: `Inspect whether symptoms have ceased spreading. Check: ${diagnosis.observedSymptoms[0] || 'lesions'}`,
      },
    ];

    onScheduleReminder(tasksToCreate);
    setRemindersAdded(true);
  };

  const handleSavePlant = () => {
    onSaveToMyPlants({
      name: diagnosis.plantName.split('(')[0].trim() || 'My Plant',
      species: diagnosis.plantName,
      category: diagnosis.cropCategory || 'Field Crop',
      photoUrl: diagnosis.imagePreviewUrl || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
      healthStatus: diagnosis.healthStatus,
      waterIntervalDays: 2,
      location: diagnosis.location || 'Home Garden',
      notes: `Diagnosed on ${new Date(diagnosis.timestamp).toLocaleDateString()}: ${diagnosis.likelyCauses[0]?.name || 'Routine check'}`,
    });
    setSavedSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto print:max-w-none print:p-0">
      {/* Top action bar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm print:hidden">
        <button
          onClick={onResetScan}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
        >
          <RotateCcw className="w-4 h-4" />
          {t.scanAnotherLeaf}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition"
          >
            <Printer className="w-4 h-4" />
            {t.printSavePdf}
          </button>

          {!savedSuccess ? (
            <button
              onClick={handleSavePlant}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm"
            >
              <BookmarkCheck className="w-4 h-4" />
              {t.saveToMyPlants}
            </button>
          ) : (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 px-3 py-1.5 bg-emerald-100/70 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              {t.savedToPlants}
            </span>
          )}
        </div>
      </div>

      {/* Main Report Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
        {/* Printable Official Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="TreeHealthAI" className="w-10 h-10 rounded-xl bg-white p-0.5 object-contain" />
            <div>
              <div className="font-extrabold text-sm tracking-wide">
                <span className="text-emerald-400">Tree</span>Health<span className="text-blue-400">AI</span>
              </div>
              <p className="text-[10px] text-emerald-200">Healthy Trees • Greener Tomorrow</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-amber-300 bg-black/40 border border-amber-400/40 px-2.5 py-0.5 rounded-full inline-block">
              Created by Kinjal Bariha
            </span>
          </div>
        </div>

        {/* Banner with Image and Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-900/5 via-teal-900/5 to-white border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {diagnosis.imagePreviewUrl && (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border-2 border-white shadow-md">
                <img
                  src={diagnosis.imagePreviewUrl}
                  alt={diagnosis.plantName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                  {status.icon}
                  {status.label}
                </span>

                <span className="text-xs text-gray-500 font-medium">
                  {new Date(diagnosis.timestamp).toLocaleDateString()} {new Date(diagnosis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {diagnosis.plantName}
              </h1>

              {/* Confidence Meter */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1">
                  <span>{t.aiPathologyConfidence}</span>
                  <span className="text-emerald-700">{diagnosis.confidence}% Match</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.max(20, diagnosis.confidence))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Limitation Notice */}
        <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-200/50 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{diagnosis.confidenceDisclaimer}</span>
            <button
              onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
              className="ml-2 font-semibold underline text-amber-800"
            >
              {showFullDisclaimer ? t.showLess : t.readLimitations}
            </button>
            {showFullDisclaimer && (
              <p className="mt-1.5 text-[11px] text-amber-800 leading-relaxed">
                {t.limitationsLongText}
              </p>
            )}
          </div>
        </div>

        {/* Core Findings Section */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Observed Foliar Symptoms */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              {t.identifiedSymptomsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {diagnosis.observedSymptoms.map((symptom, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs font-medium text-gray-800"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Likely Pathogens / Causes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              {t.rankedPathogensTitle}
            </h3>
            <div className="space-y-3">
              {diagnosis.likelyCauses.map((cause, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-emerald-300 transition shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{cause.name}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {cause.pathogenType}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {cause.probability}% Probable
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{cause.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suspected Nutrient Deficiency */}
          <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/70 space-y-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <Beaker className="w-4 h-4 text-teal-700" />
              <span>{t.nutrientSoilEvalTitle}</span>
              <span className="text-[10px] font-semibold bg-teal-200/60 text-teal-900 px-2 py-0.5 rounded-full">
                {t.visualEstimateBadge}
              </span>
            </div>
            <p className="text-xs text-teal-950 font-semibold">
              {diagnosis.nutrientAssessment.suspectedDeficiency}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-teal-900">
              <div className="bg-white/70 p-3 rounded-xl border border-teal-100">
                <span className="font-bold block text-teal-950 mb-1">{t.visualCluesLabel}</span>
                <span>{diagnosis.nutrientAssessment.visualSigns}</span>
              </div>
              <div className="bg-white/70 p-3 rounded-xl border border-teal-100">
                <span className="font-bold block text-teal-950 mb-1">{t.soilTestStatusLabel}</span>
                <span>{diagnosis.nutrientAssessment.soilAdvice}</span>
              </div>
            </div>
            <div className="text-[11px] text-teal-800 bg-teal-100/60 p-2.5 rounded-xl">
              <strong>{t.fertilizerNoteLabel}</strong> {diagnosis.nutrientAssessment.npkGuidance}
            </div>
          </div>

          {/* Actionable Treatment Plan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {t.treatmentCarePlanTitle}
              </h3>
            </div>

            {/* Treatment Subtabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('organic')}
                className={`flex-1 min-w-[110px] py-2 rounded-lg transition ${
                  activeTab === 'organic' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
                }`}
              >
                {t.tabOrganic}
              </button>
              <button
                onClick={() => setActiveTab('chemical')}
                className={`flex-1 min-w-[110px] py-2 rounded-lg transition ${
                  activeTab === 'chemical' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
                }`}
              >
                {t.tabChemical}
              </button>
              <button
                onClick={() => setActiveTab('cultural')}
                className={`flex-1 min-w-[110px] py-2 rounded-lg transition ${
                  activeTab === 'cultural' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
                }`}
              >
                {t.tabWaterSun}
              </button>
              <button
                onClick={() => setActiveTab('nutrient')}
                className={`flex-1 min-w-[110px] py-2 rounded-lg transition ${
                  activeTab === 'nutrient' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
                }`}
              >
                {t.tabEmergency}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200">
              {activeTab === 'organic' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {t.organicControlsHeader}
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {diagnosis.treatmentPlan.organicRemedies.map((remedy, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'chemical' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    {t.chemicalControlsHeader}
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {diagnosis.treatmentPlan.chemicalFungicideGuide.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-gray-500 italic mt-2">
                    {t.chemicalSafetyNotice}
                  </p>
                </div>
              )}

              {activeTab === 'cultural' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-200">
                    <Droplets className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-800">
                      <span className="font-bold block text-gray-900 mb-0.5">{t.wateringInstructionsLabel}</span>
                      {diagnosis.treatmentPlan.wateringAdvice}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-200">
                    <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-800">
                      <span className="font-bold block text-gray-900 mb-0.5">{t.sunlightMicroclimateLabel}</span>
                      {diagnosis.treatmentPlan.sunlightGuidance}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrient' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    {t.emergencyIsolationHeader}
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {diagnosis.treatmentPlan.immediateActions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Follow-up & Red Flags */}
          {diagnosis.warningSigns && diagnosis.warningSigns.length > 0 && (
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
              <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                {t.warningSignsHeader}
              </span>
              <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                {diagnosis.warningSigns.map((sign, i) => (
                  <li key={i}>{sign}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Action Triggers */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3 print:hidden">
            <button
              onClick={handleAddReminders}
              disabled={remindersAdded}
              className={`flex-1 w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                remindersAdded
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md active:scale-95'
              }`}
            >
              <CalendarPlus className="w-4 h-4" />
              {remindersAdded ? t.remindersAddedSuccess : `${t.scheduleSmartReminders} (${diagnosis.followUpDays || 4} Days)`}
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto py-3 px-5 border border-gray-300 hover:border-gray-400 bg-white text-gray-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <FileText className="w-4 h-4" />
              {t.downloadPdfReport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

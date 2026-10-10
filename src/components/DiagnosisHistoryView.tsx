import React, { useState } from 'react';
import {
  History,
  Search,
  Calendar,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  HeartPulse,
  Download,
  Camera
} from 'lucide-react';
import { DiagnosisResult, HealthStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DiagnosisHistoryViewProps {
  history: DiagnosisResult[];
  onSelectDiagnosis: (diagnosis: DiagnosisResult) => void;
  onDeleteDiagnosis: (id: string) => void;
  onNavigateToScan: () => void;
}

export const DiagnosisHistoryView: React.FC<DiagnosisHistoryViewProps> = ({
  history,
  onSelectDiagnosis,
  onDeleteDiagnosis,
  onNavigateToScan,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = history.filter((item) => {
    const matchesQuery =
      item.plantName.toLowerCase().includes(query.toLowerCase()) ||
      (item.likelyCauses[0]?.name || '').toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.healthStatus === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const getStatusIcon = (status: HealthStatus) => {
    switch (status) {
      case 'healthy':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'mild_stress':
        return <HeartPulse className="w-4 h-4 text-amber-600" />;
      case 'moderate_disease':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'severe_disease':
        return <ShieldAlert className="w-4 h-4 text-red-600" />;
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plant-scans-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
            <History className="w-3.5 h-3.5" />
            <span>Pathology Timeline</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t.diagnosisHistoryTitle}</h2>
          <p className="text-xs text-gray-600">
            {t.diagnosisHistoryDesc}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              {t.exportRecords}
            </button>
          )}

          <button
            onClick={onNavigateToScan}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            <Camera className="w-4 h-4" />
            {t.newScan}
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchHistoryPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
        >
          <option value="all">{t.allHealthConditions}</option>
          <option value="healthy">{t.healthy}</option>
          <option value="mild_stress">{t.mildStress}</option>
          <option value="moderate_disease">{t.infected}</option>
          <option value="severe_disease">{t.critical}</option>
        </select>
      </div>

      {/* History Items */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-3">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <p className="font-bold text-gray-900 text-base">{t.noScanRecordsFound}</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {t.noPlantsFoundDesc}
          </p>
          <button
            onClick={onNavigateToScan}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
          >
            <Camera className="w-4 h-4" />
            {t.scanSickPlantCta}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-emerald-300 transition shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {item.imagePreviewUrl && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <img
                      src={item.imagePreviewUrl}
                      alt={item.plantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900">{item.plantName}</h3>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
                      {getStatusIcon(item.healthStatus)}
                      <span className="capitalize">{item.healthStatus.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-800 font-medium">
                    Likely: <strong>{item.likelyCauses[0]?.name || 'Routine Check'}</strong> ({item.confidence}% match)
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                <button
                  onClick={() => onSelectDiagnosis(item)}
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t.viewReport}
                </button>

                <button
                  onClick={() => onDeleteDiagnosis(item.id)}
                  aria-label="Delete scan record"
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

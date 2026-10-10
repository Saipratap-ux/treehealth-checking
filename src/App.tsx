/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PlantProfile,
  CareTask,
  DiagnosisResult,
} from './types';
import {
  getStoredPlants,
  savePlants,
  getStoredHistory,
  saveDiagnosis,
  deleteDiagnosis as removeHistoryItem,
  getStoredTasks,
  saveTasks,
} from './utils/storage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navigation } from './components/Navigation';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { HomeDashboard } from './components/HomeDashboard';
import { PlantScanner } from './components/PlantScanner';
import { DiagnosisReportView } from './components/DiagnosisReportView';
import { MyPlantsView } from './components/MyPlantsView';
import { CarePlanner } from './components/CarePlanner';
import { DiagnosisHistoryView } from './components/DiagnosisHistoryView';
import { NotificationsCenter } from './components/NotificationsCenter';
import { SettingsView } from './components/SettingsView';
import { CheckCircle2 } from 'lucide-react';

function AppContent() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [plants, setPlants] = useState<PlantProfile[]>([]);
  const [tasks, setTasks] = useState<CareTask[]>([]);
  const [history, setHistory] = useState<DiagnosisResult[]>([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(null);
  const [scanCropHint, setScanCropHint] = useState<string>('');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load stored data on mount
  useEffect(() => {
    setPlants(getStoredPlants());
    setTasks(getStoredTasks());
    setHistory(getStoredHistory());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // URL parameter check for PWA shortcuts (?tab=scan)
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['scan', 'planner', 'plants', 'history', 'notifications'].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Diagnosis Handlers
  const handleDiagnosisComplete = (result: DiagnosisResult) => {
    setCurrentDiagnosis(result);
    saveDiagnosis(result);
    setHistory(getStoredHistory());

    // Automatically associate with existing plant or increment scan count
    const existing = plants.find((p) => p.name.toLowerCase().includes(result.plantName.toLowerCase().split('(')[0].trim()));
    if (existing) {
      const updated = plants.map((p) =>
        p.id === existing.id
          ? {
              ...p,
              healthStatus: result.healthStatus,
              scanCount: (p.scanCount || 0) + 1,
              notes: `Latest scan: ${result.likelyCauses[0]?.name || 'Checked'}`,
            }
          : p
      );
      setPlants(updated);
      savePlants(updated);
    }

    setActiveTab('diagnosis');
    showToast(
      language === 'or'
        ? 'AI ଫସଲ ପତ୍ର ରୋଗ ନିର୍ଣ୍ଣୟ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା!'
        : language === 'hi'
        ? 'AI फसल पत्ता रोग निदान पूर्ण हुआ!'
        : 'AI Plant Health Diagnosis Complete!'
    );
  };

  const handleSaveToMyPlants = (plantData: Partial<PlantProfile>) => {
    const newPlant: PlantProfile = {
      id: `plant-${Date.now()}`,
      name: plantData.name || (language === 'or' ? 'ଚିହ୍ନଟ ହୋଇଥିବା ଫସଲ' : language === 'hi' ? 'पहचाना गया पौधा' : 'Diagnosed Plant'),
      species: plantData.species || 'Agricultural Crop',
      category: plantData.category || 'Vegetables',
      photoUrl: plantData.photoUrl || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
      dateAdded: new Date().toISOString().split('T')[0],
      healthStatus: plantData.healthStatus || 'healthy',
      waterIntervalDays: plantData.waterIntervalDays || 2,
      location: plantData.location || (language === 'or' ? 'ବଗିଚା' : language === 'hi' ? 'बगीचा' : 'Home Garden'),
      notes: plantData.notes || 'Added from AI diagnosis',
      scanCount: 1,
      lastWatered: new Date().toISOString().split('T')[0],
    };

    const updated = [newPlant, ...plants];
    setPlants(updated);
    savePlants(updated);
    showToast(
      language === 'or'
        ? `"${newPlant.name}" ଫସଲ ସଫଳତାର ସହ ସେଭ୍ ହେଲା!`
        : language === 'hi'
        ? `"${newPlant.name}" पौधा सफलतापूर्वक सहेजा गया!`
        : `"${newPlant.name}" saved to My Plants!`
    );
  };

  const handleScheduleReminder = (newTasks: Partial<CareTask>[]) => {
    const formatted: CareTask[] = newTasks.map((t, idx) => ({
      id: `task-${Date.now()}-${idx}`,
      plantName: t.plantName || 'My Plant',
      type: t.type || 'watering',
      title: t.title || 'Scheduled Care Task',
      dueDate: t.dueDate || new Date().toISOString(),
      completed: false,
      notes: t.notes,
    }));

    const updated = [...formatted, ...tasks];
    setTasks(updated);
    saveTasks(updated);
    showToast(
      language === 'or'
        ? `${formatted.length}ଟି ଯତ୍ନ ରିମାଇଣ୍ଡର ସେଟ୍ ହେଲା!`
        : language === 'hi'
        ? `${formatted.length} देखभाल रिमाइंडर सेट किए गए!`
        : `${formatted.length} care reminders scheduled!`
    );
  };

  // Plant Profile Handlers
  const handleAddPlant = (newPlantData: Omit<PlantProfile, 'id'>) => {
    const newPlant: PlantProfile = {
      ...newPlantData,
      id: `plant-${Date.now()}`,
    };
    const updated = [newPlant, ...plants];
    setPlants(updated);
    savePlants(updated);
    showToast(
      language === 'or'
        ? `"${newPlant.name}" ଫସଲ ଯୋଡ଼ାଗଲା।`
        : language === 'hi'
        ? `"${newPlant.name}" पौधा जोड़ा गया।`
        : `Plant "${newPlant.name}" added successfully.`
    );
  };

  const handleDeletePlant = (id: string) => {
    const updated = plants.filter((p) => p.id !== id);
    setPlants(updated);
    savePlants(updated);
    showToast(language === 'or' ? 'ଫସଲ ହଟାଗଲା।' : language === 'hi' ? 'पौधा हटाया गया।' : 'Plant removed from collection.');
  };

  const handleWaterPlant = (id: string) => {
    const updated = plants.map((p) =>
      p.id === id ? { ...p, lastWatered: new Date().toISOString().split('T')[0] } : p
    );
    setPlants(updated);
    savePlants(updated);

    const plant = plants.find((p) => p.id === id);
    if (plant) {
      const updatedTasks = tasks.map((t) =>
        t.plantName === plant.name && t.type === 'watering' ? { ...t, completed: true } : t
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      showToast(
        language === 'or'
          ? `"${plant.name}"କୁ ପାଣି ଦିଆଗଲା!`
          : language === 'hi'
          ? `"${plant.name}" को पानी दिया गया!`
          : `Watered "${plant.name}"! Tasks updated.`
      );
    }
  };

  // Care Task Handlers
  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    saveTasks(updated);
    const toggled = tasks.find((t) => t.id === id);
    if (toggled && !toggled.completed) {
      showToast(t.done);
    }
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
    showToast(language === 'or' ? 'ରିମାଇଣ୍ଡର ହଟାଗଲା।' : language === 'hi' ? 'रिमाइंडर हटाया गया।' : 'Reminder deleted.');
  };

  const handleAddTask = (newTaskData: Omit<CareTask, 'id'>) => {
    const newTask: CareTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);
    showToast(
      language === 'or'
        ? 'ନୂଆ ଯତ୍ନ ରିମାଇଣ୍ଡର ଯୋଡ଼ାଗଲା।'
        : language === 'hi'
        ? 'नया देखभाल रिमाइंडर जोड़ा गया।'
        : 'Care reminder created.'
    );
  };

  // History Handlers
  const handleDeleteDiagnosis = (id: string) => {
    removeHistoryItem(id);
    setHistory(getStoredHistory());
    showToast(language === 'or' ? 'ଯାଞ୍ଚ ରେକର୍ଡ଼ ହଟାଗଲା।' : language === 'hi' ? 'जांच रिकॉर्ड हटाया गया।' : 'Diagnosis record deleted.');
  };

  const handleResetData = () => {
    localStorage.clear();
    setPlants(getStoredPlants());
    setTasks(getStoredTasks());
    setHistory(getStoredHistory());
    showToast(language === 'or' ? 'ଡେମୋ ତଥ୍ୟ ପୁନଃ ସେଟ୍ ହେଲା।' : language === 'hi' ? 'डेमो डेटा रीसेट हुआ।' : 'Demo data restored.');
  };

  const handleNavigateTab = (tab: string, cropHint?: string) => {
    if (cropHint) {
      setScanCropHint(cropHint);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-20 md:pb-8 selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => handleNavigateTab(tab)}
        pendingTasksCount={tasks.filter((t) => !t.completed).length}
        isOnline={isOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* PWA Install Banner */}
        <PWAInstallBanner />

        {/* Tab router */}
        {activeTab === 'home' && (
          <HomeDashboard
            plants={plants}
            tasks={tasks}
            recentScans={history}
            onNavigateTab={handleNavigateTab}
            onToggleTask={handleToggleTask}
            onSelectDiagnosis={(diag) => {
              setCurrentDiagnosis(diag);
              setActiveTab('diagnosis');
            }}
          />
        )}

        {activeTab === 'scan' && (
          <PlantScanner
            initialCrop={scanCropHint}
            onDiagnosisComplete={handleDiagnosisComplete}
          />
        )}

        {activeTab === 'diagnosis' && currentDiagnosis && (
          <DiagnosisReportView
            diagnosis={currentDiagnosis}
            onSaveToMyPlants={handleSaveToMyPlants}
            onScheduleReminder={handleScheduleReminder}
            onResetScan={() => setActiveTab('scan')}
          />
        )}

        {activeTab === 'plants' && (
          <MyPlantsView
            plants={plants}
            onAddPlant={handleAddPlant}
            onDeletePlant={handleDeletePlant}
            onWaterPlant={handleWaterPlant}
            onScanPlant={(crop) => handleNavigateTab('scan', crop)}
          />
        )}

        {activeTab === 'planner' && (
          <CarePlanner
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
          />
        )}

        {activeTab === 'history' && (
          <DiagnosisHistoryView
            history={history}
            onSelectDiagnosis={(diag) => {
              setCurrentDiagnosis(diag);
              setActiveTab('diagnosis');
            }}
            onDeleteDiagnosis={handleDeleteDiagnosis}
            onNavigateToScan={() => setActiveTab('scan')}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsCenter
            tasks={tasks}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView onResetData={handleResetData} />
        )}
      </main>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-emerald-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-8 text-center text-xs text-gray-500 max-w-6xl mx-auto px-4 w-full">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="TreeHealthAI" className="w-8 h-8 rounded-lg object-contain shadow-xs" />
            <span className="font-extrabold text-sm text-emerald-950">
              <span className="text-emerald-700">Tree</span>Health<span className="text-blue-600">AI</span>
            </span>
          </div>
          <p className="font-semibold text-emerald-800 text-xs">
            Healthy Trees • Greener Tomorrow
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-900">
            <span>🌱 Created by</span>
            <span className="text-emerald-800">Kinjal Bariha</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Installable Progressive Web App (PWA) • English • ଓଡ଼ିଆ • हिन्दी
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

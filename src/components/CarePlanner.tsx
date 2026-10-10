import React, { useState } from 'react';
import {
  Calendar,
  Droplets,
  Sprout,
  Beaker,
  CheckCircle,
  Plus,
  Trash2,
  Clock,
  AlertCircle,
  Layers,
  Sparkles,
  HelpCircle,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { CareTask, SoilTestInput, SoilCalculationResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CarePlannerProps {
  tasks: CareTask[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Omit<CareTask, 'id'>) => void;
}

export const CarePlanner: React.FC<CarePlannerProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTask,
}) => {
  const { t, language } = useLanguage();
  const [plannerTab, setPlannerTab] = useState<'tasks' | 'soil' | 'watering'>('tasks');

  // New task form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPlantName, setNewPlantName] = useState('');
  const [newType, setNewType] = useState<CareTask['type']>('watering');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNotes, setNewNotes] = useState('');

  // Soil test form state
  const [soilCrop, setSoilCrop] = useState('tomato');
  const [soilPh, setSoilPh] = useState<number>(6.5);
  const [nitrogen, setNitrogen] = useState<number>(180);
  const [phosphorus, setPhosphorus] = useState<number>(15);
  const [potassium, setPotassium] = useState<number>(140);
  const [landAcres, setLandAcres] = useState<number>(1);
  const [soilCalcResult, setSoilCalcResult] = useState<SoilCalculationResult | null>(null);
  const [isCalculatingSoil, setIsCalculatingSoil] = useState(false);

  // Quick watering calculator
  const [containerSize, setContainerSize] = useState<'small_pot' | 'medium_pot' | 'large_pot' | 'field_bed'>('medium_pot');
  const [ambientTemp, setAmbientTemp] = useState<number>(28);
  const [sunlightHours, setSunlightHours] = useState<number>(6);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      plantName: newPlantName.trim() || 'General Garden',
      type: newType,
      title: newTitle.trim(),
      dueDate: new Date(newDueDate).toISOString(),
      completed: false,
      notes: newNotes.trim() || undefined,
    });

    setNewTitle('');
    setNewPlantName('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleCalculateSoil = async () => {
    setIsCalculatingSoil(true);
    try {
      const response = await fetch('/api/soil-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: soilCrop,
          soilPh,
          nitrogenKg: nitrogen,
          phosphorusKg: phosphorus,
          potassiumKg: potassium,
          landAreaAcres: landAcres,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSoilCalcResult(data);
      }
    } catch (e) {
      console.error('Soil calculator error:', e);
    } finally {
      setIsCalculatingSoil(false);
    }
  };

  // Quick watering suggestion based on math
  const getWaterAdvice = () => {
    let baseAmountMl = 500;
    let frequencyDays = 2;

    if (containerSize === 'small_pot') {
      baseAmountMl = 250;
      frequencyDays = ambientTemp > 30 ? 1 : 2;
    } else if (containerSize === 'medium_pot') {
      baseAmountMl = 750;
      frequencyDays = ambientTemp > 32 ? 1 : 2;
    } else if (containerSize === 'large_pot') {
      baseAmountMl = 1800;
      frequencyDays = ambientTemp > 30 ? 2 : 3;
    } else {
      baseAmountMl = 4500;
      frequencyDays = ambientTemp > 32 ? 2 : 4;
    }

    if (sunlightHours > 7) frequencyDays = Math.max(1, frequencyDays - 1);

    const freqText = frequencyDays === 1
      ? (language === 'or' ? 'ପ୍ରତିଦିନ (ସକାଳ ୬-୮ ଟା)' : language === 'hi' ? 'प्रतिदिन (सुबह 6-8 बजे)' : 'Every Day (Morning 6-8 AM)')
      : (language === 'or' ? `ପ୍ରତି ${frequencyDays} ଦିନରେ ଥରେ` : language === 'hi' ? `हर ${frequencyDays} दिन में एक बार` : `Every ${frequencyDays} Days`);

    const ruleText = language === 'or'
      ? 'ପାଣି ଦେବା ପୂର୍ବରୁ ମାଟିରେ ଆଙ୍ଗୁଳି ୨ ଇଞ୍ଚ ପୁରାଇ ଯାଞ୍ଚ କରନ୍ତୁ। ଓଦା ଥିଲେ ପାଣି ଦିଅନ୍ତୁ ନାହିଁ।'
      : language === 'hi'
      ? 'सिंचाई से पहले मिट्टी में उंगली 2 इंच डालकर नमी जांचें। यदि नम हो तो 24 घंटे रुकें।'
      : 'Always stick a finger 2 inches into soil. If cool and damp, delay watering by 24 hours to prevent root rot.';

    return {
      amount: baseAmountMl >= 1000 ? `${(baseAmountMl / 1000).toFixed(1)} Liters` : `${baseAmountMl} mL`,
      frequency: freqText,
      rule: ruleText,
    };
  };

  const waterAdvice = getWaterAdvice();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
            <Sprout className="w-3.5 h-3.5" />
            <span>Farm & Garden Management</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t.plannerTitle}</h2>
          <p className="text-xs text-gray-600">
            {t.plannerDesc}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          {t.addCareReminder}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
        <button
          onClick={() => setPlannerTab('tasks')}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition ${
            plannerTab === 'tasks' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Calendar className="w-4 h-4" />
          {t.tabCareTasks} ({tasks.filter((t) => !t.completed).length})
        </button>

        <button
          onClick={() => {
            setPlannerTab('soil');
            if (!soilCalcResult) handleCalculateSoil();
          }}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition ${
            plannerTab === 'soil' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Beaker className="w-4 h-4" />
          {t.tabSoilCalculator}
        </button>

        <button
          onClick={() => setPlannerTab('watering')}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition ${
            plannerTab === 'watering' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Droplets className="w-4 h-4" />
          {t.tabWateringEstimator}
        </button>
      </div>

      {/* TAB 1: Care Tasks List */}
      {plannerTab === 'tasks' && (
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="font-bold text-gray-800 text-sm">{t.noTasksDue}</p>
            </div>
          ) : (
            tasks.map((task) => {
              const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                    task.completed
                      ? 'bg-gray-50 border-gray-200 opacity-60'
                      : isOverdue
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-white border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition ${
                        task.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300 hover:border-emerald-500'
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-4 h-4" />}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                          {task.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span>{t.plantNameLabel}: <strong>{task.plantName}</strong></span>
                        <span>•</span>
                        <span className={isOverdue ? 'text-amber-700 font-semibold flex items-center gap-1' : ''}>
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>

                      {task.notes && (
                        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg mt-1 border border-gray-100">
                          {task.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    aria-label="Delete care task"
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: Soil N-P-K Calculator */}
      {plannerTab === 'soil' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              {t.soilPrescriptionEngine}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.soilPrescriptionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{t.targetCrop}</label>
              <select
                value={soilCrop}
                onChange={(e) => setSoilCrop(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50"
              >
                <option value="tomato">{language === 'or' ? 'ଟମାଟୋ (Tomato)' : language === 'hi' ? 'टमाटर (Tomato)' : 'Tomato'}</option>
                <option value="rice">{language === 'or' ? 'ଧାନ (Paddy / Rice)' : language === 'hi' ? 'धान (Paddy / Rice)' : 'Paddy / Rice'}</option>
                <option value="wheat">{language === 'or' ? 'ଗହମ (Wheat)' : language === 'hi' ? 'गेहूं (Wheat)' : 'Wheat'}</option>
                <option value="potato">{language === 'or' ? 'ଆଳୁ (Potato)' : language === 'hi' ? 'आलू (Potato)' : 'Potato'}</option>
                <option value="chili">{language === 'or' ? 'ଲଙ୍କା (Chili)' : language === 'hi' ? 'मिर्च (Chili)' : 'Chili / Pepper'}</option>
                <option value="cotton">{language === 'or' ? 'କପା (Cotton)' : language === 'hi' ? 'कपास (Cotton)' : 'Cotton'}</option>
                <option value="rose">{language === 'or' ? 'ଗୋଲାପ (Rose)' : language === 'hi' ? 'गुलाब (Rose)' : 'Rose & Floriculture'}</option>
                <option value="general">{language === 'or' ? 'ଅନ୍ୟାନ୍ୟ ଫସଲ' : language === 'hi' ? 'अन्य फसलें' : 'General Garden'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t.soilPhLabel} ({soilPh < 6 ? 'Acidic' : soilPh > 7.5 ? 'Alkaline' : 'Optimal 6.0-7.2'})
              </label>
              <input
                type="number"
                step="0.1"
                min="4"
                max="9.5"
                value={soilPh}
                onChange={(e) => setSoilPh(parseFloat(e.target.value) || 6.5)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{t.landAreaAcresLabel}</label>
              <input
                type="number"
                step="0.25"
                min="0.1"
                max="100"
                value={landAcres}
                onChange={(e) => setLandAcres(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50"
              />
            </div>
          </div>

          {/* N-P-K Readings */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">{t.availableNLabel}</label>
              <input
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(parseInt(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white"
              />
              <span className="text-[10px] text-gray-500">Normal: 280-560</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">{t.availablePLabel}</label>
              <input
                type="number"
                value={phosphorus}
                onChange={(e) => setPhosphorus(parseInt(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white"
              />
              <span className="text-[10px] text-gray-500">Normal: 10-25</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">{t.availableKLabel}</label>
              <input
                type="number"
                value={potassium}
                onChange={(e) => setPotassium(parseInt(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white"
              />
              <span className="text-[10px] text-gray-500">Normal: 120-280</span>
            </div>
          </div>

          <button
            onClick={handleCalculateSoil}
            disabled={isCalculatingSoil}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
          >
            {isCalculatingSoil ? t.calculatingDosages : t.recalculateFertilizers}
          </button>

          {/* Results Display */}
          {soilCalcResult && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>pH Status ({soilCalcResult.phStatus}):</strong> {soilCalcResult.phAdvice}
              </div>

              {/* Synthetic Fertilizer Dosages */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  {t.recommendedMineralFertilizer} ({soilCalcResult.landAreaAcres} Acre(s)):
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-800">Urea / ୟୁରିଆ (46% N)</span>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">{soilCalcResult.syntheticFertilizers.ureaKg} kg</div>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-800">DAP / ଡିଏପି (18-46-0)</span>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">{soilCalcResult.syntheticFertilizers.dapKg} kg</div>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-800">MOP / ପଟାସ (60% K2O)</span>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">{soilCalcResult.syntheticFertilizers.mopKg} kg</div>
                  </div>
                </div>

                {/* Application schedule */}
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5 text-gray-700">
                  <span className="font-bold text-gray-900 block">{t.splitApplicationTiming}</span>
                  {soilCalcResult.syntheticFertilizers.applicationSchedule.map((step, i) => (
                    <p key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{step}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Organic Options */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  {t.bioOrganicAlternative}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-[10px] text-green-800 block font-semibold">{language === 'or' ? 'ଗୋବର ଖତ' : language === 'hi' ? 'गोबर की खाद' : 'Farmyard Manure'}</span>
                    <span className="font-bold text-green-950">{soilCalcResult.organicFertilizers.wellRottedManureKg} kg</span>
                  </div>
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-[10px] text-green-800 block font-semibold">{language === 'or' ? 'ଜିଆ ଖତ' : language === 'hi' ? 'केंचुआ खाद' : 'Vermicompost'}</span>
                    <span className="font-bold text-green-950">{soilCalcResult.organicFertilizers.vermicompostKg} kg</span>
                  </div>
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-[10px] text-green-800 block font-semibold">{language === 'or' ? 'ନିମ୍ବ ପିଡ଼ିଆ' : language === 'hi' ? 'नीम की खली' : 'Neem Cake'}</span>
                    <span className="font-bold text-green-950">{soilCalcResult.organicFertilizers.neemCakeKg} kg</span>
                  </div>
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-[10px] text-green-800 block font-semibold">{language === 'or' ? 'କାଠ ପାଉଁଶ' : language === 'hi' ? 'लकड़ी की राख' : 'Wood Ash'}</span>
                    <span className="font-bold text-green-950">{soilCalcResult.organicFertilizers.woodAshKg} kg</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 italic">
                {soilCalcResult.safetyDisclaimer}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Smart Watering Estimator */}
      {plannerTab === 'watering' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              {t.smartMoistureEstimator}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.smartMoistureDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{t.growingSetupLabel}</label>
              <select
                value={containerSize}
                onChange={(e) => setContainerSize(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50"
              >
                <option value="small_pot">Small Pot (6-8 inches)</option>
                <option value="medium_pot">Medium Pot (10-14 inches)</option>
                <option value="large_pot">Large Container / Grow Bag</option>
                <option value="field_bed">Raised Garden Bed / Open Field</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{t.daytimeTempLabel}</label>
              <input
                type="number"
                min="10"
                max="50"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value) || 28)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{t.sunlightExposureLabel}</label>
              <input
                type="number"
                min="1"
                max="14"
                value={sunlightHours}
                onChange={(e) => setSunlightHours(parseInt(e.target.value) || 6)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-gray-50"
              />
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              {t.calibratedWaterSchedule}
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                <span className="text-[10px] text-blue-700 uppercase font-bold block">{t.waterVolumeLabel}</span>
                <span className="text-xl font-extrabold text-blue-950">{waterAdvice.amount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                <span className="text-[10px] text-blue-700 uppercase font-bold block">{t.frequencyLabel}</span>
                <span className="text-xl font-extrabold text-blue-950">{waterAdvice.frequency}</span>
              </div>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>{t.goldenRuleLabel}</strong> {waterAdvice.rule}
            </p>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-gray-900">{t.scheduleCareReminderModalTitle}</h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.taskTitleLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inspect tomato lower leaves"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.plantNameLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomato Roma"
                    value={newPlantName}
                    onChange={(e) => setNewPlantName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.taskCategoryLabel}</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  >
                    <option value="watering">Watering</option>
                    <option value="fertilizer">Fertilizer</option>
                    <option value="inspection">Inspection</option>
                    <option value="pesticide">Organic Spray</option>
                    <option value="soil_test">Soil Test</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.dueDateLabel}</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.notesLabel}</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Apply 5ml neem oil spray if whiteflies persist."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

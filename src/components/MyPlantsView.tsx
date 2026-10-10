import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Droplets,
  Calendar,
  Camera,
  Trash2,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Search,
  Filter,
  MapPin
} from 'lucide-react';
import { PlantProfile, HealthStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MyPlantsViewProps {
  plants: PlantProfile[];
  onAddPlant: (plant: Omit<PlantProfile, 'id'>) => void;
  onDeletePlant: (id: string) => void;
  onWaterPlant: (id: string) => void;
  onScanPlant: (crop: string) => void;
}

export const MyPlantsView: React.FC<MyPlantsViewProps> = ({
  plants,
  onAddPlant,
  onDeletePlant,
  onWaterPlant,
  onScanPlant,
}) => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New plant form
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [location, setLocation] = useState('Backyard Raised Bed');
  const [waterIntervalDays, setWaterIntervalDays] = useState(2);
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  const categoryLabels: Record<string, string> = {
    All: language === 'or' ? 'ସମସ୍ତ' : language === 'hi' ? 'सभी' : 'All',
    Vegetables: language === 'or' ? 'ପନିପରିବା' : language === 'hi' ? 'सब्जियां' : 'Vegetables',
    'Cereal Crops': language === 'or' ? 'ଶସ୍ୟ / ଧାନ-ଗହମ' : language === 'hi' ? 'अनाज / खाद्यान्न' : 'Cereal Crops',
    Floriculture: language === 'or' ? 'ଫୁଲ ଚାଷ' : language === 'hi' ? 'फूल / बागवानी' : 'Floriculture',
    Fruits: language === 'or' ? 'ଫଳ ଫସଲ' : language === 'hi' ? 'फल' : 'Fruits',
    Houseplants: language === 'or' ? 'ଘରୋଇ ଗଛ' : language === 'hi' ? 'घरेलू पौधे' : 'Houseplants',
  };

  const categories = ['All', 'Vegetables', 'Cereal Crops', 'Floriculture', 'Fruits', 'Houseplants'];

  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.species.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getHealthBadge = (status: HealthStatus) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> {t.healthy}
          </span>
        );
      case 'mild_stress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            <HeartPulse className="w-3 h-3 text-amber-600" /> {t.mildStress}
          </span>
        );
      case 'moderate_disease':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
            <AlertTriangle className="w-3 h-3 text-orange-600" /> {t.infected}
          </span>
        );
      case 'severe_disease':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
            <ShieldAlert className="w-3 h-3 text-red-600" /> {t.critical}
          </span>
        );
    }
  };

  const handleCreatePlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddPlant({
      name: name.trim(),
      species: species.trim() || name.trim(),
      category,
      location: location.trim() || 'Garden',
      waterIntervalDays,
      photoUrl:
        photoUrl.trim() ||
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
      healthStatus: 'healthy',
      dateAdded: new Date().toISOString().split('T')[0],
      notes: notes.trim(),
      scanCount: 0,
      lastWatered: new Date().toISOString().split('T')[0],
    });

    setName('');
    setSpecies('');
    setPhotoUrl('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
            <Sprout className="w-3.5 h-3.5" />
            <span>My Plant Collection</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t.savedPlantsTitle}</h2>
          <p className="text-xs text-gray-600">
            {t.savedPlantsDesc}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          {t.addPlantProfile}
        </button>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlantsPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-3">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center mx-auto">
            <Sprout className="w-8 h-8" />
          </div>
          <p className="font-bold text-gray-900 text-base">{t.noPlantsFound}</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {t.noPlantsFoundDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Photo & Health status overlay */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={plant.photoUrl}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    {getHealthBadge(plant.healthStatus)}
                  </div>
                  <div className="absolute bottom-2 left-2.5 text-[10px] font-semibold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{plant.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1">{plant.name}</h3>
                    <p className="text-xs text-emerald-800 font-medium line-clamp-1 italic">{plant.species}</p>
                  </div>

                  {plant.notes && (
                    <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 line-clamp-2">
                      {plant.notes}
                    </p>
                  )}

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      {plant.waterIntervalDays} days
                    </span>
                    <span>Scans: {plant.scanCount || 0}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onWaterPlant(plant.id)}
                  className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  {t.wateredAction}
                </button>

                <button
                  onClick={() => onScanPlant(plant.name)}
                  className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5" />
                  {t.diagnoseAction}
                </button>

                <button
                  onClick={() => onDeletePlant(plant.id)}
                  aria-label="Delete plant"
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Plant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-gray-900">{t.addPlantModalTitle}</h3>
            <form onSubmit={handleCreatePlant} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.plantNameLabel} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cherry Tomato #1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.botanicalSpeciesLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Solanum lycopersicum"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.categoryLabel}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  >
                    <option value="Vegetables">{categoryLabels.Vegetables}</option>
                    <option value="Cereal Crops">{categoryLabels['Cereal Crops']}</option>
                    <option value="Floriculture">{categoryLabels.Floriculture}</option>
                    <option value="Fruits">{categoryLabels.Fruits}</option>
                    <option value="Houseplants">{categoryLabels.Houseplants}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.locationBedLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Bed #2 or Balcony"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.wateringCycleDaysLabel}</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={waterIntervalDays}
                    onChange={(e) => setWaterIntervalDays(parseInt(e.target.value) || 2)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.photoUrlOptionalLabel}</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.careNotesLabel}</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sown from high-yield seeds. Mulched with straw."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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

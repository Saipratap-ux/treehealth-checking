import { PlantProfile, CareTask, DiagnosisResult } from '../types';

const STORAGE_KEYS = {
  PLANTS: 'sc_plant_health_plants_v1',
  HISTORY: 'sc_plant_health_history_v1',
  TASKS: 'sc_plant_health_tasks_v1',
  SETTINGS: 'sc_plant_health_settings_v1',
};

// Seed Plants for initial demo experience
const INITIAL_PLANTS: PlantProfile[] = [
  {
    id: 'plant-1',
    name: 'Home Garden Tomato',
    species: 'Solanum lycopersicum (Roma Tomato)',
    category: 'Vegetables',
    photoUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    dateAdded: '2026-09-15',
    healthStatus: 'mild_stress',
    lastWatered: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    waterIntervalDays: 2,
    location: 'Backyard Raised Bed #1',
    notes: 'Pruned bottom foliage. Monitoring lower leaves for early blight spots.',
    scanCount: 3,
  },
  {
    id: 'plant-2',
    name: 'Basmati Paddy Plot',
    species: 'Oryza sativa (Pusa Basmati)',
    category: 'Cereal Crops',
    photoUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80',
    dateAdded: '2026-09-01',
    healthStatus: 'healthy',
    lastWatered: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString().split('T')[0],
    waterIntervalDays: 1,
    location: 'North Field 2nd Acre',
    notes: 'Tillering stage. Thin water layer maintained (3cm).',
    scanCount: 2,
  },
  {
    id: 'plant-3',
    name: 'Hybrid Kashmiri Rose',
    species: 'Rosa rubiginosa',
    category: 'Floriculture',
    photoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    dateAdded: '2026-08-20',
    healthStatus: 'moderate_disease',
    lastWatered: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0],
    waterIntervalDays: 3,
    location: 'Balcony Ceramic Pot',
    notes: 'White powdery coating on newer shoots. Sprayed Neem extract 2 days ago.',
    scanCount: 4,
  },
];

const INITIAL_TASKS: CareTask[] = [
  {
    id: 'task-1',
    plantId: 'plant-1',
    plantName: 'Home Garden Tomato',
    type: 'watering',
    title: 'Water Tomato root zone (Avoid foliage wetting)',
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    completed: false,
    notes: 'Check soil moisture 2 inches deep first.',
  },
  {
    id: 'task-2',
    plantId: 'plant-1',
    plantName: 'Home Garden Tomato',
    type: 'inspection',
    title: 'Follow-up foliar scan for leaf spot progression',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    notes: 'Observe whether dark target-shaped lesions have dried up.',
  },
  {
    id: 'task-3',
    plantId: 'plant-3',
    plantName: 'Hybrid Kashmiri Rose',
    type: 'fertilizer',
    title: 'Apply Potassium foliar spray & Neem solution',
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    completed: false,
    notes: 'Dilute 5ml cold-pressed Neem oil with organic surfactant.',
  },
  {
    id: 'task-4',
    plantId: 'plant-2',
    plantName: 'Basmati Paddy Plot',
    type: 'soil_test',
    title: 'Collect soil sample for seasonal N-P-K & pH verification',
    dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    completed: false,
    notes: 'Send sample to local Krishi Vigyan Kendra or soil testing lab.',
  },
];

export function getStoredPlants(): PlantProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLANTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(INITIAL_PLANTS));
      return INITIAL_PLANTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PLANTS;
  }
}

export function savePlants(plants: PlantProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(plants));
  } catch (e) {
    console.error('Error saving plants:', e);
  }
}

export function getStoredHistory(): DiagnosisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDiagnosis(result: DiagnosisResult): void {
  try {
    const history = getStoredHistory();
    const updated = [result, ...history.filter(h => h.id !== result.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving diagnosis:', e);
  }
}

export function deleteDiagnosis(id: string): void {
  try {
    const history = getStoredHistory().filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Error deleting diagnosis:', e);
  }
}

export function getStoredTasks(): CareTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveTasks(tasks: CareTask[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
}

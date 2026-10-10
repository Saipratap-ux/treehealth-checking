export type HealthStatus = 'healthy' | 'mild_stress' | 'moderate_disease' | 'severe_disease';

export interface LikelyCause {
  name: string;
  probability: number;
  pathogenType: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'nutrient' | 'environmental' | 'unknown';
  description: string;
}

export interface NutrientAssessment {
  suspectedDeficiency: string;
  visualSigns: string;
  soilTestRequired: boolean;
  soilAdvice: string;
  npkGuidance: string;
}

export interface TreatmentPlan {
  immediateActions: string[];
  organicRemedies: string[];
  chemicalFungicideGuide: string[];
  preventiveMeasures: string[];
  wateringAdvice: string;
  sunlightGuidance: string;
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  plantName: string;
  imagePreviewUrl?: string;
  healthStatus: HealthStatus;
  confidence: number;
  confidenceDisclaimer: string;
  observedSymptoms: string[];
  likelyCauses: LikelyCause[];
  nutrientAssessment: NutrientAssessment;
  treatmentPlan: TreatmentPlan;
  followUpDays: number;
  warningSigns: string[];
  cropCategory?: string;
  notes?: string;
  location?: string;
}

export interface PlantProfile {
  id: string;
  name: string;
  species: string;
  category: string;
  photoUrl: string;
  dateAdded: string;
  healthStatus: HealthStatus;
  lastWatered?: string;
  waterIntervalDays: number;
  location: string;
  notes: string;
  scanCount: number;
}

export interface CareTask {
  id: string;
  plantId?: string;
  plantName: string;
  type: 'watering' | 'fertilizer' | 'inspection' | 'pesticide' | 'soil_test';
  title: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

export interface SoilTestInput {
  crop: string;
  soilPh: number;
  nitrogenKg: number;
  phosphorusKg: number;
  potassiumKg: number;
  landAreaAcres: number;
}

export interface SoilCalculationResult {
  crop: string;
  phStatus: string;
  phAdvice: string;
  landAreaAcres: number;
  syntheticFertilizers: {
    dapKg: number;
    ureaKg: number;
    mopKg: number;
    applicationSchedule: string[];
  };
  organicFertilizers: {
    wellRottedManureKg: number;
    vermicompostKg: number;
    neemCakeKg: number;
    woodAshKg: number;
  };
  safetyDisclaimer: string;
}

export type Language = 'en' | 'or' | 'hi';

export interface Translations {
  // Navigation & Common
  appName: string;
  appTagline: string;
  dashboard: string;
  scanPlant: string;
  myPlants: string;
  careAndSoil: string;
  scanHistory: string;
  alerts: string;
  settings: string;
  installApp: string;
  installAppPhone: string;
  offlineMode: string;
  offlineNotice: string;
  activeStandalone: string;
  freeApp: string;
  worksOffline: string;
  installNow: string;
  howToInstall: string;
  installOnIphone: string;
  close: string;
  done: string;
  cancel: string;
  delete: string;
  save: string;
  viewReport: string;
  healthy: string;
  mildStress: string;
  infected: string;
  critical: string;

  // Home Dashboard
  heroTitle: string;
  heroSubtitle: string;
  savedPlantsCount: string;
  tasksDueCount: string;
  aiScansCount: string;
  scanSickLeafCardTitle: string;
  scanSickLeafCardDesc: string;
  uploadPhotoCardTitle: string;
  uploadPhotoCardDesc: string;
  noticeLeafDistress: string;
  healthOverview: string;
  viewAll: string;
  healthyPlants: string;
  mildStressPlants: string;
  criticalCarePlants: string;
  upcomingCareTasks: string;
  carePlannerLink: string;
  noTasksDue: string;
  recentPlantDiagnoses: string;
  fullHistoryLink: string;

  // Scanner
  scanHeaderTitle: string;
  scanHeaderDesc: string;
  uploadPhotoTab: string;
  liveCameraTab: string;
  leafPhotoReady: string;
  retakeChange: string;
  alignLeafInReticle: string;
  clickToUpload: string;
  uploadFormats: string;
  selectFromGallery: string;
  sampleLeafPresets: string;
  tapToLoad: string;
  targetCropLabel: string;
  varietyNicknameLabel: string;
  varietyPlaceholder: string;
  observedSymptomsLabel: string;
  regionLabel: string;
  useCurrentLocation: string;
  detectingLocation: string;
  runAiDiagnosis: string;
  analyzingInProgress: string;
  diagnosticDisclaimerNote: string;
  diagnosisErrorTitle: string;

  // Diagnosis Report
  scanAnotherLeaf: string;
  printSavePdf: string;
  saveToMyPlants: string;
  savedToPlants: string;
  aiPathologyConfidence: string;
  readLimitations: string;
  showLess: string;
  limitationsLongText: string;
  identifiedSymptomsTitle: string;
  rankedPathogensTitle: string;
  nutrientSoilEvalTitle: string;
  visualEstimateBadge: string;
  visualCluesLabel: string;
  soilTestStatusLabel: string;
  fertilizerNoteLabel: string;
  treatmentCarePlanTitle: string;
  tabOrganic: string;
  tabChemical: string;
  tabWaterSun: string;
  tabEmergency: string;
  organicControlsHeader: string;
  chemicalControlsHeader: string;
  chemicalSafetyNotice: string;
  wateringInstructionsLabel: string;
  sunlightMicroclimateLabel: string;
  emergencyIsolationHeader: string;
  warningSignsHeader: string;
  scheduleSmartReminders: string;
  remindersAddedSuccess: string;
  downloadPdfReport: string;

  // Care Planner
  plannerTitle: string;
  plannerDesc: string;
  addCareReminder: string;
  tabCareTasks: string;
  tabSoilCalculator: string;
  tabWateringEstimator: string;
  soilPrescriptionEngine: string;
  soilPrescriptionDesc: string;
  targetCrop: string;
  soilPhLabel: string;
  landAreaAcresLabel: string;
  availableNLabel: string;
  availablePLabel: string;
  availableKLabel: string;
  recalculateFertilizers: string;
  calculatingDosages: string;
  recommendedMineralFertilizer: string;
  splitApplicationTiming: string;
  bioOrganicAlternative: string;
  smartMoistureEstimator: string;
  smartMoistureDesc: string;
  growingSetupLabel: string;
  daytimeTempLabel: string;
  sunlightExposureLabel: string;
  calibratedWaterSchedule: string;
  waterVolumeLabel: string;
  frequencyLabel: string;
  goldenRuleLabel: string;
  scheduleCareReminderModalTitle: string;
  taskTitleLabel: string;
  plantNameLabel: string;
  taskCategoryLabel: string;
  dueDateLabel: string;
  notesLabel: string;

  // My Plants
  savedPlantsTitle: string;
  savedPlantsDesc: string;
  addPlantProfile: string;
  searchPlantsPlaceholder: string;
  noPlantsFound: string;
  noPlantsFoundDesc: string;
  wateredAction: string;
  diagnoseAction: string;
  addPlantModalTitle: string;
  botanicalSpeciesLabel: string;
  categoryLabel: string;
  locationBedLabel: string;
  wateringCycleDaysLabel: string;
  photoUrlOptionalLabel: string;
  careNotesLabel: string;

  // Diagnosis History
  diagnosisHistoryTitle: string;
  diagnosisHistoryDesc: string;
  exportRecords: string;
  newScan: string;
  searchHistoryPlaceholder: string;
  allHealthConditions: string;
  noScanRecordsFound: string;
  scanSickPlantCta: string;

  // Notifications Center
  smartNotificationsTitle: string;
  smartNotificationsDesc: string;
  pushNotificationsActive: string;
  notificationsBlocked: string;
  enableMobilePhoneAlerts: string;
  deviceAlertsDesc: string;
  allowNotificationsBtn: string;
  testAlertBtn: string;
  alertSentToast: string;
  inAppGuarantee: string;
  activeScheduledReminders: string;
  tapCheckComplete: string;
  noPendingAlerts: string;

  // Settings
  appSettingsSupportTitle: string;
  appSettingsSupportDesc: string;
  mobileInstallStatus: string;
  pwaCapabilitiesDesc: string;
  displayModeLabel: string;
  operatingSystemLabel: string;
  diagnosticServiceHealth: string;
  backendApiLabel: string;
  aiEngineLabel: string;
  offlineStorageLabel: string;
  kisanCallCenterTitle: string;
  kisanCallCenterDesc: string;
  kisanTollFreeBtn: string;
  icarPortalTitle: string;
  icarPortalDesc: string;
  resetLocalDemoDataTitle: string;
  resetLocalDemoDataDesc: string;
  resetDataBtn: string;
  confirmResetBtn: string;

  // Languages names
  langEnglish: string;
  langOdia: string;
  langHindi: string;
  switchLanguage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'TreeHealthAI',
    appTagline: 'Healthy Trees • Greener Tomorrow',
    dashboard: 'Dashboard',
    scanPlant: 'Scan Plant',
    myPlants: 'My Plants',
    careAndSoil: 'Care & Soil',
    scanHistory: 'Scan History',
    alerts: 'Alerts',
    settings: 'Settings',
    installApp: 'Install App',
    installAppPhone: 'Install TreeHealthAI on Your Phone',
    offlineMode: 'Offline Mode',
    offlineNotice: 'Offline Mode — Cached botanical guides & offline saved plants active.',
    activeStandalone: 'Installed & Running in native standalone mode.',
    freeApp: 'Free App',
    worksOffline: 'Works offline in field conditions • Quick 1-tap camera leaf scanner • No app store needed',
    installNow: 'Install Now',
    howToInstall: 'How to Install',
    installOnIphone: 'Install on iPhone',
    close: 'Close',
    done: 'Done',
    cancel: 'Cancel',
    delete: 'Delete',
    save: 'Save',
    viewReport: 'View Report',
    healthy: 'Healthy & Thriving',
    mildStress: 'Mild Stress / Early Symptoms',
    infected: 'Moderate Disease / Infection',
    critical: 'Severe Infection / Critical',

    heroTitle: 'Protect Your Plants & Maximize Harvest Yields',
    heroSubtitle: 'Instant leaf disease detection, nutrient deficiency diagnosis, and tailored organic and chemical treatment plans.',
    savedPlantsCount: 'Saved Plants',
    tasksDueCount: 'Tasks Due',
    aiScansCount: 'AI Scans',
    scanSickLeafCardTitle: 'Scan Sick Plant Leaf',
    scanSickLeafCardDesc: 'Point your camera at spotted, yellowing, or wilted leaves for immediate AI pathology.',
    uploadPhotoCardTitle: 'Upload Photo & Presets',
    uploadPhotoCardDesc: 'Pick an existing crop image from your device gallery or explore demo diseased leaves.',
    noticeLeafDistress: 'Notice Any Leaf Distress?',
    healthOverview: 'Health Overview',
    viewAll: 'View All',
    healthyPlants: 'Healthy Plants',
    mildStressPlants: 'Mild Stress',
    criticalCarePlants: 'Critical Care',
    upcomingCareTasks: 'Upcoming Care Tasks',
    carePlannerLink: 'Care Planner →',
    noTasksDue: 'No tasks due right now! Great job tending to your garden.',
    recentPlantDiagnoses: 'Recent Plant Diagnoses',
    fullHistoryLink: 'Full Scan History →',

    scanHeaderTitle: 'Scan & Diagnose Plant Disease',
    scanHeaderDesc: 'Capture or upload a clear photo of an infected leaf. Receive disease causes, nutrient checks, and verified remedies.',
    uploadPhotoTab: 'Upload Photo',
    liveCameraTab: 'Live Camera',
    leafPhotoReady: 'Leaf photo ready',
    retakeChange: 'Retake / Change',
    alignLeafInReticle: 'Align sick leaf inside reticle',
    clickToUpload: 'Click to select or drag a leaf photo here',
    uploadFormats: 'Supports JPG, PNG, WebP (Best resolution: close-up, sharp lighting)',
    selectFromGallery: 'Select Image from Gallery',
    sampleLeafPresets: 'Or try a sample diseased leaf photo:',
    tapToLoad: 'Tap to load',
    targetCropLabel: 'Target Crop / Plant Type',
    varietyNicknameLabel: 'Specific Variety or Nickname (Optional)',
    varietyPlaceholder: 'e.g. Roma VF, Basmati 1121, Kashmiri',
    observedSymptomsLabel: 'Observed Leaf Symptoms (Tap to refine AI diagnosis)',
    regionLabel: 'Region',
    useCurrentLocation: 'Use Current Location',
    detectingLocation: 'Detecting...',
    runAiDiagnosis: 'Run AI Plant Health Diagnosis',
    analyzingInProgress: 'Analyzing Leaf with Plant AI...',
    diagnosticDisclaimerNote: 'Diagnostic advice distinguishes visual estimates from official soil laboratory tests.',
    diagnosisErrorTitle: 'Diagnosis Could Not Complete',

    scanAnotherLeaf: 'Scan Another Leaf',
    printSavePdf: 'Print / Save PDF Report',
    saveToMyPlants: 'Save to My Plants',
    savedToPlants: 'Saved to Plants',
    aiPathologyConfidence: 'AI Pathology Confidence',
    readLimitations: 'Read agronomic limitations',
    showLess: 'Show less',
    limitationsLongText: 'Computer vision diagnoses foliar manifestations only. Similar chlorosis and spots can occur from root asphyxiation, nematode damage, soil salinity, or multiple pathogens concurrently. For commercial plots, always verify with regional agronomists or soil labs.',
    identifiedSymptomsTitle: 'Identified Foliar Symptoms',
    rankedPathogensTitle: 'Ranked Pathogens & Likely Causes',
    nutrientSoilEvalTitle: 'Nutrient & Soil Health Evaluation',
    visualEstimateBadge: 'Visual Estimate',
    visualCluesLabel: 'Visual Clues:',
    soilTestStatusLabel: 'Soil Test Status:',
    fertilizerNoteLabel: 'Fertilizer Note:',
    treatmentCarePlanTitle: 'Agronomic Treatment & Care Plan',
    tabOrganic: '🌿 Organic / Bio',
    tabChemical: '🧪 Chemical / Spray',
    tabWaterSun: '💧 Water & Sun',
    tabEmergency: '🚨 Emergency Steps',
    organicControlsHeader: 'Natural, Biological & Eco-Friendly Controls',
    chemicalControlsHeader: 'Targeted Fungicide / Pesticide Protocol (With Safety Rules)',
    chemicalSafetyNotice: 'Always spray during calm weather (early morning or after 4 PM) and avoid direct runoff into waterways.',
    wateringInstructionsLabel: 'Watering Instructions:',
    sunlightMicroclimateLabel: 'Sunlight & Microclimate:',
    emergencyIsolationHeader: 'Immediate Containment & Isolation Actions',
    warningSignsHeader: 'Emergency Warning Signs (Seek Agronomist / KVK Intervention):',
    scheduleSmartReminders: 'Schedule Smart Reminders',
    remindersAddedSuccess: 'Care Tasks & Reminders Added!',
    downloadPdfReport: 'Download PDF Report',

    plannerTitle: 'Plant Care Planner',
    plannerDesc: 'Track daily watering tasks, balance soil N-P-K, and calculate fertilizer dosages.',
    addCareReminder: 'Add Care Reminder',
    tabCareTasks: 'Care Tasks',
    tabSoilCalculator: 'Soil N-P-K Calculator',
    tabWateringEstimator: 'Watering Estimator',
    soilPrescriptionEngine: 'Soil Test-to-Fertilizer Prescription Engine',
    soilPrescriptionDesc: 'Input actual or estimated soil test card values. The engine computes balanced doses and split applications.',
    targetCrop: 'Target Crop',
    soilPhLabel: 'Soil pH',
    landAreaAcresLabel: 'Land Area (Acres)',
    availableNLabel: 'Available N (kg/ha)',
    availablePLabel: 'Available P (kg/ha)',
    availableKLabel: 'Available K (kg/ha)',
    recalculateFertilizers: 'Recalculate Fertilizer Doses',
    calculatingDosages: 'Calculating Agronomic Dosages...',
    recommendedMineralFertilizer: 'Recommended Mineral Fertilizer',
    splitApplicationTiming: 'Split Application Timing:',
    bioOrganicAlternative: 'Bio-Organic Nutrient Alternative:',
    smartMoistureEstimator: 'Smart Moisture & Evaporation Estimator',
    smartMoistureDesc: 'Avoid both drought and root waterlogging with climate-calibrated watering.',
    growingSetupLabel: 'Plant Growing Setup',
    daytimeTempLabel: 'Daytime Temp (°C)',
    sunlightExposureLabel: 'Sunlight Exposure (Hours)',
    calibratedWaterSchedule: 'Calibrated Water Schedule',
    waterVolumeLabel: 'Water Volume',
    frequencyLabel: 'Frequency',
    goldenRuleLabel: 'Golden Rule:',
    scheduleCareReminderModalTitle: 'Schedule Care Reminder',
    taskTitleLabel: 'Task Title *',
    plantNameLabel: 'Plant Name',
    taskCategoryLabel: 'Task Category',
    dueDateLabel: 'Due Date',
    notesLabel: 'Notes / Instructions',

    savedPlantsTitle: 'Saved Plants & Crops',
    savedPlantsDesc: 'Keep track of individual crops, diagnosis logs, and watering schedules.',
    addPlantProfile: 'Add Plant Profile',
    searchPlantsPlaceholder: 'Search by plant name, species, or field location...',
    noPlantsFound: 'No plants found',
    noPlantsFoundDesc: 'Try adjusting your search filter or add a plant profile to monitor its health over time.',
    wateredAction: 'Watered',
    diagnoseAction: 'Diagnose',
    addPlantModalTitle: 'Add New Plant to Collection',
    botanicalSpeciesLabel: 'Botanical Species',
    categoryLabel: 'Category',
    locationBedLabel: 'Location / Bed',
    wateringCycleDaysLabel: 'Watering Cycle (Days)',
    photoUrlOptionalLabel: 'Photo Image URL (Optional)',
    careNotesLabel: 'Care Notes',

    diagnosisHistoryTitle: 'Diagnosis History',
    diagnosisHistoryDesc: 'Review past scans, monitor symptom changes, and compare treatment efficacy.',
    exportRecords: 'Export Records',
    newScan: 'New Scan',
    searchHistoryPlaceholder: 'Search scans by plant or disease name...',
    allHealthConditions: 'All Health Conditions',
    noScanRecordsFound: 'No scan records found',
    scanSickPlantCta: 'Scan a Sick Plant',

    smartNotificationsTitle: 'Smart Notifications',
    smartNotificationsDesc: 'Timely reminders for root zone watering, foliar check-ins, and seasonal soil tests.',
    pushNotificationsActive: 'Push Notifications Active',
    notificationsBlocked: 'Notifications Blocked in Browser',
    enableMobilePhoneAlerts: 'Enable Mobile Phone Alerts',
    deviceAlertsDesc: 'Your device will receive alerts when care tasks are due.',
    allowNotificationsBtn: 'Allow Notifications',
    testAlertBtn: 'Test Alert',
    alertSentToast: 'Sent!',
    inAppGuarantee: 'In-App Guarantee: Even if browser push is disabled, all scheduled care reminders remain active and visible in your in-app notification center.',
    activeScheduledReminders: 'Active Scheduled Reminders',
    tapCheckComplete: 'Tap check to mark completed',
    noPendingAlerts: 'No Pending Care Alerts',

    appSettingsSupportTitle: 'App Settings & Support',
    appSettingsSupportDesc: 'Device permissions, PWA mobile configuration, agricultural hotlines, and server diagnostic logs.',
    mobileInstallStatus: 'Mobile Installation Status',
    pwaCapabilitiesDesc: 'Progressive Web App installation capabilities on this phone or tablet.',
    displayModeLabel: 'Display Mode:',
    operatingSystemLabel: 'Operating System:',
    diagnosticServiceHealth: 'Diagnostic Service Health',
    backendApiLabel: 'Backend API:',
    aiEngineLabel: 'AI Engine:',
    offlineStorageLabel: 'Offline Storage:',
    kisanCallCenterTitle: 'Kisan Call Center (India - All Languages)',
    kisanCallCenterDesc: 'Toll-free advice for crop diseases, weather & agriculture schemes in your language',
    kisanTollFreeBtn: '1800-180-1551',
    icarPortalTitle: 'ICAR Crop Science Advisory',
    icarPortalDesc: 'Indian Council of Agricultural Research Portal',
    resetLocalDemoDataTitle: 'Reset Local Demo Data',
    resetLocalDemoDataDesc: 'Restores default sample plants and care tasks.',
    resetDataBtn: 'Reset Data',
    confirmResetBtn: 'Confirm Reset',

    langEnglish: 'English',
    langOdia: 'ଓଡ଼ିଆ (Odia)',
    langHindi: 'हिन्दी (Hindi)',
    switchLanguage: 'Language / ଭାଷା / भाषा',
  },

  or: {
    appName: 'TreeHealthAI',
    appTagline: 'Healthy Trees • Greener Tomorrow',
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    scanPlant: 'ପତ୍ର ସ୍କାନ୍ କରନ୍ତୁ',
    myPlants: 'ମୋର ଫସଲ',
    careAndSoil: 'ଯତ୍ନ ଓ ମୃତ୍ତିକା',
    scanHistory: 'ଯାଞ୍ଚ ଇତିହାସ',
    alerts: 'ସୂଚନା / ଆଲର୍ଟ',
    settings: 'ସେଟିଂସ',
    installApp: 'ଆପ୍ ଇନଷ୍ଟଲ କରନ୍ତୁ',
    installAppPhone: 'ମୋବାଇଲ୍ ଫୋନରେ TreeHealthAI ଇନଷ୍ଟଲ କରନ୍ତୁ',
    offlineMode: 'ଅଫଲାଇନ୍ ମୋଡ୍',
    offlineNotice: 'ଅଫଲାଇନ୍ ମୋଡ୍ — ଇଣ୍ଟରନେଟ୍ ବିନା ସେଭ୍ ହୋଇଥିବା ତଥ୍ୟ କାମ କରୁଛି।',
    activeStandalone: 'ନିଜସ୍ୱ ମୋବାଇଲ୍ ଆପ୍ ପରି ଚାଲୁଅଛି।',
    freeApp: 'ମାଗଣା ଆପ୍',
    worksOffline: 'ବିଲରେ ଇଣ୍ଟରନେଟ୍ ନଥିଲେ ବି କାମ କରେ • ୧-ଟ୍ୟାପ୍ କ୍ୟାମେରା ସ୍କାନର • କୌଣସି ପ୍ଲେ ଷ୍ଟୋର୍ ଆବଶ୍ୟକ ନାହିଁ',
    installNow: 'ଏବେ ଇନଷ୍ଟଲ କରନ୍ତୁ',
    howToInstall: 'କିପରି ଇନଷ୍ଟଲ କରିବେ',
    installOnIphone: 'ଆଇଫୋନରେ ଇନଷ୍ଟଲ କରନ୍ତୁ',
    close: 'ବନ୍ଦ କରନ୍ତୁ',
    done: 'ସମ୍ପନ୍ନ',
    cancel: 'ବାତିଲ୍',
    delete: 'ହଟାନ୍ତୁ',
    save: 'ସେଭ୍ କରନ୍ତୁ',
    viewReport: 'ରିପୋର୍ଟ ଦେଖନ୍ତୁ',
    healthy: 'ସୁସ୍ଥ ଓ ଉତ୍ତମ ବୃଦ୍ଧି',
    mildStress: 'ସାମାନ୍ୟ କ୍ଷତି / ପ୍ରାଥମିକ ଲକ୍ଷଣ',
    infected: 'ମଧ୍ୟମ ଧରଣର ରୋଗ ସଂକ୍ରମଣ',
    critical: 'ଗମ୍ଭୀର ରୋଗ / ଜରୁରୀ ଯତ୍ନ',

    heroTitle: 'ଫସଲର ସୁରକ୍ଷା କରନ୍ତୁ ଓ ଅଧିକ ଅମଳ ପାଆନ୍ତୁ',
    heroSubtitle: 'ତତକ୍ଷଣାତ୍ ପତ୍ର ରୋଗ ଚିହ୍ନଟ, ପୋଷକ ତତ୍ତ୍ୱ ଅଭାବ ପରୀକ୍ଷା, ଜୈବିକ ଏବଂ ରାସାୟନିକ ଉପଚାର ବିଧି।',
    savedPlantsCount: 'ସେଭ୍ ଫସଲ',
    tasksDueCount: 'ଆଜିର କାମ',
    aiScansCount: 'ଏଆଇ ସ୍କାନ୍',
    scanSickLeafCardTitle: 'ରୋଗାକ୍ରାନ୍ତ ପତ୍ର ସ୍କାନ୍ କରନ୍ତୁ',
    scanSickLeafCardDesc: 'ଦାଗ, ହଳଦିଆ କିମ୍ବା ଶୁଖିଲା ପତ୍ର ଆଡ଼କୁ କ୍ୟାମେରା ରଖି ତୁରନ୍ତ AI ପରୀକ୍ଷା କରନ୍ତୁ।',
    uploadPhotoCardTitle: 'ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ',
    uploadPhotoCardDesc: 'ଆପଣଙ୍କ ଗ୍ୟାଲେରୀରୁ ଫଟୋ ବାଛନ୍ତୁ କିମ୍ବା ନମୁନା ରୋଗ ପତ୍ର ଦେଖନ୍ତୁ।',
    noticeLeafDistress: 'ପତ୍ରରେ କିଛି ରୋଗ ବା ଲକ୍ଷଣ ଦେଖାଯାଉଛି କି?',
    healthOverview: 'ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି',
    viewAll: 'ସବୁ ଦେଖନ୍ତୁ',
    healthyPlants: 'ସୁସ୍ଥ ଫସଲ',
    mildStressPlants: 'ସାମାନ୍ୟ କ୍ଷତି',
    criticalCarePlants: 'ଜରୁରୀ ଯତ୍ନ ଆବଶ୍ୟକ',
    upcomingCareTasks: 'ଆଗାମୀ ଯତ୍ନ କାର୍ଯ୍ୟସୂଚୀ',
    carePlannerLink: 'ଯତ୍ନ ପ୍ଲାନର୍ →',
    noTasksDue: 'ଏବେ କୌଣସି କାର୍ଯ୍ୟ ବାକି ନାହିଁ! ଆପଣଙ୍କ ଫସଲ ଭଲ ଅଛି।',
    recentPlantDiagnoses: 'ନିକଟରେ ହୋଇଥିବା ଯାଞ୍ଚ ରିପୋର୍ଟ',
    fullHistoryLink: 'ସମ୍ପୂର୍ଣ୍ଣ ଇତିହାସ →',

    scanHeaderTitle: 'ଫସଲ ରୋଗ ସ୍କାନ୍ ଓ ନିରାକରଣ',
    scanHeaderDesc: 'ରୋଗ ଲାଗିଥିବା ପତ୍ରର ଏକ ସ୍ପଷ୍ଟ ଫଟୋ ଉଠାନ୍ତୁ। ରୋଗର କାରଣ, ଖତ ସାର ଓ ଜୈବିକ ଔଷଧ ସୂଚନା ପାଆନ୍ତୁ।',
    uploadPhotoTab: 'ଫଟୋ ଅପଲୋଡ୍',
    liveCameraTab: 'ଲାଇଭ୍ କ୍ୟାମେରା',
    leafPhotoReady: 'ପତ୍ର ଫଟୋ ପ୍ରସ୍ତୁତ',
    retakeChange: 'ପୁନର୍ବାର ନିଅନ୍ତୁ / ବଦଳାନ୍ତୁ',
    alignLeafInReticle: 'ରୋଗାକ୍ରାନ୍ତ ପତ୍ରକୁ ଫ୍ରେମ୍ ଭିତରେ ରଖନ୍ତୁ',
    clickToUpload: 'ପତ୍ରର ଫଟୋ ଚୟନ କରିବାକୁ ଏଠାରେ ଟ୍ୟାପ୍ କରନ୍ତୁ',
    uploadFormats: 'JPG, PNG, WebP ସମର୍ଥନ କରେ (ପରିଷ୍କାର ଆଲୋକରେ ନିକଟରୁ ଫଟୋ ନିଅନ୍ତୁ)',
    selectFromGallery: 'ଗ୍ୟାଲେରୀରୁ ଫଟୋ ବାଛନ୍ତୁ',
    sampleLeafPresets: 'କିମ୍ବା ନମୁନା ରୋଗାକ୍ରାନ୍ତ ପତ୍ର ଚୟନ କରନ୍ତୁ:',
    tapToLoad: 'କ୍ଲିକ୍ କରି ଲୋଡ୍ କରନ୍ତୁ',
    targetCropLabel: 'ଫସଲ / ଗଛର ପ୍ରକାର',
    varietyNicknameLabel: 'କିସମ କିମ୍ବା ନାମ (ଇଚ୍ଛାଧୀନ)',
    varietyPlaceholder: 'ଯଥା: ପୂସା ବାସମତୀ, ଟମାଟୋ ରୋମା, କାଶ୍ମୀରୀ',
    observedSymptomsLabel: 'ପତ୍ରରେ ଦେଖାଯାଉଥିବା ଲକ୍ଷଣ (ଚୟନ କରନ୍ତୁ)',
    regionLabel: 'ଅଞ୍ଚଳ',
    useCurrentLocation: 'ବର୍ତ୍ତମାନର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ',
    detectingLocation: 'ସ୍ଥାନ ଯାଞ୍ଚ ହେଉଛି...',
    runAiDiagnosis: 'AI ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା କରନ୍ତୁ',
    analyzingInProgress: 'AI ପତ୍ର ପରୀକ୍ଷା କରୁଅଛି...',
    diagnosticDisclaimerNote: 'ଏହି ପରାମର୍ଶ କେବଳ ପତ୍ର ଦେଖି କରାଯାଇଛି, ସରକାରୀ ମୃତ୍ତିକା ପରୀକ୍ଷା ସହ ଯାଞ୍ଚ କରିବା ଉଚିତ।',
    diagnosisErrorTitle: 'ପରୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ ହୋଇପାରିଲା ନାହିଁ',

    scanAnotherLeaf: 'ଅନ୍ୟ ପତ୍ର ସ୍କାନ୍ କରନ୍ତୁ',
    printSavePdf: 'ପ୍ରିଣ୍ଟ / PDF ରିପୋର୍ଟ ସେଭ୍ କରନ୍ତୁ',
    saveToMyPlants: 'ମୋର ଫସଲରେ ସେଭ୍ କରନ୍ତୁ',
    savedToPlants: 'ଫସଲ ତାଲିକାରେ ସେଭ୍ ହେଲା',
    aiPathologyConfidence: 'AI ରୋଗ ନିର୍ଣ୍ଣୟ ନିର୍ଭୁଲତା',
    readLimitations: 'ସୀମାବଦ୍ଧତା ପଢ଼ନ୍ତୁ',
    showLess: 'କମ୍ ଦେଖନ୍ତୁ',
    limitationsLongText: 'କମ୍ପ୍ୟୁଟର ଭିଜନ କେବଳ ପତ୍ରର ଉପର ଭାଗକୁ ପରୀକ୍ଷା କରେ। ଚେର ସଢ଼ା, ଜଳବନ୍ଦୀ ବା ମାଟିର pH ପାଇଁ ମଧ୍ୟ ପତ୍ର ହଳଦିଆ ହୋଇପାରେ। ବଡ଼ ଚାଷ ପାଇଁ ନିକଟସ୍ଥ କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK) ସହ ପରାମର୍ଶ କରନ୍ତୁ।',
    identifiedSymptomsTitle: 'ଚିହ୍ନଟ ହୋଇଥିବା ପତ୍ର ଲକ୍ଷଣ',
    rankedPathogensTitle: 'ସମ୍ଭାବ୍ୟ ରୋଗ ଓ କାରଣ',
    nutrientSoilEvalTitle: 'ପୋଷକ ତତ୍ତ୍ୱ ଓ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ ମୂଲ୍ୟାଙ୍କନ',
    visualEstimateBadge: 'ଦୃଶ୍ୟମାନ ଆକଳନ',
    visualCluesLabel: 'ପତ୍ରର ଲକ୍ଷଣ:',
    soilTestStatusLabel: 'ମୃତ୍ତିକା ସ୍ଥିତି:',
    fertilizerNoteLabel: 'ସାର ପ୍ରୟୋଗ ସୂଚନା:',
    treatmentCarePlanTitle: 'କୃଷି ଉପଚାର ଓ ଯତ୍ନ ପରାମର୍ଶ',
    tabOrganic: '🌿 ଜୈବିକ / ଦେଶୀ ଉପଚାର',
    tabChemical: '🧪 କୀଟନାଶକ / ସ୍ପ୍ରେ',
    tabWaterSun: '💧 ପାଣି ଓ ଖରା',
    tabEmergency: '🚨 ଜରୁରୀ ପଦକ୍ଷେପ',
    organicControlsHeader: 'ପ୍ରାକୃତିକ, ଜୈବିକ ଓ ପରିବେଶ ଅନୁକୂଳ ଉପଚାର',
    chemicalControlsHeader: 'ନିର୍ଦ୍ଦିଷ୍ଟ କବକନାଶକ / କୀଟନାଶକ ପ୍ରୟୋଗ (ସୁରକ୍ଷା ନିୟମ ସହ)',
    chemicalSafetyNotice: 'ସର୍ବଦା ଶାନ୍ତ ପାଗରେ (ସକାଳେ କିମ୍ବା ଅପରାହ୍ନ ୪ଟା ପରେ) ସ୍ପ୍ରେ କରନ୍ତୁ ଏବଂ ମୁହଁରେ ମାସ୍କ ବ୍ୟବହାର କରନ୍ତୁ।',
    wateringInstructionsLabel: 'ପାଣି ଦେବା ନିୟମ:',
    sunlightMicroclimateLabel: 'ସୂର୍ଯ୍ୟାଲୋକ ଓ ପରିବେଶ:',
    emergencyIsolationHeader: 'ତୁରନ୍ତ ରୋଗ ନିୟନ୍ତ୍ରଣ ପଦକ୍ଷେପ',
    warningSignsHeader: 'ବିପଦ ଲକ୍ଷଣ (ତୁରନ୍ତ କୃଷି ଅଧିକାରୀଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ):',
    scheduleSmartReminders: 'ସ୍ମାର୍ଟ ରିମାଇଣ୍ଡର ସେଟ୍ କରନ୍ତୁ',
    remindersAddedSuccess: 'ଯତ୍ନ କାର୍ଯ୍ୟ ଓ ରିମାଇଣ୍ଡର ସଫଳତାର ସହ ଯୋଡ଼ାଗଲା!',
    downloadPdfReport: 'PDF ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',

    plannerTitle: 'ଫସଲ ଯତ୍ନ ପ୍ଲାନର୍',
    plannerDesc: 'ଦୈନିକ ପାଣି ଦେବା ସମୟ, ମାଟିର N-P-K ପରିମାଣ ଓ ସାର ହିସାବ କରନ୍ତୁ।',
    addCareReminder: 'ନୂଆ ରିମାଇଣ୍ଡର ଯୋଡ଼ନ୍ତୁ',
    tabCareTasks: 'ଯତ୍ନ କାର୍ଯ୍ୟ',
    tabSoilCalculator: 'ମୃତ୍ତିକା N-P-K କାଲକୁଲେଟର',
    tabWateringEstimator: 'ପାଣି ଆବଶ୍ୟକତା ଆକଳନ',
    soilPrescriptionEngine: 'ମୃତ୍ତିକା ପରୀକ୍ଷା ଅନୁଯାୟୀ ସାର ପରିମାଣ ଇଞ୍ଜିନ୍',
    soilPrescriptionDesc: 'ଆପଣଙ୍କ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ଼ର ମୂଲ୍ୟ ଦିଅନ୍ତୁ। ଏହା ସଠିକ୍ ସାର ମାତ୍ରା ଏବଂ ସମୟ ବତାଇବ।',
    targetCrop: 'ଫସଲ ବାଛନ୍ତୁ',
    soilPhLabel: 'ମାଟିର pH',
    landAreaAcresLabel: 'ଜମି ପରିମାଣ (ଏକର)',
    availableNLabel: 'ଉପଲବ୍ଧ ଯବକ୍ଷାରଜାନ - N (kg/ha)',
    availablePLabel: 'ଉପଲବ୍ଧ ଫସଫରସ୍ - P (kg/ha)',
    availableKLabel: 'ଉପଲବ୍ଧ ପଟାସ - K (kg/ha)',
    recalculateFertilizers: 'ସାର ମାତ୍ରା ପୁନଃ ହିସାବ କରନ୍ତୁ',
    calculatingDosages: 'ହିସାବ ଚାଲୁଅଛି...',
    recommendedMineralFertilizer: 'ଆବଶ୍ୟକ ଖଣିଜ ରାସାୟନିକ ସାର',
    splitApplicationTiming: 'ସାର ପ୍ରୟୋଗ ସମୟସୂଚୀ:',
    bioOrganicAlternative: 'ଜୈବିକ ଖତ ବିକଳ୍ପ:',
    smartMoistureEstimator: 'ସ୍ମାର୍ଟ ଜଳସେଚନ ଆକଳନ',
    smartMoistureDesc: 'ଅତ୍ୟଧିକ ପାଣି ଜମିବା ଓ ଚେର ସଢ଼ାରୁ ରକ୍ଷା ପାଆନ୍ତୁ।',
    growingSetupLabel: 'ଚାଷ ପରିବେଶ',
    daytimeTempLabel: 'ଦିନର ତାପମାତ୍ରା (°C)',
    sunlightExposureLabel: 'ଖରା ସମୟ (ଘଣ୍ଟା)',
    calibratedWaterSchedule: 'ନିର୍ଦ୍ଧାରିତ ପାଣି ସୂଚୀ',
    waterVolumeLabel: 'ପାଣି ପରିମାଣ',
    frequencyLabel: 'ଅବଧି',
    goldenRuleLabel: 'ମୂଳ ନିୟମ:',
    scheduleCareReminderModalTitle: 'ଯତ୍ନ ସୂଚନା ତାରିଖ ସେଟ୍ କରନ୍ତୁ',
    taskTitleLabel: 'କାର୍ଯ୍ୟ ଶୀର୍ଷକ *',
    plantNameLabel: 'ଫସଲ ନାମ',
    taskCategoryLabel: 'କାର୍ଯ୍ୟ ପ୍ରକାର',
    dueDateLabel: 'ତାରିଖ',
    notesLabel: 'ବିଶେଷ ନିର୍ଦ୍ଦେଶ / ଟିପ୍ପଣୀ',

    savedPlantsTitle: 'ମୋର ସଂରକ୍ଷିତ ଫସଲ ଓ ଗଛ',
    savedPlantsDesc: 'ନିଜର ପ୍ରତ୍ୟେକ ଫସଲ, ରୋଗ ଇତିହାସ ଓ ଜଳସେଚନ ଉପରେ ନଜର ରଖନ୍ତୁ।',
    addPlantProfile: 'ନୂଆ ଫସଲ ଯୋଡ଼ନ୍ତୁ',
    searchPlantsPlaceholder: 'ଫସଲ ନାମ, କିସମ କିମ୍ବା ଜମି ଖୋଜନ୍ତୁ...',
    noPlantsFound: 'କୌଣସି ଫସଲ ମିଳିଲା ନାହିଁ',
    noPlantsFoundDesc: 'ଅନ୍ୟ ନାମରେ ସର୍ଚ୍ଚ କରନ୍ତୁ କିମ୍ବା ନୂଆ ଫସଲ ପ୍ରୋଫାଇଲ୍ ଯୋଡ଼ନ୍ତୁ।',
    wateredAction: 'ପାଣି ଦିଆଗଲା',
    diagnoseAction: 'ରୋଗ ପରୀକ୍ଷା',
    addPlantModalTitle: 'ତାଲିକାରେ ନୂଆ ଫସଲ ଯୋଡ଼ନ୍ତୁ',
    botanicalSpeciesLabel: 'ଉଦ୍ଭିଦ ବିଜ୍ଞାନ ନାମ',
    categoryLabel: 'ବର୍ଗ',
    locationBedLabel: 'ଜମି / ସ୍ଥାନ',
    wateringCycleDaysLabel: 'ପାଣି ଦେବା ବ୍ୟବଧାନ (ଦିନ)',
    photoUrlOptionalLabel: 'ଫଟୋ URL (ଇଚ୍ଛାଧୀନ)',
    careNotesLabel: 'ଯତ୍ନ ଟିପ୍ପଣୀ',

    diagnosisHistoryTitle: 'ପୂର୍ବ ପରୀକ୍ଷା ଇତିହାସ',
    diagnosisHistoryDesc: 'ଅତୀତର ସ୍କାନ୍ ଦେଖନ୍ତୁ ଏବଂ ଚିକିତ୍ସା ପରେ ରୋଗ ଭଲ ହୋଇଛି କି ନାହିଁ ମିଳାନ୍ତୁ।',
    exportRecords: 'ରେକର୍ଡ଼ ଡାଉନଲୋଡ୍',
    newScan: 'ନୂଆ ସ୍କାନ୍',
    searchHistoryPlaceholder: 'ଫସଲ କିମ୍ବା ରୋଗ ନାମ ଖୋଜନ୍ତୁ...',
    allHealthConditions: 'ସମସ୍ତ ସ୍ଥିତି',
    noScanRecordsFound: 'କୌଣସି ସ୍କାନ୍ ରେକର୍ଡ଼ ନାହିଁ',
    scanSickPlantCta: 'ଗଛର ପତ୍ର ସ୍କାନ୍ କରନ୍ତୁ',

    smartNotificationsTitle: 'ସ୍ମାର୍ଟ ରିମାଇଣ୍ଡର ଓ ସୂଚନା',
    smartNotificationsDesc: 'ଜଳସେଚନ, କୀଟନାଶକ ସ୍ପ୍ରେ ଏବଂ ମାଟି ପରୀକ୍ଷା ପାଇଁ ସମୟାନୁବର୍ତ୍ତୀ ମନେପକାଣି।',
    pushNotificationsActive: 'ମୋବାଇଲ୍ ସୂଚନା ସକ୍ରିୟ ଅଛି',
    notificationsBlocked: 'ବ୍ରାଉଜରରେ ସୂଚନା ବନ୍ଦ ଅଛି',
    enableMobilePhoneAlerts: 'ମୋବାଇଲ୍ ଫୋନ୍ ଆଲର୍ଟ ଚାଲୁ କରନ୍ତୁ',
    deviceAlertsDesc: 'ଫସଲ ଯତ୍ନ ସମୟ ହେଲେ ଆପଣଙ୍କ ଫୋନକୁ ସୂଚନା ଆସିବ।',
    allowNotificationsBtn: 'ସୂଚନା ଅନୁମତି ଦିଅନ୍ତୁ',
    testAlertBtn: 'ଟେଷ୍ଟ ଆଲର୍ଟ',
    alertSentToast: 'ପଠାଗଲା!',
    inAppGuarantee: 'ନିଶ୍ଚିତତା: ବ୍ରାଉଜର ସୂଚନା ବନ୍ଦ ଥିଲେ ବି, ଆପ୍ ଭିତରେ ସବୁ ରିମାଇଣ୍ଡର ସୁରକ୍ଷିତ ଓ ଦୃଶ୍ୟମାନ ରହିବ।',
    activeScheduledReminders: 'ସକ୍ରିୟ ରିମାଇଣ୍ଡର ତାଲିକା',
    tapCheckComplete: 'ସମ୍ପନ୍ନ ହେଲେ ଟିକ କରନ୍ତୁ',
    noPendingAlerts: 'କୌଣସି ବାକି ଆଲର୍ଟ ନାହିଁ',

    appSettingsSupportTitle: 'ଆପ୍ ସେଟିଂସ ଓ ସହାୟତା',
    appSettingsSupportDesc: 'ମୋବାଇଲ୍ ଇନଷ୍ଟଲ, କୃଷି ବିଭାଗ ହେଲ୍ପଲାଇନ୍ ଓ ସିଷ୍ଟମ୍ ସୂଚନା।',
    mobileInstallStatus: 'ମୋବାଇଲ୍ ଇନଷ୍ଟଲେସନ୍ ସ୍ଥିତି',
    pwaCapabilitiesDesc: 'ଏହି ଫୋନରେ ପ୍ରୋଗ୍ରେସିଭ୍ ୱେବ୍ ଆପ୍ (PWA) ଭାବେ ସିଧାସଳଖ ଇନଷ୍ଟଲ ହୋଇପାରିବ।',
    displayModeLabel: 'ପ୍ରଦର୍ଶନ ମୋଡ୍:',
    operatingSystemLabel: 'ଅପରେଟିଂ ସିଷ୍ଟମ୍:',
    diagnosticServiceHealth: 'AI ନିଦାନ ସେବା ସ୍ଥିତି',
    backendApiLabel: 'ବ୍ୟାକଏଣ୍ଡ୍ API:',
    aiEngineLabel: 'AI ଇଞ୍ଜିନ୍:',
    offlineStorageLabel: 'ଅଫଲାଇନ୍ ଷ୍ଟୋରେଜ୍:',
    kisanCallCenterTitle: 'କିଷାନ କଲ୍ ସେଣ୍ଟର (ଓଡ଼ିଶା ଓ ସର୍ବଭାରତୀୟ)',
    kisanCallCenterDesc: 'ନିଜ ମାତୃଭାଷା ଓଡ଼ିଆରେ ଫସଲ ରୋଗ, ପାଣିପାଗ ଓ ସରକାରୀ ଯୋଜନା ବିଷୟରେ ମାଗଣା ପରାମର୍ଶ ପାଆନ୍ତୁ',
    kisanTollFreeBtn: '୧୮୦୦-୧୮୦-୧୫୫୧',
    icarPortalTitle: 'ICAR କେନ୍ଦ୍ରୀୟ ଧାନ ଗବେଷଣା (NRRI କଟକ) / ICAR ପୋର୍ଟାଲ',
    icarPortalDesc: 'ଭାରତୀୟ କୃଷି ଗବେଷଣା ପରିଷଦ ପୋର୍ଟାଲ',
    resetLocalDemoDataTitle: 'ଡେମୋ ତଥ୍ୟ ପୁନଃ ସେଟ୍ କରନ୍ତୁ',
    resetLocalDemoDataDesc: 'ଡିଫଲ୍ଟ ନମୁନା ଫସଲ ଏବଂ କାର୍ଯ୍ୟ ଫେରାଇ ଆଣିବ।',
    resetDataBtn: 'ତଥ୍ୟ ରିସେଟ୍ କରନ୍ତୁ',
    confirmResetBtn: 'ନିଶ୍ଚିତ ରିସେଟ୍',

    langEnglish: 'English',
    langOdia: 'ଓଡ଼ିଆ (Odia)',
    langHindi: 'हिन्दी (Hindi)',
    switchLanguage: 'ଭାଷା ବଦଳାନ୍ତୁ (Language)',
  },

  hi: {
    appName: 'TreeHealthAI',
    appTagline: 'Healthy Trees • Greener Tomorrow',
    dashboard: 'डैशबोर्ड',
    scanPlant: 'पौधा स्कैन करें',
    myPlants: 'मेरी फसलें',
    careAndSoil: 'देखभाल एवं मिट्टी',
    scanHistory: 'जांच इतिहास',
    alerts: 'अलर्ट्स',
    settings: 'सेटिंग्स',
    installApp: 'ऐप इंस्टॉल करें',
    installAppPhone: 'TreeHealthAI को अपने मोबाइल फोन पर इंस्टॉल करें',
    offlineMode: 'ऑफलाइन मोड',
    offlineNotice: 'ऑफलाइन मोड — इंटरनेट के बिना भी सुरक्षित जानकारी काम कर रही है।',
    activeStandalone: 'नेटिव मोबाइल ऐप की तरह सक्रिय है।',
    freeApp: 'फ्री ऐप',
    worksOffline: 'खेत में बिना इंटरनेट भी काम करता है • 1-टैप कैमरा पत्ती स्कैनर • किसी प्ले स्टोर की आवश्यकता नहीं',
    installNow: 'अभी इंस्टॉल करें',
    howToInstall: 'कैसे इंस्टॉल करें',
    installOnIphone: 'iPhone पर इंस्टॉल करें',
    close: 'बंद करें',
    done: 'पूर्ण',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    save: 'सहेजें',
    viewReport: 'रिपोर्ट देखें',
    healthy: 'स्वस्थ एवं उत्तम बढ़वार',
    mildStress: 'हल्का तनाव / शुरुआती लक्षण',
    infected: 'मध्यम रोग संक्रमण',
    critical: 'गंभीर संक्रमण / आपातकालीन देखभाल',

    heroTitle: 'फसल की सुरक्षा करें एवं भरपूर पैदावार पाएं',
    heroSubtitle: 'तत्काल पत्ती रोग पहचान, पोषक तत्वों की कमी का परीक्षण, और जैविक एवं रासायनिक उपचार विधि।',
    savedPlantsCount: 'सहेजे गए पौधे',
    tasksDueCount: 'आज के कार्य',
    aiScansCount: 'AI स्कैन',
    scanSickLeafCardTitle: 'रोगी पत्ती स्कैन करें',
    scanSickLeafCardDesc: 'धब्बेदार, पीली या मुरझाई पत्तियों पर कैमरा रखें और तुरंत AI जांच रिपोर्ट पाएं।',
    uploadPhotoCardTitle: 'फोटो अपलोड करें',
    uploadPhotoCardDesc: 'गैलरी से फसल का फोटो चुनें या हमारे नमूना रोगग्रस्त पत्तियों को देखें।',
    noticeLeafDistress: 'क्या पत्तियों में कोई खराबी दिख रही है?',
    healthOverview: 'फसल स्वास्थ्य स्थिति',
    viewAll: 'सभी देखें',
    healthyPlants: 'स्वस्थ फसलें',
    mildStressPlants: 'हल्का तनाव',
    criticalCarePlants: 'तत्काल देखभाल जरूरी',
    upcomingCareTasks: 'आगामी देखभाल कार्य',
    carePlannerLink: 'देखभाल प्लानर →',
    noTasksDue: 'वर्तमान में कोई कार्य लंबित नहीं है! आपकी फसलें सुरक्षित हैं।',
    recentPlantDiagnoses: 'हालिया पौधे की जांच',
    fullHistoryLink: 'पूरा इतिहास देखें →',

    scanHeaderTitle: 'फसल रोग स्कैन एवं उपचार',
    scanHeaderDesc: 'संक्रमित पत्ती का स्पष्ट फोटो लें। रोग का कारण, खाद-उर्वरक एवं प्रमाणित जैविक दवाइयां जानें।',
    uploadPhotoTab: 'फोटो अपलोड',
    liveCameraTab: 'लाइव कैमरा',
    leafPhotoReady: 'पत्ती का फोटो तैयार है',
    retakeChange: 'पुनः लें / बदलें',
    alignLeafInReticle: 'रोगी पत्ती को फ्रेम के अंदर रखें',
    clickToUpload: 'पत्ती का फोटो चुनने के लिए यहां टैप करें',
    uploadFormats: 'JPG, PNG, WebP समर्थित (अच्छी रोशनी में पास से फोटो लें)',
    selectFromGallery: 'गैलरी से फोटो चुनें',
    sampleLeafPresets: 'या नमूना रोगग्रस्त पत्ती चुनकर देखें:',
    tapToLoad: 'लोड करने के लिए टैप करें',
    targetCropLabel: 'फसल / पौधे का प्रकार',
    varietyNicknameLabel: 'किस्म या नाम (वैकल्पिक)',
    varietyPlaceholder: 'जैसे: पूसा बासमती, टमाटर रोमा, कश्मीरी',
    observedSymptomsLabel: 'पत्तियों पर दिखने वाले लक्षण (चुनें)',
    regionLabel: 'क्षेत्र',
    useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
    detectingLocation: 'स्थान खोजा जा रहा है...',
    runAiDiagnosis: 'AI फसल स्वास्थ्य जांच शुरू करें',
    analyzingInProgress: 'AI पत्ती की जांच कर रहा है...',
    diagnosticDisclaimerNote: 'यह सलाह पत्तियों के दृश्य लक्षणों पर आधारित है, आधिकारिक मिट्टी परीक्षण से पुष्टि अवश्य करें।',
    diagnosisErrorTitle: 'जांच पूर्ण नहीं हो सकी',

    scanAnotherLeaf: 'दूसरी पत्ती स्कैन करें',
    printSavePdf: 'प्रिंट / PDF रिपोर्ट सहेजें',
    saveToMyPlants: 'मेरी फसलों में जोड़ें',
    savedToPlants: 'फसल सूची में जोड़ा गया',
    aiPathologyConfidence: 'AI रोग पहचान सटीकता',
    readLimitations: 'सीमाएं पढ़ें',
    showLess: 'कम देखें',
    limitationsLongText: 'कंप्यूटर विजन केवल पत्तियों के बाहरी लक्षणों की जांच करता है। जड़ गलन, जलभराव या मिट्टी के असंतुलन से भी पत्तियां पीली हो सकती हैं। बड़े खेतों के लिए स्थानीय कृषि विज्ञान केंद्र (KVK) से सलाह लें।',
    identifiedSymptomsTitle: 'पहचाने गए पत्ती के लक्षण',
    rankedPathogensTitle: 'संभावित रोग एवं कारण',
    nutrientSoilEvalTitle: 'पोषक तत्व एवं मिट्टी स्वास्थ्य मूल्यांकन',
    visualEstimateBadge: 'दृश्य अनुमान',
    visualCluesLabel: 'दिखने वाले लक्षण:',
    soilTestStatusLabel: 'मिट्टी परीक्षण स्थिति:',
    fertilizerNoteLabel: 'उर्वरक सलाह:',
    treatmentCarePlanTitle: 'कृषि उपचार एवं देखभाल योजना',
    tabOrganic: '🌿 जैविक / देसी उपचार',
    tabChemical: '🧪 कीटनाशक / स्प्रे',
    tabWaterSun: '💧 पानी एवं धूप',
    tabEmergency: '🚨 आपातकालीन कदम',
    organicControlsHeader: 'प्राकृतिक, जैविक एवं पर्यावरण-अनुकूल नियंत्रण',
    chemicalControlsHeader: 'लक्षित कवकनाशी / कीटनाशक छिड़काव (सुरक्षा नियमों के साथ)',
    chemicalSafetyNotice: 'हमेशा शांत मौसम में (सुबह या शाम 4 बजे के बाद) छिड़काव करें और मास्क जरूर पहनें।',
    wateringInstructionsLabel: 'सिंचाई निर्देश:',
    sunlightMicroclimateLabel: 'धूप एवं तापमान:',
    emergencyIsolationHeader: 'तत्काल रोग रोकथाम के उपाय',
    warningSignsHeader: 'खतरे के लक्षण (तत्काल कृषि अधिकारी से संपर्क करें):',
    scheduleSmartReminders: 'स्मार्ट रिमाइंडर सेट करें',
    remindersAddedSuccess: 'देखभाल कार्य एवं रिमाइंडर सफलतापूर्वक जोड़े गए!',
    downloadPdfReport: 'PDF रिपोर्ट डाउनलोड करें',

    plannerTitle: 'फसल देखभाल प्लानर',
    plannerDesc: 'दैनिक सिंचाई, मिट्टी का N-P-K संतुलन और खाद की सही मात्रा की गणना करें।',
    addCareReminder: 'नया रिमाइंडर जोड़ें',
    tabCareTasks: 'देखभाल कार्य',
    tabSoilCalculator: 'मिट्टी N-P-K कैलकुलेटर',
    tabWateringEstimator: 'सिंचाई आवश्यकता अनुमान',
    soilPrescriptionEngine: 'मिट्टी परीक्षण आधारित उर्वरक निर्धारण इंजन',
    soilPrescriptionDesc: 'अपने सॉयल हेल्थ कार्ड के आंकड़े दर्ज करें। इंजन संतुलित खाद की मात्रा और छिड़काव का समय बताएगा।',
    targetCrop: 'फसल चुनें',
    soilPhLabel: 'मिट्टी का pH',
    landAreaAcresLabel: 'खेत का क्षेत्रफल (एकड़)',
    availableNLabel: 'उपलब्ध नाइट्रोजन - N (kg/ha)',
    availablePLabel: 'उपलब्ध फास्फोरस - P (kg/ha)',
    availableKLabel: 'उपलब्ध पोटाश - K (kg/ha)',
    recalculateFertilizers: 'खाद की मात्रा पुनः गणना करें',
    calculatingDosages: 'गणना की जा रही है...',
    recommendedMineralFertilizer: 'अनुशंसित खनिज उर्वरक',
    splitApplicationTiming: 'उर्वरक देने का सही समय:',
    bioOrganicAlternative: 'जैविक खाद विकल्प:',
    smartMoistureEstimator: 'स्मार्ट नमी एवं सिंचाई अनुमान',
    smartMoistureDesc: 'सूखे और जड़ गलन दोनों से फसल को सुरक्षित रखें।',
    growingSetupLabel: 'फसल परिवेश',
    daytimeTempLabel: 'दिन का तापमान (°C)',
    sunlightExposureLabel: 'धूप के घंटे',
    calibratedWaterSchedule: 'निर्धारित सिंचाई समय',
    waterVolumeLabel: 'पानी की मात्रा',
    frequencyLabel: 'अवधि',
    goldenRuleLabel: 'मुख्य नियम:',
    scheduleCareReminderModalTitle: 'देखभाल रिमाइंडर निर्धारित करें',
    taskTitleLabel: 'कार्य शीर्षक *',
    plantNameLabel: 'फसल का नाम',
    taskCategoryLabel: 'कार्य प्रकार',
    dueDateLabel: 'तारीख',
    notesLabel: 'विशेष निर्देश',

    savedPlantsTitle: 'सहेजे गए पौधे एवं फसलें',
    savedPlantsDesc: 'अपनी हर फसल के स्वास्थ्य, रोग इतिहास और सिंचाई का रिकॉर्ड रखें।',
    addPlantProfile: 'नया पौधा जोड़ें',
    searchPlantsPlaceholder: 'पौधे का नाम, किस्म या खेत खोजें...',
    noPlantsFound: 'कोई पौधा नहीं मिला',
    noPlantsFoundDesc: 'सर्च बदलकर देखें या नया पौधा जोड़ें।',
    wateredAction: 'पानी दिया',
    diagnoseAction: 'रोग जांच',
    addPlantModalTitle: 'नई फसल सूची में जोड़ें',
    botanicalSpeciesLabel: 'वानस्पतिक नाम',
    categoryLabel: 'श्रेणी',
    locationBedLabel: 'खेत / गमला स्थान',
    wateringCycleDaysLabel: 'सिंचाई अंतराल (दिन)',
    photoUrlOptionalLabel: 'फोटो URL (वैकल्पिक)',
    careNotesLabel: 'देखभाल नोट्स',

    diagnosisHistoryTitle: 'रोग जांच इतिहास',
    diagnosisHistoryDesc: 'पुराने स्कैन देखें और उपचार के बाद रोग में सुधार की जांच करें।',
    exportRecords: 'रिकॉर्ड निर्यात करें',
    newScan: 'नया स्कैन',
    searchHistoryPlaceholder: 'फसल या रोग का नाम खोजें...',
    allHealthConditions: 'सभी स्वास्थ्य स्थितियां',
    noScanRecordsFound: 'कोई स्कैन रिकॉर्ड नहीं मिला',
    scanSickPlantCta: 'रोगी पौधा स्कैन करें',

    smartNotificationsTitle: 'स्मार्ट रिमाइंडर एवं सूचनाएं',
    smartNotificationsDesc: 'सिंचाई, कीटनाशक छिड़काव और मिट्टी जांच के लिए समय पर अलर्ट।',
    pushNotificationsActive: 'मोबाइल पुश नोटिफिकेशन सक्रिय हैं',
    notificationsBlocked: 'ब्राउज़र में नोटिफिकेशन बंद हैं',
    enableMobilePhoneAlerts: 'मोबाइल फोन अलर्ट चालू करें',
    deviceAlertsDesc: 'देखभाल का समय होने पर आपके डिवाइस पर अलर्ट आएगा।',
    allowNotificationsBtn: 'नोटिफिकेशन की अनुमति दें',
    testAlertBtn: 'टेस्ट अलर्ट',
    alertSentToast: 'भेजा गया!',
    inAppGuarantee: 'इन-ऐप गारंटी: ब्राउज़र नोटिफिकेशन बंद होने पर भी ऐप के अंदर सभी रिमाइंडर सुरक्षित एवं दिखेंगे।',
    activeScheduledReminders: 'सक्रिय रिमाइंडर सूची',
    tapCheckComplete: 'पूरा होने पर टिक करें',
    noPendingAlerts: 'कोई लंबित अलर्ट नहीं है',

    appSettingsSupportTitle: 'ऐप सेटिंग्स एवं किसान सहायता',
    appSettingsSupportDesc: 'मोबाइल इंस्टॉलेशन, कृषि हेल्पलाइन और सिस्टम स्थिति।',
    mobileInstallStatus: 'मोबाइल इंस्टॉलेशन स्थिति',
    pwaCapabilitiesDesc: 'यह ऐप इस फोन पर बिना प्ले स्टोर के सीधे ऐप की तरह इंस्टॉल हो सकता है।',
    displayModeLabel: 'डिस्प्ले मोड:',
    operatingSystemLabel: 'ऑपरेटिंग सिस्टम:',
    diagnosticServiceHealth: 'AI निदान सेवा स्वास्थ्य',
    backendApiLabel: 'बैकएंड API:',
    aiEngineLabel: 'AI इंजन:',
    offlineStorageLabel: 'ऑफलाइन स्टोरेज:',
    kisanCallCenterTitle: 'किसान कॉल सेंटर (भारत - सभी भाषाएं)',
    kisanCallCenterDesc: 'फसल रोग, मौसम और सरकारी योजनाओं के लिए अपनी भाषा में मुफ्त सलाह पाएं',
    kisanTollFreeBtn: '1800-180-1551',
    icarPortalTitle: 'ICAR भारतीय कृषि अनुसंधान परिषद',
    icarPortalDesc: 'कृषि वैज्ञानिकों का आधिकारिक पोर्टल',
    resetLocalDemoDataTitle: 'डेमो डेटा रीसेट करें',
    resetLocalDemoDataDesc: 'डिफ़ॉल्ट पौधे और देखभाल कार्यों को पुनर्स्थापित करता है।',
    resetDataBtn: 'डेटा रीसेट करें',
    confirmResetBtn: 'रीसेट की पुष्टि करें',

    langEnglish: 'English',
    langOdia: 'ଓଡ଼ିଆ (Odia)',
    langHindi: 'हिन्दी (Hindi)',
    switchLanguage: 'भाषा बदलें (Language)',
  },
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  SwitchCamera,
  ChevronRight,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { DiagnosisResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PlantScannerProps {
  onDiagnosisComplete: (result: DiagnosisResult) => void;
  initialCrop?: string;
}

export const PlantScanner: React.FC<PlantScannerProps> = ({ onDiagnosisComplete, initialCrop }) => {
  const { t, language } = useLanguage();

  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [selectedCrop, setSelectedCrop] = useState<string>(initialCrop || 'Tomato');
  const [customPlantName, setCustomPlantName] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [locationName, setLocationName] = useState<string>(
    language === 'or' ? 'ସ୍ଥାନୀୟ କ୍ଷେତ / ବଗିଚା' : language === 'hi' ? 'स्थानीय खेत / बगीचा' : 'Local Farm / Garden'
  );
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Camera stream state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Analysis status
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Localized presets
  const sampleLeafPresets = [
    {
      name: language === 'or' ? 'ଟମାଟୋ (ଆଗୁଆ ଝାଉଁଳା ରୋଗ)' : language === 'hi' ? 'टमाटर (अगेती झुलसा)' : 'Tomato (Early Blight)',
      crop: language === 'or' ? 'ଟମାଟୋ' : language === 'hi' ? 'टमाटर' : 'Tomato',
      cropCategory: 'Solanaceae',
      symptoms: language === 'or' ? 'ହଳଦିଆ ଦାଗ ଓ ଶୁଖିଲା ପତ୍ର' : language === 'hi' ? 'पीले धब्बे और सूखी पत्तियां' : 'Concentric dark spots with yellow halo',
      url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: language === 'or' ? 'ଧାନ (ବ୍ଲାଷ୍ଟ ଓ ପତ୍ର ଦାଗ ରୋଗ)' : language === 'hi' ? 'धान (ब्लास्ट एवं पत्ती धब्बा)' : 'Paddy / Rice (Blast & Leaf Spot)',
      crop: language === 'or' ? 'ଧାନ' : language === 'hi' ? 'धान' : 'Paddy / Rice',
      cropCategory: 'Cereal',
      symptoms: language === 'or' ? 'ହୀରା ଆକୃତିର ବାଦାମୀ ଦାଗ' : language === 'hi' ? 'नाव के आकार के धब्बे' : 'Spindle-shaped diamond lesions',
      url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: language === 'or' ? 'ଗୋଲାପ (ପାଉଡର ଫିମ୍ପି)' : language === 'hi' ? 'गुलाब (सफेद चूर्णिल फफूंद)' : 'Rose (Powdery Mildew)',
      crop: language === 'or' ? 'ଗୋଲାପ' : language === 'hi' ? 'गुलाब' : 'Rose',
      cropCategory: 'Floriculture',
      symptoms: language === 'or' ? 'ଧଳା ପାଉଡର ଆସ୍ତରଣ' : language === 'hi' ? 'सफेद पाउडर परत' : 'White powdery coating',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: language === 'or' ? 'ଲଙ୍କା (ପତ୍ର କୁଞ୍ଚନ ରୋଗ)' : language === 'hi' ? 'मिर्च (पत्ती मरोड़ रोग)' : 'Chili (Leaf Curl)',
      crop: language === 'or' ? 'ଲଙ୍କା' : language === 'hi' ? 'मिर्च' : 'Chili / Pepper',
      cropCategory: 'Vegetables',
      symptoms: language === 'or' ? 'ପତ୍ର ଉପରକୁ ମୋଡ଼ି ହୋଇଯିବା' : language === 'hi' ? 'पत्तियां ऊपर मुड़ना' : 'Upward leaf curling',
      url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const commonSymptoms = [
    { key: 'yellow', label: language === 'or' ? 'ହଳଦିଆ ପତ୍ର (Chlorosis)' : language === 'hi' ? 'पीली पत्तियां (क्लोरोसिस)' : 'Yellowing Leaves (Chlorosis)' },
    { key: 'spots', label: language === 'or' ? 'କଳା / ବାଦାମୀ ଦାଗ' : language === 'hi' ? 'काले / भूरे धब्बे' : 'Dark / Brown Leaf Spots' },
    { key: 'mold', label: language === 'or' ? 'ଧଳା ପାଉଡର ଫିମ୍ପି' : language === 'hi' ? 'सफेद पाउडर फफूंद' : 'White Powdery Mold' },
    { key: 'wilt', label: language === 'or' ? 'ଝାଉଁଳି ପଡ଼ିବା (Wilting)' : language === 'hi' ? 'मुरझाना (विल्टिंग)' : 'Wilting / Drooping Foliage' },
    { key: 'curl', label: language === 'or' ? 'ପତ୍ର କୁଞ୍ଚନ (ମୋଡ଼ି ହେବା)' : language === 'hi' ? 'पत्ती मुड़ना (कर्ल)' : 'Leaf Curling & Wrinkling' },
    { key: 'burnt', label: language === 'or' ? 'ପତ୍ର ଧାର ପୋଡ଼ିଯିବା' : language === 'hi' ? 'पत्ती के किनारे जलना' : 'Burnt Leaf Edges' },
    { key: 'canker', label: language === 'or' ? 'କାଣ୍ଡରେ ଘାଆ ବା ଦାଗ' : language === 'hi' ? 'तने पर घाव / धब्बे' : 'Stem Lesions / Cankers' },
    { key: 'pest', label: language === 'or' ? 'ପୋକ ଖାଇଥିବା ପତ୍ର' : language === 'hi' ? 'कीटों द्वारा खाई पत्तियां' : 'Pest / Insect Chewing' },
  ];

  const cropsList = [
    { value: 'Tomato', label: language === 'or' ? 'ଟମାଟୋ (Tomato)' : language === 'hi' ? 'टमाटर (Tomato)' : 'Tomato' },
    { value: 'Paddy / Rice', label: language === 'or' ? 'ଧାନ (Paddy / Rice)' : language === 'hi' ? 'धान / चावल (Paddy / Rice)' : 'Paddy / Rice' },
    { value: 'Wheat', label: language === 'or' ? 'ଗହମ (Wheat)' : language === 'hi' ? 'गेहूं (Wheat)' : 'Wheat' },
    { value: 'Potato', label: language === 'or' ? 'ଆଳୁ (Potato)' : language === 'hi' ? 'आलू (Potato)' : 'Potato' },
    { value: 'Chili / Pepper', label: language === 'or' ? 'ଲଙ୍କା (Chili)' : language === 'hi' ? 'मिर्च (Chili)' : 'Chili / Pepper' },
    { value: 'Cotton', label: language === 'or' ? 'କପା (Cotton)' : language === 'hi' ? 'कपास (Cotton)' : 'Cotton' },
    { value: 'Maize / Corn', label: language === 'or' ? 'ମକା (Maize)' : language === 'hi' ? 'मक्का (Maize)' : 'Maize / Corn' },
    { value: 'Mango', label: language === 'or' ? 'ଆମ୍ବ (Mango)' : language === 'hi' ? 'आम (Mango)' : 'Mango' },
    { value: 'Sugarcane', label: language === 'or' ? 'ଆଖୁ (Sugarcane)' : language === 'hi' ? 'गन्ना (Sugarcane)' : 'Sugarcane' },
    { value: 'Rose & Floriculture', label: language === 'or' ? 'ଗୋଲାପ / ଫୁଲ (Rose)' : language === 'hi' ? 'गुलाब / फूल (Rose)' : 'Rose & Floriculture' },
    { value: 'Indoor Houseplant', label: language === 'or' ? 'ଘରୋଇ ଗଛ (Houseplant)' : language === 'hi' ? 'घरेलू पौधे (Houseplant)' : 'Indoor Houseplant' },
    { value: 'General Garden Vegetable', label: language === 'or' ? 'ଅନ୍ୟାନ୍ୟ ପନିପରିବା' : language === 'hi' ? 'अन्य सब्जियां' : 'General Garden Vegetable' },
  ];

  // Manage camera cleanup
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const startCamera = async (facing: 'environment' | 'user') => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported on this device/browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? (language === 'or' ? 'କ୍ୟାମେରା ଅନୁମତି ଅସ୍ୱୀକୃତ। ଦୟାକରି ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।' : language === 'hi' ? 'कैमरा अनुमति अस्वीकृत। कृपया फोटो अपलोड का उपयोग करें।' : 'Camera permission denied. Please upload a photo instead.')
          : (language === 'or' ? 'କ୍ୟାମେରା ଖୋଲିବା ସମ୍ଭବ ହେଲା ନାହିଁ। ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।' : language === 'hi' ? 'कैमरा खोलने में असमर्थ। कृपया फोटो अपलोड करें।' : 'Unable to open camera stream. Please use the Upload Photo option.')
      );
    }
  };

  useEffect(() => {
    if (mode === 'camera' && !selectedImage) {
      startCamera(cameraFacing);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mode, cameraFacing, selectedImage]);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setSelectedImage(dataUrl);
      setImageMimeType('image/jpeg');
      stopCamera();
    }
  };

  // Convert uploaded image to resized base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAnalysisError('Please choose a valid image file (JPEG, PNG, or WebP).');
      return;
    }

    setAnalysisError(null);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setSelectedImage(compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationName('Standard Agricultural Zone');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setLocationName(`Lat ${latitude.toFixed(2)}°, Long ${longitude.toFixed(2)}° (Local Climate)`);
      },
      () => {
        setIsLocating(false);
        setLocationName('Regional Agriculture Zone');
      },
      { timeout: 6000 }
    );
  };

  // Trigger analysis
  const runDiagnosis = async () => {
    if (!selectedImage) {
      setAnalysisError(
        language === 'or'
          ? 'ଦୟାକରି ପ୍ରଥମେ ଗଛର ପତ୍ର ଫଟୋ ଉଠାନ୍ତୁ କିମ୍ବା ଅପଲୋଡ୍ କରନ୍ତୁ।'
          : language === 'hi'
          ? 'कृपया पहले पौधे की पत्ती का फोटो लें या अपलोड करें।'
          : 'Please snap a photo or upload an image of the plant leaf first.'
      );
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    const steps = language === 'or' ? [
      'ପତ୍ର ଫଟୋର ପିକ୍ସେଲ୍ ସ୍କାନ୍ ହେଉଛି...',
      'ପତ୍ରର ଦାଗ ଓ ରଙ୍ଗ ପରୀକ୍ଷା ଚାଲୁଅଛି...',
      'ଫଙ୍ଗସ୍ ଏବଂ ବ୍ୟାକ୍ଟେରିଆ ଲକ୍ଷଣ ଯାଞ୍ଚ ହେଉଛି...',
      'ପୋଷକ ତତ୍ତ୍ୱ ଅଭାବ ଓ ମୃତ୍ତିକା ସମ୍ବନ୍ଧ ଯାଞ୍ଚ ହେଉଛି...',
      'ଓଡ଼ିଆ ଭାଷାରେ ଉପଚାର ଓ ସାର ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ ହେଉଛି...',
    ] : language === 'hi' ? [
      'पत्ती की फोटो स्कैन की जा रही है...',
      'धब्बों एवं रंग के लक्षणों का विश्लेषण हो रहा है...',
      'फफूंद एवं बैक्टीरिया के लक्षणों की जांच जारी है...',
      'पोषक तत्वों की कमी और मिट्टी का मिलान हो रहा है...',
      'हिंदी में उपचार एवं खाद की सलाह तैयार हो रही है...',
    ] : [
      'Scanning plant leaf image pixels...',
      'Analyzing foliar lesions and color spectrum...',
      'Assessing microbial pathogen indicators...',
      'Cross-referencing soil nutrient correlations...',
      'Finalizing agronomist care plan...',
    ];

    let stepIndex = 0;
    setAnalysisStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setAnalysisStep(steps[stepIndex]);
      }
    }, 900);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: imageMimeType,
          plantName: customPlantName || selectedCrop,
          cropCategory: selectedCrop,
          symptomsObserved: selectedSymptoms.join(', '),
          location: locationName,
          language, // Pass language: 'en' | 'or' | 'hi'
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || errJson.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !data.diagnosis) {
        throw new Error('Diagnosis response format invalid.');
      }

      const diagnosis: DiagnosisResult = {
        ...data.diagnosis,
        id: `scan-${Date.now()}`,
        timestamp: new Date().toISOString(),
        imagePreviewUrl: selectedImage,
        cropCategory: selectedCrop,
        notes: selectedSymptoms.length > 0 ? `Observed: ${selectedSymptoms.join(', ')}` : undefined,
        location: locationName,
      };

      onDiagnosisComplete(diagnosis);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Diagnosis error:', err);
      setAnalysisError(
        err.message || (language === 'or' ? 'AI ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ ହୋଇପାରିଲା ନାହିଁ। ପରିଷ୍କାର ଫଟୋ ସହ ପୁନଃ ଚେଷ୍ଟା କରନ୍ତୁ।' : language === 'hi' ? 'AI जांच पूरी नहीं हो सकी। साफ फोटो के साथ दोबारा प्रयास करें।' : 'Unable to complete AI diagnosis. Please verify your photo is clear and try again.')
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodal Plant Pathology AI</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {t.scanHeaderTitle}
        </h2>
        <p className="text-sm text-gray-600">
          {t.scanHeaderDesc}
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => {
            setMode('upload');
            setSelectedImage(null);
            stopCamera();
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
            mode === 'upload' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4" />
          {t.uploadPhotoTab}
        </button>
        <button
          onClick={() => {
            setMode('camera');
            setSelectedImage(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
            mode === 'camera' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Camera className="w-4 h-4" />
          {t.liveCameraTab}
        </button>
      </div>

      {/* Main Capture / Viewport Area */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* If Image is Selected (Preview state) */}
        {selectedImage ? (
          <div className="relative bg-gray-950 aspect-video sm:aspect-[4/3] flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage}
              alt="Plant leaf preview"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {t.leafPhotoReady}
              </span>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  if (mode === 'camera') startCamera(cameraFacing);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-semibold transition active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t.retakeChange}
              </button>
            </div>
          </div>
        ) : mode === 'camera' ? (
          /* Live Camera Viewfinder */
          <div className="relative bg-black aspect-video sm:aspect-[4/3] flex items-center justify-center overflow-hidden">
            {cameraError ? (
              <div className="p-6 text-center text-white space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                <p className="text-sm text-gray-200">{cameraError}</p>
                <button
                  onClick={() => setMode('upload')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition"
                >
                  {t.uploadPhotoTab}
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Reticle Scanner Overlay */}
                <div className="absolute inset-6 sm:inset-12 border-2 border-emerald-400/70 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-t-2 border-l-2 border-emerald-300" />
                    <span className="w-4 h-4 border-t-2 border-r-2 border-emerald-300" />
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] font-medium tracking-wide bg-black/60 text-emerald-200 px-3 py-1 rounded-full backdrop-blur-sm">
                      {t.alignLeafInReticle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-b-2 border-l-2 border-emerald-300" />
                    <span className="w-4 h-4 border-b-2 border-r-2 border-emerald-300" />
                  </div>
                </div>

                {/* Floating Camera Controls */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-around">
                  <button
                    onClick={() => {
                      const next = cameraFacing === 'environment' ? 'user' : 'environment';
                      setCameraFacing(next);
                    }}
                    className="p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition"
                    title="Flip Camera"
                  >
                    <SwitchCamera className="w-5 h-5" />
                  </button>

                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full bg-white p-1 shadow-2xl active:scale-95 transition"
                    title="Capture Photo"
                  >
                    <div className="w-full h-full rounded-full border-4 border-emerald-600 bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition"
                    title="Choose from Gallery"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* File Upload Drop Area */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition bg-gray-50/50 hover:bg-emerald-50/30 flex flex-col items-center justify-center gap-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">
                {t.clickToUpload}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t.uploadFormats}
              </p>
            </div>
            <button
              type="button"
              className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm transition"
            >
              {t.selectFromGallery}
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Quick Test Presets (Instant Demonstration) */}
      {!selectedImage && (
        <div className="max-w-2xl mx-auto space-y-2.5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">{t.sampleLeafPresets}</span>
            <span>{t.tapToLoad}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {sampleLeafPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImage(preset.url);
                  setSelectedCrop(preset.crop);
                  setSelectedSymptoms([preset.symptoms]);
                }}
                className="group p-2 rounded-xl border border-gray-200 bg-white hover:border-emerald-500 text-left transition hover:shadow-md"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="text-xs font-bold text-gray-800 line-clamp-1">{preset.crop}</div>
                <div className="text-[10px] text-gray-500 line-clamp-1">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Crop & Symptoms Context Form */}
      <div className="max-w-2xl mx-auto bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {t.targetCropLabel}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 text-gray-900"
            >
              {cropsList.map((crop) => (
                <option key={crop.value} value={crop.value}>
                  {crop.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {t.varietyNicknameLabel}
            </label>
            <input
              type="text"
              placeholder={t.varietyPlaceholder}
              value={customPlantName}
              onChange={(e) => setCustomPlantName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        {/* Symptoms Checklist */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            {t.observedSymptomsLabel}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {commonSymptoms.map((symptom) => {
              const active = selectedSymptoms.includes(symptom.label);
              return (
                <button
                  key={symptom.key}
                  type="button"
                  onClick={() => toggleSymptom(symptom.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {symptom.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location / Geolocation Context */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.regionLabel}: {locationName}</span>
          </div>
          <button
            type="button"
            onClick={handleFetchLocation}
            disabled={isLocating}
            className="text-emerald-700 hover:text-emerald-800 font-semibold"
          >
            {isLocating ? t.detectingLocation : t.useCurrentLocation}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {analysisError && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs space-y-1">
            <p className="font-bold">{t.diagnosisErrorTitle}</p>
            <p>{analysisError}</p>
          </div>
        </div>
      )}

      {/* Submit / Analyze Button */}
      <div className="max-w-2xl mx-auto">
        <button
          onClick={runDiagnosis}
          disabled={!selectedImage || isAnalyzing}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition ${
            !selectedImage || isAnalyzing
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-emerald-700/20'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>{analysisStep || t.analyzingInProgress}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>{t.runAiDiagnosis}</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-2">
          {t.diagnosticDisclaimerNote}
        </p>
      </div>
    </div>
  );
};

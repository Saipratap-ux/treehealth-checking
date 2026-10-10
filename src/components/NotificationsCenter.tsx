import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Droplets,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  Trash2,
  Send
} from 'lucide-react';
import { CareTask } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NotificationsCenterProps {
  tasks: CareTask[];
  onToggleTask: (id: string) => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  tasks,
  onToggleTask,
}) => {
  const { t, language } = useLanguage();
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [testSent, setTestSent] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof Notification === 'undefined') {
      setNotifError(language === 'or' ? 'ଏହି ବ୍ରାଉଜରରେ ୱେବ୍ ସୂଚନା ସମର୍ଥିତ ନୁହେଁ।' : language === 'hi' ? 'इस ब्राउज़र में वेब नोटिफिकेशन समर्थित नहीं है।' : 'Web notifications are not supported in this browser.');
      return;
    }

    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === 'granted') {
        const welcomeTitle = language === 'or' ? '🌿 TreeHealthAI ଓଡ଼ିଆ' : language === 'hi' ? '🌿 TreeHealthAI हिन्दी' : '🌿 TreeHealthAI';
        const welcomeBody = language === 'or' ? 'ଆପଣଙ୍କ ଫୋନରେ ଫସଲ ଯତ୍ନ ସୂଚନା ସକ୍ରିୟ ହୋଇଛି!' : language === 'hi' ? 'आपके फोन पर फसल देखभाल अलर्ट सक्रिय हो गए हैं!' : 'Smart plant health alerts are now enabled on your device!';
        sendBrowserNotification(welcomeTitle, welcomeBody);
      }
    } catch (err) {
      console.warn('Error requesting notification permission:', err);
    }
  };

  const sendBrowserNotification = (title: string, body: string) => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/logo.png',
          badge: '/logo.png',
        });
      } catch {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, {
              body,
              icon: '/logo.png',
            });
          });
        }
      }
    }
  };

  const handleTestAlert = () => {
    const alertTitle = language === 'or' ? '💧 ଜଳସେଚନ ଆଲର୍ଟ: ଟମାଟୋ ଫସଲ' : language === 'hi' ? '💧 सिंचाई अलर्ट: टमाटर की फसल' : '💧 Watering Alert: Tomato Roma';
    const alertBody = language === 'or' ? 'ଉପର ମାଟି ଶୁଖିଲା ଥିଲେ ପାଣି ଦିଅନ୍ତୁ। ଓଦା ଥିଲେ ପାଣି ଦିଅନ୍ତୁ ନାହିଁ।' : language === 'hi' ? 'मिट्टी की 2 इंच गहराई में नमी जांचें। अधिक नमी होने पर सिंचाई रोकें।' : 'Top 2 inches of soil may need moisture. Check soil dampness before watering.';

    sendBrowserNotification(alertTitle, alertBody);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  const pendingReminders = tasks.filter((t) => !t.completed);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
          <Bell className="w-3.5 h-3.5" />
          <span>Care Reminders & Dispatch</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t.smartNotificationsTitle}</h2>
        <p className="text-xs text-gray-600">
          {t.smartNotificationsDesc}
        </p>
      </div>

      {/* Push Notification Setup Banner */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              permission === 'granted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {permission === 'granted' ? <BellRing className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">
                {permission === 'granted'
                  ? t.pushNotificationsActive
                  : permission === 'denied'
                  ? t.notificationsBlocked
                  : t.enableMobilePhoneAlerts}
              </h3>
              <p className="text-xs text-gray-500">
                {t.deviceAlertsDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {permission !== 'granted' && (
              <button
                onClick={requestNotificationPermission}
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                {t.allowNotificationsBtn}
              </button>
            )}

            <button
              onClick={handleTestAlert}
              className="flex-1 sm:flex-none px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>{testSent ? t.alertSentToast : t.testAlertBtn}</span>
            </button>
          </div>
        </div>

        {notifError && (
          <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{notifError}</span>
          </div>
        )}

        {/* In-app reminder guarantee */}
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-600 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {t.inAppGuarantee}
          </span>
        </div>
      </div>

      {/* Active Notifications Queue */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700">
          <span>{t.activeScheduledReminders} ({pendingReminders.length})</span>
          <span>{t.tapCheckComplete}</span>
        </div>

        {pendingReminders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="font-bold text-sm text-gray-800">{t.noPendingAlerts}</p>
          </div>
        ) : (
          pendingReminders.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 transition shadow-sm flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="w-5 h-5 rounded-md border-2 border-gray-300 hover:border-emerald-500 flex items-center justify-center mt-0.5"
                >
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{task.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 uppercase">
                      {task.type}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500">
                    {task.plantName} • {new Date(task.dueDate).toLocaleDateString()}
                  </p>

                  {task.notes && (
                    <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg mt-1 border border-gray-100">
                      {task.notes}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => onToggleTask(task.id)}
                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold rounded-lg shrink-0 transition"
              >
                {t.done}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

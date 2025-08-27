import React, { useState } from 'react';
import { Bell, CheckCircle, XCircle, Info, HelpCircle } from 'lucide-react';
interface NotificationPreferencesProps {
  preferences: {
    renewalReminders: boolean;
    reminderDays: number;
    paymentReceipts: boolean;
    invoiceNotifications: boolean;
  };
  onUpdatePreferences: (preferences: Partial<NotificationPreferencesProps['preferences']>) => void;
}
export function NotificationPreferences({
  preferences,
  onUpdatePreferences
}: NotificationPreferencesProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const handleToggleChange = (field: string) => {
    onUpdatePreferences({
      [field]: !preferences[field]
    });
  };
  const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdatePreferences({
      reminderDays: parseInt(e.target.value)
    });
  };
  const showTooltip = (id: string) => {
    setActiveTooltip(id);
  };
  const hideTooltip = () => {
    setActiveTooltip(null);
  };
  return <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-bold text-primary flex items-center mb-5 tracking-tight">
        <div className="bg-primary/10 p-2 rounded-lg mr-3 shadow-sm">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        Notification Preferences
      </h2>
      <div className="mt-5 space-y-4">
        <div className="bg-gradient-to-r from-gray-50 to-primary/5 p-4 rounded-lg transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="renewal-reminders" className="text-sm font-medium text-gray-700 cursor-pointer">
                Renewal Reminders
              </label>
              <div className="relative ml-1" onMouseEnter={() => showTooltip('renewal')} onMouseLeave={hideTooltip}>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                {activeTooltip === 'renewal' && <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48">
                    Get reminders before your membership is due for renewal
                    <div className="absolute left-2 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
                  </div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs mr-2">
                {preferences.renewalReminders ? <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full shadow-sm">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    On
                  </span> : <span className="flex items-center text-gray-400 bg-gray-100 px-2 py-1 rounded-full shadow-sm">
                    <XCircle className="h-3 w-3 mr-1" />
                    Off
                  </span>}
              </span>
              <div className="relative inline-block w-12 align-middle select-none">
                <input type="checkbox" id="renewal-reminders" checked={preferences.renewalReminders} onChange={() => handleToggleChange('renewalReminders')} className="opacity-0 w-0 h-0 absolute" />
                <label htmlFor="renewal-reminders" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out shadow-lg ${preferences.renewalReminders ? 'bg-primary' : 'bg-gray-300'}`}>
                  <span className={`block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${preferences.renewalReminders ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </label>
              </div>
            </div>
          </div>
          {preferences.renewalReminders && <div className="mt-4 pl-0 pt-4 border-t border-gray-200">
              <label htmlFor="reminder-days" className="block text-xs text-gray-500 mb-1.5 font-medium">
                Send reminders before
              </label>
              <select id="reminder-days" value={preferences.reminderDays} onChange={handleDaysChange} className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 shadow-sm transition-shadow duration-200 hover:shadow">
                <option value={7}>7 days before</option>
                <option value={14}>14 days before</option>
                <option value={30}>30 days before</option>
                <option value={60}>60 days before</option>
                <option value={90}>90 days before</option>
              </select>
            </div>}
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-primary/5 p-4 rounded-lg transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="payment-receipts" className="text-sm font-medium text-gray-700 cursor-pointer">
                Payment Receipts
              </label>
              <div className="relative ml-1" onMouseEnter={() => showTooltip('receipts')} onMouseLeave={hideTooltip}>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                {activeTooltip === 'receipts' && <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48">
                    Receive email confirmations when payments are processed
                    <div className="absolute left-2 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
                  </div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs mr-2">
                {preferences.paymentReceipts ? <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full shadow-sm">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    On
                  </span> : <span className="flex items-center text-gray-400 bg-gray-100 px-2 py-1 rounded-full shadow-sm">
                    <XCircle className="h-3 w-3 mr-1" />
                    Off
                  </span>}
              </span>
              <div className="relative inline-block w-12 align-middle select-none">
                <input type="checkbox" id="payment-receipts" checked={preferences.paymentReceipts} onChange={() => handleToggleChange('paymentReceipts')} className="opacity-0 w-0 h-0 absolute" />
                <label htmlFor="payment-receipts" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out shadow-lg ${preferences.paymentReceipts ? 'bg-primary' : 'bg-gray-300'}`}>
                  <span className={`block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${preferences.paymentReceipts ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-primary/5 p-4 rounded-lg transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="invoice-notifications" className="text-sm font-medium text-gray-700 cursor-pointer">
                New Invoice Notifications
              </label>
              <div className="relative ml-1" onMouseEnter={() => showTooltip('invoice')} onMouseLeave={hideTooltip}>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                {activeTooltip === 'invoice' && <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48">
                    Get notified when new invoices are generated for your
                    account
                    <div className="absolute left-2 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
                  </div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs mr-2">
                {preferences.invoiceNotifications ? <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full shadow-sm">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    On
                  </span> : <span className="flex items-center text-gray-400 bg-gray-100 px-2 py-1 rounded-full shadow-sm">
                    <XCircle className="h-3 w-3 mr-1" />
                    Off
                  </span>}
              </span>
              <div className="relative inline-block w-12 align-middle select-none">
                <input type="checkbox" id="invoice-notifications" checked={preferences.invoiceNotifications} onChange={() => handleToggleChange('invoiceNotifications')} className="opacity-0 w-0 h-0 absolute" />
                <label htmlFor="invoice-notifications" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out shadow-lg ${preferences.invoiceNotifications ? 'bg-primary' : 'bg-gray-300'}`}>
                  <span className={`block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${preferences.invoiceNotifications ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-primary/5 p-4 rounded-lg border border-primary/20 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full -ml-8 -mb-8"></div>
        <div className="relative flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-primary/80 leading-relaxed">
              Notification emails will be sent to the primary email address on
              your account. You can update your email preferences at any time.
            </p>
          </div>
        </div>
      </div>
    </div>;
}
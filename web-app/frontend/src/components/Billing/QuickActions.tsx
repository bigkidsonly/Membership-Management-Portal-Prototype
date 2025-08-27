import React, { useState } from 'react';
import { Download, CreditCard, LifeBuoy, AlertCircle, ArrowRight, Mail, ExternalLink, Phone, X, Save, User, MapPin, Building } from 'lucide-react';
export function QuickActions() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const showTooltip = (id: string) => {
    setActiveTooltip(id);
  };
  const hideTooltip = () => {
    setActiveTooltip(null);
  };
  return <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-bold text-primary mb-5 tracking-tight">
        Quick Actions
      </h2>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/5 transition-all duration-200 hover:border-primary/20 hover:shadow-md group">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-lg mr-3 shadow-sm group-hover:shadow group-hover:bg-primary/15 transition-all duration-200">
              <Download className="w-4 h-4 text-primary" />
            </div>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              Download All Invoices
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors group-hover:translate-x-1 transform duration-200" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-amber-50 transition-all duration-200 hover:border-amber-200 hover:shadow-md group">
          <div className="flex items-center">
            <div className="bg-amber-100 p-2 rounded-lg mr-3 shadow-sm group-hover:shadow group-hover:bg-amber-200 transition-all duration-200">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              Download Unpaid Invoices
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors group-hover:translate-x-1 transform duration-200" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-secondary/5 transition-all duration-200 hover:border-secondary/20 hover:shadow-md group" onClick={() => setShowBillingModal(true)}>
          <div className="flex items-center">
            <div className="bg-secondary/10 p-2 rounded-lg mr-3 shadow-sm group-hover:shadow group-hover:bg-secondary/20 transition-all duration-200">
              <CreditCard className="w-4 h-4 text-secondary" />
            </div>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              Update Billing Information
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors group-hover:translate-x-1 transform duration-200" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 transition-all duration-200 hover:border-indigo-200 hover:shadow-md group">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3 shadow-sm group-hover:shadow group-hover:bg-indigo-200 transition-all duration-200">
              <LifeBuoy className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              Billing Support
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors group-hover:translate-x-1 transform duration-200" />
        </button>
      </div>
      <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 p-5 rounded-lg border border-primary/10 shadow-md">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 tracking-tight">
          Need Assistance?
        </h3>
        <div className="space-y-3">
          <div className="relative" onMouseEnter={() => showTooltip('email')} onMouseLeave={hideTooltip}>
            <a href="mailto:ar@movementcooperative.org" className="flex items-center text-sm text-gray-700 hover:text-primary transition-colors p-2 rounded-md hover:bg-white/60">
              <Mail className="w-4 h-4 text-primary mr-2" />
              <span className="font-medium">ar@movementcooperative.org</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
            </a>
            {activeTooltip === 'email' && <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48">
                Click to send an email to our accounts receivable team
                <div className="absolute left-4 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
              </div>}
          </div>
          <div className="relative" onMouseEnter={() => showTooltip('phone')} onMouseLeave={hideTooltip}>
            <a href="tel:+15551234567" className="flex items-center text-sm text-gray-700 hover:text-primary transition-colors p-2 rounded-md hover:bg-white/60">
              <Phone className="w-4 h-4 text-primary mr-2" />
              <span className="font-medium">Support: (555) 123-4567</span>
            </a>
            {activeTooltip === 'phone' && <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48">
                Call our billing support team during business hours
                <div className="absolute left-4 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
              </div>}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          Our billing team is available Monday-Friday, 9am-5pm ET
        </p>
      </div>
      {/* Billing Information Modal */}
      {showBillingModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Update Billing Information
              </h3>
              <button onClick={() => setShowBillingModal(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <User className="w-4 h-4 text-primary mr-2" />
                  Billing Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      First Name
                    </label>
                    <input type="text" defaultValue="Jane" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Last Name
                    </label>
                    <input type="text" defaultValue="Smith" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Email
                    </label>
                    <input type="email" defaultValue="jane.smith@example.org" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Phone
                    </label>
                    <input type="tel" defaultValue="(555) 987-6543" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                </div>
              </div>
              <div className="border-t pt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Building className="w-4 h-4 text-primary mr-2" />
                  Organization Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Organization Name
                    </label>
                    <input type="text" defaultValue="Progressive Action Network" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Tax ID / EIN (optional)
                    </label>
                    <input type="text" defaultValue="12-3456789" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                </div>
              </div>
              <div className="border-t pt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 text-primary mr-2" />
                  Billing Address
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Street Address
                    </label>
                    <input type="text" defaultValue="123 Main Street, Suite 456" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                        City
                      </label>
                      <input type="text" defaultValue="New York" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                        State/Province
                      </label>
                      <input type="text" defaultValue="NY" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                        ZIP/Postal Code
                      </label>
                      <input type="text" defaultValue="10001" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                      Country
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm" defaultValue="US">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="border-t pt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Special Instructions
                </h4>
                <textarea rows={3} placeholder="Add any special billing instructions or notes here..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm"></textarea>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button onClick={() => setShowBillingModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow">
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary/90 text-white text-sm rounded-lg hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center" onClick={() => setShowBillingModal(false)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
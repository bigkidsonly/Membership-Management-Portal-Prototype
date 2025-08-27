import React, { useState, memo } from 'react';
import { CreditCard, Plus, Check, Edit, Trash2, AlertCircle, Shield, CreditCardIcon, CheckSquare, DollarSign, X, Landmark, Mail, Save } from 'lucide-react';
interface PaymentMethod {
  id: string;
  type: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isPrimary: boolean;
}
interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onSetPrimary: (id: string) => void;
}
export function PaymentMethods({
  paymentMethods,
  onSetPrimary
}: PaymentMethodsProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [hoverCard, setHoverCard] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<string>('credit_card');
  const [showPaymentInfo, setShowPaymentInfo] = useState<boolean>(false);
  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };
  const formatExpiryDate = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };
  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card':
        return <CreditCardIcon className="w-5 h-5 text-primary" />;
      case 'bank_transfer':
        return <div className="w-5 h-5 text-blue-600" />;
      case 'check':
        return <CheckSquare className="w-5 h-5 text-green-600" />;
      default:
        return <CreditCardIcon className="w-5 h-5 text-primary" />;
    }
  };
  return <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-bold text-primary flex items-center mb-5 tracking-tight">
        <div className="bg-primary/10 p-2 rounded-lg mr-3 shadow-sm">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        Payment Methods
      </h2>
      <div className="mt-5 space-y-4">
        {paymentMethods.map(method => <div key={method.id} className={`border rounded-lg p-4 transition-all duration-300 ${method.isPrimary ? 'border-primary bg-primary/5 shadow-md' : hoverCard === method.id ? 'border-primary/20 bg-gray-50 shadow-md scale-[1.01]' : 'border-gray-200 hover:border-primary/20 hover:bg-gray-50 hover:shadow-sm'}`} onMouseEnter={() => setHoverCard(method.id)} onMouseLeave={() => setHoverCard(null)}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md ${method.isPrimary ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                  <span className="text-xl">{getCardIcon(method.brand)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {method.brand} •••• {method.last4}
                    {method.isPrimary && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shadow-sm">
                        Primary
                      </span>}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires{' '}
                    {formatExpiryDate(method.expiryMonth, method.expiryYear)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!method.isPrimary && <button onClick={() => onSetPrimary(method.id)} className="text-sm text-primary hover:text-primary/80 flex items-center transition-all duration-200 hover:bg-primary/10 px-2 py-1 rounded-md">
                    <Check className="w-4 h-4 mr-1" />
                    Make Primary
                  </button>}
                <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {method.isPrimary && <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center">
                <Shield className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                This is your primary payment method for automatic charges
              </div>}
          </div>)}
      </div>
      {isAddingNew ? <div className="mt-5 border rounded-lg p-5 border-primary/20 bg-primary/5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Add Payment Method
            </h3>
            <button onClick={() => setIsAddingNew(false)} className="p-1 rounded-full hover:bg-gray-200 text-gray-500">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mb-5 border-b border-gray-200 pb-4">
            <div className="text-xs font-medium text-gray-500 mb-2">
              Select payment type
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all ${paymentType === 'credit_card' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/20'}`} onClick={() => setPaymentType('credit_card')}>
                <CreditCardIcon className={`w-6 h-6 mb-2 ${paymentType === 'credit_card' ? 'text-primary' : 'text-gray-500'}`} />
                <span className="text-xs font-medium">Credit Card</span>
              </div>
              <div className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all ${paymentType === 'bank_transfer' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/20'}`} onClick={() => setPaymentType('bank_transfer')}>
                <div className={`w-6 h-6 mb-2 ${paymentType === 'bank_transfer' ? 'text-primary' : 'text-gray-500'}`} />
                <span className="text-xs font-medium">Bank Transfer</span>
              </div>
              <div className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all ${paymentType === 'check' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/20'}`} onClick={() => setPaymentType('check')}>
                <CheckSquare className={`w-6 h-6 mb-2 ${paymentType === 'check' ? 'text-primary' : 'text-gray-500'}`} />
                <span className="text-xs font-medium">Check</span>
              </div>
            </div>
          </div>
          {paymentType === 'credit_card' && <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Card Number
                </label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-xs text-gray-500 mb-1.5 font-medium">
                    Expiry Date
                  </label>
                  <input type="text" id="expiryDate" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-xs text-gray-500 mb-1.5 font-medium">
                    CVC
                  </label>
                  <input type="text" id="cvc" placeholder="123" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
                </div>
              </div>
              <div>
                <label htmlFor="nameOnCard" className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Name on Card
                </label>
                <input type="text" id="nameOnCard" placeholder="John Smith" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-shrink-0 mr-3">
                  <img src="https://cdn.pixabay.com/photo/2021/12/06/13/08/stripe-6850391_960_720.png" alt="Stripe" className="h-5 object-contain" />
                </div>
                <p className="text-xs text-gray-500">
                  Secure payment processing by Stripe
                </p>
              </div>
            </div>}
          {paymentType === 'bank_transfer' && <div className="space-y-4">
              <div>
                <label htmlFor="accountName" className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Account Holder Name
                </label>
                <input type="text" id="accountName" placeholder="John Smith" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
              </div>
              <div>
                <label htmlFor="routingNumber" className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Routing Number
                </label>
                <input type="text" id="routingNumber" placeholder="123456789" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
              </div>
              <div>
                <label htmlFor="accountNumber" className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Account Number
                </label>
                <input type="text" id="accountNumber" placeholder="987654321" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow" />
              </div>
              <div>
                <label htmlFor="accountType" className="block text-xs text-gray-500 mb-1.5 font-medium">
                  Account Type
                </label>
                <select id="accountType" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm transition-shadow duration-200 hover:shadow">
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
            </div>}
          {paymentType === 'check' && <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Check Payment Instructions
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Please make checks payable to:</p>
                      <p className="font-medium mt-1">
                        The Movement Cooperative
                      </p>
                      <p className="mt-3">Mail checks to:</p>
                      <address className="mt-1 not-italic">
                        The Movement Cooperative
                        <br />
                        Attn: Accounts Receivable
                        <br />
                        123 Main Street, Suite 456
                        <br />
                        New York, NY 10001
                      </address>
                    </div>
                    <div className="mt-3 text-xs text-blue-600 border-t border-blue-200 pt-2">
                      <p>
                        Please include your account number and invoice number(s)
                        on the memo line.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-5">
            <button onClick={() => setIsAddingNew(false)} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow">
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Add Payment Method
            </button>
          </div>
          <div className="mt-4 flex items-start bg-blue-50 p-3 rounded-md border border-blue-100">
            <Shield className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-blue-600">
              Your payment information is encrypted and securely stored. We use
              industry-standard security measures to protect your data.
            </p>
          </div>
        </div> : <button onClick={() => setIsAddingNew(true)} className="mt-5 w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-all duration-200 hover:border-primary/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </button>}
      <div className="mt-6 pt-5 border-t border-gray-200">
        <button onClick={() => setShowPaymentInfo(!showPaymentInfo)} className="text-sm font-semibold text-primary flex items-center hover:underline mb-3">
          {showPaymentInfo ? 'Hide payment information' : 'View payment information'}
          <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform ${showPaymentInfo ? 'rotate-180' : ''}`} />
        </button>
        {showPaymentInfo && <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4 shadow-inner">
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <CreditCardIcon className="w-4 h-4 text-primary mr-1.5" />
                Credit Card Payments
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We accept Visa, Mastercard, and American Express. Credit card
                payments are processed securely through Stripe.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <div className="w-4 h-4 text-primary mr-1.5" />
                Bank Transfers (ACH)
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct bank transfers are available for US-based accounts.
                Payments typically process within 3-5 business days.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <Landmark className="w-4 h-4 text-primary mr-1.5" />
                Wire Transfers
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                For international payments or large transfers, please contact
                our finance team at ar@movementcooperative.org for wire
                instructions.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <CheckSquare className="w-4 h-4 text-primary mr-1.5" />
                Check Payments
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Make checks payable to "The Movement Cooperative" and mail to
                our office address. Please include your account number and
                invoice number(s).
              </p>
            </div>
          </div>}
      </div>
      <div className="mt-6 border-t pt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <span>Auto-pay Preferences</span>
          <AlertCircle className="h-4 w-4 text-gray-400 ml-1.5 cursor-help group relative">
            <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48">
              We'll use your primary payment method for automatic renewals
              <div className="absolute left-2 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
            </div>
          </AlertCircle>
        </h3>
        <div className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 shadow-sm hover:shadow">
          <input type="checkbox" id="auto-pay" className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" defaultChecked />
          <label htmlFor="auto-pay" className="ml-2 block text-sm text-gray-700">
            Use primary payment method for automatic renewals
          </label>
        </div>
      </div>
    </div>;
}
function ChevronDown(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>;
}
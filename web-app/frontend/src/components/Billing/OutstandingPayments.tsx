import React from 'react';
import { AlertCircle, CreditCard, Calendar, Clock, AlertTriangle } from 'lucide-react';
interface OutstandingPaymentsProps {
  invoice: {
    id: string;
    type: string;
    amount: number;
    dueDate: string;
  };
  onPayNow: () => void;
}
export function OutstandingPayments({
  invoice,
  onPayNow
}: OutstandingPaymentsProps) {
  const isDueDate = () => {
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return today > dueDate;
  };
  return <div className={`rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl ${isDueDate() ? 'bg-white border-l-4 border-l-red-500 border-t border-r border-b border-gray-200' : 'bg-white border-l-4 border-l-amber-500 border-t border-r border-b border-gray-200'}`}>
      <div className="flex items-start">
        <div className={`rounded-full p-3 mr-5 shadow-lg ${isDueDate() ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
          {isDueDate() ? <AlertTriangle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isDueDate() ? 'Payment Overdue' : 'Payment Due Soon'}
            </h2>
            <span className={`ml-3 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm ${isDueDate() ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
              {isDueDate() ? 'Action Required' : 'Upcoming Payment'}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-500">Invoice</p>
              <p className="font-medium text-gray-900 truncate">{invoice.id}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Type</p>
              <p className="font-medium text-gray-900 truncate">
                {invoice.type}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Due Date</p>
              <p className={`font-medium ${isDueDate() ? 'text-red-600 font-bold' : 'text-amber-600'}`}>
                {new Date(invoice.dueDate).toLocaleDateString()}
                {isDueDate() && <span className="ml-2 text-xs bg-red-100 px-2 py-0.5 rounded-full">
                    Overdue
                  </span>}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              ${invoice.amount.toFixed(2)}
            </div>
            <button onClick={onPayNow} className={`flex items-center justify-center px-6 py-3 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base font-medium ${isDueDate() ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 ring-2 ring-red-500 ring-opacity-50' : 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary ring-2 ring-primary ring-opacity-30'}`}>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay Now
            </button>
          </div>
          {isDueDate() && <div className="mt-4 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-red-600 flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                <strong>This payment is past due.</strong> Please make a payment
                as soon as possible to avoid service interruptions.
              </span>
            </div>}
        </div>
      </div>
    </div>;
}
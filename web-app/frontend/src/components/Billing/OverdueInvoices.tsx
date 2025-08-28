import React, { useState } from "react";
import {
  AlertTriangle,
  CreditCard,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  DollarSign,
} from "lucide-react";
interface Invoice {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
  paidDate: string | null;
  dueDate: string;
}
interface OverdueInvoicesProps {
  invoices: Invoice[];
  onPayNow: (invoice: Invoice) => void;
}
export function OverdueInvoices({ invoices, onPayNow }: OverdueInvoicesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalOverdue = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const getDaysOverdue = (dueDate) => {
    const today = new Date(2025, 7, 26); // August 26, 2025
    const due = new Date(dueDate);
    const diffTime = Math.abs(today.getTime() - due.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const mostOverdueInvoice = [...invoices].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )[0];
  const mostDaysOverdue = mostOverdueInvoice
    ? getDaysOverdue(mostOverdueInvoice.dueDate)
    : 0;
  return (
    <div className="rounded-xl bg-white border-l-4 border-l-red-500 border-t border-r border-b border-gray-200 shadow-lg transform transition-all duration-300 hover:shadow-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start">
          <div className="rounded-full p-3 mr-4 bg-red-100 text-red-600 shadow-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Overdue Invoices
                  </h2>
                  <span className="ml-3 text-xs px-2.5 py-1 rounded-full font-medium bg-red-100 text-red-600 shadow-sm">
                    Action Required
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You have {invoices.length} overdue{" "}
                  {invoices.length === 1 ? "invoice" : "invoices"} totaling $
                  {totalOverdue.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center mt-3 sm:mt-0">
                <button
                  onClick={() => onPayNow(invoices[0])}
                  className="flex items-center justify-center px-4 py-2 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium bg-red-600 hover:bg-red-700 mr-2"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay All
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {!isExpanded && (
              <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Most overdue: {mostOverdueInvoice?.type}
                    </p>
                    <p className="text-xs text-red-600">
                      {mostDaysOverdue} days overdue
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${totalOverdue.toFixed(2)}
                </div>
              </div>
            )}
            {isExpanded && (
              <>
                <div className="space-y-3 mt-5">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-200 hover:bg-red-50/30 transition-colors duration-200"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                        <div className="sm:col-span-2">
                          <p className="text-sm font-semibold text-gray-500">
                            Invoice
                          </p>
                          <p className="font-medium text-gray-900">
                            {invoice.id}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {invoice.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">
                            Issue Date
                          </p>
                          <p className="font-medium text-gray-900">
                            {new Date(invoice.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">
                            Due Date
                          </p>
                          <p className="font-medium text-red-600">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-red-500 mt-1">
                            {getDaysOverdue(invoice.dueDate)} days overdue
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">
                            Amount
                          </p>
                          <p className="font-bold text-gray-900">
                            ${invoice.amount.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => onPayNow(invoice)}
                            className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center shadow-sm hover:shadow"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-red-600 flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>These payments are past due.</strong> Please make a
                    payment as soon as possible to avoid service interruptions
                    to your tools and membership benefits.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

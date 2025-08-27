import React, { useState } from 'react';
import { DollarSign, Calendar, AlertCircle, CreditCard, ArrowRight, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
interface Invoice {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
  paidDate: string | null;
  dueDate: string;
}
interface BillsToPayProps {
  invoices: Invoice[];
  onPayNow?: (invoice: Invoice) => void;
}
export function BillsToPay({
  invoices,
  onPayNow
}: BillsToPayProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const today = new Date(2025, 7, 26); // August 26, 2025
  const in7Days = new Date(today);
  in7Days.setDate(today.getDate() + 7);
  // Filter unpaid invoices
  const unpaidInvoices = invoices.filter(invoice => invoice.status === 'unpaid' || invoice.status === 'pending');
  // Calculate amounts
  const overdueInvoices = unpaidInvoices.filter(invoice => new Date(invoice.dueDate) < today);
  const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const dueWithin7DaysInvoices = unpaidInvoices.filter(invoice => new Date(invoice.dueDate) >= today && new Date(invoice.dueDate) <= in7Days);
  const dueWithin7Days = dueWithin7DaysInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const dueBeyond7DaysInvoices = unpaidInvoices.filter(invoice => new Date(invoice.dueDate) > in7Days);
  const dueBeyond7Days = dueBeyond7DaysInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalToPay = unpaidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  // Count overdue invoices
  const overdueCount = overdueInvoices.length;
  const billCategories = [{
    title: 'Overdue',
    amount: overdueAmount,
    count: overdueCount,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
    borderColor: 'border-red-200',
    activeBgColor: 'bg-gradient-to-r from-red-100 to-red-200',
    buttonColor: 'bg-red-600 hover:bg-red-700 text-white',
    invoices: overdueInvoices
  }, {
    title: 'Due within 7 days',
    amount: dueWithin7Days,
    icon: Calendar,
    color: 'text-amber-600',
    bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100',
    borderColor: 'border-amber-200',
    activeBgColor: 'bg-gradient-to-r from-amber-100 to-amber-200',
    buttonColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    invoices: dueWithin7DaysInvoices
  }, {
    title: 'Due after 7 days',
    amount: dueBeyond7Days,
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    activeBgColor: 'bg-gradient-to-r from-blue-100 to-blue-200',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    invoices: dueBeyond7DaysInvoices
  }, {
    title: 'Total to pay',
    amount: totalToPay,
    icon: DollarSign,
    color: 'text-primary',
    bgColor: 'bg-gradient-to-r from-primary/5 to-secondary/5',
    borderColor: 'border-primary/20',
    activeBgColor: 'bg-gradient-to-r from-primary/10 to-secondary/10',
    buttonColor: 'bg-primary hover:bg-primary/90 text-white',
    invoices: unpaidInvoices
  }];
  const toggleCategory = index => {
    if (expandedCategory === index) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(index);
    }
  };
  return <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-5">
        <div className="bg-primary/10 p-2 rounded-lg mr-3 shadow-sm">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-primary tracking-tight">
          Bills to Pay
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {billCategories.map((category, index) => <div key={index} className="space-y-3">
            <div className={`rounded-lg p-5 border ${category.borderColor} ${activeCategory === index ? category.activeBgColor : category.bgColor} shadow-md hover:shadow-lg transition-all duration-300 transform ${activeCategory === index ? 'scale-[1.03]' : 'hover:-translate-y-1'}`} onMouseEnter={() => setActiveCategory(index)} onMouseLeave={() => setActiveCategory(null)}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <category.icon className={`w-5 h-5 mr-2 ${category.color}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {category.title}
                    {index === 0 && category.count > 0 && <span className="ml-2 inline-flex items-center justify-center bg-red-100 text-red-600 w-5 h-5 rounded-full text-xs font-bold">
                        {category.count}
                      </span>}
                  </span>
                </div>
                {category.invoices.length > 0 && <button onClick={() => toggleCategory(index)} className="p-1 rounded-full hover:bg-gray-200 text-gray-500">
                    {expandedCategory === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>}
              </div>
              <div className={`text-2xl font-bold ${category.color}`}>
                ${category.amount.toFixed(2)}
              </div>
              {category.amount > 0 && <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {category.invoices.length}{' '}
                    {category.invoices.length === 1 ? 'invoice' : 'invoices'}
                  </span>
                  <button onClick={() => onPayNow && onPayNow(category.invoices[0])} className={`text-xs flex items-center font-medium px-3 py-1.5 rounded-lg ${category.buttonColor} shadow-sm hover:shadow transition-all duration-200`}>
                    <CreditCard className="w-3 h-3 mr-1.5" />
                    Pay Now
                  </button>
                </div>}
            </div>
            {expandedCategory === index && category.invoices.length > 0 && <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 shadow-sm space-y-2 text-sm">
                <div className="text-xs font-medium text-gray-500 uppercase mb-2">
                  Invoice Details
                </div>
                {category.invoices.map(invoice => <div key={invoice.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
                    <div>
                      <div className="font-medium">{invoice.type}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span>
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </span>
                        {index === 0 && <span className="ml-2 text-red-600">
                            (
                            {Math.ceil(Math.abs(new Date(invoice.dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))}{' '}
                            days overdue)
                          </span>}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-3">
                        ${invoice.amount.toFixed(2)}
                      </span>
                      <button onClick={() => onPayNow && onPayNow(invoice)} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-md flex items-center">
                        <CreditCard className="w-3 h-3 mr-1" />
                        Pay
                      </button>
                    </div>
                  </div>)}
              </div>}
          </div>)}
      </div>
      {overdueAmount > 0 && <div className="mt-5 bg-red-50 p-4 rounded-lg border border-red-100 text-sm text-red-600 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">
              You have {overdueCount} overdue{' '}
              {overdueCount === 1 ? 'payment' : 'payments'} totaling $
              {overdueAmount.toFixed(2)}
            </p>
            <p className="mt-1">
              Please make a payment as soon as possible to avoid service
              interruptions.
            </p>
          </div>
        </div>}
      {totalToPay > 0 && <div className="mt-5 flex justify-end">
          <button onClick={() => onPayNow && onPayNow(unpaidInvoices[0])} className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center font-medium">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay All Invoices
          </button>
        </div>}
    </div>;
}
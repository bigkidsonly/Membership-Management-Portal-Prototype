import React, { useState } from "react";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  CreditCard,
  ArrowRight,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
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

interface BillsToPayProps {
  invoices: Invoice[];
  onPayNow?: (invoice: Invoice) => void;
}

export function BillsToPay({ invoices, onPayNow }: BillsToPayProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const today = new Date(2025, 7, 26); // August 26, 2025
  const in7Days = new Date(today);
  in7Days.setDate(today.getDate() + 7);

  // Filter unpaid invoices
  const unpaidInvoices = invoices.filter(
    (invoice) => invoice.status === "unpaid" || invoice.status === "pending"
  );

  // Calculate amounts
  const overdueInvoices = unpaidInvoices.filter(
    (invoice) => new Date(invoice.dueDate) < today
  );
  const overdueAmount = overdueInvoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const dueWithin7DaysInvoices = unpaidInvoices.filter(
    (invoice) =>
      new Date(invoice.dueDate) >= today && new Date(invoice.dueDate) <= in7Days
  );
  const dueWithin7Days = dueWithin7DaysInvoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const dueBeyond7DaysInvoices = unpaidInvoices.filter(
    (invoice) => new Date(invoice.dueDate) > in7Days
  );
  const dueBeyond7Days = dueBeyond7DaysInvoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const totalToPay = unpaidInvoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const overdueCount = overdueInvoices.length;

  const billCategories = [
    {
      title: "Overdue",
      amount: overdueAmount,
      count: overdueCount,
      icon: AlertTriangle,
      color: "text-[#CC2936]",
      bgColor: "bg-[#FFF8F8]",
      borderColor: "border-[#CC2936]",
      activeBgColor: "bg-[#FFE8E8]",
      buttonBg: "bg-[#CC2936]",
      invoices: overdueInvoices,
    },
    {
      title: "Due within 7 days",
      amount: dueWithin7Days,
      icon: Calendar,
      color: "text-[#F18F01]",
      bgColor: "bg-[#FFF9F0]",
      borderColor: "border-[#F18F01]",
      activeBgColor: "bg-[#FFEECC]",
      buttonBg: "bg-[#F18F01]",
      invoices: dueWithin7DaysInvoices,
    },
    {
      title: "Due after 7 days",
      amount: dueBeyond7Days,
      icon: Calendar,
      color: "text-[#2E86AB]",
      bgColor: "bg-[#F0F8FF]",
      borderColor: "border-[#2E86AB]",
      activeBgColor: "bg-[#E0F2FF]",
      buttonBg: "bg-[#2E86AB]",
      invoices: dueBeyond7DaysInvoices,
    },
    {
      title: "Total to pay",
      amount: totalToPay,
      icon: DollarSign,
      color: "text-black",
      bgColor: "bg-[#F8F8F8]",
      borderColor: "border-black",
      activeBgColor: "bg-[#F0F0F0]",
      buttonBg: "bg-black",
      invoices: unpaidInvoices,
    },
  ];

  const toggleCategory = (index: number) => {
    if (expandedCategory === index) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(index);
    }
  };

  return (
    <div className="relative bg-[#FEFEFE] p-6 transform rotate-[-0.2deg] transition-all duration-300 hover:rotate-[0.1deg] hover:scale-[1.005]">
      {/* Hand-drawn border layers */}
      <div className="absolute inset-0 border-2 border-black transform rotate-[0.4deg] translate-x-[2px] translate-y-[2px]"></div>
      <div className="absolute inset-0 border-2 border-black transform rotate-[-0.3deg]"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-5">
          <div className="relative bg-[#F8F8F8] p-2 mr-3 transform rotate-[2deg]">
            <CreditCard className="w-5 h-5 text-black transform rotate-[-1deg]" />
            <div className="absolute inset-0 border-2 border-black transform rotate-[-1.5deg] translate-x-[1px] translate-y-[1px]"></div>
          </div>
          <h2 className="text-xl font-extrabold text-black tracking-tight transform rotate-[-0.2deg] relative">
            Bills to Pay
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#2E86AB] transform rotate-[0.4deg]"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {billCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <div
                className={`relative p-5 border-2 ${category.borderColor} ${
                  activeCategory === index
                    ? category.activeBgColor
                    : category.bgColor
                } transition-all duration-300 transform ${
                  activeCategory === index
                    ? "scale-[1.03] rotate-[0.5deg]"
                    : index % 2 === 0
                    ? "rotate-[0.3deg] hover:rotate-[-0.2deg] hover:-translate-y-1"
                    : "rotate-[-0.3deg] hover:rotate-[0.2deg] hover:-translate-y-1"
                }`}
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Sketchy border effect */}
                <div className="absolute inset-0 border-2 border-black transform rotate-[-0.5deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <category.icon
                        className={`w-5 h-5 mr-2 ${
                          category.color
                        } transform rotate-[${index * 2 - 3}deg]`}
                      />
                      <span className="text-sm font-extrabold text-[#6B6B6B] transform rotate-[0.1deg]">
                        {category.title}
                        {index === 0 && category.count > 0 && (
                          <span className="ml-2 relative inline-flex items-center justify-center bg-[#CC2936] text-white w-5 h-5 text-xs font-extrabold transform rotate-[15deg]">
                            {category.count}
                            <span className="absolute inset-0 border border-black transform rotate-[-15deg]"></span>
                          </span>
                        )}
                      </span>
                    </div>
                    {category.invoices.length > 0 && (
                      <button
                        onClick={() => toggleCategory(index)}
                        className="relative p-1 text-[#6B6B6B] hover:text-black transform rotate-[5deg] hover:rotate-[-5deg] transition-all duration-200"
                      >
                        {expandedCategory === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  <div
                    className={`text-2xl font-extrabold ${category.color} transform rotate-[-0.2deg]`}
                  >
                    ${category.amount.toFixed(2)}
                  </div>

                  {category.amount > 0 && (
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-[#6B6B6B] font-bold transform rotate-[0.3deg]">
                        {category.invoices.length}{" "}
                        {category.invoices.length === 1
                          ? "invoice"
                          : "invoices"}
                      </span>
                      <button
                        onClick={() =>
                          onPayNow && onPayNow(category.invoices[0])
                        }
                        className={`relative text-xs flex items-center font-extrabold px-3 py-1.5 ${category.buttonBg} text-white transform rotate-[-0.5deg] hover:rotate-[0.3deg] transition-all duration-200 hover:scale-105`}
                      >
                        <CreditCard className="w-3 h-3 mr-1.5" />
                        Pay Now
                        <span className="absolute inset-0 border border-black transform rotate-[0.8deg] pointer-events-none"></span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {expandedCategory === index && category.invoices.length > 0 && (
                <div className="relative bg-[#F8F8F8] p-3 space-y-2 text-sm transform rotate-[0.1deg]">
                  <div className="absolute inset-0 border-2 border-black border-dashed transform rotate-[-0.3deg]"></div>
                  <div className="relative z-10">
                    <div className="text-xs font-extrabold text-[#6B6B6B] uppercase mb-2 transform rotate-[-0.2deg]">
                      Invoice Details
                    </div>
                    {category.invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex justify-between items-center p-2 hover:bg-[#F0F0F0] transition-colors transform hover:rotate-[0.1deg]"
                      >
                        <div>
                          <div className="font-extrabold text-black">
                            {invoice.type}
                          </div>
                          <div className="text-xs text-[#6B6B6B] flex items-center">
                            <span>
                              Due:{" "}
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </span>
                            {index === 0 && (
                              <span className="ml-2 text-[#CC2936] font-bold">
                                (
                                {Math.ceil(
                                  Math.abs(
                                    new Date(invoice.dueDate).getTime() -
                                      today.getTime()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                days overdue)
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-extrabold mr-3">
                            ${invoice.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => onPayNow && onPayNow(invoice)}
                            className="relative text-xs bg-[#F0F0F0] hover:bg-[#E0E0E0] text-black px-2 py-1 flex items-center font-bold transform rotate-[-0.3deg] hover:rotate-[0.2deg] transition-all duration-200"
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Pay
                            <span className="absolute inset-0 border border-black transform rotate-[0.5deg] pointer-events-none"></span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {overdueAmount > 0 && (
          <div className="mt-5 relative bg-[#FFF0F0] p-4 border-2 border-[#CC2936] border-dashed text-sm text-[#CC2936] flex items-start transform rotate-[0.1deg]">
            <div className="absolute inset-0 border-2 border-[#CC2936] border-dashed transform rotate-[-0.4deg] translate-x-[1px] translate-y-[1px]"></div>
            <div className="relative z-10 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 transform rotate-[3deg]" />
              <div>
                <p className="font-extrabold">
                  You have {overdueCount} overdue{" "}
                  {overdueCount === 1 ? "payment" : "payments"} totaling $
                  {overdueAmount.toFixed(2)}
                </p>
                <p className="mt-1 font-medium">
                  Please make a payment as soon as possible to avoid service
                  interruptions.
                </p>
              </div>
            </div>
          </div>
        )}

        {totalToPay > 0 && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => onPayNow && onPayNow(unpaidInvoices[0])}
              className="relative px-5 py-2.5 bg-black text-white font-extrabold flex items-center transform rotate-[-0.5deg] hover:rotate-[0.3deg] transition-all duration-300 hover:scale-105"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay All Invoices
              <span className="absolute inset-0 border-2 border-black transform rotate-[0.8deg] pointer-events-none"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

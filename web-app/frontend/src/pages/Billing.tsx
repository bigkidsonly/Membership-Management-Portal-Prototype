import React, { useState } from "react";
import { BillingHeader } from "../components/Billing/BillingHeader";
import { MembershipRenewal } from "../components/Billing/MembershipRenewal";
import { PaymentMethods } from "../components/Billing/PaymentMethods";
import { OverdueInvoices } from "../components/Billing/OverdueInvoices";
import { InvoiceHistory } from "../components/Billing/InvoiceHistory";
import { NotificationPreferences } from "../components/Billing/NotificationPreferences";
import { QuickActions } from "../components/Billing/QuickActions";
import { BillsToPay } from "../components/Billing/BillsToPay";
export function Billing() {
  // Mock membership data
  const [membershipData, setMembershipData] = useState({
    type: "TL-1 (Affiliated Networks)",
    status: "active",
    currentPeriod: "January 1, 2025 - December 31, 2025",
    renewalDate: "2025-12-31",
    autoRenewal: true,
    currentPlan: "quarterly",
  });
  // Mock payment method data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "credit_card",
      brand: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2027,
      isPrimary: true,
    },
    {
      id: "2",
      type: "credit_card",
      brand: "Mastercard",
      last4: "5555",
      expiryMonth: 8,
      expiryYear: 2026,
      isPrimary: false,
    },
  ]);
  // Today's date for reference
  const today = new Date(2025, 7, 26); // August 26, 2025
  // Function to calculate due date based on invoice type
  const calculateDueDate = (issueDate, type) => {
    const date = new Date(issueDate);
    // Membership invoices: Net 30
    if (type.includes("Membership")) {
      date.setDate(date.getDate() + 30);
    }
    // Net 15 for specific tools
    else if (
      type === "BigQuery" ||
      type === "ActionNetwork" ||
      type === "Mobilize" ||
      type === "Strive" ||
      type === "Civis Analytics"
    ) {
      date.setDate(date.getDate() + 15);
    }
    // All other tools are due upon receipt (same day)
    return date.toISOString().split("T")[0];
  };
  // Function to format date string (YYYY-MM-DD)
  const formatDate = (year, month, day) => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };
  // Mock invoice data - updated with dates between 1/1/2025 and 8/26/2025
  const [invoices, setInvoices] = useState([
    // Q1 2025 (January - March)
    {
      id: "INV-2025-001",
      date: formatDate(2025, 1, 5),
      type: "Membership Dues (Q1)",
      amount: 30000.0,
      status: "paid",
      paidDate: formatDate(2025, 1, 15),
      dueDate: calculateDueDate(formatDate(2025, 1, 5), "Membership Dues (Q1)"),
    },
    {
      id: "INV-2025-002",
      date: formatDate(2025, 1, 12),
      type: "BigQuery",
      amount: 450.0,
      status: "paid",
      paidDate: formatDate(2025, 1, 25),
      dueDate: calculateDueDate(formatDate(2025, 1, 12), "BigQuery"),
    },
    {
      id: "INV-2025-003",
      date: formatDate(2025, 1, 20),
      type: "ActionNetwork",
      amount: 480.0,
      status: "paid",
      paidDate: formatDate(2025, 2, 2),
      dueDate: calculateDueDate(formatDate(2025, 1, 20), "ActionNetwork"),
    },
    {
      id: "INV-2025-004",
      date: formatDate(2025, 2, 10),
      type: "Mobilize",
      amount: 350.0,
      status: "paid",
      paidDate: formatDate(2025, 2, 22),
      dueDate: calculateDueDate(formatDate(2025, 2, 10), "Mobilize"),
    },
    {
      id: "INV-2025-005",
      date: formatDate(2025, 3, 5),
      type: "Strive",
      amount: 275.0,
      status: "paid",
      paidDate: formatDate(2025, 3, 18),
      dueDate: calculateDueDate(formatDate(2025, 3, 5), "Strive"),
    },
    {
      id: "INV-2025-006",
      date: formatDate(2025, 3, 18),
      type: "EveryAction",
      amount: 550.0,
      status: "paid",
      paidDate: formatDate(2025, 3, 18),
      dueDate: calculateDueDate(formatDate(2025, 3, 18), "EveryAction"),
    },
    // Q2 2025 (April - June)
    {
      id: "INV-2025-007",
      date: formatDate(2025, 4, 2),
      type: "Membership Dues (Q2)",
      amount: 30000.0,
      status: "paid",
      paidDate: formatDate(2025, 4, 18),
      dueDate: calculateDueDate(formatDate(2025, 4, 2), "Membership Dues (Q2)"),
    },
    {
      id: "INV-2025-008",
      date: formatDate(2025, 4, 15),
      type: "Twilio",
      amount: 600.0,
      status: "paid",
      paidDate: formatDate(2025, 4, 15),
      dueDate: calculateDueDate(formatDate(2025, 4, 15), "Twilio"),
    },
    {
      id: "INV-2025-009",
      date: formatDate(2025, 5, 8),
      type: "Pipeline Classic",
      amount: 320.0,
      status: "paid",
      paidDate: formatDate(2025, 5, 8),
      dueDate: calculateDueDate(formatDate(2025, 5, 8), "Pipeline Classic"),
    },
    {
      id: "INV-2025-010",
      date: formatDate(2025, 5, 22),
      type: "Spoke",
      amount: 320.0,
      status: "paid",
      paidDate: formatDate(2025, 5, 30),
      dueDate: calculateDueDate(formatDate(2025, 5, 22), "Spoke"),
    },
    {
      id: "INV-2025-011",
      date: formatDate(2025, 6, 14),
      type: "Impactive",
      amount: 290.0,
      status: "paid",
      paidDate: formatDate(2025, 6, 14),
      dueDate: calculateDueDate(formatDate(2025, 6, 14), "Impactive"),
    },
    {
      id: "INV-2025-012",
      date: formatDate(2025, 6, 28),
      type: "ActionNetwork",
      amount: 480.0,
      status: "paid",
      paidDate: formatDate(2025, 7, 10),
      dueDate: calculateDueDate(formatDate(2025, 6, 28), "ActionNetwork"),
    },
    // Q3 2025 (July - September) - mix of paid and unpaid
    {
      id: "INV-2025-013",
      date: formatDate(2025, 7, 1),
      type: "Membership Dues (Q3)",
      amount: 30000.0,
      status: "paid",
      paidDate: formatDate(2025, 7, 15),
      dueDate: calculateDueDate(formatDate(2025, 7, 1), "Membership Dues (Q3)"),
    },
    {
      id: "INV-2025-014",
      date: formatDate(2025, 7, 15),
      type: "ActionKit",
      amount: 750.0,
      status: "paid",
      paidDate: formatDate(2025, 7, 15),
      dueDate: calculateDueDate(formatDate(2025, 7, 15), "ActionKit"),
    },
    {
      id: "INV-2025-015",
      date: formatDate(2025, 7, 25),
      type: "GetThru",
      amount: 175.0,
      status: "paid",
      paidDate: formatDate(2025, 7, 25),
      dueDate: calculateDueDate(formatDate(2025, 7, 25), "GetThru"),
    },
    // Upcoming invoices - due within 7 days
    {
      id: "INV-2025-016",
      date: formatDate(2025, 8, 12),
      type: "BigQuery",
      amount: 450.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 8, 27), // Due in 1 day
    },
    {
      id: "INV-2025-017",
      date: formatDate(2025, 8, 14),
      type: "Twilio",
      amount: 195.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 8, 29), // Due in 3 days
    },
    {
      id: "INV-2025-018",
      date: formatDate(2025, 8, 15),
      type: "Mobilize",
      amount: 350.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 8, 30), // Due in 4 days
    },
    // Upcoming invoices - due after 7 days
    {
      id: "INV-2025-019",
      date: formatDate(2025, 8, 12),
      type: "Pipeline Classic",
      amount: 320.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 9, 3), // Due in 8 days
    },
    {
      id: "INV-2025-020",
      date: formatDate(2025, 8, 15),
      type: "Strive",
      amount: 275.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 8, 30), // Due in 4 days (Net 15)
    },
    {
      id: "INV-2025-021",
      date: formatDate(2025, 8, 18),
      type: "EveryAction",
      amount: 550.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 9, 7), // Due in 12 days
    },
    {
      id: "INV-2025-022",
      date: formatDate(2025, 8, 20),
      type: "Spoke",
      amount: 320.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 9, 10), // Due in 15 days
    },
    // Overdue invoices (past due date)
    {
      id: "INV-2025-023",
      date: formatDate(2025, 7, 10),
      type: "Civis Analytics",
      amount: 1200.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 7, 25), // Overdue by 32 days
    },
    {
      id: "INV-2025-024",
      date: formatDate(2025, 7, 18),
      type: "ActionNetwork",
      amount: 480.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 8, 2), // Overdue by 24 days
    },
    {
      id: "INV-2025-025",
      date: formatDate(2025, 8, 5),
      type: "Impactive",
      amount: 290.0,
      status: "unpaid",
      paidDate: null,
      dueDate: formatDate(2025, 8, 5), // Overdue by 21 days
    },
  ]);
  // Mock notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    renewalReminders: true,
    reminderDays: 30,
    paymentReceipts: true,
    invoiceNotifications: true,
  });
  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  // Toggle auto-renewal
  const toggleAutoRenewal = () => {
    setMembershipData({
      ...membershipData,
      autoRenewal: !membershipData.autoRenewal,
    });
  };
  // Update payment method
  const setPrimaryPaymentMethod = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === id,
      }))
    );
  };
  // Handle payment modal
  const openPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };
  // Pay invoice
  const payInvoice = (invoiceId) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              status: "paid",
              paidDate: today.toISOString().split("T")[0],
            }
          : invoice
      )
    );
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  };
  // Update notification preferences
  const updateNotificationPreferences = (preferences) => {
    setNotificationPreferences({
      ...notificationPreferences,
      ...preferences,
    });
  };
  // Change membership plan
  const changeMembershipPlan = (plan) => {
    setMembershipData({
      ...membershipData,
      currentPlan: plan,
    });
  };
  // Get overdue invoices
  const overdueInvoices = invoices.filter(
    (invoice) =>
      invoice.status === "unpaid" && new Date(invoice.dueDate) < today
  );
  return (
    <div className="max-w-7xl mx-auto pb-12 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl -z-10"></div>
        <BillingHeader membershipData={membershipData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {overdueInvoices.length > 0 && (
            <OverdueInvoices
              invoices={overdueInvoices}
              onPayNow={openPaymentModal}
            />
          )}
          <MembershipRenewal
            membershipData={membershipData}
            onToggleAutoRenewal={toggleAutoRenewal}
            onChangePlan={changeMembershipPlan}
          />
          <BillsToPay invoices={invoices} onPayNow={openPaymentModal} />
          <InvoiceHistory invoices={invoices} onPayInvoice={openPaymentModal} />
        </div>
        <div className="space-y-6">
          <PaymentMethods
            paymentMethods={paymentMethods}
            onSetPrimary={setPrimaryPaymentMethod}
          />
          <NotificationPreferences
            preferences={notificationPreferences}
            onUpdatePreferences={updateNotificationPreferences}
          />
          <QuickActions />
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-[#FDFDF8] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 mx-4 transform rotate-[0.2deg]
            before:content-[''] before:absolute before:inset-0 before:border-2 before:border-black before:rounded-md
            before:transform before:rotate-[-0.3deg] before:pointer-events-none before:z-[-1]
            after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:rounded-md
            after:transform after:rotate-[0.1deg] after:translate-x-[1px] after:translate-y-[1px] after:pointer-events-none after:z-[-1]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Pay Invoice</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Invoice Number</p>
                  <p className="font-medium">{selectedInvoice.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(selectedInvoice.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{selectedInvoice.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">
                    {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Amount Due</p>
                  <p className="text-xl font-bold text-primary">
                    ${selectedInvoice.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Payment Method
              </h4>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      method.isPrimary
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/20 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`method-${method.id}`}
                        name="paymentMethod"
                        defaultChecked={method.isPrimary}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <label
                        htmlFor={`method-${method.id}`}
                        className="ml-3 flex items-center cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gray-100 text-gray-600">
                          <span className="text-xl">💳</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {method.brand} •••• {method.last4}
                            {method.isPrimary && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Primary
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            Expires{" "}
                            {method.expiryMonth.toString().padStart(2, "0")}/
                            {method.expiryYear.toString().slice(-2)}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
                <button className="w-full flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-all duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  Add Payment Method
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
              >
                Cancel
              </button>
              <button
                onClick={() => payInvoice(selectedInvoice.id)}
                className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                Pay ${selectedInvoice.amount.toFixed(2)} Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

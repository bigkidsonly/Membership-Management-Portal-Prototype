import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Check,
  Edit,
  Trash2,
  Shield,
  CreditCardIcon,
  CheckSquare,
  X,
  Landmark,
  Save,
} from "lucide-react";

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
  onSetPrimary,
}: PaymentMethodsProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [hoverCard, setHoverCard] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<string>("credit_card");

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
      case "mastercard":
      case "amex":
      default:
        return "💳";
    }
  };

  const formatExpiryDate = (month: number, year: number) => {
    return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
  };

  return (
    <div className="relative bg-[#FEFEFE] p-6 transform rotate-[0.2deg] transition-all duration-300 hover:rotate-[-0.1deg] hover:scale-[1.005]">
      {/* Hand-drawn border layers */}
      <div className="absolute inset-0 border-2 border-black transform rotate-[-0.4deg] translate-x-[2px] translate-y-[2px]"></div>
      <div className="absolute inset-0 border-2 border-black transform rotate-[0.3deg]"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-extrabold text-black flex items-center mb-5 tracking-tight">
          <div className="relative bg-[#F8F8F8] p-2 mr-3 transform rotate-[-2deg]">
            <CreditCard className="w-5 h-5 text-black transform rotate-[1deg]" />
            <div className="absolute inset-0 border-2 border-black transform rotate-[1.5deg] translate-x-[1px] translate-y-[1px]"></div>
          </div>
          <span className="relative transform rotate-[-0.2deg]">
            Payment Methods
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#2E86AB] transform rotate-[0.5deg]"></span>
          </span>
        </h2>

        <div className="mt-5 space-y-4">
          {paymentMethods.map((method, index) => (
            <div
              key={method.id}
              className={`relative border-2 p-4 transition-all duration-300 transform ${
                method.isPrimary
                  ? "border-black bg-[#F0F8FF] rotate-[0.3deg]"
                  : hoverCard === method.id
                  ? "border-black bg-[#F8F8F8] scale-[1.01] rotate-[-0.2deg]"
                  : `border-black bg-[#FEFEFE] ${
                      index % 2 === 0 ? "rotate-[0.2deg]" : "rotate-[-0.2deg]"
                    } hover:rotate-[0deg] hover:bg-[#F8F8F8]`
              }`}
              onMouseEnter={() => setHoverCard(method.id)}
              onMouseLeave={() => setHoverCard(null)}
            >
              {/* Sketchy border effect */}
              <div className="absolute inset-0 border-2 border-black transform rotate-[-0.5deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>

              <div className="relative z-10 flex justify-between">
                <div className="flex items-center">
                  <div
                    className={`relative w-10 h-10 flex items-center justify-center mr-3 transform rotate-[${
                      index * 2 - 3
                    }deg] ${
                      method.isPrimary
                        ? "bg-[#2E86AB] text-white"
                        : "bg-[#F0F0F0] text-[#6B6B6B]"
                    }`}
                  >
                    <span className="text-xl">{getCardIcon(method.brand)}</span>
                    <div className="absolute inset-0 border-2 border-black transform rotate-[-2deg] translate-x-[1px] translate-y-[1px]"></div>
                  </div>
                  <div>
                    <p className="font-extrabold text-black transform rotate-[0.1deg]">
                      {method.brand} •••• {method.last4}
                      {method.isPrimary && (
                        <span className="ml-2 relative text-xs bg-[#2E86AB] text-white px-2 py-0.5 font-extrabold transform rotate-[8deg]">
                          Primary
                          <span className="absolute inset-0 border border-black transform rotate-[-8deg] pointer-events-none"></span>
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-[#6B6B6B] font-medium transform rotate-[-0.1deg]">
                      Expires{" "}
                      {formatExpiryDate(method.expiryMonth, method.expiryYear)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!method.isPrimary && (
                    <button
                      onClick={() => onSetPrimary(method.id)}
                      className="relative text-sm text-black hover:text-[#2E86AB] flex items-center font-bold px-2 py-1 transform rotate-[-0.3deg] hover:rotate-[0.2deg] transition-all duration-200 hover:bg-[#F0F8FF]"
                    >
                      <Check className="w-4 h-4 mr-1 transform rotate-[3deg]" />
                      Make Primary
                      <div className="absolute inset-0 border border-black border-dashed transform rotate-[0.5deg] pointer-events-none opacity-0 hover:opacity-100 transition-opacity"></div>
                    </button>
                  )}
                  <button className="relative p-1.5 text-[#6B6B6B] hover:text-black hover:bg-[#F0F0F0] transition-colors transform rotate-[2deg] hover:rotate-[-2deg]">
                    <Edit className="w-4 h-4" />
                    <div className="absolute inset-0 border border-black transform rotate-[-3deg] pointer-events-none opacity-0 hover:opacity-100 transition-opacity"></div>
                  </button>
                  <button className="relative p-1.5 text-[#6B6B6B] hover:text-[#CC2936] hover:bg-[#FFF0F0] transition-colors transform rotate-[-2deg] hover:rotate-[2deg]">
                    <Trash2 className="w-4 h-4" />
                    <div className="absolute inset-0 border border-[#CC2936] transform rotate-[3deg] pointer-events-none opacity-0 hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
              {method.isPrimary && (
                <div className="mt-3 pt-3 border-t border-black border-dashed text-xs text-[#6B6B6B] flex items-center transform rotate-[0.1deg]">
                  <Shield className="w-3.5 h-3.5 text-[#2E86AB] mr-1.5 transform rotate-[5deg]" />
                  This is your primary payment method for automatic charges
                </div>
              )}
            </div>
          ))}
        </div>

        {isAddingNew ? (
          <div className="mt-5 relative border-2 border-black p-5 bg-[#F0F8FF] transform rotate-[0.1deg]">
            <div className="absolute inset-0 border-2 border-black transform rotate-[-0.4deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-extrabold text-black transform rotate-[-0.2deg]">
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="relative p-1 text-[#6B6B6B] hover:text-black transform rotate-[5deg] hover:rotate-[-5deg] transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-5 border-b border-black border-dashed pb-4">
                <div className="text-xs font-extrabold text-[#6B6B6B] mb-2 transform rotate-[-0.1deg]">
                  Select payment type
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: "credit_card",
                      icon: CreditCardIcon,
                      label: "Credit Card",
                    },
                    {
                      id: "bank_transfer",
                      icon: Landmark,
                      label: "Bank Transfer",
                    },
                    { id: "check", icon: CheckSquare, label: "Check" },
                  ].map((type, index) => (
                    <div
                      key={type.id}
                      className={`relative border-2 border-black p-3 flex flex-col items-center cursor-pointer transition-all transform ${
                        paymentType === type.id
                          ? "bg-[#F0F8FF] rotate-[0.5deg] scale-105"
                          : `bg-[#FEFEFE] ${
                              index % 2 === 0
                                ? "rotate-[0.2deg]"
                                : "rotate-[-0.2deg]"
                            } hover:rotate-[0deg] hover:bg-[#F8F8F8]`
                      }`}
                      onClick={() => setPaymentType(type.id)}
                    >
                      <div className="absolute inset-0 border-2 border-black transform rotate-[-0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>
                      <type.icon
                        className={`relative z-10 w-6 h-6 mb-2 transform rotate-[${
                          index * 3 - 3
                        }deg] ${
                          paymentType === type.id
                            ? "text-[#2E86AB]"
                            : "text-[#6B6B6B]"
                        }`}
                      />
                      <span className="relative z-10 text-xs font-extrabold">
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {paymentType === "credit_card" && (
                <div className="space-y-4">
                  {[
                    {
                      id: "cardNumber",
                      label: "Card Number",
                      placeholder: "1234 5678 9012 3456",
                    },
                    {
                      id: "expiryDate",
                      label: "Expiry Date",
                      placeholder: "MM/YY",
                      half: true,
                    },
                    { id: "cvc", label: "CVC", placeholder: "123", half: true },
                    {
                      id: "nameOnCard",
                      label: "Name on Card",
                      placeholder: "John Smith",
                    },
                  ].map((field, index) => (
                    <div
                      key={field.id}
                      className={field.half ? "w-1/2" : "w-full"}
                    >
                      <label className="block text-xs text-[#6B6B6B] mb-1.5 font-extrabold transform rotate-[-0.1deg]">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 bg-[#FEFEFE] text-black border-2 border-black font-medium focus:outline-none focus:border-[#2E86AB] transform rotate-[0.1deg] focus:rotate-[0deg] transition-all duration-200"
                        />
                        <div className="absolute inset-0 border-2 border-black transform rotate-[-0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center mt-3 transform rotate-[0.1deg]">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 bg-[#F0F0F0] px-2 py-1 text-xs font-bold border border-black transform rotate-[-1deg]">
                        STRIPE
                      </div>
                    </div>
                    <p className="text-xs text-[#6B6B6B] font-medium">
                      Secure payment processing by Stripe
                    </p>
                  </div>
                </div>
              )}

              {paymentType === "bank_transfer" && (
                <div className="space-y-4">
                  {[
                    {
                      id: "accountName",
                      label: "Account Holder Name",
                      placeholder: "John Smith",
                    },
                    {
                      id: "routingNumber",
                      label: "Routing Number",
                      placeholder: "123456789",
                    },
                    {
                      id: "accountNumber",
                      label: "Account Number",
                      placeholder: "987654321",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="block text-xs text-[#6B6B6B] mb-1.5 font-extrabold transform rotate-[-0.1deg]">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 bg-[#FEFEFE] text-black border-2 border-black font-medium focus:outline-none focus:border-[#2E86AB] transform rotate-[0.1deg] focus:rotate-[0deg] transition-all duration-200"
                        />
                        <div className="absolute inset-0 border-2 border-black transform rotate-[-0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {paymentType === "check" && (
                <div className="relative bg-[#F0F8FF] p-4 border-2 border-[#2E86AB] border-dashed transform rotate-[0.1deg]">
                  <div className="absolute inset-0 border-2 border-[#2E86AB] border-dashed transform rotate-[-0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-extrabold text-[#2E86AB] mb-2 transform rotate-[-0.1deg]">
                      Check Payment Instructions
                    </h3>
                    <div className="text-sm text-black font-medium space-y-2">
                      <p>Please make checks payable to:</p>
                      <p className="font-extrabold">The Movement Cooperative</p>
                      <p className="mt-3">Mail checks to:</p>
                      <address className="mt-1 not-italic font-medium">
                        The Movement Cooperative
                        <br />
                        Attn: Accounts Receivable
                        <br />
                        123 Main Street, Suite 456
                        <br />
                        New York, NY 10001
                      </address>
                      <div className="mt-3 text-xs text-[#6B6B6B] border-t border-[#2E86AB] border-dashed pt-2">
                        <p className="font-bold">
                          Please include your account number and invoice
                          number(s) on the memo line.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-5">
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="relative px-4 py-2 border-2 border-black text-black text-sm font-extrabold transform rotate-[-0.3deg] hover:rotate-[0.2deg] transition-all duration-200 hover:bg-[#F0F0F0]"
                >
                  Cancel
                  <span className="absolute inset-0 border-2 border-black transform rotate-[0.5deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></span>
                </button>
                <button className="relative px-4 py-2 bg-black text-white text-sm font-extrabold transform rotate-[0.3deg] hover:rotate-[-0.2deg] transition-all duration-200 hover:scale-105">
                  <Save className="w-4 h-4 mr-2 inline" />
                  Add Payment Method
                  <span className="absolute inset-0 border-2 border-black transform rotate-[-0.5deg] pointer-events-none"></span>
                </button>
              </div>

              <div className="mt-4 flex items-start bg-[#F0F8FF] p-3 border border-[#2E86AB] border-dashed transform rotate-[0.05deg]">
                <Shield className="w-4 h-4 text-[#2E86AB] mt-0.5 mr-2 flex-shrink-0 transform rotate-[3deg]" />
                <p className="text-xs text-[#2E86AB] font-bold">
                  Your payment information is encrypted and securely stored. We
                  use industry-standard security measures to protect your data.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="mt-5 w-full relative flex items-center justify-center px-4 py-3 border-2 border-black text-sm font-extrabold text-black hover:bg-[#F0F8FF] transition-all duration-200 hover:scale-[1.02] transform rotate-[-0.2deg] hover:rotate-[0.1deg]"
          >
            <Plus className="w-4 h-4 mr-2 transform rotate-[5deg]" />
            Add Payment Method
            <span className="absolute inset-0 border-2 border-black transform rotate-[0.4deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></span>
          </button>
        )}

        <div className="mt-6 pt-5 border-t border-black border-dashed">
          <h3 className="text-sm font-extrabold text-black mb-3 flex items-center transform rotate-[-0.1deg]">
            <span>Auto-pay Preferences</span>
            <div className="relative ml-1.5">
              <div className="w-4 h-4 text-[#6B6B6B] transform rotate-[8deg] border border-black rounded-full flex items-center justify-center text-xs">
                ?
              </div>
            </div>
          </h3>
          <div className="relative flex items-center bg-[#F8F8F8] p-4 border-2 border-black hover:bg-[#F0F8FF] transition-all duration-200 transform rotate-[0.1deg] hover:rotate-[-0.05deg]">
            <div className="absolute inset-0 border-2 border-black transform rotate-[-0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>
            <div className="relative z-10 flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  id="auto-pay"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="auto-pay"
                  className="block w-4 h-4 border-2 border-black bg-[#2E86AB] transform rotate-[3deg] cursor-pointer"
                >
                  <div className="absolute inset-0 border-2 border-black transform rotate-[-5deg] translate-x-[1px] translate-y-[1px] bg-white"></div>
                  <Check className="relative z-10 w-3 h-3 text-white m-0.5" />
                </label>
              </div>
              <label
                htmlFor="auto-pay"
                className="ml-3 block text-sm text-black font-extrabold cursor-pointer transform rotate-[-0.05deg]"
              >
                Use primary payment method for automatic renewals
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

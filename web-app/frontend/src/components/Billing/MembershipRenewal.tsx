import React, { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  Shield,
  HelpCircle,
  Info,
} from "lucide-react";
interface MembershipRenewalProps {
  membershipData: {
    type: string;
    status: string;
    renewalDate: string;
    autoRenewal: boolean;
    currentPlan: string;
  };
  onToggleAutoRenewal: () => void;
  onChangePlan: (plan: string) => void;
}
export function MembershipRenewal({
  membershipData,
  onToggleAutoRenewal,
  onChangePlan,
}: MembershipRenewalProps) {
  const [selectedPlan, setSelectedPlan] = useState(membershipData.currentPlan);
  const [hoverPlan, setHoverPlan] = useState<string | null>(null);
  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: 10000,
      description: "Billed monthly",
      tooltip: "Pay month-to-month with more flexibility",
    },
    {
      id: "quarterly",
      name: "Quarterly",
      price: 30000,
      description: "Billed every 3 months",
      tooltip: "Our standard billing cycle",
    },
    {
      id: "yearly",
      name: "Yearly",
      price: 120000,
      description: "Billed annually",
      tooltip: "Pay once per year",
    },
  ];
  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
    onChangePlan(planId);
  };
  const daysUntilRenewal = () => {
    const today = new Date();
    const renewalDate = new Date(membershipData.renewalDate);
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const renderProgressBar = () => {
    const daysLeft = daysUntilRenewal();
    const totalDays =
      membershipData.currentPlan === "yearly"
        ? 365
        : membershipData.currentPlan === "quarterly"
        ? 90
        : 30;
    const progress = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
    return (
      <div className="mt-5">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span className="font-medium">Current period</span>
          <span className="font-medium">Renewal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-700 ease-in-out"
            style={{
              width: `${100 - progress}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center font-medium shadow-sm">
            <span className="font-bold">Current: </span>
            <span className="ml-1">Quarterly</span>
          </span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center font-medium shadow-sm">
            <Clock className="w-3 h-3 mr-1" />
            {daysLeft} days left
          </span>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-lg font-bold text-primary flex items-center tracking-tight">
        <div className="bg-primary/10 p-2 rounded-lg mr-3 shadow-sm">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        Membership Renewal
      </h2>
      {renderProgressBar()}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <span>Select a billing cycle</span>
          <div className="relative ml-1.5 group">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-48 transition-opacity duration-200">
              Choose how often you want to be billed for your membership
              <div className="absolute left-2 bottom-[-6px] transform rotate-45 w-3 h-3 bg-gray-800"></div>
            </div>
          </div>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-5 cursor-pointer transition-all duration-300 transform ${
                selectedPlan === plan.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg scale-[1.02]"
                  : hoverPlan === plan.id
                  ? "border-gray-300 hover:border-primary/30 hover:bg-primary/5 shadow-md -translate-y-1"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm hover:-translate-y-1"
              } ${plan.id === "quarterly" ? "relative overflow-hidden" : ""}`}
              onClick={() => handlePlanChange(plan.id)}
              onMouseEnter={() => setHoverPlan(plan.id)}
              onMouseLeave={() => setHoverPlan(null)}
            >
              {plan.id === "quarterly" && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 transform rotate-45 translate-x-6 -translate-y-1 shadow-md">
                  Current
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                {selectedPlan === plan.id && (
                  <div className="bg-primary rounded-full p-1 shadow-md">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-primary">
                  ${plan.price.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-600 italic">
                {plan.tooltip}
              </div>
              <div className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-200">
                Changes take effect on 1/1/2026. Contact support for immediate
                changes.
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-700 flex items-start">
          <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Note:</p>
            <p>
              There are no discounts between billing cycle options. The total
              annual amount remains the same regardless of payment frequency.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-5">
        <div className="flex items-center">
          <div className="relative inline-block w-12 mr-3 align-middle select-none">
            <input
              type="checkbox"
              id="auto-renewal"
              checked={membershipData.autoRenewal}
              onChange={onToggleAutoRenewal}
              className="opacity-0 w-0 h-0 absolute"
            />
            <label
              htmlFor="auto-renewal"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out shadow-lg ${
                membershipData.autoRenewal ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-black shadow-lg transform transition-transform duration-200 ease-in-out ${
                  membershipData.autoRenewal ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
          <label
            htmlFor="auto-renewal"
            className="text-sm text-gray-700 cursor-pointer font-medium"
          >
            Auto-renew my membership
          </label>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center">
          <CreditCard className="w-4 h-4 mr-2" />
          Renew Now
        </button>
      </div>
      <div className="mt-4 text-xs bg-primary/5 p-3 rounded-lg border border-primary/10 text-gray-600 flex items-start shadow-sm">
        <Shield className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
        <div>
          {membershipData.autoRenewal ? (
            <span>
              Your membership will automatically renew on{" "}
              <strong>January 1, 2026</strong>. You will be charged{" "}
              <strong>
                $
                {plans
                  .find((p) => p.id === selectedPlan)
                  ?.price.toLocaleString()}
              </strong>{" "}
              for your {selectedPlan} plan.
            </span>
          ) : (
            <span>
              Your membership will not automatically renew. You will need to
              manually renew before the expiration date to avoid service
              interruption.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

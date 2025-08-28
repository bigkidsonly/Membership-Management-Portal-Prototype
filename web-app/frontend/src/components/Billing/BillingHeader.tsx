import React from "react";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";

interface BillingHeaderProps {
  membershipData: {
    type: string;
    status: string;
    currentPeriod: string;
    renewalDate: string;
  };
}

export function BillingHeader({ membershipData }: BillingHeaderProps) {
  const daysUntilRenewal = () => {
    const today = new Date();
    const renewalDate = new Date(membershipData.renewalDate);
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderStatusBadge = () => {
    switch (membershipData.status) {
      case "active":
        return (
          <span className="relative inline-flex items-center px-3 py-1.5 text-xs font-extrabold bg-[#2E86AB] text-white transform rotate-[0.5deg]">
            <CheckCircle className="w-3 h-3 mr-1.5 transform rotate-[-2deg]" />
            Active
            <span className="absolute inset-0 border-2 border-black transform rotate-[-0.8deg] pointer-events-none"></span>
            <span className="absolute inset-0 border-2 border-black transform rotate-[0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></span>
          </span>
        );
      case "expiring":
        return (
          <span className="relative inline-flex items-center px-3 py-1.5 text-xs font-extrabold bg-[#F18F01] text-white transform rotate-[-0.3deg]">
            <AlertTriangle className="w-3 h-3 mr-1.5 transform rotate-[2deg]" />
            Expiring Soon
            <span className="absolute inset-0 border-2 border-black transform rotate-[0.7deg] pointer-events-none"></span>
            <span className="absolute inset-0 border-2 border-black transform rotate-[-0.4deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></span>
          </span>
        );
      case "expired":
        return (
          <span className="relative inline-flex items-center px-3 py-1.5 text-xs font-extrabold bg-[#CC2936] text-white transform rotate-[0.4deg]">
            <XCircle className="w-3 h-3 mr-1.5 transform rotate-[-1deg]" />
            Expired
            <span className="absolute inset-0 border-2 border-black transform rotate-[-0.6deg] pointer-events-none"></span>
            <span className="absolute inset-0 border-2 border-black transform rotate-[0.5deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-[#FEFEFE] p-8 transform rotate-[0.3deg] transition-all duration-300 hover:rotate-[-0.2deg] hover:scale-[1.01]">
      {/* Hand-drawn border layers */}
      <div className="absolute inset-0 border-2 border-black transform rotate-[-0.5deg] translate-x-[2px] translate-y-[2px]"></div>
      <div className="absolute inset-0 border-2 border-black transform rotate-[0.2deg]"></div>

      {/* Decorative sketchy elements */}
      <div className="absolute top-0 right-0 w-24 h-24 border border-dashed border-[#6B6B6B] rounded-full transform rotate-[15deg] -mr-12 -mt-12 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border border-dashed border-[#6B6B6B] rounded-full transform rotate-[-20deg] -ml-16 -mb-16 opacity-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center">
            <div className="relative bg-black p-3 mr-3 transform rotate-[-2deg]">
              <DollarSign className="h-6 w-6 text-[#FDFDF8] transform rotate-[1deg]" />
              <div className="absolute inset-0 border-2 border-black transform rotate-[1.5deg] translate-x-[1px] translate-y-[1px]"></div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-black tracking-tight transform rotate-[-0.3deg] relative">
                Billing & Payments
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#CC2936] transform rotate-[0.5deg]"></span>
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#6B6B6B] mt-3 ml-11 transform rotate-[0.2deg] font-medium">
            Manage your membership, invoices, and payment methods
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {renderStatusBadge()}

          <div className="relative px-3 py-2 bg-[#F8F8F8] text-black font-extrabold flex items-center text-sm transform rotate-[-0.4deg]">
            <Clock className="w-4 h-4 mr-1.5 transform rotate-[3deg]" />
            {daysUntilRenewal() > 0
              ? `Renews in ${daysUntilRenewal()} days`
              : "Renewal overdue"}
            <div className="absolute inset-0 border-2 border-black transform rotate-[0.6deg] pointer-events-none"></div>
            <div className="absolute inset-0 border-2 border-black transform rotate-[-0.3deg] translate-x-[1px] translate-y-[1px] pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 relative bg-[#F8F8F8] p-5 transform rotate-[0.1deg]">
        <div className="absolute inset-0 border-2 border-black border-dashed transform rotate-[-0.3deg]"></div>
        <div className="absolute inset-0 border-2 border-black border-dashed transform rotate-[0.4deg] translate-x-[1px] translate-y-[1px]"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative transform hover:rotate-[0.5deg] transition-transform duration-300">
            <span className="text-xs font-extrabold text-[#6B6B6B] uppercase tracking-wider flex items-center transform rotate-[-0.2deg]">
              <User className="w-3 h-3 mr-1.5 transform rotate-[5deg]" />
              Membership Type
            </span>
            <p className="mt-1 font-extrabold text-black transform rotate-[0.3deg] text-lg">
              {membershipData.type}
            </p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-black border-dashed transform rotate-[1deg] transition-opacity duration-200"></div>
          </div>

          <div className="group relative transform hover:rotate-[-0.3deg] transition-transform duration-300">
            <span className="text-xs font-extrabold text-[#6B6B6B] uppercase tracking-wider flex items-center transform rotate-[0.3deg]">
              <Calendar className="w-3 h-3 mr-1.5 transform rotate-[-4deg]" />
              Current Period
            </span>
            <p className="mt-1 text-[#6B6B6B] font-bold transform rotate-[-0.2deg]">
              {membershipData.currentPeriod}
            </p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-black border-dashed transform rotate-[-0.8deg] transition-opacity duration-200"></div>
          </div>

          <div className="group relative transform hover:rotate-[0.4deg] transition-transform duration-300">
            <span className="text-xs font-extrabold text-[#6B6B6B] uppercase tracking-wider flex items-center transform rotate-[-0.4deg]">
              <Clock className="w-3 h-3 mr-1.5 transform rotate-[2deg]" />
              Renewal Date
            </span>
            <p className="mt-1 text-[#6B6B6B] font-extrabold transform rotate-[0.2deg]">
              {new Date(membershipData.renewalDate).toLocaleDateString()}
            </p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-black border-dashed transform rotate-[0.6deg] transition-opacity duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

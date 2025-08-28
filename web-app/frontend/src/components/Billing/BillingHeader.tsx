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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-md">
            <CheckCircle className="w-3 h-3 mr-1.5" />
            Active
          </span>
        );
      case "expiring":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 shadow-md">
            <AlertTriangle className="w-3 h-3 mr-1.5" />
            Expiring Soon
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 shadow-md">
            <XCircle className="w-3 h-3 mr-1.5" />
            Expired
          </span>
        );
      default:
        return null;
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-primary/5 to-transparent rounded-full -mr-32 -mt-32 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-t from-secondary/5 to-transparent rounded-full -ml-24 -mb-24 opacity-70"></div>
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              Billing & Payments
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-2 ml-11">
            Manage your membership, invoices, and payment methods
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          {renderStatusBadge()}
          <div className="ml-3 text-sm bg-primary/5 px-3 py-1 rounded-full text-primary font-medium flex items-center shadow-md">
            <Clock className="w-4 h-4 mr-1.5" />
            {daysUntilRenewal() > 0
              ? `Renews in ${daysUntilRenewal()} days`
              : "Renewal overdue"}
          </div>
        </div>
      </div>
      <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-5 border border-primary/10 shadow-md relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative">
            <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider flex items-center">
              <User className="w-3 h-3 mr-1.5" />
              Membership Type
            </span>
            <p className="mt-1 font-semibold text-gray-900 truncate">
              {membershipData.type}
            </p>
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 group-hover:bg-primary/5 transition-opacity duration-200"></div>
          </div>
          <div className="group relative">
            <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider flex items-center">
              <Calendar className="w-3 h-3 mr-1.5" />
              Current Period
            </span>
            <p className="mt-1 text-gray-700 truncate">
              {membershipData.currentPeriod}
            </p>
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 group-hover:bg-primary/5 transition-opacity duration-200"></div>
          </div>
          <div className="group relative">
            <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider flex items-center">
              <Clock className="w-3 h-3 mr-1.5" />
              Renewal Date
            </span>
            <p className="mt-1 text-gray-700 font-medium truncate">
              {new Date(membershipData.renewalDate).toLocaleDateString()}
            </p>
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 group-hover:bg-primary/5 transition-opacity duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Phone,
  MessageSquare,
  BarChart3,
  Wifi,
} from "lucide-react";

const PhoneServiceCalculator = () => {
  const [quantities, setQuantities] = useState({
    mms: 0,
    segment: 0,
    dials: 0,
    sms: 0,
  });

  const [totals, setTotals] = useState({
    mms: 0,
    segment: 0,
    dials: 0,
    sms: 0,
    grandTotal: 0,
  });

  const services = [
    { key: "mms", name: "MMS", price: 0.035, icon: MessageSquare },
    { key: "segment", name: "Segment", price: 0.02, icon: BarChart3 },
    { key: "dials", name: "Dials", price: 0.03375, icon: Phone },
    { key: "sms", name: "SMS", price: 0.06, icon: Wifi },
  ];

  useEffect(() => {
    const newTotals = {};
    services.forEach((service) => {
      newTotals[service.key] = quantities[service.key] * service.price;
    });
    newTotals.grandTotal = Object.values(newTotals).reduce(
      (sum, val) => sum + val,
      0
    );
    setTotals(newTotals);
  }, [quantities]);

  const handleQuantityChange = (service, value) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setQuantities((prev) => ({ ...prev, [service]: numValue }));
  };

  const resetCalculator = () => {
    setQuantities({ mms: 0, segment: 0, dials: 0, sms: 0 });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8" />
          Thrutext Service Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your estimated monthly costs for phone services
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Cost Calculator</CardTitle>
          <CardDescription>
            Enter quantities to calculate your total monthly cost
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Service</th>
                  <th className="text-center py-3 px-4 font-semibold">
                    Price per Unit
                  </th>
                  <th className="text-center py-3 px-4 font-semibold">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-4 font-semibold">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <tr key={service.key} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-100">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{service.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-mono">
                        {formatCurrency(service.price)}
                      </td>
                      <td className="py-4 px-4">
                        <Input
                          type="number"
                          min="0"
                          value={quantities[service.key]}
                          onChange={(e) =>
                            handleQuantityChange(service.key, e.target.value)
                          }
                          className="w-24 mx-auto text-center"
                          placeholder="0"
                        />
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-semibold">
                        {formatCurrency(totals[service.key])}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 bg-blue-50">
                  <td className="py-4 px-4 font-bold text-lg">Total</td>
                  <td className="py-4 px-4"></td>
                  <td className="py-4 px-4"></td>
                  <td className="py-4 px-4 text-right font-bold text-lg text-blue-600">
                    {formatCurrency(totals.grandTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={resetCalculator}
              variant="outline"
              disabled={totals.grandTotal === 0}
            >
              Reset Calculator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneServiceCalculator;

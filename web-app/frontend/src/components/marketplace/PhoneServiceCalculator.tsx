import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
export function PhoneServiceCalculator() {
  const [smsVolume, setSmsVolume] = useState(1000);
  const [mmsVolume, setMmsVolume] = useState(100);
  const [voiceMinutes, setVoiceMinutes] = useState(500);
  const [segments, setSegments] = useState(200);
  // Rates (per unit)
  const rates = {
    sms: 0.042,
    mms: 0.0245,
    voice: 0.02363,
    segments: 0.014,
  };
  // Calculate costs
  const smsCost = smsVolume * rates.sms;
  const mmsCost = mmsVolume * rates.mms;
  const voiceCost = voiceMinutes * rates.voice;
  const segmentsCost = segments * rates.segments;
  const totalCost = smsCost + mmsCost + voiceCost + segmentsCost;
  // Handle numeric input changes with validation
  const handleNumericChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/,/g, "");
      if (value === "") {
        setter(0);
      } else {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 0) {
          setter(numValue);
        }
      }
    };
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="bg-white border rounded-xl p-6 mb-6">
      <p className="text-gray-600 mb-4">
        Estimate your monthly costs based on expected usage.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMS Messages
          </label>
          <div className="relative">
            <Input
              type="text"
              value={formatNumber(smsVolume)}
              onChange={handleNumericChange(setSmsVolume)}
              className="pr-12"
              placeholder="Enter SMS volume"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
              msgs
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MMS Messages
          </label>
          <div className="relative">
            <Input
              type="text"
              value={formatNumber(mmsVolume)}
              onChange={handleNumericChange(setMmsVolume)}
              className="pr-12"
              placeholder="Enter MMS volume"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
              msgs
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Voice Minutes
          </label>
          <div className="relative">
            <Input
              type="text"
              value={formatNumber(voiceMinutes)}
              onChange={handleNumericChange(setVoiceMinutes)}
              className="pr-12"
              placeholder="Enter voice minutes"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
              mins
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message Segments
          </label>
          <div className="relative">
            <Input
              type="text"
              value={formatNumber(segments)}
              onChange={handleNumericChange(setSegments)}
              className="pr-12"
              placeholder="Enter message segments"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
              segs
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-3">
          Estimated Monthly Cost
        </h5>
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
          <div className="text-gray-600">SMS Messages:</div>
          <div className="font-medium text-right">${smsCost.toFixed(2)}</div>
          <div className="text-gray-600">MMS Messages:</div>
          <div className="font-medium text-right">${mmsCost.toFixed(2)}</div>
          <div className="text-gray-600">Voice Minutes:</div>
          <div className="font-medium text-right">${voiceCost.toFixed(2)}</div>
          <div className="text-gray-600">Message Segments:</div>
          <div className="font-medium text-right">
            ${segmentsCost.toFixed(2)}
          </div>
          <div className="text-gray-600 pt-2 border-t font-medium">Total:</div>
          <div className="font-bold text-right pt-2 border-t">
            ${totalCost.toFixed(2)}
          </div>
        </div>
        <p className="text-xs text-gray-500 italic">
          This is an estimate based on member rates. Actual costs may vary based
          on usage patterns and any applicable volume discounts.
        </p>
      </div>
    </div>
  );
}

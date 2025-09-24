// components/QRScanner.tsx
"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isOpen,
  onClose,
  onScan,
}) => {
  const [scannedData, setScannedData] = useState("");

  const handleScan = () => {
    // Simulate QR code scan - in real implementation, use camera
    const mockData = `item-${Date.now()}`;
    setScannedData(mockData);
    onScan(mockData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Scan Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-teal-600 rounded-lg flex items-center justify-center">
              <div className="text-6xl">📷</div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Point your camera at a QR code to scan
          </p>
          <button
            onClick={handleScan}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
          >
            Scan Item
          </button>
        </div>
      </div>
    </div>
  );
};

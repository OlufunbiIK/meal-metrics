"use client";
import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

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
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      startScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const startScanner = async () => {
    try {
      setError("");

      // Initialize scanner
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      // Start scanning
      await scanner.start(
        { facingMode: "environment" }, // Use back camera
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // Scanning box size
        },
        (decodedText) => {
          // Success callback
          console.log("QR Code detected:", decodedText);
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Error callback (can be noisy, so we don't show all errors)
          // This fires continuously when no QR code is detected
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError("Failed to access camera. Please check permissions.");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Scan QR Code</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                <Camera size={48} className="mx-auto" />
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={startScanner}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Scanner container */}
              <div
                id="qr-reader"
                className="w-full rounded-lg overflow-hidden mb-4"
              ></div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Position the QR code within the frame to scan
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

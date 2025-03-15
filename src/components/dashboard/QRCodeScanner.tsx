import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Smartphone,
} from "lucide-react";

interface QRCodeScannerProps {
  onDevicePaired?: (deviceId: string) => void;
  isSimulation?: boolean;
}

const QRCodeScanner = ({
  onDevicePaired = () => {},
  isSimulation = true,
}: QRCodeScannerProps) => {
  const [scanningState, setScanningState] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [countdown, setCountdown] = useState<number>(30);
  const [deviceId, setDeviceId] = useState<string>("");

  // Simulate QR code scanning process
  useEffect(() => {
    let timer: number;

    if (scanningState === "scanning") {
      // Simulate countdown
      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Randomly decide if pairing is successful (80% success rate for demo)
            const isSuccess = Math.random() > 0.2;
            setScanningState(isSuccess ? "success" : "error");
            if (isSuccess) {
              const newDeviceId = `device_${Math.floor(Math.random() * 10000)}`;
              setDeviceId(newDeviceId);
              onDevicePaired(newDeviceId);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [scanningState, onDevicePaired]);

  const startScanning = () => {
    setScanningState("scanning");
    setCountdown(30);
  };

  const resetScanner = () => {
    setScanningState("idle");
    setDeviceId("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Pair New WhatsApp Device
        </CardTitle>
        <CardDescription className="text-center">
          Scan the QR code with your WhatsApp mobile app to connect
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center p-6">
        {scanningState === "idle" && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <Smartphone className="h-16 w-16 text-gray-400" />
              <span className="sr-only">QR Code placeholder</span>
            </div>
            <p className="text-sm text-gray-500">
              Click the button below to generate a QR code
            </p>
          </div>
        )}

        {scanningState === "scanning" && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 relative">
              {/* Simulated QR code - in a real app, this would be an actual QR code */}
              <div className="w-48 h-48 bg-[url('https://api.dicebear.com/7.x/identicon/svg?seed=whatsapp')] bg-contain bg-no-repeat bg-center">
                <span className="sr-only">QR Code</span>
              </div>
              <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {countdown}s
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">
                Waiting for device to scan QR code...
              </p>
            </div>
          </div>
        )}

        {scanningState === "success" && (
          <div className="flex flex-col items-center space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">
                Device Connected!
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Your device (ID: {deviceId}) has been successfully paired.
              </AlertDescription>
            </Alert>
            <div className="w-64 h-64 border-2 border-green-300 rounded-lg flex items-center justify-center bg-green-50">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
          </div>
        )}

        {scanningState === "error" && (
          <div className="flex flex-col items-center space-y-4">
            <Alert className="bg-red-50 border-red-200">
              <XCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800">
                Connection Failed
              </AlertTitle>
              <AlertDescription className="text-red-700">
                Unable to pair your device. Please try again.
              </AlertDescription>
            </Alert>
            <div className="w-64 h-64 border-2 border-red-300 rounded-lg flex items-center justify-center bg-red-50">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center space-x-2 pb-6">
        {scanningState === "idle" && (
          <Button
            onClick={startScanning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Generate QR Code
          </Button>
        )}

        {scanningState === "scanning" && (
          <Button variant="outline" onClick={resetScanner}>
            Cancel
          </Button>
        )}

        {(scanningState === "success" || scanningState === "error") && (
          <Button
            onClick={resetScanner}
            variant={scanningState === "error" ? "default" : "outline"}
            className={
              scanningState === "error" ? "bg-blue-600 hover:bg-blue-700" : ""
            }
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {scanningState === "error" ? "Try Again" : "Pair Another Device"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QRCodeScanner;

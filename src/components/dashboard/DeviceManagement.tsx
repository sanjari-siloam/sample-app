import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import DeviceList from "./DeviceList";
import DeviceDetails from "./DeviceDetails";
import QRCodeScanner from "./QRCodeScanner";

interface DeviceManagementProps {
  onRefresh?: () => void;
}

const DeviceManagement = ({ onRefresh = () => {} }: DeviceManagementProps) => {
  const [activeTab, setActiveTab] = useState<string>("devices");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);

  const handleViewDeviceDetails = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setActiveTab("details");
  };

  const handleDisconnectDevice = (deviceId: string) => {
    // In a real app, this would call an API to disconnect the device
    console.log(`Disconnecting device: ${deviceId}`);
    // Then refresh the device list
    onRefresh();
  };

  const handleDevicePaired = (deviceId: string) => {
    console.log(`Device paired successfully: ${deviceId}`);
    // After successful pairing, show the device list
    setShowQRScanner(false);
    setActiveTab("devices");
    // Refresh the device list to show the new device
    onRefresh();
  };

  const handleAddDevice = () => {
    setShowQRScanner(true);
    setActiveTab("add");
  };

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Device Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleAddDevice}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="devices">All Devices</TabsTrigger>
          {selectedDeviceId && (
            <TabsTrigger value="details">Device Details</TabsTrigger>
          )}
          {showQRScanner && <TabsTrigger value="add">Add Device</TabsTrigger>}
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <DeviceList
            onViewDetails={handleViewDeviceDetails}
            onDisconnect={handleDisconnectDevice}
            onRefresh={onRefresh}
          />
        </TabsContent>

        {selectedDeviceId && (
          <TabsContent value="details" className="space-y-4">
            <DeviceDetails
              deviceId={selectedDeviceId}
              // In a real app, you would fetch the device details based on the ID
            />
          </TabsContent>
        )}

        {showQRScanner && (
          <TabsContent value="add" className="space-y-4">
            <div className="flex justify-center">
              <QRCodeScanner onDevicePaired={handleDevicePaired} />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default DeviceManagement;

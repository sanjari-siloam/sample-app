import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Smartphone,
  Info,
  Power,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Device {
  id: string;
  name: string;
  phoneNumber: string;
  status: "online" | "offline" | "pairing";
  lastConnection: string;
  messageCount: number;
}

interface DeviceListProps {
  devices?: Device[];
  onViewDetails?: (deviceId: string) => void;
  onDisconnect?: (deviceId: string) => void;
  onRefresh?: () => void;
}

const DeviceList = ({
  devices = [
    {
      id: "1",
      name: "Primary WhatsApp",
      phoneNumber: "+1 (555) 123-4567",
      status: "online",
      lastConnection: "2023-06-15T10:30:00Z",
      messageCount: 1243,
    },
    {
      id: "2",
      name: "Support Team",
      phoneNumber: "+1 (555) 987-6543",
      status: "offline",
      lastConnection: "2023-06-14T18:45:00Z",
      messageCount: 567,
    },
    {
      id: "3",
      name: "Marketing Campaigns",
      phoneNumber: "+1 (555) 456-7890",
      status: "pairing",
      lastConnection: "2023-06-15T09:15:00Z",
      messageCount: 890,
    },
  ],
  onViewDetails = () => {},
  onDisconnect = () => {},
  onRefresh = () => {},
}: DeviceListProps) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const getStatusBadge = (status: Device["status"]) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500">Online</Badge>;
      case "offline":
        return <Badge variant="destructive">Offline</Badge>;
      case "pairing":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Pairing
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Connected Devices
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <Smartphone className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>
          List of all WhatsApp devices connected to your account.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Device Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Connection</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">{device.name}</TableCell>
              <TableCell>{device.phoneNumber}</TableCell>
              <TableCell>{getStatusBadge(device.status)}</TableCell>
              <TableCell>{formatDate(device.lastConnection)}</TableCell>
              <TableCell>{device.messageCount.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(device.id)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDisconnect(device.id)}
                  >
                    <Power className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedDevice(device)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Name</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Device Details Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <span className="hidden">Open Details</span>
          {/* Hidden trigger, dialog opened programmatically */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Device Details</DialogTitle>
          </DialogHeader>
          {selectedDevice && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Name:</span>
                <span className="col-span-3">{selectedDevice.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Phone:</span>
                <span className="col-span-3">{selectedDevice.phoneNumber}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Status:</span>
                <span className="col-span-3">
                  {getStatusBadge(selectedDevice.status)}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Connected:</span>
                <span className="col-span-3">
                  {formatDate(selectedDevice.lastConnection)}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Messages:</span>
                <span className="col-span-3">
                  {selectedDevice.messageCount.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceList;

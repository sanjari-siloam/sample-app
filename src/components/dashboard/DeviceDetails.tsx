import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  MessageSquare,
  BarChart2,
  Clock,
  Signal,
  RefreshCw,
  Smartphone,
  Info,
  AlertTriangle,
} from "lucide-react";

interface DeviceMetric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface MessageStat {
  type: string;
  count: number;
  percentage: number;
}

interface DeviceDetailsProps {
  deviceId?: string;
  deviceName?: string;
  phoneNumber?: string;
  status?: "online" | "offline" | "pairing" | "error";
  lastActive?: string;
  batteryLevel?: number;
  signalStrength?: number;
  metrics?: DeviceMetric[];
  messageStats?: MessageStat[];
  errorMessage?: string;
}

const DeviceDetails = ({
  deviceId = "WA12345678",
  deviceName = "Primary Business Phone",
  phoneNumber = "+1 (555) 123-4567",
  status = "online",
  lastActive = "2 minutes ago",
  batteryLevel = 78,
  signalStrength = 85,
  errorMessage = "",
  metrics = [
    {
      label: "Uptime",
      value: "5d 12h 30m",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      label: "Messages Sent",
      value: 1254,
      icon: <MessageSquare className="h-4 w-4" />,
      change: "+12%",
      trend: "up",
    },
    {
      label: "Messages Received",
      value: 879,
      icon: <MessageSquare className="h-4 w-4" />,
      change: "+5%",
      trend: "up",
    },
    {
      label: "Connection Quality",
      value: "95%",
      icon: <Signal className="h-4 w-4" />,
    },
    {
      label: "Sync Status",
      value: "Up to date",
      icon: <RefreshCw className="h-4 w-4" />,
    },
    {
      label: "Device Model",
      value: "iPhone 13 Pro",
      icon: <Smartphone className="h-4 w-4" />,
    },
  ],
  messageStats = [
    { type: "Text", count: 1560, percentage: 65 },
    { type: "Media", count: 420, percentage: 18 },
    { type: "Templates", count: 320, percentage: 13 },
    { type: "Failed", count: 95, percentage: 4 },
  ],
}: DeviceDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-500";
      case "pairing":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>;
      case "pairing":
        return <Badge className="bg-blue-100 text-blue-800">Pairing</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <span className="text-green-500 text-xs">↑</span>;
      case "down":
        return <span className="text-red-500 text-xs">↓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      {status === "error" && errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-800">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <div className="mr-4 bg-gray-100 p-3 rounded-full">
            <Phone className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{deviceName}</h2>
            <div className="flex items-center mt-1">
              <p className="text-gray-500 text-sm mr-3">{phoneNumber}</p>
              <div className="flex items-center">
                <div
                  className={`h-2 w-2 rounded-full ${getStatusColor(status)} mr-1.5`}
                ></div>
                {getStatusBadge(status)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Disconnect
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Last Active</p>
                <p className="text-lg font-semibold">{lastActive}</p>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-500">
                  Battery Level
                </p>
                <p className="text-sm font-medium">{batteryLevel}%</p>
              </div>
              <Progress value={batteryLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-500">
                  Signal Strength
                </p>
                <p className="text-sm font-medium">{signalStrength}%</p>
              </div>
              <Progress value={signalStrength} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="metrics">Connection Metrics</TabsTrigger>
          <TabsTrigger value="messages">Message Statistics</TabsTrigger>
          <TabsTrigger value="info">Device Information</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connection Metrics</CardTitle>
              <CardDescription>
                Detailed metrics about this device's connection and usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-full">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {metric.label}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold">{metric.value}</p>
                        {metric.change && (
                          <span className="ml-2 text-xs flex items-center">
                            {getTrendIcon(metric.trend)}
                            <span
                              className={
                                metric.trend === "up"
                                  ? "text-green-600"
                                  : metric.trend === "down"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }
                            >
                              {metric.change}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Statistics</CardTitle>
              <CardDescription>
                Breakdown of messages sent through this device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messageStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">{stat.type}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({stat.count})
                        </span>
                      </div>
                      <span className="text-sm">{stat.percentage}%</span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                    {index < messageStats.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Information</CardTitle>
              <CardDescription>
                Technical details about this connected device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Device ID</p>
                  <p className="font-mono text-sm">{deviceId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p>{phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Device Model
                  </p>
                  <p>iPhone 13 Pro</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    OS Version
                  </p>
                  <p>iOS 16.2</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    WhatsApp Version
                  </p>
                  <p>2.23.15.12</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Connected Since
                  </p>
                  <p>Jan 15, 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceDetails;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import MessageVolumeChart from "./charts/MessageVolumeChart";
import DeliveryRateChart from "./charts/DeliveryRateChart";
import EngagementMetrics from "./charts/EngagementMetrics";
import DateRangeFilter from "./DateRangeFilter";
import { DateRange } from "react-day-picker";

interface AnalyticsDashboardProps {
  data?: {
    messageVolume?: Array<{
      date: string;
      sent: number;
      received: number;
    }>;
    deliveryRate?: {
      delivered: number;
      read: number;
      failed: number;
      pending: number;
    };
    engagementMetrics?: {
      responseRate: number;
      avgResponseTime: number;
      userSatisfaction: number;
      activeUsers: number;
    };
  };
}

const AnalyticsDashboard = ({
  data = {
    messageVolume: [
      { date: "2023-06-01", sent: 120, received: 85 },
      { date: "2023-06-02", sent: 145, received: 97 },
      { date: "2023-06-03", sent: 135, received: 110 },
      { date: "2023-06-04", sent: 160, received: 130 },
      { date: "2023-06-05", sent: 180, received: 120 },
      { date: "2023-06-06", sent: 190, received: 140 },
      { date: "2023-06-07", sent: 170, received: 150 },
    ],
    deliveryRate: {
      delivered: 85,
      read: 72,
      failed: 8,
      pending: 7,
    },
    engagementMetrics: {
      responseRate: 87,
      avgResponseTime: 3.2,
      userSatisfaction: 92,
      activeUsers: 1243,
    },
  },
}: AnalyticsDashboardProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [activeTab, setActiveTab] = useState("overview");

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    // In a real implementation, this would trigger data fetching based on the date range
  };

  const handlePresetChange = (preset: string) => {
    // In a real implementation, this would trigger data fetching based on the preset
    console.log(`Preset changed to: ${preset}`);
  };

  const handleExportReport = () => {
    // In a real implementation, this would generate and download a report
    console.log("Exporting report...");
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 space-y-6 overflow-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your WhatsApp messaging performance and engagement metrics.
          </p>
        </div>
        <Button onClick={handleExportReport} className="ml-auto">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <DateRangeFilter
        onDateChange={handleDateChange}
        onPresetChange={handlePresetChange}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MessageVolumeChart data={data.messageVolume} />
            <DeliveryRateChart data={data.deliveryRate} />
          </div>
          <EngagementMetrics metrics={data.engagementMetrics} />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Message Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageVolumeChart
                data={data.messageVolume}
                title="Message Volume Detail"
                description="Detailed breakdown of message volume by type and time"
              />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data.messageVolume?.reduce(
                        (sum, item) => sum + item.sent + item.received,
                        0,
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data.messageVolume?.reduce(
                        (sum, item) => sum + item.sent,
                        0,
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Received Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data.messageVolume?.reduce(
                        (sum, item) => sum + item.received,
                        0,
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DeliveryRateChart data={data.deliveryRate} period="daily" />
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Delivery Success Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {Math.round(
                          ((data.deliveryRate?.delivered || 0) /
                            ((data.deliveryRate?.delivered || 0) +
                              (data.deliveryRate?.failed || 0) +
                              (data.deliveryRate?.pending || 0))) *
                            100,
                        )}
                        %
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Percentage of messages successfully delivered
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Read Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {Math.round(
                          ((data.deliveryRate?.read || 0) /
                            (data.deliveryRate?.delivered || 1)) *
                            100,
                        )}
                        %
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Percentage of delivered messages that were read
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <EngagementMetrics metrics={data.engagementMetrics} />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Response Time Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Response time trend visualization would appear here
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      User Activity Heatmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">
                      User activity heatmap would appear here
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;

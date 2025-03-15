import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeliveryRateChartProps {
  data?: {
    delivered: number;
    read: number;
    failed: number;
    pending: number;
  };
  period?: "daily" | "weekly" | "monthly";
}

const DeliveryRateChart = ({
  data = {
    delivered: 85,
    read: 72,
    failed: 8,
    pending: 7,
  },
  period = "daily",
}: DeliveryRateChartProps) => {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  // Calculate total for percentages
  const total = data.delivered + data.failed + data.pending;

  // Calculate percentages
  const deliveredPercentage = Math.round((data.delivered / total) * 100);
  const readPercentage = Math.round((data.read / total) * 100);
  const failedPercentage = Math.round((data.failed / total) * 100);
  const pendingPercentage = Math.round((data.pending / total) * 100);

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Delivery Rate</CardTitle>
          <CardDescription>
            Message delivery success and failure rates
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedPeriod}
            onValueChange={(value: "daily" | "weekly" | "monthly") =>
              setSelectedPeriod(value)
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie" className="w-full">
          <TabsList className="grid w-[200px] grid-cols-2 mb-4">
            <TabsTrigger value="pie" onClick={() => setChartType("pie")}>
              Pie Chart
            </TabsTrigger>
            <TabsTrigger value="bar" onClick={() => setChartType("bar")}>
              Bar Chart
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="pie"
            className="w-full h-[300px] flex items-center justify-center"
          >
            <div className="relative w-[250px] h-[250px]">
              {/* Pie chart visualization */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Delivered slice - using stroke-dasharray for pie segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#4ade80"
                  strokeWidth="20"
                  strokeDasharray={`${deliveredPercentage * 2.51} ${100 * 2.51 - deliveredPercentage * 2.51}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Failed slice */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f87171"
                  strokeWidth="20"
                  strokeDasharray={`${failedPercentage * 2.51} ${100 * 2.51 - failedPercentage * 2.51}`}
                  strokeDashoffset={`${-deliveredPercentage * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Pending slice */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#fbbf24"
                  strokeWidth="20"
                  strokeDasharray={`${pendingPercentage * 2.51} ${100 * 2.51 - pendingPercentage * 2.51}`}
                  strokeDashoffset={`${-(deliveredPercentage + failedPercentage) * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-3xl font-bold fill-gray-800"
                >
                  {deliveredPercentage}%
                </text>
                <text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-gray-500"
                >
                  Delivered
                </text>
              </svg>
            </div>

            <div className="flex flex-col space-y-2 ml-8">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#4ade80] mr-2"></div>
                <span className="text-sm">
                  Delivered ({deliveredPercentage}%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#60a5fa] mr-2"></div>
                <span className="text-sm">Read ({readPercentage}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#f87171] mr-2"></div>
                <span className="text-sm">Failed ({failedPercentage}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#fbbf24] mr-2"></div>
                <span className="text-sm">Pending ({pendingPercentage}%)</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bar" className="w-full h-[300px]">
            <div className="w-full h-full flex items-end justify-around px-4">
              {/* Bar chart visualization */}
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-[#4ade80] rounded-t-md"
                  style={{ height: `${deliveredPercentage * 2.5}px` }}
                ></div>
                <span className="mt-2 text-sm">Delivered</span>
                <span className="text-sm font-bold">
                  {deliveredPercentage}%
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-[#60a5fa] rounded-t-md"
                  style={{ height: `${readPercentage * 2.5}px` }}
                ></div>
                <span className="mt-2 text-sm">Read</span>
                <span className="text-sm font-bold">{readPercentage}%</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-[#f87171] rounded-t-md"
                  style={{ height: `${failedPercentage * 2.5}px` }}
                ></div>
                <span className="mt-2 text-sm">Failed</span>
                <span className="text-sm font-bold">{failedPercentage}%</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-[#fbbf24] rounded-t-md"
                  style={{ height: `${pendingPercentage * 2.5}px` }}
                ></div>
                <span className="mt-2 text-sm">Pending</span>
                <span className="text-sm font-bold">{pendingPercentage}%</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeliveryRateChart;

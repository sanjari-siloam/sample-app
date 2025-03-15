import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HelpCircle,
  MessageCircle,
  Clock,
  ThumbsUp,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  tooltipText: string;
  color: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  description = "Description",
  icon = <MessageCircle />,
  tooltipText = "More information about this metric",
  color = "bg-blue-100",
}: MetricCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground hover:text-primary cursor-help">
                <HelpCircle size={16} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-64">{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${color}`}>{icon}</div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EngagementMetricsProps {
  metrics?: {
    responseRate: number;
    avgResponseTime: number;
    userSatisfaction: number;
    activeUsers: number;
  };
}

const EngagementMetrics = ({
  metrics = {
    responseRate: 87,
    avgResponseTime: 3.2,
    userSatisfaction: 92,
    activeUsers: 1243,
  },
}: EngagementMetricsProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Engagement Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Response Rate"
          value={`${metrics.responseRate}%`}
          description="Messages that received a reply"
          icon={<MessageCircle size={20} />}
          tooltipText="Percentage of messages that received a response from the recipient"
          color="bg-blue-100"
        />
        <MetricCard
          title="Avg. Response Time"
          value={`${metrics.avgResponseTime} min`}
          description="Time to first response"
          icon={<Clock size={20} />}
          tooltipText="Average time taken for recipients to respond to messages"
          color="bg-green-100"
        />
        <MetricCard
          title="User Satisfaction"
          value={`${metrics.userSatisfaction}%`}
          description="Based on feedback surveys"
          icon={<ThumbsUp size={20} />}
          tooltipText="Percentage of users who rated their messaging experience positively"
          color="bg-yellow-100"
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          description="Users engaged this month"
          icon={<Users size={20} />}
          tooltipText="Number of unique users who have sent or received messages this month"
          color="bg-purple-100"
        />
      </div>
    </div>
  );
};

export default EngagementMetrics;

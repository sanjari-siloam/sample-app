import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import DeviceManagement from "./dashboard/DeviceManagement";
import WebhookConfiguration from "./dashboard/WebhookConfiguration";
import MessageCenter from "./dashboard/MessageCenter";
import AnalyticsDashboard from "./dashboard/AnalyticsDashboard";
import SettingsPanel from "./dashboard/SettingsPanel";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="devices" element={<DeviceManagement />} />
        <Route path="webhooks" element={<WebhookConfiguration />} />
        <Route path="messages" element={<MessageCenter />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="settings" element={<SettingsPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

// Dashboard overview component that shows summary cards for all main sections
const DashboardOverview = () => {
  const stats = [
    {
      title: "Active Devices",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: "smartphone",
    },
    {
      title: "Active Webhooks",
      value: "8",
      change: "0",
      changeType: "neutral",
      icon: "webhook",
    },
    {
      title: "Messages Today",
      value: "1,284",
      change: "+18%",
      changeType: "increase",
      icon: "message-square",
    },
    {
      title: "Delivery Rate",
      value: "98.2%",
      change: "+0.5%",
      changeType: "increase",
      icon: "bar-chart-3",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "device",
      action: "connected",
      name: "iPhone 13 Pro",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "message",
      action: "sent",
      name: "Bulk campaign",
      time: "25 minutes ago",
    },
    {
      id: 3,
      type: "webhook",
      action: "updated",
      name: "Order notifications",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "device",
      action: "disconnected",
      name: "Samsung Galaxy S21",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "message",
      action: "failed",
      name: "Promotional alert",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="space-y-6 bg-background">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome to your WhatsApp Gateway Admin Panel.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                {stat.icon === "smartphone" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                )}
                {stat.icon === "webhook" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
                    <path d="m6 17 3.13-5.78c.53-.97.43-2.22-.26-3.07A4 4 0 0 1 17.22 6c.68.9.95 2.08.76 3.19" />
                    <path d="m12 17 3.13-5.78c.53-.97 1.56-1.65 2.66-1.93A4 4 0 0 1 22 17" />
                  </svg>
                )}
                {stat.icon === "message-square" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                )}
                {stat.icon === "bar-chart-3" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                  </svg>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <span
                className={`text-sm ${stat.changeType === "increase" ? "text-green-500" : stat.changeType === "decrease" ? "text-red-500" : "text-gray-500"}`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">
                from last week
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors hover:bg-muted/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2 h-6 w-6"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <span className="text-sm font-medium">Add Device</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors hover:bg-muted/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2 h-6 w-6"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm font-medium">New Message</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors hover:bg-muted/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2 h-6 w-6"
                >
                  <path d="m6 17 3.13-5.78c.53-.97.43-2.22-.26-3.07A4 4 0 0 1 17.22 6c.68.9.95 2.08.76 3.19" />
                  <path d="m12 17 3.13-5.78c.53-.97 1.56-1.65 2.66-1.93A4 4 0 0 1 22 17" />
                  <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
                </svg>
                <span className="text-sm font-medium">Add Webhook</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors hover:bg-muted/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2 h-6 w-6"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z" />
                </svg>
                <span className="text-sm font-medium">Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    {activity.type === "device" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect
                          width="14"
                          height="20"
                          x="5"
                          y="2"
                          rx="2"
                          ry="2"
                        />
                        <path d="M12 18h.01" />
                      </svg>
                    )}
                    {activity.type === "message" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                    {activity.type === "webhook" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="m6 17 3.13-5.78c.53-.97.43-2.22-.26-3.07A4 4 0 0 1 17.22 6c.68.9.95 2.08.76 3.19" />
                        <path d="m12 17 3.13-5.78c.53-.97 1.56-1.65 2.66-1.93A4 4 0 0 1 22 17" />
                        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.name}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

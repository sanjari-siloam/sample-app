import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Settings, Bell, Key, Database } from "lucide-react";
import NotificationSettings from "./NotificationSettings";
import APICredentials from "./APICredentials";
import SystemParameters from "./SystemParameters";

interface SettingsPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SettingsPanel = ({
  activeTab = "notifications",
  onTabChange = () => {},
}: SettingsPanelProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your WhatsApp Gateway settings and preferences.
            </p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <div className="bg-white p-1 rounded-lg shadow-sm">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center">
                <Key className="mr-2 h-4 w-4" />
                API Credentials
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                System Parameters
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications about your
                  WhatsApp gateway.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>API Credentials</CardTitle>
                <CardDescription>
                  Manage API keys and authentication for accessing the WhatsApp
                  Gateway API.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <APICredentials />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>System Parameters</CardTitle>
                <CardDescription>
                  Configure system-wide parameters for the WhatsApp Gateway.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemParameters />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPanel;

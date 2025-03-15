import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Bell, Mail, MessageSquare, AlertTriangle } from "lucide-react";

interface NotificationSettingsProps {
  emailNotifications?: boolean;
  inAppNotifications?: boolean;
  messageAlerts?: boolean;
  errorAlerts?: boolean;
  messageThreshold?: number;
  errorThreshold?: number;
  onSave?: () => void;
}

const NotificationSettings = ({
  emailNotifications = true,
  inAppNotifications = true,
  messageAlerts = true,
  errorAlerts = true,
  messageThreshold = 50,
  errorThreshold = 10,
  onSave = () => console.log("Settings saved"),
}: NotificationSettingsProps) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Configure how and when you receive notifications about your WhatsApp
          gateway.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Channels</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Switch id="email-notifications" checked={emailNotifications} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">In-App Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive notifications in the dashboard
                  </p>
                </div>
              </div>
              <Switch id="in-app-notifications" checked={inAppNotifications} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Alert Types</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Message Alerts</p>
                  <p className="text-sm text-gray-500">
                    Alerts for new messages and responses
                  </p>
                </div>
              </div>
              <Switch id="message-alerts" checked={messageAlerts} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Error Alerts</p>
                  <p className="text-sm text-gray-500">
                    Alerts for system errors and failures
                  </p>
                </div>
              </div>
              <Switch id="error-alerts" checked={errorAlerts} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Alert Thresholds</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="message-threshold">
                  Message Volume Threshold
                </Label>
                <span className="text-sm font-medium">{messageThreshold}%</span>
              </div>
              <Slider
                id="message-threshold"
                defaultValue={[messageThreshold]}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Get notified when message volume exceeds {messageThreshold}% of
                your daily average
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="error-threshold">Error Rate Threshold</Label>
                <span className="text-sm font-medium">{errorThreshold}%</span>
              </div>
              <Slider
                id="error-threshold"
                defaultValue={[errorThreshold]}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Get notified when error rate exceeds {errorThreshold}% of total
                messages
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;

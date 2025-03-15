import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import WebhookList from "./WebhookList";
import WebhookForm from "./WebhookForm";

interface Webhook {
  id: string;
  url: string;
  description?: string;
  events: string[];
  eventTypes: string[];
  status: "active" | "inactive" | "error";
  lastTriggered: string | null;
}

const WebhookConfiguration = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "1",
      url: "https://example.com/webhook1",
      description: "Production webhook for customer messages",
      events: ["message.received", "message.status.updated"],
      eventTypes: ["message.received", "message.status.updated"],
      status: "active",
      lastTriggered: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      url: "https://api.myapp.com/whatsapp/events",
      description: "Development webhook for testing",
      events: ["message.received", "device.status.changed"],
      eventTypes: ["message.received", "device.status.changed"],
      status: "active",
      lastTriggered: "2023-06-14T18:45:00Z",
    },
    {
      id: "3",
      url: "https://webhook.site/123456789",
      description: "Temporary webhook for debugging",
      events: ["message.received"],
      eventTypes: ["message.received"],
      status: "error",
      lastTriggered: "2023-06-10T09:15:00Z",
    },
  ]);
  const [currentWebhook, setCurrentWebhook] = useState<Webhook | undefined>(
    undefined,
  );

  const handleAddWebhook = () => {
    setCurrentWebhook(undefined);
    setActiveTab("form");
  };

  const handleEditWebhook = (webhook: Webhook) => {
    setCurrentWebhook(webhook);
    setActiveTab("form");
  };

  const handleDeleteWebhook = (webhookId: string) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== webhookId));
  };

  const handleSubmitWebhook = (data: any) => {
    if (currentWebhook) {
      // Update existing webhook
      setWebhooks(
        webhooks.map((webhook) =>
          webhook.id === currentWebhook.id
            ? {
                ...webhook,
                url: data.url,
                description: data.description,
                events: data.eventTypes,
                eventTypes: data.eventTypes,
                status: "active", // Reset status on update
              }
            : webhook,
        ),
      );
    } else {
      // Add new webhook
      const newWebhook: Webhook = {
        id: `webhook-${Date.now()}`,
        url: data.url,
        description: data.description,
        events: data.eventTypes,
        eventTypes: data.eventTypes,
        status: "active",
        lastTriggered: null,
      };
      setWebhooks([...webhooks, newWebhook]);
    }
    setActiveTab("list");
  };

  const handleCancelForm = () => {
    setCurrentWebhook(undefined);
    setActiveTab("list");
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <Card className="w-full bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Webhook Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="list">Webhook List</TabsTrigger>
              <TabsTrigger value="form">
                {currentWebhook ? "Edit Webhook" : "Add Webhook"}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-6">
              <WebhookList
                webhooks={webhooks}
                onEdit={handleEditWebhook}
                onDelete={handleDeleteWebhook}
                onAdd={handleAddWebhook}
              />
            </TabsContent>
            <TabsContent value="form">
              <WebhookForm
                webhook={currentWebhook}
                onSubmit={handleSubmitWebhook}
                onCancel={handleCancelForm}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookConfiguration;

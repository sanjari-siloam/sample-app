import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const webhookSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().optional(),
  eventTypes: z
    .array(z.string())
    .min(1, { message: "Select at least one event type" }),
});

type WebhookFormValues = z.infer<typeof webhookSchema>;

interface WebhookFormProps {
  webhook?: {
    id: string;
    url: string;
    description?: string;
    eventTypes: string[];
  };
  onSubmit: (data: WebhookFormValues) => void;
  onCancel: () => void;
}

const WebhookForm = ({
  webhook,
  onSubmit,
  onCancel = () => {},
}: WebhookFormProps) => {
  const [testStatus, setTestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [testMessage, setTestMessage] = useState("");

  const defaultValues: Partial<WebhookFormValues> = {
    url: webhook?.url || "",
    description: webhook?.description || "",
    eventTypes: webhook?.eventTypes || [],
  };

  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookSchema),
    defaultValues,
  });

  const eventTypeOptions = [
    { id: "message.received", label: "Message Received" },
    { id: "message.sent", label: "Message Sent" },
    { id: "message.delivered", label: "Message Delivered" },
    { id: "message.read", label: "Message Read" },
    { id: "message.failed", label: "Message Failed" },
    { id: "status.change", label: "Status Change" },
    { id: "device.connected", label: "Device Connected" },
    { id: "device.disconnected", label: "Device Disconnected" },
  ];

  const handleTestWebhook = async () => {
    const url = form.getValues("url");
    if (!url) {
      form.setError("url", { message: "URL is required for testing" });
      return;
    }

    setTestStatus("loading");
    setTestMessage("");

    // Simulate webhook testing
    setTimeout(() => {
      // Randomly succeed or fail for demonstration
      const success = Math.random() > 0.3;
      if (success) {
        setTestStatus("success");
        setTestMessage(
          "Webhook test successful! The endpoint responded with 200 OK.",
        );
      } else {
        setTestStatus("error");
        setTestMessage(
          "Webhook test failed. The endpoint could not be reached or returned an error.",
        );
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>{webhook ? "Edit Webhook" : "Add New Webhook"}</CardTitle>
        <CardDescription>
          Configure a webhook to receive real-time notifications for WhatsApp
          events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-server.com/webhook"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The URL that will receive webhook events via HTTP POST
                    requests.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., Production webhook for customer messages"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A description to help you identify this webhook.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Event Types</FormLabel>
              <FormDescription>
                Select which events should trigger this webhook.
              </FormDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {eventTypeOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="eventTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), option.id]
                                  : field.value?.filter(
                                      (value) => value !== option.id,
                                    ) || [];
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              {option.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Test Webhook</h3>
                  <p className="text-sm text-gray-500">
                    Send a test event to verify your webhook configuration.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestWebhook}
                  disabled={testStatus === "loading"}
                >
                  {testStatus === "loading" ? "Testing..." : "Test Webhook"}
                </Button>
              </div>

              {testStatus === "success" && (
                <Alert
                  variant="default"
                  className="bg-green-50 border-green-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {testMessage}
                  </AlertDescription>
                </Alert>
              )}

              {testStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{testMessage}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {webhook ? "Update Webhook" : "Create Webhook"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WebhookForm;

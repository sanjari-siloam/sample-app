import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Slider } from "../ui/slider";

const formSchema = z.object({
  messageRetention: z.number().min(1).max(365),
  rateLimit: z.number().min(1).max(1000),
  defaultTemplate: z.string(),
  autoReplyEnabled: z.boolean(),
  mediaStoragePath: z.string(),
  logLevel: z.string(),
  backupFrequency: z.string(),
  maxFileSize: z.number().min(1).max(100),
});

type SystemParametersFormValues = z.infer<typeof formSchema>;

interface SystemParametersProps {
  initialValues?: SystemParametersFormValues;
  onSubmit?: (values: SystemParametersFormValues) => void;
}

const SystemParameters = ({
  initialValues = {
    messageRetention: 30,
    rateLimit: 100,
    defaultTemplate: "welcome",
    autoReplyEnabled: true,
    mediaStoragePath: "/storage/media",
    logLevel: "info",
    backupFrequency: "daily",
    maxFileSize: 10,
  },
  onSubmit = (values) => console.log("Form submitted:", values),
}: SystemParametersProps) => {
  const form = useForm<SystemParametersFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = (values: SystemParametersFormValues) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>System Parameters</CardTitle>
        <CardDescription>
          Configure system-wide parameters for the WhatsApp Gateway
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="messageRetention"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Retention Period (days)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={365}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            1 day
                          </span>
                          <span className="text-xs font-medium">
                            {field.value} days
                          </span>
                          <span className="text-xs text-muted-foreground">
                            365 days
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How long to keep message history before automatic deletion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rateLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Rate Limit (requests/minute)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={1000}
                          step={10}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            1
                          </span>
                          <span className="text-xs font-medium">
                            {field.value}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            1000
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Maximum number of API requests allowed per minute
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="defaultTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Message Template</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome Message</SelectItem>
                        <SelectItem value="support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="notification">
                          Notification
                        </SelectItem>
                        <SelectItem value="confirmation">
                          Confirmation
                        </SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Default template to use when creating new messages
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoReplyEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Reply</FormLabel>
                      <FormDescription>
                        Enable automatic replies to incoming messages
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mediaStoragePath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Storage Path</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      File system path where media attachments will be stored
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Log Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="trace">Trace</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Verbosity level for system logs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backupFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backup Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select backup frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often to automatically backup system data
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxFileSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum File Size (MB)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            1 MB
                          </span>
                          <span className="text-xs font-medium">
                            {field.value} MB
                          </span>
                          <span className="text-xs text-muted-foreground">
                            100 MB
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Maximum allowed size for media file uploads
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SystemParameters;

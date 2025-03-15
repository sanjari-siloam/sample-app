import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import {
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: "active" | "inactive" | "error";
  lastTriggered: string | null;
}

interface WebhookListProps {
  webhooks?: Webhook[];
  onEdit?: (webhook: Webhook) => void;
  onDelete?: (webhookId: string) => void;
  onAdd?: () => void;
}

const WebhookList = ({
  webhooks = [
    {
      id: "1",
      url: "https://example.com/webhook1",
      events: ["message.received", "message.status.updated"],
      status: "active",
      lastTriggered: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      url: "https://api.myapp.com/whatsapp/events",
      events: ["message.received", "device.status.changed"],
      status: "active",
      lastTriggered: "2023-06-14T18:45:00Z",
    },
    {
      id: "3",
      url: "https://webhook.site/123456789",
      events: ["message.received"],
      status: "error",
      lastTriggered: "2023-06-10T09:15:00Z",
    },
    {
      id: "4",
      url: "https://mycompany.io/webhooks/whatsapp",
      events: ["device.paired", "device.unpaired", "message.received"],
      status: "inactive",
      lastTriggered: null,
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onAdd = () => {},
}: WebhookListProps) => {
  const [webhookToDelete, setWebhookToDelete] = useState<Webhook | null>(null);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500">
            Inactive
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Configured Webhooks</CardTitle>
        <Button onClick={onAdd} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Webhook
        </Button>
      </CardHeader>
      <CardContent>
        {webhooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No webhooks configured</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              Add a webhook to receive real-time notifications for WhatsApp
              events.
            </p>
            <Button onClick={onAdd} variant="outline" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Configure your first webhook
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <span className="truncate">{webhook.url}</span>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{webhook.url}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.map((event) => (
                          <Badge
                            key={event}
                            variant="outline"
                            className="text-xs"
                          >
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                    <TableCell>{formatDate(webhook.lastTriggered)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(webhook)}
                          aria-label="Edit webhook"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              aria-label="Delete webhook"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Webhook
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this webhook?
                                This action cannot be undone.
                                <div className="mt-4 p-3 bg-gray-100 rounded-md">
                                  <p className="font-mono text-sm truncate">
                                    {webhook.url}
                                  </p>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => onDelete(webhook.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookList;

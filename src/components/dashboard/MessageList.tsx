import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Message {
  id: string;
  sender: string;
  recipient: string;
  preview: string;
  status: "delivered" | "read" | "failed" | "pending";
  timestamp: string;
  type: "text" | "image" | "video" | "document" | "template";
}

interface MessageListProps {
  messages?: Message[];
  onViewThread?: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onResendMessage?: (messageId: string) => void;
}

const MessageList = ({
  messages = [
    {
      id: "1",
      sender: "+1234567890",
      recipient: "+9876543210",
      preview: "Hello, how can I help you today?",
      status: "delivered",
      timestamp: "2023-06-15T14:30:00Z",
      type: "text",
    },
    {
      id: "2",
      sender: "+9876543210",
      recipient: "+1234567890",
      preview: "I need information about your services",
      status: "read",
      timestamp: "2023-06-15T14:32:00Z",
      type: "text",
    },
    {
      id: "3",
      sender: "+1234567890",
      recipient: "+9876543210",
      preview: "Here is our product catalog",
      status: "delivered",
      timestamp: "2023-06-15T14:35:00Z",
      type: "document",
    },
    {
      id: "4",
      sender: "+1234567890",
      recipient: "+5555555555",
      preview: "Your appointment is confirmed",
      status: "failed",
      timestamp: "2023-06-15T15:00:00Z",
      type: "template",
    },
    {
      id: "5",
      sender: "+7777777777",
      recipient: "+1234567890",
      preview: "Check out our new product",
      status: "pending",
      timestamp: "2023-06-15T15:15:00Z",
      type: "image",
    },
  ],
  onViewThread = (id) => console.log(`View thread for message ${id}`),
  onDeleteMessage = (id) => console.log(`Delete message ${id}`),
  onResendMessage = (id) => console.log(`Resend message ${id}`),
}: MessageListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Message>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Message) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredMessages = messages
    .filter((message) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        message.sender.toLowerCase().includes(searchLower) ||
        message.recipient.toLowerCase().includes(searchLower) ||
        message.preview.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus =
        statusFilter === "all" || message.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === "all" || message.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortField === "timestamp") {
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

  const getStatusBadgeColor = (status: Message["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMessageTypeIcon = (type: Message["type"]) => {
    switch (type) {
      case "text":
        return "Text";
      case "image":
        return "Image";
      case "video":
        return "Video";
      case "document":
        return "Doc";
      case "template":
        return "Template";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Message Logs</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="template">Template</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("sender")}
                >
                  <div className="flex items-center">
                    Sender
                    {sortField === "sender" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("recipient")}
                >
                  <div className="flex items-center">
                    Recipient
                    {sortField === "recipient" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Message</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    Type
                    {sortField === "type" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("timestamp")}
                >
                  <div className="flex items-center">
                    Time
                    {sortField === "timestamp" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-500"
                  >
                    No messages found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow
                    key={message.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewThread(message.id)}
                  >
                    <TableCell className="font-medium">
                      {message.sender}
                    </TableCell>
                    <TableCell>{message.recipient}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {message.preview}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getMessageTypeIcon(message.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(message.status)}>
                        {message.status.charAt(0).toUpperCase() +
                          message.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(message.timestamp)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewThread(message.id);
                            }}
                          >
                            View Thread
                          </DropdownMenuItem>
                          {message.status === "failed" && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onResendMessage(message.id);
                              }}
                            >
                              Resend
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteMessage(message.id);
                            }}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageList;

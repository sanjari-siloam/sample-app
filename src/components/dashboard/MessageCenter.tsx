import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle, MessageSquare, List, Users } from "lucide-react";
import MessageList from "./MessageList";
import ConversationThread from "./ConversationThread";
import MessageComposer from "./MessageComposer";

interface MessageCenterProps {
  activeView?: "list" | "conversation" | "compose";
  selectedMessageId?: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({
  activeView = "list",
  selectedMessageId = "",
}) => {
  const [view, setView] = useState<"list" | "conversation" | "compose">(
    activeView,
  );
  const [currentMessageId, setCurrentMessageId] =
    useState<string>(selectedMessageId);

  // Handler for viewing a conversation thread
  const handleViewThread = (messageId: string) => {
    setCurrentMessageId(messageId);
    setView("conversation");
  };

  // Handler for deleting a message
  const handleDeleteMessage = (messageId: string) => {
    console.log(`Delete message ${messageId}`);
    // In a real implementation, this would call an API to delete the message
    // and then refresh the message list
  };

  // Handler for resending a failed message
  const handleResendMessage = (messageId: string) => {
    console.log(`Resend message ${messageId}`);
    // In a real implementation, this would call an API to resend the message
  };

  // Handler for sending a new message
  const handleSendMessage = (message: {
    text: string;
    attachments: File[];
    recipients: { id: string; name: string; phone: string; avatar?: string }[];
    template?: {
      id: string;
      name: string;
      content: string;
      variables: string[];
    };
    templateVariables?: Record<string, string>;
  }) => {
    console.log("Sending message:", message);
    // In a real implementation, this would call an API to send the message
    // and then navigate back to the message list or show a success notification
    setView("list");
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Message Center</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className="flex items-center gap-1"
          >
            <List className="h-4 w-4" />
            Messages
          </Button>
          {view === "conversation" && (
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              Conversation
            </Button>
          )}
          <Button
            variant={view === "compose" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("compose")}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      {view === "list" && (
        <MessageList
          onViewThread={handleViewThread}
          onDeleteMessage={handleDeleteMessage}
          onResendMessage={handleResendMessage}
        />
      )}

      {view === "conversation" && (
        <div className="flex justify-center">
          <ConversationThread />
        </div>
      )}

      {view === "compose" && (
        <div className="flex justify-center">
          <MessageComposer onSend={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default MessageCenter;

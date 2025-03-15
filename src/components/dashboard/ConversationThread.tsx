import React from "react";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip, Send, Smile } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isSystem: boolean;
  };
  timestamp: Date;
  status: "sent" | "delivered" | "read" | "failed";
}

interface ConversationThreadProps {
  contactName?: string;
  contactPhone?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({
  contactName = "John Doe",
  contactPhone = "+1 (555) 123-4567",
  messages = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: {
        id: "system",
        name: "WhatsApp Gateway",
        isSystem: true,
      },
      timestamp: new Date(Date.now() - 3600000 * 2),
      status: "read",
    },
    {
      id: "2",
      content: "I'm having trouble connecting my device to the system.",
      sender: {
        id: "user1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        isSystem: false,
      },
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
    },
    {
      id: "3",
      content:
        "Could you please try scanning the QR code again? Make sure your phone camera is focused properly.",
      sender: {
        id: "system",
        name: "WhatsApp Gateway",
        isSystem: true,
      },
      timestamp: new Date(Date.now() - 1800000),
      status: "delivered",
    },
    {
      id: "4",
      content: "I'll try that now. Thanks for the quick response!",
      sender: {
        id: "user1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        isSystem: false,
      },
      timestamp: new Date(Date.now() - 900000),
      status: "read",
    },
  ],
  onSendMessage = (message) => console.log("Message sent:", message),
}) => {
  const [newMessage, setNewMessage] = React.useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-[800px] bg-white">
      {/* Conversation Header */}
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contactName}`}
            alt={contactName}
          />
        </Avatar>
        <div>
          <h3 className="font-medium">{contactName}</h3>
          <p className="text-sm text-gray-500">{contactPhone}</p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.isSystem ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender.isSystem ? "bg-gray-100" : "bg-blue-500 text-white"}`}
              >
                <div className="flex flex-col">
                  <p>{message.content}</p>
                  <span className="text-xs mt-1 opacity-70 text-right">
                    {formatTime(message.timestamp)}
                    {!message.sender.isSystem && (
                      <span className="ml-1">
                        {message.status === "sent" && "✓"}
                        {message.status === "delivered" && "✓✓"}
                        {message.status === "read" && "✓✓"}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-3 flex items-center">
        <Button variant="ghost" size="icon" className="mr-1">
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 mx-2"
        />
        <Button variant="ghost" size="icon" className="mr-1">
          <Smile className="h-5 w-5 text-gray-500" />
        </Button>
        <Button
          onClick={handleSendMessage}
          size="icon"
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Send className="h-4 w-4 text-white" />
        </Button>
      </div>
    </Card>
  );
};

export default ConversationThread;

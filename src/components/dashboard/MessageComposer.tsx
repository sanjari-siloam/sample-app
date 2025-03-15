import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Paperclip,
  Image,
  FileText,
  Send,
  X,
  Plus,
  MessageSquare,
} from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
}

interface MessageComposerProps {
  recipients?: Recipient[];
  templates?: Template[];
  onSend?: (message: {
    text: string;
    attachments: File[];
    recipients: Recipient[];
    template?: Template;
    templateVariables?: Record<string, string>;
  }) => void;
}

const MessageComposer = ({
  recipients = [
    {
      id: "1",
      name: "John Doe",
      phone: "+1234567890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+0987654321",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "3",
      name: "Bob Johnson",
      phone: "+1122334455",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    },
  ],
  templates = [
    {
      id: "1",
      name: "Welcome Message",
      content: "Hello {{name}}, welcome to our service!",
      variables: ["name"],
    },
    {
      id: "2",
      name: "Order Confirmation",
      content:
        "Your order #{{order_id}} has been confirmed. Total: ${{amount}}",
      variables: ["order_id", "amount"],
    },
    {
      id: "3",
      name: "Appointment Reminder",
      content: "Reminder: You have an appointment on {{date}} at {{time}}.",
      variables: ["date", "time"],
    },
  ],
  onSend = () => {},
}: MessageComposerProps) => {
  const [messageText, setMessageText] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [templateVariables, setTemplateVariables] = useState<
    Record<string, string>
  >({});
  const [activeTab, setActiveTab] = useState("text");

  const handleAddRecipient = (recipient: Recipient) => {
    if (!selectedRecipients.find((r) => r.id === recipient.id)) {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  const handleRemoveRecipient = (id: string) => {
    setSelectedRecipients(selectedRecipients.filter((r) => r.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId) || null;
    setSelectedTemplate(template);

    // Initialize template variables
    if (template) {
      const initialVariables: Record<string, string> = {};
      template.variables.forEach((variable) => {
        initialVariables[variable] = "";
      });
      setTemplateVariables(initialVariables);
    } else {
      setTemplateVariables({});
    }
  };

  const handleTemplateVariableChange = (variable: string, value: string) => {
    setTemplateVariables({
      ...templateVariables,
      [variable]: value,
    });
  };

  const handleSend = () => {
    onSend({
      text: messageText,
      attachments,
      recipients: selectedRecipients,
      template: selectedTemplate || undefined,
      templateVariables:
        Object.keys(templateVariables).length > 0
          ? templateVariables
          : undefined,
    });

    // Reset form
    setMessageText("");
    setAttachments([]);
    setSelectedRecipients([]);
    setSelectedTemplate(null);
    setTemplateVariables({});
  };

  const previewTemplateMessage = () => {
    if (!selectedTemplate) return "";

    let preview = selectedTemplate.content;
    Object.entries(templateVariables).forEach(([key, value]) => {
      preview = preview.replace(`{{${key}}}`, value || `{{${key}}}`);
    });

    return preview;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Compose Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Recipients Selection */}
          <div className="space-y-2">
            <Label>Recipients</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedRecipients.map((recipient) => (
                <Badge
                  key={recipient.id}
                  variant="secondary"
                  className="flex items-center gap-1 py-1 pl-1"
                >
                  <Avatar className="h-5 w-5">
                    <img src={recipient.avatar} alt={recipient.name} />
                  </Avatar>
                  <span>{recipient.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleRemoveRecipient(recipient.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Select
              onValueChange={(value) => {
                const recipient = recipients.find((r) => r.id === value);
                if (recipient) handleAddRecipient(recipient);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add recipient" />
              </SelectTrigger>
              <SelectContent>
                {recipients
                  .filter(
                    (r) => !selectedRecipients.find((sr) => sr.id === r.id),
                  )
                  .map((recipient) => (
                    <SelectItem key={recipient.id} value={recipient.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <img src={recipient.avatar} alt={recipient.name} />
                        </Avatar>
                        <span>
                          {recipient.name} ({recipient.phone})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message Composition */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Message</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 pt-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-32"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template">Select Template</Label>
                  <Select onValueChange={handleTemplateChange}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate && (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-gray-50">
                      <Label className="block mb-2">Template Preview</Label>
                      <p className="whitespace-pre-wrap">
                        {previewTemplateMessage()}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label className="block">Template Variables</Label>
                      {selectedTemplate.variables.map((variable) => (
                        <div key={variable} className="space-y-1">
                          <Label
                            htmlFor={`var-${variable}`}
                            className="text-sm font-normal"
                          >
                            {variable.replace("_", " ")}
                          </Label>
                          <Input
                            id={`var-${variable}`}
                            value={templateVariables[variable] || ""}
                            onChange={(e) =>
                              handleTemplateVariableChange(
                                variable,
                                e.target.value,
                              )
                            }
                            placeholder={`Enter ${variable.replace("_", " ")}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {attachments.map((file, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1 py-1"
                >
                  {file.type.startsWith("image/") ? (
                    <Image className="h-3 w-3" />
                  ) : (
                    <FileText className="h-3 w-3" />
                  )}
                  <span className="text-xs">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                asChild
              >
                <label>
                  <Paperclip className="h-4 w-4" />
                  <span>Add Attachment</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          {selectedRecipients.length} recipient
          {selectedRecipients.length !== 1 ? "s" : ""} selected
        </div>
        <Button
          onClick={handleSend}
          disabled={
            selectedRecipients.length === 0 ||
            (activeTab === "text" && !messageText) ||
            (activeTab === "template" && !selectedTemplate)
          }
          className="flex items-center gap-1"
        >
          <Send className="h-4 w-4" />
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageComposer;

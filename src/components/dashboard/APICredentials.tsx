import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertCircle,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface APICredential {
  id: string;
  name: string;
  key: string;
  secret?: string;
  created: string;
  lastUsed: string;
  permissions: string[];
  active: boolean;
}

interface APICredentialsProps {
  credentials?: APICredential[];
  onCreateCredential?: () => void;
  onRevokeCredential?: (id: string) => void;
  onRegenerateCredential?: (id: string) => void;
  onToggleCredentialStatus?: (id: string, active: boolean) => void;
}

const APICredentials = ({
  credentials = [
    {
      id: "cred-1",
      name: "Production API Key",
      key: "wha_prod_a1b2c3d4e5f6g7h8i9j0",
      secret: "sk_prod_1a2b3c4d5e6f7g8h9i0j",
      created: "2023-05-15T10:30:00Z",
      lastUsed: "2023-06-20T14:45:00Z",
      permissions: [
        "read:messages",
        "write:messages",
        "read:devices",
        "write:devices",
      ],
      active: true,
    },
    {
      id: "cred-2",
      name: "Development API Key",
      key: "wha_dev_z9y8x7w6v5u4t3s2r1q0",
      secret: "sk_dev_0z9y8x7w6v5u4t3s2r1q",
      created: "2023-06-01T09:15:00Z",
      lastUsed: "2023-06-19T11:20:00Z",
      permissions: ["read:messages", "write:messages", "read:devices"],
      active: true,
    },
    {
      id: "cred-3",
      name: "Testing API Key",
      key: "wha_test_k1l2m3n4o5p6q7r8s9t0",
      secret: "sk_test_1k2l3m4n5o6p7q8r9s0t",
      created: "2023-06-10T16:45:00Z",
      lastUsed: "2023-06-15T08:30:00Z",
      permissions: ["read:messages", "read:devices"],
      active: false,
    },
  ],
  onCreateCredential = () => console.log("Create credential"),
  onRevokeCredential = (id) => console.log("Revoke credential", id),
  onRegenerateCredential = (id) => console.log("Regenerate credential", id),
  onToggleCredentialStatus = (id, active) =>
    console.log("Toggle credential status", id, active),
}: APICredentialsProps) => {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("existing");

  const toggleSecretVisibility = (id: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast notification here
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <Tabs
        defaultValue="existing"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">API Credentials</h2>
          <TabsList>
            <TabsTrigger value="existing">Existing Keys</TabsTrigger>
            <TabsTrigger value="create">Create New Key</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="existing">
          {credentials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No API credentials found</p>
              <Button onClick={() => setActiveTab("create")}>
                Create Your First API Key
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Alert variant="warning" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Security Notice</AlertTitle>
                <AlertDescription>
                  API keys provide full access to your WhatsApp Gateway. Never
                  share your secret keys and store them securely.
                </AlertDescription>
              </Alert>

              {credentials.map((credential) => (
                <Card
                  key={credential.id}
                  className={`border ${!credential.active ? "border-gray-200 bg-gray-50" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {credential.name}
                        </CardTitle>
                        <CardDescription>
                          Created on{" "}
                          {new Date(credential.created).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor={`status-${credential.id}`}
                          className="mr-2"
                        >
                          Active
                        </Label>
                        <Switch
                          id={`status-${credential.id}`}
                          checked={credential.active}
                          onCheckedChange={(checked) =>
                            onToggleCredentialStatus(credential.id, checked)
                          }
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor={`key-${credential.id}`}
                          className="text-sm font-medium mb-1 block"
                        >
                          API Key
                        </Label>
                        <div className="flex">
                          <Input
                            id={`key-${credential.id}`}
                            value={credential.key}
                            readOnly
                            className="font-mono text-sm flex-grow rounded-r-none"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-l-none border-l-0"
                                  onClick={() =>
                                    copyToClipboard(credential.key)
                                  }
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy API Key</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {credential.secret && (
                        <div>
                          <Label
                            htmlFor={`secret-${credential.id}`}
                            className="text-sm font-medium mb-1 block"
                          >
                            API Secret
                          </Label>
                          <div className="flex">
                            <Input
                              id={`secret-${credential.id}`}
                              type={
                                showSecrets[credential.id] ? "text" : "password"
                              }
                              value={credential.secret}
                              readOnly
                              className="font-mono text-sm flex-grow rounded-r-none"
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-none border-l-0 border-r-0"
                                    onClick={() =>
                                      toggleSecretVisibility(credential.id)
                                    }
                                  >
                                    {showSecrets[credential.id] ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {showSecrets[credential.id]
                                      ? "Hide"
                                      : "Show"}{" "}
                                    Secret
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-l-none"
                                    onClick={() =>
                                      copyToClipboard(credential.secret)
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copy API Secret</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Permissions:</span>{" "}
                          {credential.permissions.join(", ")}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Last used:</span>{" "}
                          {new Date(credential.lastUsed).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 pt-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              onRegenerateCredential(credential.id)
                            }
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Regenerate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate a new key and secret</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRevokeCredential(credential.id)}
                    >
                      Revoke
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>
                Generate a new API key for accessing the WhatsApp Gateway API.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input id="key-name" placeholder="e.g., Production API Key" />
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: "read-messages", label: "Read Messages" },
                    { id: "write-messages", label: "Send Messages" },
                    { id: "read-devices", label: "View Devices" },
                    { id: "write-devices", label: "Manage Devices" },
                    { id: "read-webhooks", label: "View Webhooks" },
                    { id: "write-webhooks", label: "Manage Webhooks" },
                    { id: "read-analytics", label: "View Analytics" },
                    { id: "admin", label: "Admin Access" },
                  ].map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2"
                    >
                      <Switch id={permission.id} />
                      <Label htmlFor={permission.id}>{permission.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Security Notice</AlertTitle>
                  <AlertDescription>
                    Your API secret will only be shown once upon creation. Make
                    sure to store it securely.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setActiveTab("existing")}
              >
                Cancel
              </Button>
              <Button onClick={onCreateCredential}>Create API Key</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APICredentials;

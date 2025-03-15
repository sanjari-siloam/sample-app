import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Smartphone,
  Webhook,
  MessageSquare,
  BarChart3,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/devices", label: "Device Management", icon: Smartphone },
    { path: "/webhooks", label: "Webhook Configuration", icon: Webhook },
    { path: "/messages", label: "Message Center", icon: MessageSquare },
    { path: "/analytics", label: "Analytics Dashboard", icon: BarChart3 },
    { path: "/settings", label: "Settings Panel", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "h-full bg-background border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-[280px]",
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && <h2 className="text-xl font-bold">WhatsApp Gateway</h2>}
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold">WG</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            collapsed ? "mx-auto" : "mr-3",
                          )}
                        />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto p-4 border-t border-border">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center rounded-md px-3 py-2 text-sm font-medium w-full hover:bg-muted transition-colors">
                <LogOut
                  className={cn(
                    "h-5 w-5 text-red-500",
                    collapsed ? "mx-auto" : "mr-3",
                  )}
                />
                {!collapsed && <span>Logout</span>}
              </button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;

"use client";

import {
  Bell,
  File,
  FileText,
  Flag,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavContent = () => {
  const pathname = usePathname();

  const isPathActive = (itemPath: string, exact: boolean = false) => {
    if (exact) {
      return pathname === itemPath;
    }

    if (itemPath !== "/" && pathname.startsWith(itemPath + "/")) {
      return true;
    }

    return pathname === itemPath;
  };

  const hasActiveChild = (items: { url: string }[] | undefined) => {
    if (!items) return false;
    return items.some((subItem) => isPathActive(subItem.url));
  };

  const navItems = [
    {
      title: "用户管理",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "用户列表",
          url: "/users/list",
        },
        {
          title: "用户详细",
          url: "/users/detail",
        },
      ],
    },
    {
      title: "公告管理",
      url: "/announcements",
      icon: Megaphone,
      items: [
        {
          title: "公告列表",
          url: "/announcements/list",
        },
        {
          title: "公告详细",
          url: "/announcements/detail",
        },
      ],
    },
    {
      title: "群聊管理",
      url: "#",
      icon: MessageCircle,
      items: [
        {
          title: "群聊列表",
          url: "/group/list",
        },
      ],
    },
    {
      title: "聊天管理",
      url: "/chat",
      icon: MessageSquare,
    },
    {
      title: "帖子管理",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "帖子处理",
          url: "/post/manage",
        },
        {
          title: "举报处理",
          url: "/post/report",
        },
      ],
    },
    {
      title: "文件管理",
      url: "/file",
      icon: File,
    },
    {
      title: "通知管理",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "系统通知",
          url: "/notification/system",
        },
        {
          title: "用户通知",
          url: "/notification/user",
        },
      ],
    },
    {
      title: "举报反馈",
      url: "/report",
      icon: Flag,
    },
    {
      title: "违规管理",
      url: "/violation",
      icon: Shield,
    },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>导航菜单</SidebarGroupLabel>
        <SidebarMenu>
          {navItems.map((item) =>
            item.items ? (
              <Collapsible
                key={item.title}
                asChild
                className="group/collapsible"
                defaultOpen={hasActiveChild(item.items)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        isPathActive(item.url, true) &&
                          !hasActiveChild(item.items)
                          ? "bg-accent text-accent-foreground"
                          : ""
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              isPathActive(subItem.url)
                                ? "bg-accent text-accent-foreground"
                                : ""
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    isPathActive(item.url)
                      ? "bg-accent text-accent-foreground"
                      : ""
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

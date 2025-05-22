"use client";

import {
  AlertTriangle,
  Bell,
  ChevronRight,
  Flag,
  FolderOpen,
  Megaphone,
  MessageSquare,
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
        {
          title: "用户违规",
          url: "/users/violations",
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
      title: "违规管理",
      url: "/violations",
      icon: AlertTriangle,
      items: [
        {
          title: "违规列表",
          url: "/violations/list",
        },
        {
          title: "违规详细",
          url: "/violations/detail",
        },
      ],
    },
    {
      title: "帖子管理",
      url: "/posts",
      icon: MessageSquare,
      items: [
        {
          title: "帖子列表",
          url: "/posts/list",
        },
        {
          title: "帖子详细",
          url: "/posts/detail",
        },
      ],
    },
    {
      title: "文件管理",
      url: "/files",
      icon: FolderOpen,
    },
    {
      title: "举报管理",
      url: "/reports",
      icon: Flag,
    },
    {
      title: "发送通知",
      url: "/notifications",
      icon: Bell,
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

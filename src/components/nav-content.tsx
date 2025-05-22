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
import { ChevronRight } from "lucide-react";

export const NavContent = () => {
  const navItems = [
    {
      title: "用户管理",
      url: "#",
      icon: Users,
      items: [
        {
          title: "用户列表",
          url: "/users",
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
      title: "公告管理",
      url: "/announcement",
      icon: Megaphone,
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
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

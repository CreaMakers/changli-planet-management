"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Bell,
  Flag,
  FolderOpen,
  Megaphone,
  MessageSquare,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const navigationItems = [
    {
      title: "用户管理",
      description: "管理系统用户信息和权限",
      icon: Users,
      path: "/users",
      color: "text-blue-600",
    },
    {
      title: "公告管理",
      description: "发布和管理系统公告",
      icon: Megaphone,
      path: "/announcements",
      color: "text-green-600",
    },
    {
      title: "违规管理",
      description: "处理用户违规行为",
      icon: AlertTriangle,
      path: "/violations",
      color: "text-red-600",
    },
    {
      title: "帖子管理",
      description: "管理用户发布的帖子内容",
      icon: MessageSquare,
      path: "/posts",
      color: "text-purple-600",
    },
    {
      title: "文件管理",
      description: "管理系统文件和资源",
      icon: FolderOpen,
      path: "/files",
      color: "text-orange-600",
    },
    {
      title: "举报管理",
      description: "处理用户举报和投诉",
      icon: Flag,
      path: "/reports",
      color: "text-yellow-600",
    },
    {
      title: "发送通知",
      description: "向用户发送系统通知",
      icon: Bell,
      path: "/notifications",
      color: "text-indigo-600",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">管理控制台</h1>
        <p className="text-gray-600">选择需要管理的模块</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <Card
            key={item.title}
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleNavigate(item.path)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">
                {item.description}
              </CardDescription>
              <Button
                variant="outline"
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
              >
                进入管理
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

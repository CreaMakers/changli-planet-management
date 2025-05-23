"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const breadcrumbConfig: Record<string, string> = {
  // 根路径
  "": "仪表板",

  // 用户管理
  users: "用户管理",
  "users/list": "用户列表",
  "users/detail": "用户详情",
  "users/violations": "用户违规",

  // 公告管理
  announcements: "公告管理",
  "announcements/list": "公告列表",
  "announcements/detail": "公告详情",

  // 违规管理
  violations: "违规管理",
  "violations/list": "违规列表",
  "violations/detail": "违规详情",

  // 帖子管理
  posts: "帖子管理",
  "posts/list": "帖子列表",
  "posts/detail": "帖子详情",
  "posts/detail/[id]/comments": "评论管理",

  // 其他页面
  files: "文件管理",
  reports: "举报管理",
  notifications: "发送通知",
  dashboard: "仪表板",

  // 编辑页面
  edit: "编辑",
};

export const BreadcrumbNav = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.slice(1).split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      return [{ title: "仪表板", href: "/" }];
    }

    const breadcrumbs = [{ title: "仪表板", href: "/" }];

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += (index === 0 ? "" : "/") + segment;

      // 检查是否是动态路由 (数字或UUID)
      const isDynamicSegment =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$|^\d+$/.test(
          segment
        );

      let title = segment;
      let searchPath = currentPath;

      if (isDynamicSegment) {
        // 替换动态段为占位符进行配置查找
        searchPath = currentPath.replace(segment, "[id]");
        title = `详情 #${segment.slice(0, 8)}`;
      }

      // 尝试从配置中获取标题
      const configTitle =
        breadcrumbConfig[searchPath] || breadcrumbConfig[currentPath];
      if (configTitle) {
        title = configTitle;
      }

      breadcrumbs.push({
        title,
        href: `/${currentPath}`,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

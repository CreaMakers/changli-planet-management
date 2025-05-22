"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { AnnouncementResponse } from "@/types/announcement";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { EditAnnouncementSkeleton } from "./skeleton";

const formSchema = z.object({
  title: z.string().min(1, "公告标题不能为空"),
  content: z.string().min(1, "公告内容不能为空"),
  isPinned: z.boolean(),
  description: z.string().optional(),
});

type AnnouncementFormValues = z.infer<typeof formSchema>;

const EditAnnouncementPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const announcementId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      isPinned: false,
      description: "",
    },
  });

  useEffect(() => {
    const fetchAnnouncementInfo = async () => {
      if (!token || isNaN(announcementId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<AnnouncementResponse>({
          method: "GET",
          path: `/web/announcements/${announcementId}`,
          token,
        });

        if (response.success && response.data) {
          const announcement = response.data.data;
          form.reset({
            title: announcement.title,
            content: announcement.content,
            isPinned: announcement.isPinned,
            description: announcement.description,
          });
        } else {
          toast.error(response.error || "获取公告信息失败");
        }
      } catch (error) {
        console.error("获取公告详情错误:", error);
        toast.error("获取公告详情失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncementInfo();
  }, [announcementId, token, form]);

  const onSubmit = async (values: AnnouncementFormValues) => {
    if (!token || isNaN(announcementId)) return;

    try {
      const response = await apiRequest<AnnouncementResponse>({
        method: "PUT",
        path: `/web/announcements/${announcementId}`,
        token,
        data: values,
      });

      if (response.success) {
        toast.success("公告更新成功");
        router.push(`/announcements/detail/${announcementId}`);
      } else {
        toast.error(response.error || "更新公告失败");
      }
    } catch (error) {
      console.error("更新公告错误:", error);
      toast.error("更新公告失败");
    }
  };

  if (isNaN(announcementId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">无效的公告ID</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/announcements">返回公告列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthLoading || isLoading) {
    return <EditAnnouncementSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>编辑公告</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>公告标题</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入公告标题" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>公告内容</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="请输入公告内容"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>公告描述</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入公告描述（选填）" {...field} />
                    </FormControl>
                    <FormDescription>
                      简短描述公告的主要内容或目的
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPinned"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>置顶公告</FormLabel>
                      <FormDescription>
                        设置为置顶公告后将显示在公告列表顶部
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    router.push(`/announcements/detail/${announcementId}`)
                  }
                >
                  取消
                </Button>
                <Button type="submit">保存更改</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAnnouncementPage;

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/api";
import { ViolationResponse } from "@/types/violation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { EditViolationSkeleton } from "./skeleton";

const violationTypeOptions = [
  { value: 1, label: "言论违规" },
  { value: 2, label: "行为违规" },
  { value: 3, label: "其他" },
];

const penaltyTypeOptions = [
  { value: 0, label: "无" },
  { value: 1, label: "警告" },
  { value: 2, label: "封禁" },
  { value: 3, label: "禁言" },
];

const penaltyStatusOptions = [
  { value: 0, label: "未处罚" },
  { value: 1, label: "处罚中" },
  { value: 2, label: "处罚完成" },
];

const formSchema = z.object({
  userId: z.coerce.number().int().positive("用户ID必须为正整数"),
  violationType: z.coerce.number().int().positive("请选择违规类型"),
  penaltyType: z.coerce.number().int().positive("请选择处罚类型"),
  penaltyStatus: z.coerce.number().int().positive("请选择处罚状态"),
  violationTime: z.string().min(1, "请选择违规时间"),
  penaltyTime: z.string().min(1, "请选择处罚时间"),
  muteDuration: z.coerce.number().int().nullable(),
  banDuration: z.coerce.number().int().nullable(),
  penaltyReason: z.string().min(1, "处罚原因不能为空"),
  description: z.string().optional(),
});

type ViolationFormValues = z.infer<typeof formSchema>;

const EditViolationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const violationId = Number(id);
  const { token, isLoading: isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const form = useForm<ViolationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: 0,
      violationType: 1,
      penaltyType: 1,
      penaltyStatus: 1,
      violationTime: "",
      penaltyTime: "",
      muteDuration: null,
      banDuration: null,
      penaltyReason: "",
      description: "",
    },
  });

  const watchPenaltyType = form.watch("penaltyType");

  useEffect(() => {
    const fetchViolationInfo = async () => {
      if (!token || isNaN(violationId)) return;

      setIsLoading(true);
      try {
        const response = await apiRequest<ViolationResponse>({
          method: "GET",
          path: `/web/violations/${violationId}`,
          token,
        });

        if (response.success && response.data?.data) {
          const violation = response.data.data;

          const formatDateTime = (dateString: string | null) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toISOString().slice(0, 16);
          };

          form.reset({
            userId: violation.userId,
            violationType: violation.violationType,
            penaltyType: violation.penaltyType,
            penaltyStatus: violation.penaltyStatus,
            violationTime: formatDateTime(violation.violationTime),
            penaltyTime: formatDateTime(violation.penaltyTime),
            muteDuration: violation.muteDuration,
            banDuration: violation.banDuration,
            penaltyReason: violation.penaltyReason || "",
            description: violation.description || "",
          });
        } else {
          toast.error(response.error || "获取违规记录失败");
        }
      } catch (error) {
        console.error("获取违规记录错误:", error);
        toast.error("获取违规记录失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchViolationInfo();
  }, [violationId, token, form]);

  useEffect(() => {
    if (form.getValues("penaltyType") === 3) {
      form.setValue("banDuration", null);
    } else if (form.getValues("penaltyType") === 2) {
      form.setValue("muteDuration", null);
    } else {
      form.setValue("muteDuration", null);
      form.setValue("banDuration", null);
    }
  }, [form.watch("penaltyType"), form]);

  const onSubmit = async (values: ViolationFormValues) => {
    if (!token || isNaN(violationId)) return;

    try {
      const response = await apiRequest<ViolationResponse>({
        method: "PUT",
        path: `/web/violations/${violationId}`,
        token,
        data: {
          ...values,
          id: violationId,
          isDeleted: 0,
        },
      });

      if (response.success) {
        toast.success("违规记录更新成功");
      } else {
        toast.error(response.error || "更新违规记录失败");
      }
    } catch (error) {
      console.error("更新违规记录错误:", error);
      toast.error("更新违规记录失败");
    }
  };

  if (isNaN(violationId)) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">无效的违规记录ID</div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/violations">返回违规记录列表</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthLoading || isLoading) {
    return <EditViolationSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>编辑违规记录</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户ID</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="violationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>违规类型</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择违规类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {violationTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="penaltyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>处罚类型</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择处罚类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {penaltyTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="penaltyStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>处罚状态</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择处罚状态" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {penaltyStatusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="violationTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>违规时间</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="penaltyTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>处罚时间</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchPenaltyType === 3 && (
                  <FormField
                    control={form.control}
                    name="muteDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>禁言时长（分钟）</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value === null ? "" : field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          设置禁言持续时间（分钟）
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {watchPenaltyType === 2 && (
                  <FormField
                    control={form.control}
                    name="banDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>封禁时长（分钟）</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value === null ? "" : field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          设置封禁持续时间（分钟）
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="penaltyReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>处罚原因</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="请输入处罚原因"
                        className="min-h-[100px]"
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
                    <FormLabel>描述说明</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="请输入违规详细描述（选填）"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      详细描述违规行为和处罚情况
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">保存更改</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditViolationPage;

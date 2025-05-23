import { API_URL } from "./env";

interface APIRequestOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  data?: unknown;
  token?: string;
  expectedStatus?: number[];
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export const apiRequest = async <T = unknown>(
  options: APIRequestOptions
): Promise<APIResponse<T>> => {
  const {
    method,
    path,
    data,
    token,
    expectedStatus = [200, 201, 204],
  } = options;

  try {
    const url = `${API_URL}${path}`;

    const init: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      init.body = JSON.stringify(data);
    }
    if (token) {
      init.headers = {
        ...init.headers,
        token,
      };
    }

    const response = await fetch(url, init);

    if (expectedStatus.includes(response.status)) {
      if (response.status === 204) {
        return { success: true };
      }

      const responseData = await response.json();

      if (responseData.code !== "200") {
        return {
          success: false,
          error: responseData.msg || "请求失败",
          data: responseData,
        };
      }

      return {
        success: true,
        data: responseData,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.msg || "请求失败",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "网络错误",
    };
  }
};

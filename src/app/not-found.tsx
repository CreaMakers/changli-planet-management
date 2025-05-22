"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-foreground transition-colors duration-300">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            页面不存在
          </h2>
          <p className="text-lg mb-8 text-foreground/70">
            很抱歉，您尝试访问的页面不存在或已被移除。
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="bg-secondary hover:bg-secondary/90 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                返回上一页
              </motion.div>
            </button>

            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors text-background"
              >
                返回首页
              </motion.div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-sm text-foreground/50"
        >
          长理星球后台管理
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;

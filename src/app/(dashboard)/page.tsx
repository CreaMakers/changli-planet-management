"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const RootPage = () => {
  useEffect(() => {
    redirect("/dashboard");
  });

  return <></>;
};

export default RootPage;

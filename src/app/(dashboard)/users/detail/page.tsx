"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const UsersDetailPage = () => {
  useEffect(() => {
    redirect("/users");
  });

  return <></>;
};

export default UsersDetailPage;

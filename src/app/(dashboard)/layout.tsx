import { NotAuthRedirector } from "@/components/not-auth-redirector";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NotAuthRedirector />
      {children}
    </>
  );
};

export default DashboardLayout;

import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import '../globals.css'
import MobileNav from "@/components/shared/MobileNav";
// import { Toaster } from '@/components/ui/toaster'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />

      <div className="root-container bg-red-500">
        <div className="wrapper">{children}</div>
      </div>

      {/* <Toaster /> */}
    </main>
  );
};

export default Layout;

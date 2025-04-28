"use client";
import { ReactNode, useState } from "react";

import DashboardSidebar from "../DashboardSidebar";

export const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`fixed border-r border-gray-200 bg-foreground-100/30 lg:relative lg:w-1/5 h-screen overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-10`}
      >
        <DashboardSidebar />
      </div>
      <div className="w-full lg:w-4/5 h-screen overflow-y-auto">
        <button
          className="lg:hidden p-2 bg-gray-800 text-white fixed top-2 left-2 z-20"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close" : "Open"} Sidebar
        </button>

        {children}
      </div>
    </div>
  );
};

"use client";
import { ReactNode, useState } from "react";
import { SquareMenu, X } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayoutClient = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`fixed border-r border-gray-200 bg-gray-900 lg:relative lg:w-1/5 h-screen overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-10`}
      >
        <DashboardSidebar />
      </div>
      <div className="w-full bg-gray-900/20 lg:w-4/5 h-screen overflow-y-auto">
        <button
          className="lg:hidden p-2 bg-gray-800 text-white fixed top-2 right-2 z-20"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X /> : <SquareMenu />}
        </button>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayoutClient;

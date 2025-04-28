"use client";
import { SquareMenu, X } from "lucide-react";
import { useState } from "react";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebarClient = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className="lg:hidden p-2 bg-gray-800 text-white fixed top-2 right-2 z-20"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <SquareMenu />}
      </button>
      <div
        className={`transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <DashboardSidebarContent />
      </div>
    </>
  );
};

export default DashboardSidebarClient;

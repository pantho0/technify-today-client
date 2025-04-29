"use client";
import { ReactNode, useState, useRef, useEffect } from "react";
import DashboardSidebar from "../DashboardSidebar";
import { SquareMenu, X } from "lucide-react";

export const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div
        ref={sidebarRef}
        className={`fixed border-r border-gray-200 bg-foreground-100 lg:relative lg:w-1/5 h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <DashboardSidebar />
      </div>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
          onClick={closeSidebar}
        />
      )}

      <div className="w-full bg-foreground-100/20 lg:w-4/5 h-screen overflow-y-auto relative z-10">
        <button
          className="lg:hidden p-2 bg-gray-800 text-white fixed top-2 right-2 z-40"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X /> : <SquareMenu />}
        </button>

        {children}
      </div>
    </div>
  );
};

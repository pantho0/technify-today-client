"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // <-- Import this

interface SidebarOptionProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const SidebarOptions = ({ links }: { links: SidebarOptionProps[] }) => {
  const pathname = usePathname(); // <-- Get the current route

  return (
    <>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link key={link.href} href={link.href}>
            <Button
              className={`w-full justify-start ${isActive ? "bg-primary text-white" : "text-white"}`}
              variant={isActive ? "solid" : "ghost"}
            >
              {link.icon}
              {link.label}
            </Button>
          </Link>
        );
      })}
    </>
  );
};

export default SidebarOptions;

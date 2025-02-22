import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ReactNode } from "react";

interface SidebarOptionProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const SidebarOptions = ({ links }: { links: SidebarOptionProps[] }) => {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button className="w-full justify-start" variant="ghost">
            {link?.icon}
            {link?.label}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default SidebarOptions;

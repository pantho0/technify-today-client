import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { HomeIcon, LogOut, SettingsIcon } from "lucide-react";
import Image from "next/image";

import { logoutUser } from "@/src/services/auth";
import { useUser } from "@/src/context/user.provider";
import { ThemeSwitch } from "@/src/components/theme-switch";
import DashboardMenus from "./DashboardMenus";

const DashboardSidebar = () => {
  const { setLoading } = useUser();

  const handleLogout = () => {
    logoutUser();
    setLoading(true);
  };

  return (
    <div className="">
      <div className="flex items-center gap-2 p-5">
        <Link className="text-inherit" href="/">
          <Image alt="logo" height={32} src="/logo.png" width={32} />
          <h1 className="text-xl font-bold ml-2">Technify Today</h1>
        </Link>
      </div>

      <Divider className="my-3" />
      <div className="flex items-center justify-center gap-3 p-1">
        <Tooltip content="Theme Switch">
          <ThemeSwitch />
        </Tooltip>
        <Tooltip content="Log out">
          <LogOut
            className="w-5 h-5 mr-2 cursor-pointer"
            onClick={handleLogout}
          />
        </Tooltip>
      </div>

      <Divider className="my-3" />

      <DashboardMenus />
    </div>
  );
};

export default DashboardSidebar;

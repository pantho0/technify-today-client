import { adminMenus, userMenus } from "../constants/constants";

import SidebarOptions from "./SidebarOptions";

import { useUser } from "@/src/context/user.provider";

const DashboardMenus = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-2 p-5">
      <SidebarOptions links={user?.role === "admin" ? adminMenus : userMenus} />
    </div>
  );
};

export default DashboardMenus;

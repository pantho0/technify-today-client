import { PlusIcon, SettingsIcon, UserIcon, UserRoundCog } from "lucide-react";

export const userMenus = [
  { href: "/user/profile", icon: <UserIcon />, label: "Profile" },
  { href: "/user/create-post", icon: <PlusIcon />, label: "Create Post" },
  { href: "/user/settings", icon: <SettingsIcon />, label: "Settings" },
];

export const adminMenus = [
  { href: "/admin/profile", icon: <UserIcon />, label: "Profile" },
  {
    href: "/admin/user-management",
    icon: <UserRoundCog />,
    label: "User Management",
  },
  { href: "/admin/create-post", icon: <PlusIcon />, label: "Create Post" },
  { href: "/admin/settings", icon: <SettingsIcon />, label: "Settings" },
];

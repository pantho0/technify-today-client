import { PlusIcon, SettingsIcon, UserIcon, UserRoundCog } from "lucide-react";

export const userMenus = [
  { href: "/profile", icon: <UserIcon />, label: "Profile" },
  { href: "/create-post", icon: <PlusIcon />, label: "Create Post" },
  { href: "/settings", icon: <SettingsIcon />, label: "Settings" },
];

export const adminMenus = [
  { href: "/profile", icon: <UserIcon />, label: "Profile" },
  {
    href: "/user-management",
    icon: <UserRoundCog />,
    label: "User Management",
  },
  { href: "/create-post", icon: <PlusIcon />, label: "Create Post" },
  { href: "/settings", icon: <SettingsIcon />, label: "Settings" },
];

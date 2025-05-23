import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { usePathname, useRouter } from "next/navigation";

import { logoutUser } from "@/src/services/auth";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constants";

const NavDropDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setLoading } = useUser();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    logoutUser();
    setLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" size="md" src={user?.image} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="profile"
          onPress={() => handleNavigate(`/${user?.role}/profile`)}
        >
          Profile
        </DropdownItem>
        <DropdownItem key="logout" onPress={handleLogout}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropDown;

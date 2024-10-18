"use client";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";


const NavbarDropdown = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: userData } = useGetCurrentUserQuery({});
 

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    //  todo: handle protected route
    router.push("/");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dropdown>
      <Badge
        isOneChar
        className={`${!userData?.data?.isVerified ? "hidden" : ""}`}
        color="primary"
        content={<CheckIcon />}
        placement="bottom-right"
        shape="circle"
      >
        <DropdownTrigger>
          <Avatar
            isBordered
            className="cursor-pointer"
            color="primary"
            src={userData?.data?.profileImage}
          />
        </DropdownTrigger>
      </Badge>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/dashboard/profile")}>
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;

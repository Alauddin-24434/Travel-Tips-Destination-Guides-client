"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  IoHomeOutline,
  IoLogOutOutline,
  IoKeyOutline,
  IoClose,
} from "react-icons/io5";
import { CiGrid42 } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiEditLine } from "react-icons/ri";
import { Menu } from "lucide-react";
import { BsBookmarks } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

import { ThemeSwitch } from "../theme-switch";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";



const userRoutes = [
  { item: "Profile", icon: CgProfile, link: "/dashboard/profile" },
  { item: "My Content", icon: CiGrid42, link: "/dashboard/my-content" },
  { item: "Bookmark", icon: BsBookmarks, link: "/dashboard/bookmark" },
  { item: "Edit Profile", icon: RiEditLine, link: "/dashboard/edit-profile" },
  {
    item: "Change Password",
    icon: IoKeyOutline,
    link: "/dashboard/change-password",
  },
  { item: "Home", icon: IoHomeOutline, link: "/" },
];

const adminRoutes = [
  { item: "Profile", icon: CgProfile, link: "/dashboard/profile" },
  {
    item: "Users Management",
    icon: FiUsers,
    link: "/admin/dashboard/alluser",
  },
  {
    item: "Posts Management",
    icon: CiGrid42,
    link: "/admin/dashboard/allpost",
  },
  {
    item: "Payment History",
    icon: FaDollarSign,
    link: "/admin/dashboard/allPayment",
  },
  { item: "My Content", icon: CiGrid42, link: "/dashboard/my-content" },
  { item: "Bookmark", icon: BsBookmarks, link: "/dashboard/bookmark" },
  { item: "Edit Profile", icon: RiEditLine, link: "/dashboard/edit-profile" },
  {
    item: "Change Password",
    icon: IoKeyOutline,
    link: "/dashboard/change-password",
  },
  { item: "Home", icon: IoHomeOutline, link: "/" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const { data: currentUserData } = useGetCurrentUserQuery({});

  const links =
    currentUserData?.data?.role === "ADMIN" ? adminRoutes : userRoutes;

  return (
    <>
      <Button
        isIconOnly
        className="lg:hidden fixed top-4 left-4 "
        size="lg"
        variant="flat"
        onPress={toggleSidebar}
      >
        <Menu size={24} />
      </Button>

      {isOpen && (
        <button
          className="fixed inset-0 bg-black/50  lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen md:w-72 bg-background border-r  transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-[100vh]">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Link className="flex items-center space-x-2" href="/">
                
                <span className="text-xl font-semibold text-green-600">Travel</span>
              </Link>
              <Button
                isIconOnly
                className="lg:hidden"
                variant="light"
                onPress={closeSidebar}
              >
                <IoClose size={24} />
              </Button>
            </div>
          </div>

          <Divider />

          <nav className="flex-grow overflow-y-auto p-4 space-y-6">
            {links.map((item) => (
              <Link key={item.link} href={item.link} onClick={closeSidebar}>
                <Button
                  className={`w-full justify-start ${
                    item.link === pathname ? "bg-primary/10 text-primary" : ""
                  }`}
                  startContent={<item.icon size={20} />}
                  variant={item.link === pathname ? "flat" : "light"}
                >
                  {item.item}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-4 space-y-4">
            <Divider />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeSwitch />
            </div>
            <Button
              className="w-full justify-start bg-red-500 text-[#ffff]"
             
              startContent={<IoLogOutOutline size={20} />}
              variant="flat"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

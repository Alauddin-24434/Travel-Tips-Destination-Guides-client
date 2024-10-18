/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa"; // For the bell icon

import { siteConfig } from "../../config/site";
import { ThemeSwitch } from "./theme-switch";
import NavbarDropdown from "./NavbarDropDown";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";

// Notification Dropdown Component
const NotificationDropdown = ({ notifications }: { notifications: any[] }) => {
  const router = useRouter();
  
  const handleNavigate = (id: string) => {
    // Save notification ID to localStorage as 'read'
    const readNotifications = JSON.parse(localStorage.getItem("readNotifications") || "[]");

    // If the notification is not already marked as read, store it in localStorage
    if (!readNotifications.includes(id)) {
      readNotifications.push(id);
      localStorage.setItem("readNotifications", JSON.stringify(readNotifications));
    }

    // Navigate to relevant notification detail page
    router.push(`/profile/${id}`);
  };

  return (
    <div className="absolute right-4 top-12 bg-white shadow-lg rounded-lg p-4 w-64">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="border-b py-2 text-gray-600">
            <span onClick={() => handleNavigate(notification._id)} className="flex items-center gap-2 cursor-pointer">
              {notification.name} followed you
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No new notifications</p>
      )}
    </div>
  );
};

export const Navbar = () => {
  const user = useAppSelector(useCurrentUser);
  const [isMounted, setIsMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null); // For closing dropdown when clicking outside
  const { data: userData } = useGetCurrentUserQuery({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Load read notifications from localStorage
    const readNotifications = JSON.parse(localStorage.getItem("readNotifications") || "[]");

    // Mock notifications data (replace with real data)
    const notifications = userData?.data?.followers || [];

    // Filter out read notifications to calculate unread count
    const unreadNotifications = notifications.filter(
      (notification) => !readNotifications.includes(notification._id)
    );

    setUnreadCount(unreadNotifications.length);
  }, [userData]);

  const router = useRouter();

  // Toggle notification dropdown
  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  // Clear notifications on logout
  const handleLogout = () => {
    localStorage.removeItem("readNotifications");
    // Add your logout logic here
  };

  if (!isMounted) {
    return null;
  }

  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
        <NavbarBrand as="li" className="max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
          
            <p className="font-bold text-2xl tracking-wide text-green-600">
              Travel
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand as="li" className="max-w-fit hidden sm:flex">
        <NextLink className="flex justify-start items-center gap-1" href="/">
        
          <p className="font-bold text-2xl tracking-wide text-green-600">
            Travel
          </p>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="basis-1/5 sm:basis-full w-full" justify="center">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        {/* Notification Bell */}
        {user?.email && (
          <div ref={notificationRef} className="relative">
            <button
              className="relative flex items-center text-gray-700 hover:bg-gray-300 p-2 rounded-md"
              onClick={handleNotificationClick}
            >
              <FaBell className="mr-2" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && <NotificationDropdown notifications={userData?.data?.followers || []} />}
          </div>
        )}
  </NavbarContent>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
          <span onClick={handleLogout}>
          <NavbarDropdown/>
            </span> 
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button
              className="bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </NavbarItem>
        )}
    
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {user?.email ? (
          <NavbarItem className="sm:hidden gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="sm:hidden  gap-2">
            <Button
              className=" bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

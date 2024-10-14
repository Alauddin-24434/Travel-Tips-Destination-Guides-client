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
import { useEffect, useState } from "react";

import { siteConfig } from "../../config/site";

import { ThemeSwitch } from "./theme-switch";
import NavbarDropdown from "./NavbarDropDown";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { TravexLogo } from "@/assets/icons";


export const Navbar = () => {
  const user = useAppSelector(useCurrentUser);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
        <NavbarBrand as="li" className="max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <TravexLogo />
            <p className="font-bold text-2xl tracking-wide text-blue-600">
              Travex
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand as="li" className="max-w-fit hidden sm:flex">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <TravexLogo />
          <p className="font-bold text-2xl tracking-wide text-blue-600">
            Travex
          </p>
        </NextLink>
      </NavbarBrand>

      <NavbarContent
        className="basis-1/5 sm:basis-full w-full "
        justify="center"
      >
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button
              className=" bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

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

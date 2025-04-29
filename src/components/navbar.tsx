"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";

import { useUser } from "../context/user.provider";
import NavDropDown from "./ui/NavDropDown";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";
import SearchBar from "./ui/SearchBar";
import { LogInIcon } from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeroUINavbar
      position="sticky"
      maxWidth="xl"
      isBlurred
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left content: Logo and Nav Links */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit text-sm md:mr-3 lg:mr-0 md:text-lg ml-1">
              Technify <span>Today</span>
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-3 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={clsx(
                  "transition-colors",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right content */}
      <NavbarContent
        className="hidden basis-1/5 sm:basis-full md:flex"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <SearchBar />
        </NavbarItem>
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          {user?.email ? (
            <NavDropDown />
          ) : (
            <Link href="/login">
              <Button color="primary" variant="bordered">
                Login
              </Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarContent className="md:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
        <div className="mt-[6px]">
          <NavbarItem>
            {user?.email ? (
              <NavDropDown />
            ) : (
              <Link href="/login">
                <LogInIcon />
              </Link>
            )}
          </NavbarItem>
        </div>
      </NavbarContent>

      {/* Collapsed Menu Items */}
      <NavbarMenu>
        <SearchBar />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                onClick={handleLinkClick}
                className={clsx(
                  "transition-colors",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

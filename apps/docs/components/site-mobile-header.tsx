"use client";

// Hooks
import { useState } from "react";

// Components
import { Link } from "@/i18n/navigation";
import { HeaderActions } from "./header-actions";
import { Logo } from "./logo";

// Icons
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

// Definitions
import { DocSection } from "@/lib/definitions";

interface SiteMobileNavbarProps {
  navigation: DocSection[];
}

export function SiteMobileHeader({ navigation }: SiteMobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="lg:hidden flex items-center relative justify-between w-full py-5 z-50">
      <HamburgerMenuIcon
        className="h-6 w-6 cursor-pointer"
        onClick={toggleMenu}
      />
      <div
        className={`fixed inset-0 w-full h-[100vh] bg-black/80 z-10 transition-opacity duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>
      <nav
        className={`fixed top-0 left-0 h-screen w-64 z-20 bg-background transition-transform duration-300 ease-in-out border-r ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b">
          <div onClick={toggleMenu} className="flex justify-start pl-4">
            <Logo />
          </div>
          <div className="flex justify-end p-3.5">
            <Cross1Icon
              className="size-8 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>
        <div className="space-y-6 px-5 py-4 overflow-y-scroll">
          {navigation.map((section, sectionIndex) => (
            <div
              key={`section-${sectionIndex}`}
              className={sectionIndex !== 0 ? "pt-2" : ""}
            >
              <h2 className="mb-2 text-sm font-semibold tracking-tight">
                {section.title}
              </h2>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li
                    key={`item-${sectionIndex}-${itemIndex}`}
                    onClick={toggleMenu}
                    className={`mr-6 text-sm`}
                  >
                    <Link href={item.href} className="block py-2 text-sm">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      <HeaderActions />
    </div>
  );
}

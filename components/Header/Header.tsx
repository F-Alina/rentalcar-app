"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <Image src="/images/logo.svg" alt="RentalCar" width={104} height={16} />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link
              href="/"
              className={`${css.navItem} ${pathname === "/" ? css.active : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className={`${css.navItem} ${pathname.startsWith("/catalog") && pathname.endsWith("/catalog") ? css.active : ""}`}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

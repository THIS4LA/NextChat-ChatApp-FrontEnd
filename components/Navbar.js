import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Profile from "./sliders/profile";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-black w-full h-[58px] flex items-center justify-between px-[8px]">
      <Link href="/">
        <div className="relative h-10 w-32">
          <Image
            src="/logo.png"
            alt="My Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100px, (max-width: 1200px) 128px, 128px"
          />
        </div>
      </Link>
      <button
        onClick={() => setMenuOpen(true)}
        className="flex items-center gap-2 hover:opacity-75"
      >
        <h1 className="text-white text-sm font-semibold hidden xl:block">
          Hi, {user.userName}!
        </h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          className="rounded-full w-10 h-10 object-cover"
          width={40}
          height={40}
          priority
        />
      </button>
      <Profile open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default Navbar;

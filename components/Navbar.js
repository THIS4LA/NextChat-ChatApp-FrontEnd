import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
      <Link href="/">
        <Image
          src="/user.jpg"
          alt="User Avatar"
          className="rounded-full w-10 h-10 object-cover"
          width={40}
          height={40}
          priority
        />
      </Link>
    </div>
  );
};

export default Navbar;

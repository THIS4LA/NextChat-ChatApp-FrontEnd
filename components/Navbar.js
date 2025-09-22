import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="bg-black w-full h-[54px] flex items-center justify-between px-[16px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="My Logo"
            className="h-8 w-auto"
            width={120}
            height={40}
            priority
          />
        </Link>
        <Link href="/">
          <Image
            src="/user.jpg"
            alt="My Logo"
             className="rounded-full w-[40px] h-[40px] object-cover"
            width={120}
            height={40}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

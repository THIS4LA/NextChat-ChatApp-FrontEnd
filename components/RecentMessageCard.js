import React from "react";
import Image from "next/image";

const RecentMessageCard = () => {
  return (
    <div className="flex flex-row items-center w-full h-16 gap-4 px-4 py-3 border rounded-sm cursor-pointer">
      <Image
        src="/user.jpg"
        alt="My Logo"
        className="rounded-full w-11 h-11 object-cover"
        width={44}  // match rendered size
        height={44}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <h1 className="text-[12px] text-[#00B879]">Thisal Karunarathna</h1>
        <p className="text-[16px] text-[#B3B3B3] truncate">
        loremipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default RecentMessageCard;

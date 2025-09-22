import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 text-center text-gray-500 text-sm">
      © {currentYear} Thisal Karunarathna. Made with <span>💚</span>
    </footer>
  );
};

export default Footer;

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground-50 dark:bg-foreground-50 py-8 text-gray-700 dark:text-gray-300">
      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row justify-between text-xs text-gray-500 dark:text-gray-400">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Technify Today. All rights reserved.
        </p>
        <ul className="flex gap-4 mt-2 md:mt-0 list-none">
          <li className="hover:underline cursor-pointer">Terms of Service</li>
          <li className="hover:underline cursor-pointer">Privacy Policy</li>
          <li className="hover:underline cursor-pointer">Cookie Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

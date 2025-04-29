import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground-50 dark:bg-foreground-50 py-8 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            About
          </h3>
          <p className="text-sm leading-relaxed">
            Technify Today is your go-to hub for the latest tech tips, tricks,
            and guides to simplify your digital life. Stay updated, explore
            innovations, and technify your world!
          </p>
          <div className="text-sm space-y-1">
            <p>Email: info@technifytoday.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 list-none text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">Latest Posts</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Categories
          </h3>
          <ul className="mt-4 space-y-2 list-none text-sm">
            <li className="hover:underline cursor-pointer">Software</li>
            <li className="hover:underline cursor-pointer">Programming</li>
            <li className="hover:underline cursor-pointer">AI</li>
            <li className="hover:underline cursor-pointer">Machine Learning</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <Card className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-md">
            <div>
              <h4 className="text-center font-semibold mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Get latest articles and updates
              </p>
              <Input
                className="mt-4"
                placeholder="Enter your email"
                size="lg"
                type="email"
              />
              <Button className="mt-3 w-full rounded-md" color="primary">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Divider className="my-8" />

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

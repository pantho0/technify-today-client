import { Button } from "@heroui/button";
import { Card, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";

const Footer = () => {
  return (
    <footer className="bg-background py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-start">
        <div className="space-y-3">
          <div>
            <p>About</p>
            <p className="text-[14px] mt-2">
              Technify Today is your go-to hub for the latest tech tips, tricks,
              and guides to simplify your digital life. Stay updated, explore
              innovations, and technify your world!
            </p>
          </div>
          <div className="text-[14px]">
            <p>Email : info@technifytoday.com</p>
            <p>Phone : +123 456 7890</p>
          </div>
        </div>
        <div>
          <p>Quick Links</p>
          <ul className="text-[14px] mt-2 space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Latest Posts</li>
          </ul>
        </div>
        <div>
          <p>Categories</p>
          <ul className="text-[14px] mt-2 space-y-2">
            <li>Software</li>
            <li>Programming</li>
            <li>AI</li>
            <li>Machine Learning</li>
          </ul>
        </div>
        <div>
          <Card className="rounded-md p-6">
            <div>
              <p className="text-center">Subscribe to our newsletter</p>
              <p className="text-center text-[14px]">
                Get latest articles and updates
              </p>
              <Input
                type="email"
                size="lg"
                placeholder="Enter your email"
                className="mt-5"
              />
              <Button color="primary" className="mt-3 w-full rounded-md">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Divider className="my-6" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row justify-between pb-2">
        <p className="text-center text-gray-500 text-[12px]">
          &copy; {new Date().getFullYear()} Technify Today. All rights reserved.
        </p>
        <ul className="flex justify-center gap-4 text-[12px]">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

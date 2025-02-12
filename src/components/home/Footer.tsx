import { Divider } from "@heroui/divider";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-start">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-bold">About</p>
            <p className="text-[14px]">
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
          <ul className="text-[14px]">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Latest Posts</li>
          </ul>
        </div>
        <div>categories link section</div>
        <div>weekly news letter section</div>
      </div>

      <Divider className="my-4" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row justify-between pb-2">
        <p className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} Technify Today. All rights reserved.
        </p>
        <ul className="flex justify-center gap-4">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

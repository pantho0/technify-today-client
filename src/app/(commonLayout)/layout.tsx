import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/home/Footer";
import { Divider } from "@heroui/divider";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="text-foreground container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <Divider className="my-4" />
      <Footer />
    </div>
  );
};

export default layout;

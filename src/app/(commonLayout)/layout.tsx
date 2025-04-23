import { ReactNode } from "react";
import { Divider } from "@heroui/divider";

import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="text-foreground container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <Divider className="my-4" />
    </div>
  );
};

export default layout;

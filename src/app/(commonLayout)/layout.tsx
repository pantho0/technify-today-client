import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/home/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-screen ">
      <Navbar />
      <main className="text-foreground container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default layout;

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import aboutusBanner from "../../../../public/aboutus.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Image with overlay */}
      <div className="w-full h-64 relative overflow-hidden rounded-lg">
        <Image
          src={aboutusBanner}
          alt="About Us Banner"
          fill
          className="object-cover rounded-lg"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About Us
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* About Sections */}
        {[
          {
            title: "Who We Are",
            text: `At Technify Today, we are passionate about delivering the latest tech insights and practical tips to help our readers stay ahead in the digital world.`,
          },
          {
            title: "Our Vision",
            text: `We envision a world where technology is accessible, understandable, and beneficial to everyone.`,
          },
          {
            title: "What We Offer",
            text: (
              <ul className="list-disc list-inside space-y-1">
                <li>Tech tips and tutorials</li>
                <li>Gadget and software reviews</li>
                <li>Web development insights</li>
                <li>Cybersecurity and best practices</li>
              </ul>
            ),
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
              {section.title}
            </h2>
            <div className="text-base leading-relaxed text-muted-foreground">
              {section.text}
            </div>
          </motion.div>
        ))}

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={4}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            {
              label: "Articles Published",
              value: "1,200+",
            },
            {
              label: "Active Contributors",
              value: "80+",
            },
            {
              label: "Monthly Readers",
              value: "50,000+",
            },
            {
              label: "Years in Operation",
              value: "5+",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-4 shadow backdrop-blur border border-white/10"
            >
              <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={5}
          className="space-y-6 flex flex-col items-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Our Journey
          </h2>
          <div className="border-l-2 border-primary pl-6 space-y-4 max-w-md">
            {[
              {
                year: "2020",
                event: "Technify Today was launched.",
              },
              {
                year: "2021",
                event: "Reached 10,000 monthly readers.",
              },
              {
                year: "2023",
                event: "Introduced community content contributions.",
              },
              {
                year: "2024",
                event: "Redesigned platform and UI overhaul.",
              },
              {
                year: "2025",
                event: "Launched mobile app for easier access to content.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[22px] top-1.5" />
                <p className="font-medium text-primary">{item.year}</p>
                <p className="text-muted-foreground text-sm">{item.event}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Cards Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={6}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Meet the Team
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Alice",
                role: "Developer",
                img: "https://i.pravatar.cc/150?u=1",
              },
              {
                name: "Bob",
                role: "Content Strategist",
                img: "https://i.pravatar.cc/150?u=2",
              },
              {
                name: "Charlie",
                role: "UI/UX Designer",
                img: "https://i.pravatar.cc/150?u=3",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 p-4 shadow border border-white/10 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 relative">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={7}
          className="text-center bg-primary/10 p-8 rounded-xl"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Want to Contribute?
          </h2>
          <p className="text-muted-foreground mb-4">
            Join our growing community of tech writers and enthusiasts.
          </p>
          <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary/90 transition">
            Become a Contributor
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;

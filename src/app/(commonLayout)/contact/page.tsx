"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

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

const ContactPage = () => {
  const formjs = useRef();

  const sendEmail = (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Sending message...", { duration: 2000 });
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        formjs.current!,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        }
      )
      .then(
        () => {
          toast.success("Message sent", { id: toastId, duration: 2000 });
          e.target.reset();
        },
        (error: any) => {
          console.log(error);
          toast.error("Something went wrong. Please try again", {
            id: toastId,
            duration: 2000,
          });
        }
      );
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={0}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have a question, feedback, or just want to connect? We’d love to
            hear from you.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> contact@technifytoday.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 1234 Innovation Lane, Tech City, USA
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          ref={formjs as any}
          onSubmit={sendEmail}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={1}
          className="bg-white/5 p-8 rounded-xl shadow space-y-6 border border-white/10"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 bg-background border border-white/10 rounded-md shadow-sm shadow-gray-300 dark:shadow-gray-800"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-background border border-white/10 rounded-md shadow-sm shadow-gray-300 dark:shadow-gray-800"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 bg-background border border-white/10 rounded-md shadow-sm shadow-gray-300 dark:shadow-gray-800"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;

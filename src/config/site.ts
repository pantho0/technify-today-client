export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TECHNIFY-TODAY",
  description:
    "Stay updated with TECHNIFY-TODAY – your daily dose of the latest tech news, gadget reviews, tutorials, and trends that shape our digital world.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Feeds",
      href: "/feeds",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

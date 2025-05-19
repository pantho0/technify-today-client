import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { nameBuilder } from "./NameBuilder";
import { socialLoginUser } from "../services/auth";
import { envConfig } from "../config/envConfig";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      const nameData = nameBuilder(user.name || "");
      await socialLoginUser({
        firstName: nameData?.firstName,
        middleName: nameData?.middleName,
        lastName: nameData?.lastName,
        email: user.email,
        image: user.image,
        password: envConfig.defaultSecurityKey,
      });
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

import LoginClient from "@/src/components/ui/LoginClient";
import { authOptions } from "@/src/utils/authOptions";
import { nameBuilder } from "@/src/utils/NameBuilder";
import { getServerSession } from "next-auth";

const LoginPage = async () => {
  return <LoginClient />;
};

export default LoginPage;

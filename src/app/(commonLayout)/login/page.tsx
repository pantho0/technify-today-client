import LoginClient from "@/src/components/ui/LoginClient";
import { authOptions } from "@/src/utils/authOptions";
import { getServerSession } from "next-auth";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return <LoginClient />;
};

export default LoginPage;

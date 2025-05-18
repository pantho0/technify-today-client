import LoginClient from "@/src/components/ui/LoginClient";
import { authOptions } from "@/src/utils/authOptions";
import { nameBuilder } from "@/src/utils/NameBuilder";
import { getServerSession } from "next-auth";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  const nameData = nameBuilder(session?.user?.name || "");

  const autoRegData = {
    firstName: nameData?.firstName,
    middleName: nameData?.middleName,
    lastName: nameData?.lastName,
    email: session?.user?.email,
    profileImage: session?.user?.image,
  };

  return <LoginClient autoRegData={autoRegData} />;
};

export default LoginPage;

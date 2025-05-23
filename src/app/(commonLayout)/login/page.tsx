"use client";
import { signIn } from "next-auth/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import TTInput from "@/src/components/form/TTInput";
import TTForm from "@/src/components/form/TTForm";
import { useLogin } from "@/src/hooks/auth.hooks";
import { loginSchema } from "@/src/schemas/login.validation";
import Loading from "@/src/components/ui/Loading";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const { mutate: handleLogin, isPending, isSuccess } = useLogin();
  const [socialLoginLoading, setSocialLoginLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setLoading } = useUser();

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect || "/");
    }
  }, [isPending, isSuccess]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setSocialLoginLoading(true);

      await signIn("google", {
        redirect: false,
        callbackUrl: redirect || "/",
      });
      setSocialLoginLoading(false);
    } catch (error) {
      console.error("Google login failed:", error);
      setLoading(false);
      setSocialLoginLoading(false);
    }
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    handleLogin(data);
    setLoading(true);
  };

  return (
    <>
      {isPending || (socialLoginLoading && <Loading />)}

      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4 py-8">
        <Image alt="logo" height={80} src="/logo.png" width={80} />
        <h3 className="my-2 text-2xl font-bold text-center">User Login</h3>
        <p className="mb-4 text-center text-sm text-gray-400">
          Welcome Back! Let's Get Started
        </p>

        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <TTForm resolver={zodResolver(loginSchema)} onSubmit={onSubmit}>
            <div className="space-y-4">
              <TTInput label="Email" name="email" type="email" />
              <TTInput label="Password" name="password" type="password" />
              <Button
                className="w-full"
                color="primary"
                radius="none"
                type="submit"
              >
                Login
              </Button>
            </div>
          </TTForm>

          <div className="mt-6 space-y-2 text-center text-sm ">
            <Button
              className="w-full"
              color="secondary"
              radius="none"
              onPress={handleGoogleLogin}
            >
              Login With Google
            </Button>

            <p>
              Forgot Your Password?{" "}
              <Link href="/forgot-password" className="text-primary underline">
                Click Here
              </Link>
            </p>
            <p>
              Don’t have an account?{" "}
              <Link href="/register" className="text-primary underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

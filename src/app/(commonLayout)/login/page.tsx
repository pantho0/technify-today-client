"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import React, { useEffect } from "react";
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
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setLoading } = useUser();

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    handleLogin(data);
    setLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect || "/");
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-2">
        <Image alt="logo" height={100} src={"/logo.png"} width={100} />
        <h3 className="my-2 text-2xl font-bold">User Login</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
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

          <div className="text-center mt-4">
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

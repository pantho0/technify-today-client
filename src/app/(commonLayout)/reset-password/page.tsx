"use client";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import { useResetPassword } from "@/src/hooks/auth.hooks";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { FieldValues } from "react-hook-form";

export const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const email = searchParams?.get("email");
  const token = searchParams?.get("token");

  const onSubmit = (data: FieldValues) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordData = {
      email: email,
      newPassword: data.newPassword,
      token: token,
    };

    resetPassword(passwordData);

    router.push("/");
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-2">
      <Image alt="logo" height={100} src={"/logo.png"} width={100} />
      <h3 className="my-2 text-2xl font-bold">Reset Password</h3>
      <div className="w-[35%]">
        <TTForm onSubmit={onSubmit}>
          <div className="my-2">
            <TTInput label="Email" name="email" type="email" />
          </div>
          <div className="my-2">
            <TTInput label="New Password" name="newPassword" type="password" />
          </div>
          <div className="my-2">
            <TTInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          </div>{" "}
          <div className="flex justify-end">
            <Button isLoading={isPending} type="submit" color="primary">
              Reset Password
            </Button>
          </div>
        </TTForm>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

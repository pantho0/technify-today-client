"use client";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import { Button } from "@heroui/button";
import Image from "next/image";

export const ForgotPasswordPage = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-2">
        <Image alt="logo" height={100} src={"/logo.png"} width={100} />
        <h3 className="my-2 text-2xl font-bold">Forgot Password</h3>
        <p className="mb-4">Welcome Back! Reset Your Password</p>
        <div className="w-[35%]">
          <TTForm onSubmit={onSubmit}>
            <div className="space-y-4">
              <TTInput label="Email" name="email" type="email" />

              <Button
                className="w-full"
                color="primary"
                radius="none"
                type="submit"
              >
                Reset Password
              </Button>
            </div>
          </TTForm>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

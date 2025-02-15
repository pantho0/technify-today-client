"use client";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import React from "react";

const RegisterPage = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-2">
      <Image src={"/logo.png"} alt="logo" width={100} height={100} />
      <h3 className="my-2 text-2xl font-bold">Register User</h3>
      <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
      <div className="w-[35%]">
        <TTForm onSubmit={onSubmit}>
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
  );
};

export default RegisterPage;

"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import React from "react";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TTInput from "@/src/components/form/TTInput";
import TTForm from "@/src/components/form/TTForm";
import { useUserRegistration } from "@/src/hooks/auth.hooks";
import { registerSchema } from "@/src/schemas/login.validation";

const RegisterPage = () => {
  const {
    mutate: handleRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      profileImage: "https://example.com/images/johndoe.jpg",
    };

    handleRegistration(userData);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
      <Image alt="logo" height={80} src="/logo.png" width={80} />
      <h3 className="my-2 text-2xl font-bold text-center">Register User</h3>
      <p className="mb-4 text-center text-gray-600">
        Welcome! Let's Get Started
      </p>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <TTForm resolver={zodResolver(registerSchema)} onSubmit={onSubmit}>
          <div className="space-y-4">
            <TTInput label="First Name" name="firstName" type="text" />
            <TTInput label="Middle Name" name="middleName" type="text" />
            <TTInput label="Last Name" name="lastName" type="text" />
            <TTInput label="Email" name="email" type="email" />
            <TTInput label="Password" name="password" type="password" />

            <Button
              className="w-full"
              color="primary"
              radius="none"
              type="submit"
              isLoading={isPending}
            >
              Register
            </Button>
          </div>
        </TTForm>

        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

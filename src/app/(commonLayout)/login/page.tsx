import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center space-y-2">
      <Image src={"/logo.png"} alt="logo" width={100} height={100} />
      <h3 className="my-2 text-2xl font-bold">User Login</h3>
      <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
      <div className="w-[35%] space-y-4">
        <form>
          <Input
            size="md"
            radius="none"
            type="email"
            placeholder="Email"
            className="my-2"
          />
          <Input
            size="md"
            radius="none"
            type="password"
            placeholder="Password"
            className="my-2"
          />
          <Button
            radius="none"
            type="submit"
            className="w-full"
            color="primary"
          >
            Login
          </Button>
        </form>

        <div className="text-center">
          Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

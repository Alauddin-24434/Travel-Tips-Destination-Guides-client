/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForgetPasswordMutation, useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { TResponse } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import Loading from "@/components/ui/Loading";
import TForm from "@/components/form/TForm";
import { forgetPasswordValidationSchema, loginValidationSchema } from "@/schemas/auth.schema";
import TInput from "@/components/form/TInput";
import TPasswordInput from "@/components/form/TPasswordInput";




const Page = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [toggleForgetPasswordForm, setToggleForgetPasswordForm] =
    useState(false);
  const [forgetPassword] = useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await loginUser(data)) as TResponse<any>;

    try {
      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success(res.data.message, {
          duration: 2000,
        });

        const token = res.data?.data?.accessToken;
        const decoded = await verifyToken(token);

        dispatch(
          setUser({
            token: res.data?.data?.accessToken,
            user: decoded,
          }),
        );

        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  const onSubmitForgetPassword: SubmitHandler<FieldValues> = async (data) => {
    const res = await forgetPassword(data);

    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {toggleForgetPasswordForm ? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-lg border px-8 py-6 bg-default-100 border-default-200 transition-transform duration-500 transform opacity-100">
          

            <h3 className="text-3xl font-bold text-blue-600 mb-2">
              Reset Your Password
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Enter your email to receive a reset link.
            </p>

            {/* forget password form */}
            <div className="w-full">
              <TForm
                resetOnSubmit={false}
                resolver={zodResolver(forgetPasswordValidationSchema)}
                onSubmit={onSubmitForgetPassword}
              >
                <div className="py-3">
                  <TInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                  />
                </div>

                <Button
                  className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
                  size="lg"
                  type="submit"
                >
                  Send Reset Link
                </Button>
              </TForm>

              <div className="mt-4 text-center text-gray-500">
                Remember your password?{" "}
                <button
                  className="text-blue-600 cursor-pointer transition duration-300 hover:underline hover:text-blue-700"
                  onClick={() => setToggleForgetPasswordForm(false)}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-lg border px-8 py-6 bg-default-100 border-default-200 transition-transform duration-500 transform opacity-100">
            {/* theme toggle switch */}
         
            <h3 className="text-3xl font-bold text-blue-600 mb-2">
              Login to Travex
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Welcome Back! Lets Get Started
            </p>

            {/* login form */}
            <div className="w-full">
              <TForm
                resolver={zodResolver(loginValidationSchema)}
                onSubmit={onSubmit}
              >
                <div className="py-3">
                  <TInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>

                <div className="py-3">
                  <TPasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>

                <div>
                  <button
                    className="text-sm inline-block hover:underline cursor-pointer text-blue-600 font-semibold"
                    type="button"
                    onClick={() => setToggleForgetPasswordForm(true)}
                  >
                    Forget Password?
                  </button>
                </div>

                <Button
                  className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105 "
                  size="lg"
                  type="submit"
                >
                  Login
                </Button>
              </TForm>

              <div className="mt-4 text-center text-gray-500">
                Don’t have an account?{" "}
                <Link
                  className="text-blue-600 transition duration-300 hover:underline hover:text-blue-700"
                  href={"/register"}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TForm from "@/components/form/TForm";
import TPasswordInput from "@/components/form/TPasswordInput";
import Loading from "@/components/ui/Loading";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { resetPasswordValidationSchema } from "@/schemas/auth.schema";
import { TResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const resetPasswordData = {
      email: email,
      newPassword: data.newPassword,
      token,
    };

    const res = (await resetPassword(resetPasswordData)) as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });
    } else {
      toast.success("Password reset successfully please login again", {
        duration: 2000,
      });

      if (res.data.success) {
        router.push("/login");
      }
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex h-screen w-full items-center justify-center">
        <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-lg border px-8 py-6 bg-default-100 border-default-200 transition-transform duration-500 transform opacity-100">
       
          <h3 className="text-3xl font-bold text-blue-600 mb-2">
            Reset Your Password
          </h3>
          <p className="text-lg text-gray-600 text-center mb-6">
            Please enter a new password below to reset your account access.
          </p>

          <div className="w-full">
            <TForm
              resolver={zodResolver(resetPasswordValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <TPasswordInput
                  label="New Password"
                  name="newPassword"
                  placeholder="Enter your new password"
                  type="password"
                />
              </div>
              <div className="py-3">
                <TPasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  type="password"
                />
              </div>

              <Button
                className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
                size="lg"
                type="submit"
              >
                Reset Password
              </Button>
            </TForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

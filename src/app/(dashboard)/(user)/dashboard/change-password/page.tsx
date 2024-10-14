/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { TResponse } from "@/types";
import { logout } from "@/redux/features/auth/authSlice";
import Container from "@/components/ui/Container";
import TForm from "@/components/form/TForm";
import { changePasswordValidationSchema } from "@/schemas/auth.schema";
import TPasswordInput from "@/components/form/TPasswordInput";


const ChangePasswordPage = () => {
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const passwordData = {
      ...data,
    };

    try {
      const res = (await changePassword(passwordData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Password changed successfully", {
          duration: 2000,
        });

        dispatch(logout());

        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <Container>
      <div className="w-full max-w-xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Change Password</h1>
        <p className="text-gray-500 mb-6">
          Please enter your old password and choose a new one.
        </p>

        <TForm
          resolver={zodResolver(changePasswordValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <TPasswordInput
              label="Old Password"
              name="oldPassword"
              type="password"
            />
          </div>

          <div className="py-3">
            <TPasswordInput
              label="New Password"
              name="newPassword"
              type="password"
            />
          </div>

          <div className="py-3">
            <TPasswordInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          </div>

          <Button
            className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105 "
            isLoading={changePasswordLoading}
            size="lg"
            spinner={<Spinner color="current" size="sm" />}
            type="submit"
          >
            Change Password
          </Button>
        </TForm>
      </div>
    </Container>
  );
};

export default ChangePasswordPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import TDatePicker from "@/components/form/TDatePicker";
import TFileInput from "@/components/form/TFileInput";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import TPasswordInput from "@/components/form/TPasswordInput";
import TSelect from "@/components/form/TSelect";
import Loading from "@/components/ui/Loading";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { registerValidationSchema } from "@/schemas/auth.schema";
import { TResponse } from "@/types";
import dateToIso from "@/utils/dateToIso";
import uploadImageToCloud from "@/utils/uploadImageCloud";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";




const genderOptions = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "other", label: "Other" },
];

const Page = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      birthDate: dateToIso(data.birthDate),
      mobileNumber: data.mobileNumber,
      profileImage:imageUrl,
    };
    console.log(userData)
    try {
      const res = (await registerUser(userData)) as TResponse<any>;

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
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0] || null;

    if (!file) return;

    setLoading(true);


    try {
      const uploadedImageUrl = await uploadImageToCloud(file);
      setImageUrl(uploadedImageUrl);
    } catch (err: any) {
      setError('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex min-h-screen w-full items-center justify-center p-6">
        <div className="relative flex w-full max-w-xl flex-col items-center justify-center rounded-lg border px-8 py-10 bg-default-100 border-default-200 shadow-lg">
          {/* Logo and heading section */}
          <div className="flex flex-col items-center justify-center mb-6">
            <h3 className="text-3xl font-bold text-blue-600 text-center mb-2">
              Signup Today
            </h3>
            <p className="text-lg text-gray-600 text-center">
              Start your adventure with us. Sign up now and unlock exclusive benefits!
            </p>
          </div>

          {/* Register Form */}
          <div className="w-full">
            <TForm resolver={zodResolver(registerValidationSchema)} onSubmit={onSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="py-2">
                  <TInput label="Name" name="name" type="text" />
                </div>
                <div className="py-2">
                  <TSelect label="Gender" name="gender" options={genderOptions} placeholder="Select your gender" />
                </div>
                <div className="py-2">
                  <TInput label="Email" name="email" type="email" />
                </div>
                <div className="py-2">
                  <TInput label="Mobile Number" name="mobileNumber" type="text" />
                </div>
                <div className="py-2">
                  <TDatePicker label="Birth date" name="birthDate" />
                </div>
                <div className="py-2">
                  <TPasswordInput label="Password" name="password" type="password" />
                </div>
                <div className="py-2">
                  <TPasswordInput label="Confirm Password" name="confirmPassword" type="password" />
                </div>
                {/* Profile Photo Input */}
                <div className="py-2">

                  <label htmlFor="profilePhoto">Profile Photo:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-file"
                  />
                </div>
                {loading ? <p>Loading</p> : ""}
              </div>

              <Button
                className="w-full py-2 mt-6 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
                size="lg"
                type="submit"
              >
                Register
              </Button>
            </TForm>

            <div className="mt-4 text-center text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-blue-600 transition duration-300 hover:underline hover:text-blue-700"
                href={"/login"}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

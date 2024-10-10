/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { IInput } from "@/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";



interface IProps extends IInput {}

export default function GHInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  defaultValue,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      defaultValue={defaultValue}
      errorMessage={(errors[name]?.message as string) ?? ""}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
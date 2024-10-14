/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import { IInput } from "@/types";
import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";



interface IProps extends IInput {}

const TDatePicker = ({ label, name, variant = "bordered" }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          variant={variant}
          {...fields}
        />
      )}
    />
  );
};

export default TDatePicker;

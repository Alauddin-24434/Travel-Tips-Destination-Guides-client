"use client";
import { IInput } from "@/types";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";


interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
  placeholder: string;
}

const TSelect = ({
  options,
  label,
  name,
  placeholder,
  disabled,
  variant = "bordered",
  size = "md",
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Select
        {...register(name)}
        className="min-w-full sm:min-w-[225px]"
        errorMessage={(errors[name]?.message as string) ?? ""}
        isDisabled={disabled}
        isInvalid={!!errors[name]}
        label={label}
        placeholder={placeholder}
        size={size}
        variant={variant}
      >
        {options.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default TSelect;

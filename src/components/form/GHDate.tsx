/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IInput } from "@/types";
import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";


interface IProps extends IInput {}

const GHDate = ({ label, name, defaultValue }: IProps) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, ...fileds } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          isRequired={true}
          label={label}
          {...fileds}
        />
      )}
    />
  );
};

export default GHDate;
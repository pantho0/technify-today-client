"use client";
import { Select, SelectItem } from "@heroui/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface ISelectProps extends IInput {
  options: {
    key: string;

    label: string;
  }[];
}

const TTSelect = ({ options, label, name, disabled }: ISelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      disabled={disabled}
      label={label}
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
    >
      {options?.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default TTSelect;

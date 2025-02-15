import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

const TTInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
};

export default TTInput;

"use client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface FormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface TTFormProps extends FormConfig {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
}

const TTForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TTFormProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const handleSubmit = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default TTForm;

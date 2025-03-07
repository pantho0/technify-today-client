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

  const submit: SubmitHandler<any> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default TTForm;

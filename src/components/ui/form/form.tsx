'use client';

import { ReactNode } from 'react';
import {
  UseFormReturn,
  FieldValues,
  useForm,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form';

interface FormProps {
  onSubmit: SubmitHandler<FieldValues>;
  children: (methods: UseFormReturn<FieldValues>) => ReactNode;
  options?: UseFormProps<FieldValues>;
  id?: string;
}

export default function Form({ onSubmit, children, options, id }: FormProps) {
  const methods = useForm({ ...options });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
      {children(methods)}
    </form>
  );
}

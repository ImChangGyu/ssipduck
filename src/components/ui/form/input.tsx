import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '~/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: Partial<UseFormRegisterReturn>;
}

export default function Input({ className, register, ...rest }: InputProps) {
  return (
    <input
      className={cn('w-full h-[56px] p-4 rounded-xl outline-none', className)}
      {...register}
      {...rest}
    />
  );
}

import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: 'primary' | 'error';
  size?: 'xl' | 'm' | 'sm';
}

const buttonVariants = tv({
  base: 'w-fit text-white rounded',
  variants: {
    variants: {
      primary: 'bg-primary',
      error: 'bg-red-500 hover:bg-red-600',
    },
    size: {
      xl: 'px-4 py-3 text-lg',
      m: 'px-2.5 py-1.5 text-sm',
      sm: 'px-1 py-0.5 text-xs',
    },
  },
  defaultVariants: {
    variants: 'primary',
    size: 'm',
  },
});

export default function Button({
  children,
  variants,
  size,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={buttonVariants({ variants, size })} {...rest}>
      {children}
    </button>
  );
}

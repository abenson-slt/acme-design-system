import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { Spinner } from '../Spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors ' +
    'focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-interactive-primary text-interactive-primary-fg hover:bg-interactive-primary-hover',
        secondary:
          'border border-border bg-bg-muted text-content hover:bg-bg-subtle',
        outline:
          'border border-interactive-primary bg-transparent text-interactive-primary hover:bg-interactive-primary-subtle',
        'outline-inverse':
          'border border-content-on-inverse bg-transparent text-content-on-inverse hover:bg-white/10',
        ghost: 'bg-transparent text-content hover:bg-bg-subtle',
        destructive:
          'bg-error text-content-on-brand hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-body-sm [&_svg]:size-4',
        md: 'h-10 px-4 text-body-md [&_svg]:size-5',
        lg: 'h-12 px-5 text-body-lg [&_svg]:size-5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      leadingIcon,
      trailingIcon,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size ?? 'md'} />
        ) : (
          leadingIcon && <span className="shrink-0">{leadingIcon}</span>
        )}
        {children}
        {!isLoading && trailingIcon && (
          <span className="shrink-0">{trailingIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

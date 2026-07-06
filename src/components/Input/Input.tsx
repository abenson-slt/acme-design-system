import * as React from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, leadingIcon, trailingIcon, disabled, ...props }, ref) => {
    if (!leadingIcon && !trailingIcon) {
      return (
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            'h-10 w-full rounded-md border bg-bg px-3 text-body-md text-content placeholder:text-content-muted',
            'border-border-input focus-visible:border-border-focus focus-visible:shadow-focus focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:bg-bg-muted disabled:opacity-50',
            invalid && 'border-error focus-visible:shadow-focus-error',
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          'flex h-10 w-full items-center gap-2 rounded-md border bg-bg px-3',
          'border-border-input focus-within:border-border-focus focus-within:shadow-focus',
          disabled && 'cursor-not-allowed bg-bg-muted opacity-50',
          invalid && 'border-error focus-within:shadow-focus-error',
          className
        )}
      >
        {leadingIcon && (
          <span className="shrink-0 text-content-muted [&_svg]:size-4">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className="size-full bg-transparent text-body-md text-content placeholder:text-content-muted focus-visible:outline-none disabled:cursor-not-allowed"
          {...props}
        />
        {trailingIcon && (
          <span className="shrink-0 text-content-muted [&_svg]:size-4">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

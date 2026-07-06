import * as React from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 3, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full rounded-md border bg-bg px-3 py-2 text-body-md text-content placeholder:text-content-muted',
        'border-border-input focus-visible:border-border-focus focus-visible:shadow-focus focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:bg-bg-muted disabled:opacity-50',
        invalid && 'border-error focus-visible:shadow-focus-error',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

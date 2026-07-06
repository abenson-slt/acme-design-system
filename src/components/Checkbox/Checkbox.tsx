import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, invalid, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      'peer flex size-5 shrink-0 items-center justify-center rounded-sm border bg-bg',
      'border-border-input focus-visible:shadow-focus focus-visible:outline-none',
      'data-[state=checked]:border-interactive-primary data-[state=checked]:bg-interactive-primary data-[state=checked]:text-interactive-primary-fg',
      'data-[state=indeterminate]:border-interactive-primary data-[state=indeterminate]:bg-interactive-primary data-[state=indeterminate]:text-interactive-primary-fg',
      'disabled:cursor-not-allowed disabled:bg-bg-muted disabled:opacity-50',
      invalid && 'border-error focus-visible:shadow-focus-error',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === 'indeterminate' ? (
        <Minus className="size-3.5" aria-hidden="true" />
      ) : (
        <Check className="size-3.5" aria-hidden="true" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';

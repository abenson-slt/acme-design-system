import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/cn';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  invalid?: boolean;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, invalid, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors',
      'bg-bg-emphasis/25 focus-visible:shadow-focus focus-visible:outline-none',
      'data-[state=checked]:bg-interactive-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      invalid && 'focus-visible:shadow-focus-error data-[state=unchecked]:border-error',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block size-5 translate-x-0.5 rounded-full bg-surface shadow-sm transition-transform',
        'data-[state=checked]:translate-x-5'
      )}
    />
  </SwitchPrimitive.Root>
));

Switch.displayName = 'Switch';

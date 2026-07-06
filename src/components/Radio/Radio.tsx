import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../lib/cn';

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
));
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  invalid?: boolean;
}

export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, invalid, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      'flex size-5 shrink-0 items-center justify-center rounded-full border bg-bg',
      'border-border-input focus-visible:shadow-focus focus-visible:outline-none',
      'data-[state=checked]:border-interactive-primary',
      'disabled:cursor-not-allowed disabled:bg-bg-muted disabled:opacity-50',
      invalid && 'border-error focus-visible:shadow-focus-error',
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-interactive-primary" />
  </RadioGroupPrimitive.Item>
));

Radio.displayName = 'Radio';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-label-sm font-medium',
  {
    variants: {
      variant: {
        default: 'border-border bg-bg-muted text-content',
        success: 'border-success-border bg-success-bg text-success-text',
        warning: 'border-warning-border bg-warning-bg text-warning-text',
        error: 'border-error-border bg-error-bg text-error-text',
        info: 'border-info-border bg-info-bg text-info-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);

Badge.displayName = 'Badge';

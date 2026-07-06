import * as React from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const alertVariants = cva('flex gap-3 rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'border-border bg-bg-subtle text-content',
      success: 'border-success-border bg-success-bg text-success-text',
      warning: 'border-warning-border bg-warning-bg text-warning-text',
      error: 'border-error-border bg-error-bg text-error-text',
      info: 'border-info-border bg-info-bg text-info-text',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const variantIcons = {
  default: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
  info: Info,
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  /** Set to false to hide the leading icon. */
  icon?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, icon = true, children, ...props }, ref) => {
    const Icon = variantIcons[variant ?? 'default'];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />}
        <div className="flex flex-col gap-1">
          {title && <p className="text-label-lg font-medium">{title}</p>}
          {children && <div className="text-body-sm">{children}</div>}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

/**
 * Wraps Radix's Provider + Viewport so consumers only need one component at
 * their app root. Render <Toast> instances (or a toast-management hook) as
 * children anywhere inside this provider.
 */
export function ToastProvider({
  children,
  swipeDirection = 'right',
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider>) {
  return (
    <ToastPrimitive.Provider swipeDirection={swipeDirection} {...props}>
      {children}
      <ToastPrimitive.Viewport
        className={cn(
          'fixed bottom-0 right-0 z-50 flex w-full max-w-sm flex-col gap-2 p-4',
          'sm:bottom-0 sm:right-0'
        )}
      />
    </ToastPrimitive.Provider>
  );
}

const toastVariants = cva(
  'relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface text-content',
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

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant, children, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
      <div className="flex-1">{children}</div>
      <ToastPrimitive.Close
        className="shrink-0 rounded-sm opacity-70 focus-visible:shadow-focus focus-visible:outline-none"
        aria-label="Dismiss"
      >
        <X className="size-4" aria-hidden="true" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
);
Toast.displayName = 'Toast';

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-label-lg font-medium', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-body-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'mt-2 inline-flex h-8 items-center justify-center rounded-md border border-border-strong px-3 text-label-sm font-medium hover:bg-bg-subtle',
      'focus-visible:shadow-focus focus-visible:outline-none',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

export const ToastClose = ToastPrimitive.Close;

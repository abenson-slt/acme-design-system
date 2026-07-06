import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const tagVariants = cva(
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

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Renders a dismiss "x" button and fires when it's clicked. Omit for a non-removable tag. */
  onRemove?: () => void;
  /** Accessible label for the remove button. Defaults to "Remove {children}". */
  removeLabel?: string;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, onRemove, removeLabel, children, ...props }, ref) => (
    <span ref={ref} className={cn(tagVariants({ variant }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? `Remove ${typeof children === 'string' ? children : 'tag'}`}
          className="hover:bg-bg-emphasis/10 -mr-1 inline-flex shrink-0 rounded-full p-0.5 focus-visible:shadow-focus focus-visible:outline-none"
        >
          <X className="size-3" aria-hidden="true" />
        </button>
      )}
    </span>
  )
);

Tag.displayName = 'Tag';

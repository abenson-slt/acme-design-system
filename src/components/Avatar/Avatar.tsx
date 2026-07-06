import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const avatarVariants = cva(
  'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-bg-muted font-medium text-content-muted',
  {
    variants: {
      size: {
        sm: 'size-8 text-label-sm',
        md: 'size-10 text-label-lg',
        lg: 'size-12 text-heading-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** Image URL. Falls back to initials derived from `name` if omitted or if it fails to load. */
  src?: string;
  /** Alt text for the image and source for derived initials. */
  name: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, name, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = Boolean(src) && !imgError;

    return (
      <span ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        {showImage ? (
          <img
            src={src}
            alt={name}
            className="size-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true">{getInitials(name)}</span>
        )}
        {!showImage && <span className="sr-only">{name}</span>}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

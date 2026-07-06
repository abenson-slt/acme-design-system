import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Label } from '../Label';

export interface FormFieldProps {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactElement<{ id?: string; 'aria-describedby'?: string; invalid?: boolean }>;
}

export function FormField({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const control = React.cloneElement(children, {
    id,
    'aria-describedby': describedBy,
    invalid: Boolean(error),
  });

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {control}
      {error ? (
        <p
          id={errorId}
          className="flex items-center gap-1 text-body-sm text-error"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-body-sm text-content-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

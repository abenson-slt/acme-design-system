import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle } from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast requires a `ToastProvider` mounted once near your app root (it renders the Radix Viewport for you). Trigger individual `Toast` elements from your own open/close state or toast-management hook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show toast</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Scheduled: Catch up</ToastTitle>
            <ToastDescription>Friday, February 10 at 5:57pm</ToastDescription>
          </Toast>
        </ToastProvider>
      );
    }
    return <Demo />;
  },
};

export const WithAction: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show toast with action</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Update available</ToastTitle>
            <ToastDescription>A new version is ready to install.</ToastDescription>
            <ToastAction altText="Update now" asChild>
              <button type="button">Update</button>
            </ToastAction>
          </Toast>
        </ToastProvider>
      );
    }
    return <Demo />;
  },
};

export const Variants: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true);
      return (
        <ToastProvider>
          <div className="flex flex-col gap-3">
            <Button onClick={() => setOpen(true)}>Show variants</Button>
          </div>
          {(['default', 'success', 'warning', 'error', 'info'] as const).map((variant) => (
            <Toast key={variant} variant={variant} open={open} onOpenChange={setOpen} duration={100000}>
              <ToastTitle className="capitalize">{variant}</ToastTitle>
              <ToastDescription>This is a {variant} toast message.</ToastDescription>
            </Toast>
          ))}
        </ToastProvider>
      );
    }
    return <Demo />;
  },
};

export const DarkMode: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true);
      return (
        <div className="dark min-h-64 rounded-lg bg-bg p-6">
          <ToastProvider>
            <Toast open={open} onOpenChange={setOpen} duration={100000}>
              <ToastTitle>Scheduled: Catch up</ToastTitle>
              <ToastDescription>Friday, February 10 at 5:57pm</ToastDescription>
            </Toast>
          </ToastProvider>
        </div>
      );
    }
    return <Demo />;
  },
};

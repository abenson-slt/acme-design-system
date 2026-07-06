import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
  },
  args: {
    title: 'Heads up!',
    children: 'This is an important message you should know about.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <div className="w-96">
      <Alert {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      <Alert variant="default" title="Default">
        This is a general informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        This action may have unintended consequences.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong while processing your request.
      </Alert>
      <Alert variant="info" title="Info">
        A new version of this page is available.
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: { variant: 'info', icon: false },
  render: (args) => (
    <div className="w-96">
      <Alert {...args} />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex w-96 flex-col gap-3 rounded-lg bg-bg p-6">
      <Alert variant="default" title="Default">
        This is a general informational message.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong while processing your request.
      </Alert>
    </div>
  ),
};

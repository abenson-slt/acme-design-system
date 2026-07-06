import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Enter a description...' },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Textarea {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Textarea placeholder="Default" />
      <Textarea placeholder="Disabled" disabled />
      <Textarea placeholder="Invalid" invalid defaultValue="bad value" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark w-72 rounded-lg bg-bg p-6">
      <Textarea placeholder="Dark mode" />
    </div>
  ),
};

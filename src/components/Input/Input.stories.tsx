import type { Meta, StoryObj } from '@storybook/react';
import { Search, Mail } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Enter text...' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" invalid defaultValue="bad value" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input placeholder="Search" leadingIcon={<Search />} />
      <Input placeholder="you@example.com" trailingIcon={<Mail />} />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex w-72 flex-col gap-3 rounded-lg bg-bg p-6">
      <Input placeholder="Default" />
      <Input placeholder="Invalid" invalid />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};

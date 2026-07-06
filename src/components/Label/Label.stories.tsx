import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Label text' },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-col gap-3 rounded-lg bg-bg p-6">
      <Label>Default label</Label>
      <Label required>Required label</Label>
    </div>
  ),
};

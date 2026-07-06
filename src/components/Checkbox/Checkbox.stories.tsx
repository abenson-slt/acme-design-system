import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Label } from '../Label';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" />
        <Label htmlFor="c1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" checked="indeterminate" />
        <Label htmlFor="c3">Indeterminate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" disabled />
        <Label htmlFor="c4">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c5" invalid />
        <Label htmlFor="c5">Invalid</Label>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-col gap-3 rounded-lg bg-bg p-6">
      <div className="flex items-center gap-2">
        <Checkbox id="d1" />
        <Label htmlFor="d1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="d2" defaultChecked />
        <Label htmlFor="d2">Checked</Label>
      </div>
    </div>
  ),
};

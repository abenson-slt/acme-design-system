import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Label } from '../Label';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="s1" />
        <Label htmlFor="s1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s2" defaultChecked />
        <Label htmlFor="s2">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s3" disabled />
        <Label htmlFor="s3">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s4" invalid />
        <Label htmlFor="s4">Invalid</Label>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-col gap-3 rounded-lg bg-bg p-6">
      <div className="flex items-center gap-2">
        <Switch id="sd1" />
        <Label htmlFor="sd1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="sd2" defaultChecked />
        <Label htmlFor="sd2">Checked</Label>
      </div>
    </div>
  ),
};

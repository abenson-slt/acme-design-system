import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';
import { Label } from '../Label';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <Radio value="a" id="ra" />
        <Label htmlFor="ra">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="b" id="rb" />
        <Label htmlFor="rb">Option B</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="c" id="rc" />
        <Label htmlFor="rc">Option C</Label>
      </div>
    </RadioGroup>
  ),
};

export const States: Story = {
  render: () => (
    <RadioGroup defaultValue="checked">
      <div className="flex items-center gap-2">
        <Radio value="default" id="rs1" />
        <Label htmlFor="rs1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="checked" id="rs2" />
        <Label htmlFor="rs2">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="disabled" id="rs3" disabled />
        <Label htmlFor="rs3">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="invalid" id="rs4" invalid />
        <Label htmlFor="rs4">Invalid</Label>
      </div>
    </RadioGroup>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark rounded-lg bg-bg p-6">
      <RadioGroup defaultValue="a">
        <div className="flex items-center gap-2">
          <Radio value="a" id="rda" />
          <Label htmlFor="rda">Option A</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio value="b" id="rdb" />
          <Label htmlFor="rdb">Option B</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

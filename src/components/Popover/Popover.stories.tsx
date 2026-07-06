import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from '../Button';
import { Label } from '../Label';
import { Input } from '../Input';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-heading-4 text-content">Dimensions</h4>
            <p className="text-body-sm text-content-muted">Set the dimensions for the layer.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark rounded-lg bg-bg p-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-body-sm text-content">Popover content in dark mode.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

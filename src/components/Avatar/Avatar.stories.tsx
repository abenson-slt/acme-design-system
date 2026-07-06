import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    name: 'Jane Doe',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: { size: 'md' },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/128?img=5',
    name: 'Jane Doe',
  },
};

export const FallbackInitials: Story = {
  args: {
    name: 'Jane Doe',
  },
};

export const BrokenImageFallsBack: Story = {
  args: {
    src: 'https://broken-url.invalid/avatar.png',
    name: 'Sam Lee',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" name="Jane Doe" />
      <Avatar size="md" name="Jane Doe" />
      <Avatar size="lg" name="Jane Doe" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex items-center gap-4 rounded-lg bg-bg p-6">
      <Avatar size="sm" name="Jane Doe" />
      <Avatar size="md" name="Jane Doe" />
      <Avatar size="lg" src="https://i.pravatar.cc/128?img=5" name="Alex Kim" />
    </div>
  ),
};

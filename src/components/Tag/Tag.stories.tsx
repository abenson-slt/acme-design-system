import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
  },
  args: {
    children: 'Tag',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  args: { variant: 'default' },
};

export const Removable: Story = {
  args: { variant: 'default', onRemove: () => alert('removed') },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag variant="default">Default</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
};

export const RemovableVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag variant="default" onRemove={() => {}}>
        Default
      </Tag>
      <Tag variant="success" onRemove={() => {}}>
        Success
      </Tag>
      <Tag variant="error" onRemove={() => {}}>
        Error
      </Tag>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-wrap items-center gap-3 rounded-lg bg-bg p-6">
      <Tag variant="default" onRemove={() => {}}>
        Default
      </Tag>
      <Tag variant="success" onRemove={() => {}}>
        Success
      </Tag>
      <Tag variant="error" onRemove={() => {}}>
        Error
      </Tag>
    </div>
  ),
};

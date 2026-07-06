import type { Meta, StoryObj } from '@storybook/react';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const VariantBySizeMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const).map(
        (variant) => (
          <div key={variant} className="flex items-center gap-4">
            <span className="w-24 text-body-sm text-content-muted">{variant}</span>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </Button>
            ))}
          </div>
        )
      )}
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args}>Default</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} isLoading>
        Loading
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} leadingIcon={<Plus />}>
        Leading Icon
      </Button>
      <Button {...args} trailingIcon={<ArrowRight />}>
        Trailing Icon
      </Button>
      <Button {...args} leadingIcon={<Plus />} trailingIcon={<ArrowRight />}>
        Both Icons
      </Button>
      <Button {...args} isLoading leadingIcon={<Plus />}>
        Loading With Icon
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="w-96">
      <Button {...args} fullWidth>
        Full Width
      </Button>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-bg p-6 rounded-lg flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

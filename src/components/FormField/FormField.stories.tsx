import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <FormField id="email" label="Email address">
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <FormField id="name" label="Full name" required>
        <Input placeholder="Jane Doe" />
      </FormField>
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div className="w-80">
      <FormField id="password" label="Password" hint="Must be at least 8 characters">
        <Input type="password" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <FormField id="email-err" label="Email address" error="Enter a valid email address">
        <Input defaultValue="not-an-email" />
      </FormField>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-80">
      <FormField id="bio" label="Bio" hint="A short description about yourself">
        <Textarea placeholder="Tell us about yourself..." />
      </FormField>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex w-80 flex-col gap-4 rounded-lg bg-bg p-6">
      <FormField id="email-dark" label="Email address" required>
        <Input placeholder="you@example.com" />
      </FormField>
      <FormField id="email-dark-err" label="Email address" error="Enter a valid email address">
        <Input defaultValue="not-an-email" />
      </FormField>
    </div>
  ),
};

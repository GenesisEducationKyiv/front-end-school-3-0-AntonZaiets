import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta = {
  title: 'ui/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    variant: 'outlined',
    size: 'medium',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const Basic: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small TextField',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: true,
    helperText: 'Please enter a valid email address.',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    helperText: 'This field is required.',
  },
};

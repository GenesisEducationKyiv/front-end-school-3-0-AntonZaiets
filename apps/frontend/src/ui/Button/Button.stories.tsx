import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Edit from '@mui/icons-material/Edit';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    startIcon: { control: false },
    endIcon: { control: false },
  },
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Edit',
    startIcon: <Edit />,
  },
};

export const Error: Story = {
  args: {
    variant: 'contained',
    color: 'error',
    children: 'Delete',
    startIcon: <Delete />,
  },
};

export const WithStartIcon: Story = {
  args: {
    variant: 'contained',
    startIcon: <Add />,
    children: 'Create Track',
  },
};

export const OutlinedWithIcon: Story = {
  args: {
    variant: 'outlined',
    startIcon: <Delete />,
    children: 'Select',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const PaginationButton: Story = {
  args: {
    variant: 'outlined',
    children: 'Previous',
  },
};

export const Upload: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    startIcon: <CloudUpload />,
    children: 'Upload',
  },
};

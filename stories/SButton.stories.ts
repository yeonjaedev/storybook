import { Button } from "@/components/ui/button";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      description: "Button variants",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Default Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Default Button",
      }),
    );
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Destructive Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outline",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Destructive Button",
  },
};

export const Inaccessible: Story = {
  args: {
    variant: "destructive",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Destructive Button",
    className: "bg-red-500 text-black text-[8px] text-rose-300",
  },
};

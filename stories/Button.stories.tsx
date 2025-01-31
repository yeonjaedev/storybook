import { Button } from "@/components/ui/button";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { UserRound } from "lucide-react";

// 스토리북에서 컴포넌트의 메타 데이터를 정의합니다.
const meta: Meta<typeof Button> = {
  //  스토리북에서 해당 컴포넌트 정보를 표기할 경로를 입력합니다.
  title: "Components/Button",

  // 스토리북에 적용할 실제 컴포넌트를 입력합니다.
  component: Button,

  // 스토리북의 자동 문서 생성 기능과 관련이 있습니다. 이 태그를 사용하면 스토리북이 자동으로 해당 컴포넌트에 대한 문서를 생성합니다.
  tags: ["autodocs"],

  parameters: {
    // 해당 컴포넌트의 표기 위치를 지정합니다.
    layout: "centered",
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

export const Icon: Story = {
  args: {
    variant: "outline",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: <UserRound />,
  },
};

export const Inaccessible: Story = {
  args: {
    size: "sm",
    className: "text-black-100",
    disabled: false,
    onClick: action("default click"),
    children: "Inaccessible Button",
  },
};

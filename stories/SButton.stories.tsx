import { Button } from "@/components/ui/button";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { MailOpen } from "lucide-react";
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

  // 스토리북에서 스토리를 정의할 때 사용할 수 있는 인수(args)의 유형을 지정합니다. 보통 컴포넌트에 전달되는 props 요소와 동일하게 작성합니다.
  argTypes: {
    variant: {
      control: { type: "select" },
      description: "버튼의 스타일 변형을 정의합니다. variant 값에 따라 버튼의 색상, 테두리, 배경 등이 달라질 수 있습니다.",
      options: ["default", "outline", "secondary", "ghost", "link"],
    },
    size: {
      description: "버튼의 크기를 정의합니다.",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    disabled: {
      description: "버튼을 비활성화할지 여부를 정의합니다. true이면 버튼이 클릭되지 않으며 비활성화된 스타일로 표시됩니다.",
      control: { type: "boolean" },
    },
    children: {
      description: "버튼 내부에 렌더링될 텍스트나 내용을 정의합니다.",
    },
    onClick: {
      description: "버튼을 클릭했을 때 실행될 함수를 정의합니다.",
    },
    asChild: {
      description:
        "버튼 컴포넌트가 다른 컴포넌트(예: Link 또는 사용자 정의 태그)로 감싸져야 하는 경우 설정합니다. true로 설정하면 children 대신 지정한 태그의 역할을 수행합니다.",
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/otFD9ebyHm6yYK9Nzd1qZ2/%40shadcn%2Fui---Design-System-(Community)?node-id=13-2478&t=XajwRQ9WBjmJ9yqU-4",
    },
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

export const Outlined: Story = {
  args: {
    variant: "outline",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Destructive Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Link Button",
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

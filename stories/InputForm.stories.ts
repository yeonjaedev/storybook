import { InputForm } from "@/components/input-form";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "Components/InputForm",
  component: InputForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholderText: "입력해주세요.",
    onSubmit: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step("두 글자 이하 입력 시 에러 문구가 표시된다.", async () => {
      await userEvent.type(canvas.getByPlaceholderText(args.placeholderText), "홍");
      await userEvent.click(canvas.getByRole("button"));
      await expect(canvas.getByText("Username must be at least 2 characters.")).toBeInTheDocument();
    });

    await step("사용자가 정상 데이터를 입력한다.", async () => {
      await userEvent.type(canvas.getByPlaceholderText(args.placeholderText), "길동");
    });

    await step("Submit 버튼을 클릭하면 onSubmit 함수가 호출된다.", async () => {
      await userEvent.click(canvas.getByRole("button"));
      await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
    });
  },
};

import SignupPage from "@/app/(logged-out)/sign-up/page";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "Components/SignUp",
  component: SignupPage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof SignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUp: Story = {
  // play 함수: 스토리 실행 중 상호작용 테스트 정의
  play: async ({ canvasElement, step, args }) => {
    // Storybook 캔버스 요소를 선택해 테스트 컨텍스트로 사용
    const canvas = within(canvasElement);

    // 테스트 단계를 명확히 구분하여 각 단계에서 어떤 동작이 수행되고 확인되는지 설명.
    await step("입력 폼의 유효성을 검사하고 오류 메시지를 표시합니다.", async () => {
      userEvent.click(canvas.getByRole("button", { name: /Sign up/i }));

      await waitFor(() => {
        expect(canvas.getByText(/Invalid email/i)).toBeInTheDocument();
        expect(canvas.getByText(/Password must contain at least 8 characters/i)).toBeInTheDocument();
        expect(canvas.getByText(/You must accept the terms and conditions/i)).toBeInTheDocument();
      });
    });
    await step("정상 Email 값을 입력한다.", async () => {
      await userEvent.type(canvas.getByLabelText(/Email/i), "test@kt.com");
      await expect(canvas.queryByText(/Invalid email/i)).not.toBeInTheDocument();
      await expect(canvas.getByLabelText(/Email/i)).toHaveStyle({ color: "rgb(9, 9, 11)" });
    });
    await step("정상 Account Type 값을 입력한다.", async () => {
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(within(canvasElement.ownerDocument!.body).getByRole("option", { name: /Personal/i }));
    });
    await step("정상 Password 값을 입력한다.", async () => {
      await userEvent.type(canvas.getByLabelText("Password"), "Test@4123");
      await userEvent.type(canvas.getByLabelText(/Confirm password/i), "Test@4123");
      await expect(canvas.queryByText(/Password must contain at least 8 characters/i)).not.toBeInTheDocument();
    });
    await step("약간동의에 체크한다.", async () => {
      await userEvent.click(canvas.getByLabelText(/I accept the terms and conditions/i));
      await expect(canvas.queryByText(/You must accept the terms and conditions/i)).not.toBeInTheDocument();
    });
    await step("Sign up 버튼 클릭한다.", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /Sign up/i }));
    });
  },
};

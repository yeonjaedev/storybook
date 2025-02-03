import { UserCard } from "@/components/user-card";
import { revalidatePath } from "@storybook/nextjs/cache.mock";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "Components/UserCard",
  component: UserCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Over: Story = {
  args: {
    title: "Engineering",
    employeesPresentPercentage: 80,
  },

  // play 함수: 스토리 실행 중 상호작용 테스트 정의
  async play({ canvasElement, step, args }) {
    // Storybook 캔버스 요소를 선택해 테스트 컨텍스트로 사용
    const canvas = within(canvasElement);

    // 테스트 단계를 명확히 구분하여 각 단계에서 어떤 동작이 수행되고 확인되는지 설명.
    await step(`직원이 75% 이상일 때 '${args.employeesPresentPercentage}% of employees are present'문구가 보여지고 색상은 녹색이다.`, async () => {
      const str = expect(canvas.getByText(`${args.employeesPresentPercentage}% of employees are present`));
      await str.toBeInTheDocument();
      await str.toHaveStyle("color: rgb(34, 197, 94)");
    });

    await step("버튼을 클릭하면 Employee List 팝업이 보여진다.", async () => {
      await userEvent.click(canvas.getByRole("button"));
      await expect(within(canvasElement.ownerDocument!.body).getByText("Employee List")).toBeInTheDocument();
    });
  },
};

export const Under: Story = {
  args: {
    title: "Engineering",
    employeesPresentPercentage: 48,
  },
  async play({ canvasElement, step, args }) {
    const canvas = within(canvasElement);

    await step(
      `직원이 75% 미만일 때 'Only ${args.employeesPresentPercentage}% of employees are present'문구가 보여지고 색상은 붉은색이다.`,
      async () => {
        const str = expect(canvas.getByText(`Only ${args.employeesPresentPercentage}% of employees are present`));
        await str.toBeInTheDocument();
        await str.toHaveStyle("color: rgb(239, 68, 68)");
      },
    );

    await step("버튼을 클릭하면 Employee List 팝업이 보여진다.", async () => {
      await userEvent.click(canvas.getByRole("button"));
      await expect(within(canvasElement.ownerDocument!.body).getByText("Employee List")).toBeInTheDocument();
    });
  },
};

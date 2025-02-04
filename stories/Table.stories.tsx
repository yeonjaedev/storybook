import { type Employee } from "@/app/dashboard/employees/columns";
import EmployeeList from "@/components/employee-list";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { delay, http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const meta = {
  title: "Components/DataTable",
  component: EmployeeList,
  tags: ["autodocs"],
  decorators: [Story => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
  // tanstack query 사용하기 위함
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EmployeeList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData: Employee[] = [
  {
    id: 1,
    firstName: "Colin",
    lastName: "Murray",
    teamName: "alpha",
    isTeamLeader: true,
  },
  {
    id: 2,
    firstName: "Tom",
    lastName: "Phillips",
    teamName: "alpha",
    isTeamLeader: false,
  },
  {
    id: 3,
    firstName: "Liam",
    lastName: "Fuentes",
    teamName: "alpha",
    isTeamLeader: false,
  },
  {
    id: 4,
    firstName: "Tina",
    lastName: "Fey",
    teamName: "canary",
    isTeamLeader: true,
  },
  {
    id: 5,
    firstName: "Katie",
    lastName: "Johnson",
    teamName: "canary",
    isTeamLeader: false,
  },
  {
    id: 6,
    firstName: "Tina",
    lastName: "Jones",
    teamName: "canary",
    isTeamLeader: false,
  },
  {
    id: 7,
    firstName: "Amy",
    lastName: "Adams",
    teamName: "delta",
    isTeamLeader: true,
  },
  {
    id: 8,
    firstName: "Ryan",
    lastName: "Lopez",
    teamName: "delta",
    isTeamLeader: false,
  },
  {
    id: 9,
    firstName: "Jenny",
    lastName: "Jones",
    teamName: "delta",
    isTeamLeader: false,
  },
];

export const SuccessTable: Story = {
  parameters: {
    // API 요청을 가로채고 응답을 모의하는 설정
    msw: {
      handlers: [
        http.get("https://supportme.com/employee", async ({ request }) => {
          const url = new URL(request.url);
          const teamParam = url.searchParams.get("team");
          const teamName = teamParam === "All" ? null : teamParam; // null 방지
          // teamName이 존재하면 필터링, 없으면 전체 반환
          const filteredData = teamName ? mockData.filter(value => value.teamName === teamName) : mockData;
          return HttpResponse.json(filteredData);
        }),
      ],
    },
  },

  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step("alpha 팀을 선택하면 'alpha' 팀의 데이터만 보여진다.", async () => {
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(within(canvasElement.ownerDocument!.body).getByRole("option", { name: /alpha/i }));
      await delay(300);
      expect(canvas.getAllByRole("row", { name: /alpha/i }).length).toBe(mockData.filter(data => data.teamName === "alpha").length);
    });
    await step("canary 팀을 선택하면 'canary' 팀의 데이터만 보여진다.", async () => {
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(within(canvasElement.ownerDocument!.body).getByRole("option", { name: /canary/i }));
      await delay(300);

      expect(canvas.getAllByRole("row", { name: /canary/i }).length).toBe(mockData.filter(data => data.teamName === "canary").length);
    });
    await step("delta 팀을 선택하면 'delta' 팀의 데이터만 보여진다.", async () => {
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(within(canvasElement.ownerDocument!.body).getByRole("option", { name: /delta/i }));
      await delay(300);

      expect(canvas.getAllByRole("row", { name: /delta/i }).length).toBe(mockData.filter(data => data.teamName === "delta").length);
    });
    await step("Select a team 을 선택하면 모든 데이터가 보여진다.", async () => {
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(within(canvasElement.ownerDocument!.body).getByRole("option", { name: /All/i }));
      await delay(300);

      expect(canvas.getByRole("button", { name: /Go to next page/i })).toBeEnabled();
    });
  },
};

export const FailedTable: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://supportme.com/employee", async () => {
          await delay(300);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },

  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step("에러가 발생했을 때, 에러가 발생했습니다 문구가 보여진다.", async () => {
      await delay(500);
      await expect(canvas.getByRole("table")).toBeInTheDocument();
      await expect(canvas.getByText("에러가 발생했습니다")).toBeInTheDocument();
    });
  },
};


// <DataTable columns={columns} data={employees} />;

import { Header } from "./assets/Header";
import { columns, type Employee } from "@/app/dashboard/employees/columns";
import { EmployeeList } from "@/components/EmployeeList";
import { DataTable } from "@/components/ui/data-table";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ColumnDef } from "@tanstack/react-table";
import { delay, http, HttpResponse } from "msw";

const meta = {
  title: "Components/DataTable",
  component: EmployeeList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
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
    avatar: "/images/cm.jpg",
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
    avatar: "/images/tf.jpg",
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
    avatar: "/images/rl.jpg",
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
    msw: {
      handlers: [
        http.get("https://supportme.com/employee", async () => {
          await delay(500);
          return HttpResponse.json(mockData);
        }),
      ],
    },
  },
};

export const InputValueTable: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://supportme.com/employee", async () => {
          await delay(500);
          return HttpResponse.json(mockData.filter(value => value.teamName === "delta"));
        }),
      ],
    },
  },
};

export const FailedTable: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://supportme.com/employee", async () => {
          await delay(800);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};

// <DataTable columns={columns} data={employees} />;

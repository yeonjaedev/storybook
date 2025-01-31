import { queryOptions } from "@tanstack/react-query";

export function getEmployeeListQuery(team: string) {
  return queryOptions({
    queryKey: ["employee", team],
    queryFn: async () => {
      const response = await fetch(team ? `https://supportme.com/employee?team=${team}` : "https://supportme.com/employee");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 0,
    retry: false,
  });
}

export const employeeQueryService = {
  getEmployeeListQuery: (team: string) =>
    queryOptions({
      queryKey: ["employee", team],
      queryFn: () => getEmployeeList(team),
      staleTime: 0,
      gcTime: 0,
      retry: false,
    }),
};

export async function getEmployeeList(team: string) {
  const response = await fetch(team ? `https://supportme.com/employee?team=${team}` : "https://supportme.com/employee");
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

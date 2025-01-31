"use client";

import { columns } from "@/app/dashboard/employees/columns";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { employeeQueryService, getEmployeeList, getEmployeeListQuery } from "@/hooks/use-employee-query";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { z } from "zod";

const Table = ({ team }: { team: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employee", team],
    queryFn: () => getEmployeeList(team),
    staleTime: 0,
    cacheTime: 0,
    retry: false,
  });

  if (isLoading)
    return (
      <div className="w-96 h-96 justify-center items-center flex">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <DataTable columns={columns} data={[]} errorMsg={"에러가 발생했습니다"} />;
  return <DataTable columns={columns} data={data} />;
};

const inputSchema = z.object({
  team: z.string(),
});
type InputSchema = z.infer<typeof inputSchema>;

const EmployeeList = () => {
  const form = useForm<InputSchema>({ resolver: zodResolver(inputSchema) });
  const [team, setTeam] = React.useState<string>("");

  return (
    <>
      <form className="space-x-1 flex flex-col w-40">
        <Select onValueChange={data => setTeam(data)}>
          <SelectGroup>
            <SelectTrigger>
              <SelectValue {...form.register("team")} placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {["Select a team", "alpha", "canary", "delta"].map(id => (
                <SelectItem key={id} value={String(id)}>
                  {id}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>
      </form>
      <div className="w-[500px] h-96 mt-2">
        <Table team={team} />
      </div>
    </>
  );
};
export default EmployeeList;

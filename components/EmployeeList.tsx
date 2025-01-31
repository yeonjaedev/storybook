"use client";

import { columns } from "@/app/dashboard/employees/columns";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect, useCallback } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Example hook to retrieve data from an external endpoint
function useFetchData(team?: string) {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setStatus("loading");
    fetch(team ? `https://supportme.com/employee?team=${team}` : "https://supportme.com/employee")
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        setStatus("success");
        setData(data);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return {
    status,
    data,
  };
}

const List = () => {
  const { status, data } = useFetchData();

  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (status === "error") {
    return (
      <>
        <DataTable columns={columns} data={[]} errorMsg={"에러가 발생했습니다"} />
      </>
    );
  } else if (data) {
    return (
      <>
        <DataTable columns={columns} data={data} />
      </>
    );
  } else {
    return <></>;
  }
};

const inputSchema = z.object({
  team: z.string(),
});
type InputSchema = z.infer<typeof inputSchema>;

export const EmployeeList = () => {
  const form = useForm<InputSchema>({ resolver: zodResolver(inputSchema) });
  const [team, setTeam] = useState<string>("");

  // useEffect(() => {
  //   useFetchData(team);
  // }, [team]);

  return (
    <>
      <form className="space-x-1 flex flex-col w-40">
        <Select onValueChange={data => setTeam(data)}>
          <SelectGroup>
            <SelectTrigger>
              <SelectValue {...form.register("team")} placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {["alpha", "canary", "delta"].map(id => (
                <SelectItem key={id} value={String(id)}>
                  {id}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>
      </form>
      <List />
    </>
  );
};
export default EmployeeList;

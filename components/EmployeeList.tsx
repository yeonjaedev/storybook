import { columns } from "@/app/dashboard/employees/columns";
import { InputForm } from "@/components/input-form";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

// Example hook to retrieve data from an external endpoint
function useFetchData() {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setStatus("loading");
    fetch("https://supportme.com/employee")
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

export function EmployeeList() {
  const { status, data } = useFetchData();

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  if (status === "error") {
    return (
      <>
        <DataTable columns={columns} data={[]} errorMsg={"에러가 발생했습니다"} />
      </>
    );
  }
  return Page(data);
}

export function Page(data: any) {
  // const [name, setName] = useState<string>("");
  return (
    <>
      <div className="flex flex-row	space-x-2 my-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Team</SelectLabel>
              <SelectItem value="alpha">alpha</SelectItem>
              <SelectItem value="canary">canary</SelectItem>
              <SelectItem value="delta">delta</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={data} />
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, BadgeCheckIcon, UserCheck2Icon, UserRoundXIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

interface UserCardProps {
  title: string;
  employeesPresentPercentage: number;
}

export const UserCard = ({ title, employeesPresentPercentage }: UserCardProps) => {
  return (
    <Card className="w-80">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-between">
          <div className="flex gap-2">
            {employeesPresentPercentage > 75 ? <UserCheck2Icon /> : <UserRoundXIcon />}
            <div className="text-5xl font-bold">{employeesPresentPercentage}</div>
          </div>
          <div>
            <Button size="xs" asChild>
              <Link href="/dashboard/teams">View all</Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {employeesPresentPercentage > 75 ? (
          <span className="text-xs text-green-500 flex gap-1 items-center">
            <BadgeCheckIcon />
            {employeesPresentPercentage}% of employees are present
          </span>
        ) : (
          <span className="text-xs text-red-500 flex gap-1 items-center">
            <AlertTriangleIcon />
            Only {employeesPresentPercentage}% of employees are present
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

// components/dashboard/Dashboard.tsx
import { Card, CardContent } from "../ui/card";
import { UserInfo } from "./userinfoOld";
import { BreadcrumbDemo } from "./admin/BreadCurmb";
import { MyLogoutButton } from "./MyLogoutButton";
import { CalendarDemo } from "./admin/Cal";

type Props = {
  user: {
    name: string;
    id: string;
    number: string;
    number_p: string;
    home: string;
  };
  availableDates: string[];
};

export default function Dashboard({ user, availableDates }: Props) {
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="max-w-5xl w-full flex justify-between p-4 bg-[#e9ae38] items-center">
          <img src="/cho.png" className="w-40 mr-4" alt="Logo" />
          <BreadcrumbDemo />
          <MyLogoutButton />
        </Card>
      </div>

      <Card className="max-w-5xl mx-auto p-6 mt-10">
        <div className="flex justify-between">
          <UserInfo user={user} />
          <CardContent className="p-0"></CardContent>
        </div>

        <div className="flex justify-center mt-6">
          <div className="scale-400">
            <CalendarDemo seniorId={user.id} availableDates={availableDates} />
          </div>
        </div>
      </Card>
    </div>
  );
}

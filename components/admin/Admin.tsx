import AdminInfo from "./AdminInfo";
import Find from "./Find";
import Elder from "./Elder";
import { Card, CardContent } from "@/components/ui/card";

type AdminProps = {
  admin: {
    name: string;
    email: string;
  };
  seniors: {
    id: string;
    name: string;
  }[];
};

export function Admin({ admin, seniors }: AdminProps) {
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="max-w-5xl w-full flex justify-between p-4 bg-red-600" />
      </div>

      <Card className="max-w-5xl mx-auto p-6 mt-10">
        <AdminInfo Admin={admin} />
        <CardContent className="p-0">
          <Elder Info={seniors} />
        </CardContent>
      </Card>
    </div>
  );
}

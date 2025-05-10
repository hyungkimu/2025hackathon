import AdminInfo from "./AdminInfo";
import { MyLogoutButton } from "../dashboard/MyLogoutButton";
import Elder from "./Elder";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type AdminProps = {
  admin: {
    id: string;
    name: string;
    email: string;
  };
  seniors: {
    id: string;
    name: string;
  }[];
};

export function Admin({ admin, seniors }: AdminProps) {
  console.log(admin);
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="max-w-5xl w-full flex justify-between items-center p-4 bg-[#e9ae38]">
          <Image src="/cho.png" width={150} height={100} alt="empty" />
          <MyLogoutButton />
        </Card>
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

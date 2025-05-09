import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuDemo } from "./DropDown";

type Props = {
  name: string;
  id: string;
  number: string;
  number_p: string;
  home: string;
};

export function UserInfo({ user }: { user: Props }) {
  return (
    <div className="flex w-full gap-4 mb-8 p-4 pb-8 border-b">
      <Link href="/imageedit">
        <Avatar className="w-[8em] h-[8em] cursor-pointer hover:opacity-80 transition">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback />
        </Avatar>
      </Link>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex-1 pt-5">
          <p className="ml-2 text-xl font-semibold">{user.name}</p>
          <div className="flex">
            <p className="ml-2 mt-2 text-sm text-muted-foreground">
              사용자 번호 : {user.number} |
            </p>

            <p className="text-sm mt-2 text-muted-foreground ml-3">
              보호자 번호 : {user.number_p}{" "}
            </p>
          </div>
          <div className="flex">
            <p className=" ml-2 mt-2 text-sm text-muted-foreground">
              아이디 : {user.id} |{" "}
            </p>
            <p className="text-sm mt-2 text-muted-foreground ml-3">
              주소 : {user.home}{" "}
            </p>
          </div>
        </div>
      </div>

      <DropdownMenuDemo />
    </div>
  );
}

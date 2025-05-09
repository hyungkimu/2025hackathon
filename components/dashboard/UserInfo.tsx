import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Props = {
    name: string;
    school: string;
    department: string;
}

export function UserInfo({ user } : { user : Props }){
    return(
    <div className="flex gap-4 mb-8 p-4 pb-8 border-b">
        <Avatar className="w-[8em] h-[8em]">
          <AvatarImage src="/avatar.png"/>
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col h-full">
            <div className="flex-1 pt-5">
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.school} | {user.department}</p>
            </div>
            <Button className="mt-5 w-[100px]" size="sm" variant="outline">프로필 수정</Button>
        </div>
    </div>
    );
}
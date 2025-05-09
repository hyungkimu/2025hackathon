import { Folder } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Props = {
    title: string;
}

export function SubjectInfo({ subject } : { subject : Props }){
    return(
    <div className="flex gap-4 mb-8 p-4 pb-8 border-b">
        <Avatar className="w-[8em] h-[8em]">
          <AvatarFallback>
            <Folder className="w-[90px] h-[90px] text-primary" strokeWidth={0} fill="#f9da62" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col h-full">
            <div className="flex-1 pt-5">
                <p className="text-xl font-semibold">{subject.title}</p>
            </div>
        </div>
    </div>
    );
}
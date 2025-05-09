import * as React from "react"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"

type Props = {
    name: string;
    email: string;
}

export default function AdminInfo({ Admin }: {Admin: Props} ){
    return (
        <div className="flex gap-12 mb-8 p-4 pb-8 border-b">
            <Avatar className="w-[8em] h-[8em]">
                {/* <AvatarImage src="/avatar.png"/> */}
                <AvatarFallback className="w-[2em] h-[2em] flex items-center justify-center text-7xl rounded-full bg-gray-200">
                    {Admin.name[0]}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col h-full">
                <div className="flex-1 pt-5">
                    <p className="text-xl font-semibold">{Admin.name}</p>
                    <p className="text-sm text-muted-foreground">{Admin.email}</p>
                </div>
                <Button className="mt-5 w-[100px]" size="sm" variant="outline">프로필 수정</Button>
            </div>
        </div>
  )
}
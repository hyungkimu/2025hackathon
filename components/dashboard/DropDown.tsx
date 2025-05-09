import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">회원정보 수정</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        
        <DropdownMenuLabel>회원정보 수정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link href="/resetname">
          <DropdownMenuItem>
            이름 변경
            
          </DropdownMenuItem>
          </Link>

          <Link href="/resetnum">
          <DropdownMenuItem>
            번호 변경
           
          </DropdownMenuItem>
          </Link>

          <Link href="/resetaddress">
          <DropdownMenuItem>
            주소 변경
            
          </DropdownMenuItem>
        </Link>
        <Link href="/resetid">
          <DropdownMenuItem>
            아이디 변경
            
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        
         </DropdownMenuContent>
        </DropdownMenu>
      
  )
}

import { LogoutButton } from "./LogoutButton";
import { Logo } from "./Logo";

// 사이드바
export function Sidebar() {
  return (
    <nav className="h-full p-5 bg-[#a33b39] flex flex-col text-white ring-2 ring-black">
      <div className="flex justify-center text-3xl font-bold">사이트 이름</div>
      {/* 로고 영역 + 메뉴 아이템 */}
      <div className="flex-1 overflow-y-auto">
        <Logo />
      </div>
      {/* 로그아웃 버튼 영역 */}
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}

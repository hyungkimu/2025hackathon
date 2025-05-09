import Image from "next/image";

//위에 사이트 이름 및 띠띠
export function Header() {
  return (
    <div className="w-full h-[96px] bg-[#a33b39] flex items-center justify-center">
      <Image
        src="/네이버.jpg"
        className="mb-2"
        alt="사이트 로고"
        width={120}
        height={40}
      />
    </div>
  );
}

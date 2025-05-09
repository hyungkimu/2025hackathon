import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

//프로필 구성성
export function Logo() {
  return (
    <Link href={BASE_URL} className="flex flex-col items-center mt-4">
      <div className="w-[220px] h-[220px] bg-white rounded-full flex items-center justify-center ring-2 ring-black">
        <Image
          className="mb-2"
          width={150}
          height={150}
          src="/세린이.png"
          alt="logo"
        />
      </div>
      <h1 className="text-2xl font-bold">NickName</h1>
    </Link>
  );
}

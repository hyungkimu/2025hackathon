import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string;
  footer: { label: string; href: string };
  children: React.ReactNode;
  reverse?: boolean;
};
/*
export function FormCard({ title, footer, children }: Props) {
  return (
    <Card className="w-[500px] flex flex-col items-center border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>
      <CardFooter>
        <Link className="text-sm text-sky-700" href={footer.href}>
          {footer.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
//추가가
*/
/*
export function FormCard({ title, footer, children }: Props) {
  return (
    <div className="w-[800px] h-[500px] bg-gray-100 rounded-xl shadow-lg flex overflow-hidden">
    
      <div className="w-1/2 p-10 flex flex-col items-center justify-center gap-5 bg-white">
        
        <h2 className="text-3xl font-bold mt-4">{title}</h2>
        
       
        <div className="w-full">{children}</div>
        <Link className="text-sm text-sky-700" href={footer.href}>
          {footer.label}
        </Link>
      </div>

    
      <div className="w-1/2 bg-[#EB4D3D] text-white flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcom</h2>
        <p className="mb-6">
          아직 계정이 없으신가요?<br />
        </p>
        <Link href="/signup">
          <button className="bg-white text-[rgb(143,29,16)] px-6 py-2 rounded-full font-semibold shadow-lg">
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  );
}

*/

export function FormCard({ title, footer, children, reverse = false }: Props) {
  return (
    <div className="w-[800px] h-[500px] bg-gray-100 rounded-xl shadow-lg flex overflow-hidden">
      {/* 좌우 레이아웃 조건부 렌더링 */}
      {!reverse ? (
        <>
          {/* 왼쪽: Form */}
          <div className="w-1/2 p-10 flex flex-col items-center justify-center gap-5 bg-white">
            <h2 className="text-3xl font-bold mt-4">{title}</h2>
            <div className="w-full">{children}</div>
          </div>

          {/* 오른쪽: 배경 */}
          <div className="w-1/2 bg-[#ea3b44] text-white flex flex-col items-center justify-center p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome</h2>
            <p className="mb-6">아직 계정이 없으신가요?</p>
            <Link href="/managersignup">
              <button className="bg-white text-[rgb(143,29,16)] px-6 py-2 rounded-full font-semibold shadow-lg">
                SIGN UP
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* 왼쪽: 배경 */}
          <div className="w-1/2 bg-[#ea3b44] text-white flex flex-col items-center justify-center p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="mb-6">이미 계정이 있으신가요?</p>
            <Link href="/managerlogin">
              <button className="bg-white text-[rgb(143,29,16)] px-6 py-2 rounded-full font-semibold shadow-lg">
                LOGIN
              </button>
            </Link>
          </div>

          {/* 오른쪽: Form */}
          <div className="w-1/2 p-10 flex flex-col items-center justify-center gap-5 bg-white">
            <h2 className="text-3xl font-bold mt-4">{title}</h2>
            <div className="w-full">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}

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
  children: React.ReactNode;
};

export function UserFormCard({ title, children }: Props) {
  return (
    <div className="w-[400px] h-[500px] rounded-xl shadow-lg    ">
      <div className=" p-10 flex flex-col items-center justify-center gap-5 bg-white">
        <h2 className="text-3xl font-bold mt-4">{title}</h2>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

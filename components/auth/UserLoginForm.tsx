"use client";
import { ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormMessage } from "./FormMessage";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { TUserLoginFormError } from "@/types/form";
import { Submit } from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { UserLoginSchema } from "@/schemas/auth";
import { login } from "@/actions/login";
import { UserFormCard } from "./UserFormCard";
import { userlogin } from "@/actions/userlogin";
import { useRouter } from "next/navigation";

export function UserLoginForm() {
  const router = useRouter();
  const [error, action] = useFormState(userlogin, undefined);
  const { errors, validateField } =
    useFormValidate<TUserLoginFormError>(UserLoginSchema);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.success) {
      router.push(`/diary/${error.userId}`);
    } else if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <UserFormCard title="로그인">
      <form
        action={action}
        className="space-y-6 flex flex-col items-center justify-center"
      >
        {/*아이디디*/}
        <div className="space-y-1">
          <Label htmlFor="id" className="ml-3">
            아이디
          </Label>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="12345678"
            error={!!errors?.id}
            onChange={handleChange}
            className="w-full max-w-md bg-[#faf8f8] px-4 py-4 my-2 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
          />
          {errors?.id && <FormMessage message={errors?.id[0]} />}
        </div>
        {/*비밀번호*/}
        <div className="space-y-1">
          <Label htmlFor="name" className="ml-3">
            이름
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="홍길동"
            error={!!errors?.name}
            onChange={handleChange}
            className="w-full max-w-md bg-[#faf8f8] px-4 py-4 my-2 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        <Submit className="text-white bg-[rgb(220,20,60)] px-6 py-2 rounded-full font-semibold shadow-lg">
          로그인
        </Submit>
      </form>
    </UserFormCard>
  );
}
//className="bg-[#c01414] px-4 py-4 my-2 w-[85%] border-0 outline-none rounded-[20px] shadow-[7px_2px_6px_#6c0a0a]"

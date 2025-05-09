"use client";
import { ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { FormMessage } from "./FormMessage";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { TManagerLoginFormError } from "@/types/form";
import { Submit } from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { LoginSchema } from "@/schemas/auth";
import { login } from "@/actions/login";

export function LoginForm() {
  const [error, action] = useFormState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TManagerLoginFormError>(LoginSchema);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/managersignup" }}
    >
      <form
        action={action}
        className="space-y-6 flex flex-col items-center justify-center"
      >
        {/*이메일*/}
        <div className="space-y-1">
          <Label htmlFor="email" className="ml-3">
            이메일
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
            className="w-full max-w-md bg-[#faf8f8] px-4 py-4 my-2 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
          />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        {/*비밀번호*/}
        <div className="space-y-1">
          <Label htmlFor="password" className="ml-3">
            비밀번호
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
            className="w-full max-w-md bg-[#faf8f8] px-4 py-4 my-2 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="text-white bg-[rgb(220,20,60)] px-6 py-2 rounded-full font-semibold shadow-lg">
          로그인
        </Submit>
      </form>
    </FormCard>
  );
}
//className="bg-[#c01414] px-4 py-4 my-2 w-[85%] border-0 outline-none rounded-[20px] shadow-[7px_2px_6px_#6c0a0a]"

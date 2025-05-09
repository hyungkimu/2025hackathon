"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { ManagerInsertSchema } from "@/schemas/auth";
import { useFormState } from "react-dom";
import { useFormValidate } from "@/hooks/useFormValidate";
import { TRegistFormError } from "@/types/form";
import { toast } from "react-hot-toast";
import { FormMessage } from "../auth/FormMessage";
import { Input } from "../ui/input";
import { Submit } from "./RegistSubmit";
import { regist } from "@/actions/regist";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

export default function Regist({ isOpen, onClose, onCreate }: Props) {
  const [elderName, setelderName] = useState("");
  const [elderId, setelderId] = useState("");
  const [elderadress, setelderAdress] = useState("");
  const [elderPhone, setelderPhone] = useState("");
  const [guardPhone, setguardPhone] = useState("");

  const [error, action] = useFormState(regist, undefined);
  const { errors, validateField } =
    useFormValidate<TRegistFormError>(ManagerInsertSchema);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      id: elderId,
      name: elderName,
      elderPhone,
      guardPhone,
      elderadress,
    };

    const result = ManagerInsertSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      Object.entries(errors).forEach(([key, value]) => {
        if (value && value[0]) {
          toast.error(`${key}: ${value[0]}`);
        }
      });
      return;
    }

    // 서버 액션 호출
    const response = await regist(undefined, new FormData(e.currentTarget));
    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    } else {
      toast.success(response.successMessage ?? "");
      onCreate(elderName);
      setelderName("");
      setelderPhone("");
      setguardPhone("");
      setelderId("");
      setelderAdress("");
      onClose(); // 창 닫기
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);

    if (name === "name") setelderName(value);
    else if (name === "id") setelderId(value);
    else if (name === "elderPhone") setelderPhone(value);
    else if (name === "guardPhone") setguardPhone(value);
    else if (name === "elderadress") setelderAdress(value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-6 pt-10 py-10 rounded-md shadow-md w-[450px]">
        <h2 className="flex text-3xl font-bold mb-5 justify-center">등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            이름
            <Input
              type="text"
              name="name"
              value={elderName}
              onChange={handleChange}
              error={!!errors?.name}
              placeholder="홍길동"
              className="w-full border px-3 py-2 mb-6 rounded-md"
            />
            {errors?.name && <FormMessage message={errors?.name[0]} />}
          </div>

          <div className="flex flex-col gap-2">
            ID
            <Input
              type="text"
              name="id"
              value={elderId}
              onChange={handleChange}
              error={!!errors?.id}
              placeholder="12345678"
              className="w-full border px-3 py-2 mb-6 rounded-md"
            />
            {errors?.id && <FormMessage message={errors?.id[0]} />}
          </div>

          <div className="flex flex-col gap-2">
            연락처
            <Input
              type="text"
              name="elderPhone"
              value={elderPhone}
              onChange={handleChange}
              error={!!errors?.elderPhone}
              placeholder="01012345678"
              className="w-full border px-3 py-2 mb-6 rounded-md"
            />
            {errors?.elderPhone && (
              <FormMessage message={errors?.elderPhone[0]} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            보호자 연락처
            <Input
              type="text"
              name="guardPhone"
              value={guardPhone}
              onChange={handleChange}
              error={!!errors?.guardPhone}
              placeholder="01012345678"
              className="w-full border px-3 py-2 mb-6 rounded-md"
            />
            {errors?.guardPhone && (
              <FormMessage message={errors?.guardPhone[0]} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            주소
            <Input
              type="text"
              name="elderadress"
              value={elderadress}
              onChange={handleChange}
              error={!!errors?.elderadress}
              placeholder="서울특별시 광진구 능동로 209"
              className="w-full border px-3 py-2 mb-6 rounded-md"
            />
            {errors?.elderadress && (
              <FormMessage message={errors?.elderadress[0]} />
            )}
          </div>

          <div className="flex w-full justify-end gap-2">
            <button
              type="button"
              className="px-4 flex-1 py-2 bg-gray-300 rounded-md"
              onClick={() => {
                setelderName("");
                setelderPhone("");
                setguardPhone("");
                setelderId("");
                setelderAdress("");
                onClose();
              }}
            >
              취소
            </button>
            <button
              className="px-4 flex-1 py-2 bg-red-500 text-white rounded-md"
              type="submit"
            >
              생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

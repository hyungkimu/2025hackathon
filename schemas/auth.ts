import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "패스워드는 최소 8자 이상이어야 합니다." })
    .regex(/[A-Z]/, {
      message: "패스워드는 최소 1개 이상의 대문자를 포함해야 합니다.",
    })
    .regex(/[a-z]/, {
      message: "패스워드는 최소 1개 이상의 소문자를 포함해야 합니다.",
    })
    .regex(/[0-9]/, {
      message: "패스워드는 최소 1개 이상의 숫자를 포함해야 합니다.",
    })
    .regex(/[\W_]/, {
      message: "패스워드는 최소 1개 이상의 특수문자를 포함해야 합니다.",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식을 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "패스워드를 입력해주세요.",
  }),
});

export const UserLoginSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  id: z.string().regex(/^\d{8}$/, {
    message: "아이디는 8자리의 숫자여야 합니다.",
  }),
});

export const ManagerInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  id: z.string().regex(/^\d{8}$/, {
    message: "아이디는 정확히 8자리의 숫자여야 합니다.",
  }),
  elderPhone: z.string().regex(/^\d{11}$/, {
    message: "전화번호는 11자리 숫자여야 합니다.",
  }),
  guardPhone: z.string().regex(/^\d{11}$/, {
    message: "보호자 전화번호는 11자리 숫자여야 합니다.",
  }),
  elderadress: z.string().min(1, { message: "주소를 입력해주세요." }),
});

export const AdminEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  email: z.string().email("유효한 이메일을 입력하세요"),
});

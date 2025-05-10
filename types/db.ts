// src/types/db.ts
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // 관리자 비밀번호 필드 (선택적)
  adminId?: string; // 관리자 ID (선택적, Admin에만 있음)
  seniorId?: string; // 시니어 ID (선택적, Senior에만 있음)
  phone?: string; // 시니어 전화번호 (선택적)
  guardianPhone?: string; // 보호자 전화번호 (선택적)
  address?: string; // 주소 (선택적)
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Resetnum() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-[#f5f5f5] p-4">
      {/* 사용자 전화번호 변경 카드 */}
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <div className="text-lg font-semibold">사용자 전화번호 변경</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="userPhone">새 전화번호</Label>
          <Input
            id="userPhone"
            placeholder="새 전화번호를 입력하세요"
            className="w-full bg-[#faf8f8] px-4 py-4 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="text-white bg-[rgb(220,20,60)] px-6 py-2 rounded-full font-semibold shadow-lg"
            >
              전화번호 변경
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 보호자 전화번호 변경 카드 */}
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <div className="text-lg font-semibold">보호자 전화번호 변경</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="guardianPhone">새 전화번호</Label>
          <Input
            id="guardianPhone"
            placeholder="새 전화번호를 입력하세요"
            className="w-full bg-[#faf8f8] px-4 py-4 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="text-white bg-[rgb(220,20,60)] px-6 py-2 rounded-full font-semibold shadow-lg"
            >
              전화번호 변경
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

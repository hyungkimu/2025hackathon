"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetAddress() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="text-lg font-semibold">주소 변경</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">새 주소</Label>
            <Input
              id="address"
              placeholder="새 주소를 입력하세요"
              className="w-full bg-[#faf8f8] px-4 py-4 border-0 outline-none rounded-[20px] shadow-[inset_7px_2px_7px_#babebc,inset_-5px_-5px_12px_#fff]"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="text-white bg-[rgb(220,20,60)] px-6 py-2 rounded-full font-semibold shadow-lg"
            >
              주소 변경
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

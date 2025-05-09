"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { UserInfo } from "./userinfoOld";
import { BreadcrumbDemo } from "./admin/BreadCurmb";
import { MyLogoutButton } from "./MyLogoutButton";
import { CalendarDemo } from "./admin/Cal";

type FileItemType = {
  id: number;
  name: string;
};

const dummyUser = {
  name: "홍길동",
  id: "12345",
  number: "010-0000-0000",
  number_p: "010-1234-5667",
  home: "서울시 능동로",
};

export default function Dashboard({
  availableDates,
}: {
  availableDates: string[];
}) {
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="max-w-5xl w-full flex justify-between p-4 bg-[#e9ae38] items-center">
          {/* 적당한 크기와 위치로 조정한 이미지 */}
          <img src="/cho.png" className="w-20 h-20 mr-4" alt="Logo" />

          {/* Breadcrumb, Logout 버튼 등 나머지 요소 */}
          <BreadcrumbDemo />
          <MyLogoutButton />
        </Card>
      </div>

      <Card className="max-w-5xl mx-auto p-6 mt-10">
        <div className="flex justify-between">
          <UserInfo user={dummyUser} />
          <CardContent className="p-0"></CardContent>
        </div>

        <div className="flex justify-center mt-6">
          <div className="scale-400">
            <CalendarDemo availableDates={availableDates} />
          </div>
        </div>
      </Card>
    </div>
  );
}

import { getOrCreateDiaryId } from "@/data/diary";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { seniorId } = req.body;

  if (!seniorId) {
    return res.status(400).json({ message: "seniorId is required" });
  }

  try {
    // 다이어리 ID를 생성하거나 이미 존재하는 다이어리 ID를 가져옴
    const diaryId = await getOrCreateDiaryId(seniorId);

    return res.status(200).json({ diaryId });
  } catch (error) {
    console.error("다이어리 생성 실패:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

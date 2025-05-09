import { MouseEvent } from "react";
import { Button } from "../ui/button";

type Props = {
  onCancel: () => void;
  onConfirm: (event: MouseEvent<HTMLElement>) => void;
};

export function ModalFooter({ onCancel, onConfirm }: Props) {
  return (
    <>
      <Button variant="destructive" onClick={onConfirm}>
        삭제
      </Button>
      <Button onClick={onCancel}>취소</Button>
    </>
  );
}

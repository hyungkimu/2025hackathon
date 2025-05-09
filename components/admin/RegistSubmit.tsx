import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";

export function Submit({ children, ...others }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button className="px-4 flex-1 py-2 bg-red-500 text-white rounded-md" type="submit" disabled={pending} {...others}>
            {children}
        </Button>
    );
}

import { cn } from "@/lib/utils";
import type React from "react";

export function H1({...props}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactNode {
    return (
        <h1 className={cn("text-3xl font-bold text-shadow-gray-800", props.className)} {...props}></h1>
    )
}
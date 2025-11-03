import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariant = cva("font-bold rounded hover:cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-teal-500 hover:bg-teal-600 text-white h-10",
            secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900 h-10",
        },
        size: {
            default: "py-2 px-4",
            small: "py-1 px-2",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    }
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {

}

export function Button({ className, variant, size, ...props }: ButtonProps): React.ReactNode {
    return (
        <button className={cn(buttonVariant({ variant, size }), className)} role="button" {...props}>
        </button>
    )
}
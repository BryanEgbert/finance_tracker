import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariant = cva("font-bold rounded cursor-pointer transition-colors", {
    variants: {
        variant: {
            primary: "bg-teal-600 hover:bg-teal-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
            secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
            danger: "text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
            link: "text-teal-600 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
        },
        size: {
            default: "py-2 px-4 h-10",
            small: "py-1 px-2 text-sm",
            icon: "py-1 px-1",
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
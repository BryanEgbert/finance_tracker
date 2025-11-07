import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textButtonVariant = cva("inline-flex items-center font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2", {
    variants: {
        variant: {
            primary: "text-teal-600 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
            secondary: "text-slate-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
            danger: "text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
        },
        size: {
            default: "text-base px-3 py-1",
            small: "text-sm px-2 py-1",
            icon: "text-base px-1 py-1",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    }
})

export interface TextButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof textButtonVariant> {

}

export function TextButton({ className, variant, size, onClick, ...props }: TextButtonProps): React.ReactNode {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <a 
            className={cn(textButtonVariant({ variant, size }), className)} 
            role="button"
            onClick={handleClick}
            {...props}
        />
    )
}

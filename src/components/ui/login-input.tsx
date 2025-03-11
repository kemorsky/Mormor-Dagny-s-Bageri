import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function InputLogin({className, ...props}: InputProps) {
    return <input className={cn("w-full h-[2.75rem] px-4 py-3 inline-flex items-start justify-start self-stretch rounded bg-Branding-input border border-Branding-textAccent font-inter text-base text-Branding-textSecondary font-semibold focus:border-white focus:outline-none relative", className)}{...props}/>
}
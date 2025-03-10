import { cn } from "../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function InputLogin({className, ...props}: InputProps) {
    return <input className={cn("w-full h-[2.6875rem] px-4 py-3 inline-flex items-start justify-start self-stretch rounded gap-2.5 bg-zinc-800 border border-amber-400 text-base font-semibold", className)}{...props}/>
}
import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputPrimary: React.FC<InputProps> = ({className, ...props}) => {
    return <input className={cn("w-full h-[2.75rem] px-4 py-3 inline-flex items-start justify-start self-stretch rounded bg-Branding-input border border-Branding-textAccent font-inter text-base text-Branding-textPrimary font-semibold focus:border-white focus:outline-none", className)}{...props}/>;
}

export const InputAmount: React.FC<InputProps> = ({className, ...props}) =>  {
    return <input type="text" className={cn("bg-white w-[3.25rem] h-[2.625rem] rounded-[0.5rem] text-[1rem] text-black text-center px-2 py-1", className)} {...props}/>
}

export const InputOrderDropdown: React.FC<InputProps> = ({className, ...props}) => {
    return <input className={cn("w-full min-h-[2.75rem] px-4 py-3 inline-flex items-start justify-start self-stretch rounded bg-Branding-input border border-Branding-textAccent font-inter text-base text-Branding-textPrimary font-semibold focus:border-white focus:outline-none relative", className)}{...props}/>;
}
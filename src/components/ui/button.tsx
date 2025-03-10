import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonLogin({className, ...props}: ButtonProps) {
    return (
        <button className={cn("font-lato w-full px-6 py-4 bg-Branding-Accent-Login-Button rounded-xl border border-amber-400 inline-flex justify-center items-center text-amber-400 text-[1.25rem] leading-[1.5rem] font-bold", className)}{...props}>Logga In</button>
    )
};
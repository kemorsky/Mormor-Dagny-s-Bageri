import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary: React.FC<ButtonProps> = ({className, ...props}) => {
    return (
        <button className={cn("font-lato font-bold w-[232px] px-4 py-3 bg-Branding-primaryButton hover:bg-Branding-primaryButton/80 transition-colors rounded-xl border border-Branding-textAccent inline-flex justify-center items-center text-Branding-textAccent text-[1.125rem] leading-[1.5rem]", className)}
        {...props}>
        </button>
    )
};
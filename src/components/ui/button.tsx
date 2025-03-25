import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(
                "font-lato font-bold w-[232px] px-4 py-3 bg-Branding-primaryButton hover:bg-Branding-primaryButton/80 transition-colors rounded-xl border border-Branding-textAccent inline-flex justify-center items-center text-Branding-textAccent text-[1.125rem] leading-[1.5rem]",
                className
            )}
            {...props}
        />
    );
};

export const ButtonSecondary: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(
                "font-lato font-semibold w-auto px-4 py-3 bg-blue-800 hover:bg-blue-500 text-white border border-gray-300 rounded-[12px] transition-colors inline-flex justify-center items-center text-[1.125rem] leading-[1.5rem]",
                className
            )}
            {...props}
        >
            Se alla
        </button>
    );
};

export const ButtonTertiary: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(
                "font-lato font-semibold w-auto px-4 py-3 bg-gray-700 hover:bg-gray-500 text-[rgb(232,185,35)] border border-[rgb(232,185,35)] rounded-[12px] transition-colors inline-flex justify-center items-center text-[1.125rem] leading-[1.5rem]",
                className
            )}
            {...props}
        >
            Se alla
        </button>
    );
};
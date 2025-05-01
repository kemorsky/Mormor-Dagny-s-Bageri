import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(
                "font-DMSans font-bold min-w-[14.5rem] px-4 py-2 bg-Branding-primaryButton hover:bg-Branding-primaryButton/80 transition-colors rounded-lg border border-Branding-textAccent inline-flex justify-center items-center text-Branding-textAccent gap-2.5",
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
                "font-DMSans font-semibold w-auto px-4 py-3 bg-blue-800 hover:bg-blue-500 text-white border border-gray-300 rounded-[12px] transition-colors inline-flex justify-center items-center text-[1.125rem] leading-[1.5rem]",
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
                "font-DMSans font-semibold w-auto px-4 py-3 bg-gray-700 hover:bg-gray-500 text-[rgb(232,185,35)] border border-[rgb(232,185,35)] rounded-[12px] transition-colors inline-flex justify-center items-center text-[1.125rem] leading-[1.5rem]",
                className
            )}
            {...props}
        >
            Se alla
        </button>
    );
};

export const ButtonOrder: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            type="submit"
            className={cn(
                "font-DMSans font-semibold px-4 py-2 bg-[#D4AF37] hover:bg-[#F0C93D] text-[#1E2124] border border-[#1E2124] rounded-lg transition-colors inline-flex justify-center items-center gap-2.5",
                className
            )}
            {...props}
        >
        </button>
    );
};

export const ButtonEditOrder: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            type="submit"
            className={cn(
                "font-DMSans font-semibold px-4 py-3 bg-red-400 hover:bg-red-500 text-Branding-textPrimary border border-[#1E2124] rounded-[12px] transition-colors inline-flex justify-center items-center text-[1rem] leading-[1.25rem]",
                className
            )}
            {...props}
        >
        </button>
    );
};

export const ButtonTab: React.FC<ButtonProps & { isActive: boolean }> = ({ className, isActive, ...props }) => {
    return (
        <button
            className={cn(
                "w-40 px-4 py-2 font-DMSans transition-colors",
                isActive ? "bg-black text-Branding-textPrimary font-semibold" 
                : "bg-[#898989] text-Branding-textPrimary hover:text-Branding-textAccent",
                className
            )}
            {...props}
        />
    );
};

export const ButtonPaginationPrev: React.FC<ButtonProps & { disabled: boolean }> = ({ className, disabled, ...props }) => {
    return (
        <button
            className={cn(
                "px-4 py-2 rounded-lg font-DMSans transition-colors",
                disabled ? "bg-gray-700 text-Branding-textSecondary font-semibold" 
                : "bg-blue-500 text-Branding-textPrimary hover:text-Branding-textSecondary",
                className
            )}
            {...props}
        />
    );
};

export const ButtonPaginationNext: React.FC<ButtonProps & { disabled: boolean }> = ({ className, disabled, ...props }) => {
    return (
        <button
            className={cn(
                "px-4 py-2 rounded-lg font-DMSans transition-colors",
                disabled ? "bg-gray-700 text-Branding-textSecondary font-semibold" 
                : "bg-blue-500 text-Branding-textPrimary hover:text-Branding-textSecondary",
                className
            )}
            {...props}
        />
    );
};

export const ButtonAdmin: React.FC<ButtonProps> = ({className, ...props}) => {
    return (
        <button
            className={cn(
                "font-DMSans font-semibold min-w-[14.675rem] px-4 py-2 bg-Branding-primaryButton hover:bg-Branding-primaryButton/80 transition-colors rounded-lg border border-Branding-textAccent inline-flex justify-center items-center text-Branding-textAccent gap-2.5",
                className
            )}
            { ...props } />
    )
}

export const ButtonAdminManage: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            type="submit"
            className={cn(
                "font-DmSans font-semibold text-emerald-300 hover:text-Branding-textPrimary px-4 py-2 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-emerald-600 hover:bg-emerald-700 transition-colors inline-flex justify-center items-center gap-2.5",
                className
            )}
            {...props}
        >
        </button>
    );
};

export const ButtonAdminDelete: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            type="submit"
            className={cn(
                "font-DmSans font-semibold text-Branding-textPrimary px-4 py-2 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-red-400 hover:bg-red-500 transition-colors inline-flex justify-center items-center gap-2.5",
                className
            )}
            {...props}
        >
        </button>
    );
};
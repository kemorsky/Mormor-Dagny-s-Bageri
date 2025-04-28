import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(
                "font-DMSans font-bold w-[232px] px-4 py-3 bg-Branding-primaryButton hover:bg-Branding-primaryButton/80 transition-colors rounded-xl border border-Branding-textAccent inline-flex justify-center items-center text-Branding-textAccent text-[1.125rem] leading-[1.5rem]",
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
                "font-DMSans font-semibold px-4 py-3 bg-[#D4AF37] hover:bg-[#F0C93D] text-[#1E2124] border border-[#1E2124] rounded-[12px] transition-colors inline-flex justify-center items-center text-[1rem] leading-[1.25rem]",
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
                "w-40 px-4 py-2 font-lato text-lg transition-colors border-none",
                isActive ? "bg-black text-white font-semibold" 
                : "bg-[#898989] text-white hover:text-black",
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
                "font-DMSans font-bold w-[232px] px-4 py-3 bg-Branding-primaryButton hover:bg-Branding-primaryButton/80 transition-colors rounded-xl border border-Branding-textAccent inline-flex justify-center items-center text-Branding-textAccent text-[1.125rem] leading-[1.5rem]",
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
                "font-DMSans font-semibold w-auto px-3 py-2 bg-[#228B22] hover:bg-[#2E8B57] text-Branding-textPrimary border border-[#1E2124] rounded-[12px] transition-colors inline-flex justify-center items-center text-[1rem] leading-[1.25rem]",
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
                "font-DMSans font-semibold w-auto px-3 py-2 bg-[#B22222] hover:bg-[#CC3333] text-Branding-textPrimary border border-[#1E2124] rounded-[12px] transition-colors inline-flex justify-center items-center text-[1rem] leading-[1.25rem]",
                className
            )}
            {...props}
        >
            
        </button>
    );
};
import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputPrimary: React.FC<InputProps> = ({className, ...props}) => {
    return <input className={cn("w-full h-[2.75rem] p-3 inline-flex items-start justify-start self-stretch rounded bg-Branding-input border border-Branding-textAccent font-inter text-base text-Branding-textPrimary font-semibold focus:border-white focus:outline-none", className)}{...props}/>;
};

export const InputAmount: React.FC<InputProps> = ({className, ...props}) =>  {
    return <section className="flex items-center justify-center gap-2">
                <label htmlFor="amount" className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">Antal: </label>
                <input type="text" className={cn("bg-Branding-input border border-Branding-textAccent w-[3.5rem] h-[2.625rem] rounded-[0.5rem] text-[1rem] leading-[1.1875rem] text-white text-center px-2 py-1 focus:outline-none", className)} {...props}/>
            </section>
};

export const InputDiscount: React.FC<InputProps> = ({className, ...props}) =>  {
    return <section className="flex items-center justify-center gap-2">
                <label htmlFor="amount" className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Rabatt: </label>
                <input type="text" className={cn("bg-Branding-input border border-Branding-textAccent w-[3.5rem] h-[2.625rem] rounded-[0.5rem] text-[1rem] leading-[1.1875rem] text-white text-center px-2 py-1 focus:outline-none", className)} {...props}/>
            </section>
};

export const InputOrderDropdown: React.FC<InputProps> = ({className, ...props}) => {
    return <input className={cn("w-full inline-flex items-start justify-start self-stretch rounded bg-Branding-input font-inter text-base text-Branding-textPrimary font-semibold focus:outline-none relative", className)}{...props}/>;
};

export const AdminFormInput: React.FC<InputProps> = ({className, ...props}) => {
    return <input className={cn("w-full h-[2.75rem] px-4 py-3 inline-flex items-start justify-start self-stretch rounded bg-Branding-input border border-Branding-textAccent font-inter text-base text-Branding-textPrimary font-semibold focus:border-white focus:outline-none", className)}{...props}/>;
};

export const AdminEditStoreFormInput: React.FC<InputProps> = ({className, ...props}) => {
    return <input className={cn("w-full h-[2.75rem] px-4 py-3 inline-flex items-start justify-start self-stretch rounded bg-Branding-input border border-Branding-textAccent font-inter text-[1rem] leading-[1.1875rem] text-Branding-textPrimary font-semibold focus:border-white focus:outline-none", className)}{...props}/>;
};
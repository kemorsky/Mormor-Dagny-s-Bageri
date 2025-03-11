export default function Card() {
    return (
        <div className="w-[190px] h-[190px] px-1.5 py-3 bg-gradient-card shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] rounded-3xl inline-flex flex-col items-end justify-between">
            <p className="self-stretch text-right text-[0.8125rem] leading-[0.8125rem] text-white/80">om 1-3 dagar</p>
            <article className="self-stretch font-inter space-y-1">
                <h2 className="font-semibold text-[1rem] leading-19px]">ICA Bollebygd</h2>
                <p className="text-Branding-textSecondary text-[0.8125rem] leading-[1rem]">Långgatan 18, Kållered</p>
            </article>
            <article className="w-[106px] font-inter space-y-1">
                <h2 className="text-[0.8125rem] leading-[1rem]">Stefan Holmqvist</h2>
                <p className="text-Branding-textSecondary text-[0.8125rem] leading-[1rem]">076 367 826</p>
            </article>
        </div>
    )
};
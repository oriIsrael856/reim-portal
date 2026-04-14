import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NextChapterButton = ({ title, subtitle, onClick }) => {
    const handleClick = () => {
        if (typeof onClick === 'function') onClick();
    };

    return (
        <>
            <div className="md:hidden w-full px-0 my-0">
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={!onClick}
                    className="
                        w-full h-[200px] px-6
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex flex-col items-center justify-center gap-6
                        bg-[rgba(101,70,222,0.6)]
                        rounded-[24px]
                        text-white text-center
                        transition-all duration-200
                    "
                >
                    <div className="w-full flex flex-col items-center justify-center gap-1">
                        <h2 className="w-full text-2xl font-bold leading-[1.334] text-center">{title}</h2>
                        <p className="w-full text-base font-normal leading-[1.32] tracking-[0.009375em] text-center">{subtitle}</p>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-[12px] bg-white p-3">
                        <ArrowLeft size={24} color="#6546DE" strokeWidth={2.5} />
                    </span>
                </button>
            </div>

            <div
                className="hidden md:flex w-full relative z-30 justify-center items-center"
                style={{
                    height: 'var(--home-desktop-nextch-container-h)',
                    marginTop: 'var(--home-desktop-nextch-mt)',
                    marginBottom: 'var(--home-desktop-nextch-mb)',
                    paddingInlineStart: 'var(--home-desktop-nextch-px)',
                    paddingInlineEnd: 'var(--home-desktop-nextch-px)',
                }}
            >
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={!onClick}
                    className="
                        disabled:opacity-50 disabled:cursor-not-allowed
                        group relative
                        flex items-center justify-between
                        cursor-pointer overflow-hidden
                        w-[var(--home-desktop-nextch-btn-w)] hover:w-[95%]
                        bg-[#816AFE]/70 hover:bg-[#816AFE]
                        backdrop-blur-sm hover:backdrop-blur-none
                        border border-white/20 hover:border-transparent
                        shadow-xl hover:shadow-[0px_20px_60px_rgba(129,106,254,0.6)]
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    "
                    style={{
                        height: 'var(--home-desktop-nextch-btn-h)',
                        borderRadius: 'var(--home-desktop-nextch-radius)',
                        paddingInlineStart: 'var(--home-desktop-nextch-px)',
                        paddingInlineEnd: 'var(--home-desktop-nextch-px)',
                    }}
                >
                    {/* Icon — shrink-0 so it stays fixed width */}
                    <div
                        className="bg-white flex items-center justify-center shadow-md transition-all duration-500 ease-out flex-shrink-0 z-20"
                        style={{
                            height: 'var(--home-desktop-nextch-icon-box)',
                            width: 'var(--home-desktop-nextch-icon-box)',
                            borderRadius: 'var(--home-desktop-nextch-icon-radius)',
                        }}
                    >
                        <ArrowLeft
                            style={{ width: 'var(--home-desktop-nextch-icon-size)', height: 'var(--home-desktop-nextch-icon-size)' }}
                            color="#816AFE"
                            strokeWidth={3}
                            className="group-hover:-translate-x-1 transition-transform duration-500"
                        />
                    </div>
                    {/* Text — flex-1 + text-center keeps it centered as button expands */}
                    <div className="flex flex-1 flex-col items-center justify-center text-center text-white z-10">
                        <h2
                            className="font-black mb-1 leading-tight whitespace-nowrap"
                            style={{ fontSize: 'var(--home-desktop-nextch-title-fs)' }}
                        >
                            {title}
                        </h2>
                        <p
                            className="font-medium opacity-90 tracking-wide whitespace-nowrap pt-1"
                            style={{ fontSize: 'var(--home-desktop-nextch-sub-fs)' }}
                        >
                            {subtitle}
                        </p>
                    </div>
                    {/* Spacer mirrors icon width to balance centering */}
                    <div className="flex-shrink-0" style={{ width: 'var(--home-desktop-nextch-icon-box)' }} aria-hidden />
                </button>
            </div>
        </>
    );
};

export default NextChapterButton;

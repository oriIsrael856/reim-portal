import React, { useMemo, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

function CommitteeStepCard({ step }) {
    if (!step) return null;
    const id = step.id ?? '';
    const title = step.title ?? '';
    const desc = step.desc ?? '';

    return (
        <div
            className="relative flex flex-col items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26] pt-[32px] pb-[24px] px-[16px] gap-[8px] flex-[1_0_0] min-w-px min-h-px"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(188, 224, 121, 0.08) 0%, rgba(188, 224, 121, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            {/* Chapter label */}
            <div className="absolute left-1/2 top-[-22.5px] -translate-x-1/2 bg-[#bce079] border-[1.5px] border-[#001d26] rounded-[48px] shadow-[2px_2px_0px_0px_#001d26] px-[6px] py-[12px] h-[42px] flex items-center">
                <div className="flex flex-col font-['Salsa'] justify-center leading-[0] not-italic text-[16px] text-[#001d26] text-center tracking-[0.15px] w-full">
                    <div className="leading-[1.28]">{id}</div>
                </div>
            </div>

            <p className="font-semibold text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26] text-center whitespace-nowrap">
                {title}
            </p>
            <p className="font-normal text-[16px] leading-[1.32] tracking-[0.15px] text-[#001d26] text-center w-[min-content]">
                {desc}
            </p>
        </div>
    );
}

function DesktopFaqRow({ item, isOpen, onToggle }) {
    return (
        <div className="rounded-[8px] overflow-hidden bg-white border border-[rgba(101,70,222,0.08)] mb-[16px] last:mb-0">
            <button
                type="button"
                className="flex h-[80px] items-center overflow-clip px-[24px] w-full text-right"
                onClick={onToggle}
                dir="rtl"
            >
                <div className="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center">
                    {isOpen ? (
                        <Minus size={24} strokeWidth={3} color="#001d26" />
                    ) : (
                        <Plus size={24} strokeWidth={3} color="#001d26" />
                    )}
                </div>

                <p className="flex-1 font-['Rubik'] font-normal text-[24px] leading-[1.334] text-[#001d26] tracking-[0px]">
                    {item.title}
                </p>
            </button>

            {isOpen ? (
                <div className="px-[24px] pb-[24px] text-[#001d26]/70 font-['Rubik'] font-normal text-[16px] leading-[1.32] tracking-[0.15px]">
                    {item.content}
                </div>
            ) : null}
        </div>
    );
}

function DesktopFaqList({ items }) {
    const safeItems = items || [];
    const [openIndex, setOpenIndex] = useState(null);

    if (!safeItems.length) return null;

    return (
        <div className="w-full">
            {safeItems.map((item, index) => (
                <DesktopFaqRow
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
    );
}

export default function Chapter4DesktopCommitteesFaqSection({ committees, qa }) {
    const steps = useMemo(() => committees?.steps || [], [committees]);

    return (
        <section
            className="relative w-full overflow-clip rounded-tl-[24px] rounded-tr-[24px] border-t-[2px] border-[#ffb23b] pb-[100px] pt-[120px]"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            <div className="mx-auto w-full max-w-[1424px] bg-[#6546de] border-[1.5px] border-[#001d26] flex flex-col gap-[24px] rounded-[24px] px-[80px] pt-[64px] pb-[52px] shadow-[2px_2px_0px_0px_#001d26]">
                <p className="font-['Rubik'] font-bold leading-[1.1] text-[34px] text-white text-right tracking-[0.25px] whitespace-nowrap">
                    {committees?.title ?? ''}
                </p>

                <div className="flex flex-col gap-[24px] items-center w-full">
                    <div className="flex flex-col gap-[8px] items-center text-center leading-[1.28] relative shrink-0 w-full">
                        <p className="font-normal text-[20px] leading-[1.32] tracking-[0.15px] text-white">
                            {committees?.intro ?? ''}
                        </p>
                        <p className="font-semibold text-[20px] leading-[1.28] tracking-[0.15px] text-white">
                            שלבי התהליך:
                        </p>
                    </div>

                    <div className="flex gap-[24px] items-start justify-center w-full">
                        {steps.map((s) => (
                            <CommitteeStepCard key={s.id} step={s} />
                        ))}
                    </div>

                    <p className="font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-white w-[min-content] text-center">
                        {committees?.footer ?? ''}
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-[24px] max-w-[1424px] w-full text-right px-[200px]">
                <div className="flex flex-col items-end justify-center pt-[24px] text-[#001d26] whitespace-nowrap">
                    <p className="font-['Rubik'] font-normal leading-[1.32] text-[16px] tracking-[0.15px]">
                        כל מה שרצית לשאול
                    </p>
                    <p className="font-['Rubik'] font-bold leading-[1.1] text-[34px] tracking-[0.25px]">
                        שאלות ותשובות
                    </p>
                </div>

                <div className="mt-[16px]">
                    <DesktopFaqList items={qa || []} />
                </div>
            </div>
        </section>
    );
}

import React, { useMemo, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

function CommitteeStepCard({ step }) {
    if (!step) return null;
    const id = step.id ?? '';
    const title = step.title ?? '';
    const desc = step.desc ?? '';

    return (
        <div
            className="relative flex flex-col items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26] pt-[32px] pb-[24px] px-[16px] gap-[8px] flex-[1_0_0] min-w-px min-h-px"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(188, 224, 121, 0.08) 0%, rgba(188, 224, 121, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            {/* Chapter label chip */}
            <div className="absolute left-1/2 top-[-22.5px] -translate-x-1/2 bg-[#bce079] border-[1.5px] border-[#001d26] rounded-[48px] shadow-[2px_2px_0px_0px_#001d26] px-[6px] py-[12px] h-[42px] flex items-center">
                <div className="flex flex-col font-['Salsa'] justify-center leading-[0] not-italic text-[16px] text-[#001d26] text-center tracking-[0.15px]">
                    <div className="leading-[1.28]">{id}</div>
                </div>
            </div>

            <p className="font-semibold text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26] text-center whitespace-nowrap">
                {title}
            </p>
            <p className="font-normal text-[16px] leading-[1.32] tracking-[0.15px] text-[#001d26] text-center w-[min-content]">
                {desc}
            </p>
        </div>
    );
}

function DesktopFaqRow({ item, isOpen, onToggle }) {
    return (
        <div
            className={`overflow-hidden rounded-[8px] bg-white border border-[rgba(101,70,222,0.08)]`}
        >
            <button
                type="button"
                className="flex h-[80px] items-center overflow-clip px-[24px] w-full text-right"
                onClick={onToggle}
                dir="rtl"
            >
                <div className="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center">
                    {isOpen ? (
                        <Minus size={24} strokeWidth={3} color="#001d26" />
                    ) : (
                        <Plus size={24} strokeWidth={3} color="#001d26" />
                    )}
                </div>
                <p className="flex-1 font-['Rubik'] font-normal text-[24px] leading-[1.334] tracking-[0px] text-[#001d26]">
                    {item.title}
                </p>
            </button>

            {isOpen ? (
                <div className="px-[24px] pb-[24px] text-[#001d26]/70 font-['Rubik'] text-[16px] leading-[1.32] tracking-[0.15px]">
                    {item.content}
                </div>
            ) : null}
        </div>
    );
}

function DesktopFaqList({ items }) {
    const safeItems = items || [];
    const [openIndex, setOpenIndex] = useState(null);

    if (!safeItems.length) return null;

    return (
        <div className="w-full">
            {safeItems.map((item, index) => (
                <div key={index} className="mb-[16px] last:mb-0">
                    <DesktopFaqRow
                        item={item}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                </div>
            ))}
        </div>
    );
}

export default function Chapter4DesktopCommitteesFaqSection({ committees, qa }) {
    const steps = useMemo(() => committees?.steps || [], [committees]);
    const footer = committees?.footer || '';
    const title = committees?.title || 'הוועדות';
    const intro = committees?.intro || '';

    return (
        <section
            className="relative w-full overflow-clip rounded-tl-[24px] rounded-tr-[24px] border-t-[2px] border-[#ffb23b] pb-[100px] pt-[120px]"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            {/* Purple title panel */}
            <div className="mx-auto w-full max-w-[1424px] bg-[#6546de] border-[1.5px] border-[#001d26] flex flex-col gap-[24px] rounded-[24px] px-[80px] pt-[64px] pb-[52px] shadow-[2px_2px_0px_0px_#001d26]">
                <p className="font-['Rubik'] font-bold leading-[1.1] text-[34px] text-white text-right tracking-[0.25px] whitespace-nowrap">
                    {title}
                </p>

                <div className="flex flex-col gap-[24px] items-center w-full">
                    <div className="flex flex-col gap-[8px] items-start leading-[1.28] relative w-full text-center">
                        <p className="font-normal text-[20px] leading-[1.32] tracking-[0.15px] text-white">
                            {intro}
                        </p>
                        <p className="font-semibold text-[20px] leading-[1.28] tracking-[0.15px] text-white">
                            שלבי התהליך:
                        </p>
                    </div>

                    <div className="flex gap-[24px] items-start justify-center w-full">
                        {steps.map((s) => (
                            <CommitteeStepCard key={s.id} step={s} />
                        ))}
                    </div>

                    <p className="font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-white w-[min-content] text-center">
                        {footer}
                    </p>
                </div>
            </div>

            {/* FAQ headings + list */}
            <div className="mx-auto mt-[24px] max-w-[1424px] px-[200px] w-full text-right">
                <div className="flex flex-col items-end justify-center pt-[24px] text-[#001d26] whitespace-nowrap">
                    <p className="font-normal text-[16px] leading-[1.32] tracking-[0.15px]">
                        כל מה שרצית לשאול
                    </p>
                    <p className="font-bold text-[34px] leading-[1.1] tracking-[0.25px]">
                        שאלות ותשובות
                    </p>
                </div>

                <div className="mt-[16px]">
                    <DesktopFaqList items={qa || []} />
                </div>
            </div>
        </section>
    );
}


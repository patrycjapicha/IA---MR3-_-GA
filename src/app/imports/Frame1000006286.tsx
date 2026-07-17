import svgPaths from "./svg-dfn5l9hoks";

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start px-[20px] relative size-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#49545c] text-[0px] text-[12px] tracking-[-0.0004px] w-[min-content] whitespace-pre-wrap">
        <span className="leading-[16px]">{`Your team is handling `}</span>
        <span className="font-['SF_Pro_Text:Bold',sans-serif] leading-[16px]">11% more tickets</span>
        <span className="leading-[16px]">{`, reflecting increased activity. `}</span>
      </p>
      <div className="bg-white content-stretch flex gap-[8px] isolate items-center justify-center px-[12px] py-[4px] relative rounded-[20px] shrink-0" data-name="in page prompt - IGNORE">
        <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] z-[4]">What created this spike</p>
        <div className="relative shrink-0 size-[12px] z-[3]" data-name="Icon - IGNORE">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10px] top-1/2" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
              <path d={svgPaths.p2253eff0} fill="url(#paint0_linear_8639_853)" id="Union" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8639_853" x1="4.05068e-07" x2="10.1923" y1="11.875" y2="0.167368">
                  <stop offset="0.0288462" stopColor="#FF7B5A" />
                  <stop offset="0.640392" stopColor="#8B5DFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
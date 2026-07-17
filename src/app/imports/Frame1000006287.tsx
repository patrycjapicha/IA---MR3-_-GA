import svgPaths from "./svg-wskba6yyiw";

function Info() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Info">
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#2f3941] text-[26px] tracking-[0.3536px]">6,221</p>
    </div>
  );
}

function Counter() {
  return (
    <div className="content-stretch flex gap-[4px] items-end justify-center not-italic relative shrink-0 tracking-[-0.0004px]" data-name="Counter">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] relative shrink-0 text-[#d93f4c] text-[13px]">11%</p>
      <div className="flex flex-col font-['SF_Pro_Text:Medium',sans-serif] justify-end leading-[0] relative shrink-0 text-[#68737d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">(684)</p>
      </div>
    </div>
  );
}

function Comparison() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center pb-[4px] relative shrink-0" data-name="Comparison">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <div className="overflow-clip relative size-[12px]" data-name="arrow-down-right">
            <div className="absolute bottom-1/4 left-[26.04%] right-1/4 top-[26.04%]" data-name="vector">
              <div className="absolute inset-[-12.77%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.375 7.375">
                  <path d={svgPaths.p1e070bc0} id="vector" stroke="var(--stroke-0, #D93F4C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Counter />
    </div>
  );
}

function Metric() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Metric">
      <Info />
      <Comparison />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-start pb-[8px] px-[20px] relative w-full">
        <p className="font-['SF_Pro_Text:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#68737d] text-[12px] text-center tracking-[-0.154px]">Ticket volume</p>
        <Metric />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute inset-[-0.89%_-0.19%_0_-0.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 259.667 56.5001">
          <g id="Group 3">
            <path d={svgPaths.p454cb00} fill="url(#paint0_linear_8639_837)" fillOpacity="0.16" id="Vector 1" />
            <path d={svgPaths.p3e61a880} id="Vector 2" opacity="0.5" stroke="var(--stroke-0, #CC3340)" strokeLinecap="round" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8639_837" x1="129.833" x2="129.833" y1="48.5001" y2="14.6002">
              <stop stopColor="#E51D1D" stopOpacity="0" />
              <stop offset="0.809892" stopColor="#E8464C" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
      <Content />
      <Group />
    </div>
  );
}
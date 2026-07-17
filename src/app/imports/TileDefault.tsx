import svgPaths from "./svg-x6oz4uuc7b";

function Info() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Info">
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#2f3941] text-[26px] tracking-[0.3536px]">2m 30s</p>
    </div>
  );
}

function Counter() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center not-italic relative shrink-0 tracking-[-0.0004px]" data-name="Counter">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] relative shrink-0 text-[#058541] text-[13px]">7%</p>
      <div className="flex flex-col font-['SF_Pro_Text:Medium',sans-serif] justify-end leading-[0] relative shrink-0 text-[#68737d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">(36s)</p>
      </div>
    </div>
  );
}

function Comparison() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center pb-[4px] relative shrink-0" data-name="Comparison">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="arrow-down-right">
        <div className="absolute bottom-1/4 left-[26.04%] right-1/4 top-[26.04%]" data-name="vector">
          <div className="absolute inset-[-12.77%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.375 7.375">
              <path d={svgPaths.p1e070bc0} id="vector" stroke="var(--stroke-0, #058541)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
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
        <p className="font-['SF_Pro_Text:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#68737d] text-[12px] text-center tracking-[-0.154px]">First reply time</p>
        <Metric />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute inset-[-2.11%_-0.19%_0_-0.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 259.667 57.1842">
          <g id="Group 4">
            <path d={svgPaths.p26ccf400} fill="url(#paint0_linear_8639_855)" fillOpacity="0.16" id="Vector 1" />
            <path d={svgPaths.p15bec200} id="Vector 2" opacity="0.5" stroke="var(--stroke-0, #058541)" strokeLinecap="round" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8639_855" x1="129.833" x2="129.833" y1="33.1842" y2="1.18423">
              <stop stopColor="#00A656" stopOpacity="0" />
              <stop offset="0.809892" stopColor="#00A656" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Content />
      <Group />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[20px] items-start px-[20px] relative w-full">
        <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#49545c] text-[0px] text-[12px] tracking-[-0.0004px] w-[min-content] whitespace-pre-wrap">
          <span className="leading-[16px]">{`Average first reply time `}</span>
          <span className="font-['SF_Pro_Text:Bold',sans-serif] leading-[16px]">improved by 36s</span>
          <span className="leading-[16px]">, enhancing customer satisfaction.</span>
        </p>
        <div className="bg-white content-stretch flex gap-[8px] isolate items-center justify-center px-[12px] py-[4px] relative rounded-[20px] shrink-0" data-name="in page prompt - IGNORE">
          <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[20px]" />
          <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] z-[4]">What works well</p>
          <div className="relative shrink-0 size-[12px] z-[3]" data-name="Icon - IGNORE">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10px] top-1/2" data-name="Union">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                <path d={svgPaths.p2253eff0} fill="url(#paint0_linear_8639_871)" id="Union" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8639_871" x1="4.05068e-07" x2="10.1923" y1="11.875" y2="0.167368">
                    <stop offset="0.0288462" stopColor="#FF7B5A" />
                    <stop offset="0.640392" stopColor="#8B5DFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TileDefault() {
  return (
    <div className="bg-white relative rounded-[12px] size-full" data-name="Tile / Default">
      <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip py-[20px] relative rounded-[inherit] size-full">
        <Frame1 />
        <Frame />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9ebed] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}
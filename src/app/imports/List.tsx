import svgPaths from "./svg-2vrn936icr";

function CheckLg16PxIcon() {
  return (
    <div className="relative size-[16px]" data-name="Check lg - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check lg - 16px icon">
          <path clipRule="evenodd" d={svgPaths.p3c180700} fill="var(--fill-0, #1F73B7)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#edf7ff] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px]" data-name="Icon">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <CheckLg16PxIcon />
        </div>
      </div>
    </div>
  );
}

function TitleDescription() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Title + Description">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-ellipsis w-full">Full resolution time steady</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[0] relative shrink-0 w-full">
        <span className="leading-[20px]">{`8h32min on average, `}</span>
        <span className="leading-[20px]">which is the same as last week.</span>
      </p>
    </div>
  );
}

function NewWindow12PxIcon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon />
    </div>
  );
}

function Anchor() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">View dashboard</p>
      <Icon1 />
    </div>
  );
}

function Btn() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[32px] relative shrink-0 w-full" data-name="Btn">
      <Anchor />
    </div>
  );
}

function LatestInsights() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Latest insights 1">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon />
          </div>
        </div>
        <TitleDescription />
        <Btn />
      </div>
    </div>
  );
}

function ArrowTrending16PxIcon() {
  return (
    <div className="relative size-[16px]" data-name="Arrow trending - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow trending - 16px icon">
          <path clipRule="evenodd" d={svgPaths.p1f63bd80} fill="var(--fill-0, #AC5918)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="bg-[#fff3e4] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px]" data-name="Icon">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowTrending16PxIcon />
        </div>
      </div>
    </div>
  );
}

function TitleDescription1() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Title + Description">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-ellipsis w-full">Ticket volume increase</p>
      <div className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">
        <p className="mb-0">Your team is answering 13% more tickets.</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Sparkle12PxIcon() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Sparkle - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Sparkle - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p3e6c4500} fill="url(#paint0_linear_8028_44266)" />
            <path d={svgPaths.p7d9e400} fill="url(#paint1_linear_8028_44266)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkle() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icons / sparkle">
      <Sparkle12PxIcon />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2f3941] text-[12px] tracking-[-0.0004px]">High volume topics today</p>
    </div>
  );
}

function InPagePrompt() {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative rounded-[20px] shrink-0" data-name="in page prompt">
      <Content />
    </div>
  );
}

function Btn1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[32px] relative shrink-0 w-full" data-name="Btn">
      <InPagePrompt />
    </div>
  );
}

function LatestInsights1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Latest insights 2">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon2 />
          </div>
        </div>
        <TitleDescription1 />
        <Btn1 />
      </div>
    </div>
  );
}

function AlertWarningToken() {
  return (
    <div className="relative size-[16px]" data-name="Alert warning  token">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="_Alert warning - 16px icon">
          <g id="Icon">
            <path d={svgPaths.p31f42200} fill="var(--fill-0, #CD3642)" />
            <path d={svgPaths.p28d63100} fill="var(--fill-0, #CD3642)" />
            <path clipRule="evenodd" d={svgPaths.p39470a00} fill="var(--fill-0, #CD3642)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="bg-[#fff2f3] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px]" data-name="Icon">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <AlertWarningToken />
        </div>
      </div>
    </div>
  );
}

function TitleDescription2() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Title + Description">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-ellipsis w-full">{`First reply time increase `}</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">This time was 20 minutes longer on average.</p>
    </div>
  );
}

function Sparkle12PxIcon1() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Sparkle - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Sparkle - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p3e6c4500} fill="url(#paint0_linear_8028_44266)" />
            <path d={svgPaths.p7d9e400} fill="url(#paint1_linear_8028_44266)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkle1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icons / sparkle">
      <Sparkle12PxIcon1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle1 />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2f3941] text-[12px] tracking-[-0.0004px]">How to improve it</p>
    </div>
  );
}

function InPagePrompt1() {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative rounded-[20px] shrink-0" data-name="in page prompt">
      <Content1 />
    </div>
  );
}

function Btn2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[32px] relative shrink-0 w-full" data-name="Btn">
      <InPagePrompt1 />
    </div>
  );
}

function LatestInsights2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Latest insights 3">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon3 />
          </div>
        </div>
        <TitleDescription2 />
        <Btn2 />
      </div>
    </div>
  );
}

export default function List() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative rounded-[12px] size-full" data-name="List">
      <LatestInsights />
      <LatestInsights1 />
      <LatestInsights2 />
    </div>
  );
}
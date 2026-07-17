import svgPaths from "./svg-nthuxv282e";

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[#373205] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] relative shrink-0 w-full">Unsaved changes detected</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">You have made changes to the configuration settings that have not been saved yet. Leaving this page now will result in the loss of all current progress.</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#313131] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[99px] shrink-0" data-name="Content">
      <div className="relative rounded-[8px] shrink-0 size-[16px]" data-name="Start icon - 16px">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p10625f0} fill="var(--fill-0, white)" id="Icon" />
          </svg>
        </div>
      </div>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.154px]">Primary</p>
      <div className="relative shrink-0 size-[16px]" data-name="End icon - 16px">
        <div className="absolute inset-[33.33%_12.5%_28.45%_12.5%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.1144">
            <path clipRule="evenodd" d={svgPaths.pe34c600} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[99px] shrink-0" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#9c9a99] border-solid inset-0 pointer-events-none rounded-[99px]" />
      <div className="relative rounded-[8px] shrink-0 size-[16px]" data-name="Start icon - 16px">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p10625f0} fill="var(--fill-0, #313131)" id="Icon" />
          </svg>
        </div>
      </div>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#313131] text-[14px] text-center tracking-[-0.154px]">Outline</p>
      <div className="relative shrink-0 size-[16px]" data-name="End icon - 16px">
        <div className="absolute inset-[34.37%_15.62%_34.38%_15.62%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 11 5.00002">
            <path clipRule="evenodd" d={svgPaths.pb4b2500} fill="var(--fill-0, #313131)" fillRule="evenodd" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[99px] shrink-0" data-name="Content">
      <div className="relative rounded-[8px] shrink-0 size-[16px]" data-name="Start icon - 16px">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p10625f0} fill="var(--fill-0, #313131)" id="Icon" />
          </svg>
        </div>
      </div>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#313131] text-[14px] text-center tracking-[-0.154px]">Basic</p>
      <div className="relative shrink-0 size-[16px]" data-name="End icon - 16px">
        <div className="absolute inset-[34.37%_15.62%_34.38%_15.62%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 11 5.00002">
            <path clipRule="evenodd" d={svgPaths.pb4b2500} fill="var(--fill-0, #313131)" fillRule="evenodd" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Action">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name=".Refresh Button">
        <Content1 />
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name=".Refresh Button">
        <Content2 />
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name=".Refresh Button">
        <Content3 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="Container">
      <Content />
      <Action />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] top-[16px]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="IconExclamationTriangle">
        <div className="absolute inset-[8.21%_8.24%_16.67%_8.24%]" data-name="Vector">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7041 15.0256">
            <path clipRule="evenodd" d={svgPaths.p257c67c0} fill="var(--fill-0, #7B710C)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function RefreshAlert() {
  return (
    <div className="bg-[#f6ec94] content-stretch flex items-start px-[40px] py-[16px] relative rounded-[16px] size-full" data-name=".Refresh Alert">
      <Container />
      <div className="absolute right-[12px] size-[20px] top-[12px]" data-name="X small">
        <div className="absolute inset-[24.17%]" data-name="Icon">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3329 10.3329">
            <path d={svgPaths.p2ceac800} fill="var(--fill-0, #706F6E)" id="Icon" />
          </svg>
        </div>
      </div>
      <Icon />
    </div>
  );
}
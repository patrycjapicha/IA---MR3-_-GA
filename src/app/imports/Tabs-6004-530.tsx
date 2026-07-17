function HorizontalTab() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div aria-hidden="true" className="absolute border-[#1f73b7] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center text-nowrap tracking-[-0.154px]">
        <p className="leading-[20px] whitespace-pre">First</p>
      </div>
    </div>
  );
}

function HorizontalTab1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[14px] text-center text-nowrap tracking-[-0.154px]">
        <p className="leading-[20px] whitespace-pre">Second</p>
      </div>
    </div>
  );
}

function HorizontalTab2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[14px] text-center text-nowrap tracking-[-0.154px]">
        <p className="leading-[20px] whitespace-pre">Third</p>
      </div>
    </div>
  );
}

function HorizontalTab3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[14px] text-center text-nowrap tracking-[-0.154px]">
        <p className="leading-[20px] whitespace-pre">Fourth</p>
      </div>
    </div>
  );
}

function HorizontalTab4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[14px] text-center text-nowrap tracking-[-0.154px]">
        <p className="leading-[20px] whitespace-pre">Fifth</p>
      </div>
    </div>
  );
}

function HorizontalTab5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[14px] text-center text-nowrap tracking-[-0.154px]">
        <p className="leading-[20px] whitespace-pre">Sixth</p>
      </div>
    </div>
  );
}

export default function Tabs() {
  return (
    <div className="box-border content-stretch flex items-start pb-px pt-0 px-0 relative size-full" data-name="Tabs">
      <div aria-hidden="true" className="absolute border-[#d8dcde] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <HorizontalTab />
      <HorizontalTab1 />
      <HorizontalTab2 />
      <HorizontalTab3 />
      <HorizontalTab4 />
      <HorizontalTab5 />
    </div>
  );
}
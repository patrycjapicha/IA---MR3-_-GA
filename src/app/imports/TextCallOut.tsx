function ButtonSmall() {
  return (
    <div className="absolute bg-[#bfe2ff] content-stretch flex items-center justify-center left-[calc(77.78%-80.46px)] px-[31.125px] py-[12.45px] rounded-[24.9px] top-[calc(20%+125.1px)]" data-name="Button - Small">
      <p className="font-['Vanilla_Sans:Medium',sans-serif] leading-[56.508px] not-italic relative shrink-0 text-[#11110d] text-[37.35px] text-center">What’s New</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center left-[calc(50%-0.5px)] top-[calc(50%+19.5px)] w-[1189px]">
      <p className="font-['Vanilla_Sans:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[106px] text-center text-white w-full whitespace-pre-wrap">The most meaningful way to succeed is to help others succeed.</p>
    </div>
  );
}

function ButtonSmall1() {
  return (
    <div className="absolute bg-[#e6faab] content-stretch flex items-center justify-center left-[calc(22.22%+109.33px)] px-[31.125px] py-[12.45px] rounded-[24.9px] top-[170px]" data-name="Button - Small">
      <p className="font-['Vanilla_Sans:Medium',sans-serif] leading-[56.508px] not-italic relative shrink-0 text-[#11110d] text-[37.35px] text-center">KPI’s watchlist</p>
    </div>
  );
}

function ButtonSmall2() {
  return (
    <div className="absolute bg-[#eed0ff] content-stretch flex items-center justify-center left-[320px] px-[31.125px] py-[12.45px] rounded-[24.9px] top-[calc(60%+64.1px)]" data-name="Button - Small">
      <p className="font-['Vanilla_Sans:Medium',sans-serif] leading-[56.508px] not-italic relative shrink-0 text-[#11110d] text-[37.35px] text-center">Insights</p>
    </div>
  );
}

function ButtonSmall3() {
  return (
    <div className="absolute bg-[#ffee89] content-stretch flex items-center justify-center left-[calc(55.56%+145.33px)] px-[31.125px] py-[12.45px] rounded-[24.9px] top-[calc(80%+13px)]" data-name="Button - Small">
      <p className="font-['Vanilla_Sans:Medium',sans-serif] leading-[56.508px] not-italic relative shrink-0 text-[#11110d] text-[37.35px] text-center">Recommendations</p>
    </div>
  );
}

export default function TextCallOut() {
  return (
    <div className="bg-[#2d4c33] relative size-full" data-name="TextCallOut">
      <ButtonSmall />
      <Frame />
      <ButtonSmall1 />
      <ButtonSmall2 />
      <ButtonSmall3 />
    </div>
  );
}
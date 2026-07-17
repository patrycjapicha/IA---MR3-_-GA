import svgPaths from "./svg-boog9dw8x8";

function Heading() {
  return (
    <div className="content-stretch flex h-[42px] items-center relative shrink-0 w-full" data-name="Heading 1">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[42px] not-italic relative shrink-0 text-[28px] text-black">Good morning, Leah</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#919da9] text-[16px] top-[-0.5px]">Your daily brief and analytics overview.</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[75px] relative shrink-0 w-[254.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[33.5px] relative rounded-[8.75px] shrink-0 w-[85.516px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[21px] left-[43px] not-italic text-[#68737d] text-[14px] text-center top-[6.25px]">Customize</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex h-[75px] items-start justify-between left-[35px] top-[77px] w-[1130px]" data-name="Container">
      <Container4 />
      <Button />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 5.83333">
            <path d={svgPaths.p3c9800} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-black top-[-0.5px]">Latest insights</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">Sep 20–Sep 28, 2025</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] h-[48.25px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.75px] items-start relative size-full">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48.25px] relative shrink-0 w-[151.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Button1 />
        <Container8 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.25px] px-[5.25px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[48.25px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Button2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_8113_2236)" id="Icon">
          <path d={svgPaths.p1832a80} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d={svgPaths.pd7eb500} id="Vector_2" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2236">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#e6f7ed] relative rounded-[8.75px] shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Full resolution time steady</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Bold',sans-serif] leading-[0] left-0 not-italic text-[#838384] text-[0px] text-[14px] top-[-0.5px] tracking-[-0.154px] w-[301px] whitespace-pre-wrap">
        <span className="leading-[20px]">8h32min</span>
        <span className="font-['SF_Pro_Display:Regular',sans-serif] leading-[20px]">{` on average, which is the same as last week.`}</span>
      </p>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[330.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[94.344px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-black text-[14px] text-center tracking-[-0.0004px]">View dashboard</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[112px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
      <Button3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[149px] items-start left-0 pb-px pt-[18.5px] px-[18.5px] rounded-[12px] top-0 w-[367.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container11 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#fff3e4] relative rounded-[8.75px] shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Ticket volume increase</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[0] left-0 not-italic text-[#838384] text-[0px] text-[14px] top-[-0.5px] tracking-[-0.154px] w-[235px] whitespace-pre-wrap">
        <span className="leading-[20px]">{`Your team is answering `}</span>
        <span className="font-['SF_Pro_Display:Bold',sans-serif] leading-[20px]">13%</span>
        <span className="leading-[20px]">{` more tickets.`}</span>
      </p>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[330.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading3 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[147.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-black text-[14px] text-center tracking-[-0.0004px]">High volume topics today</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[112px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Button4 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[149px] items-start left-[381.33px] pb-px pt-[18.5px] px-[18.5px] rounded-[12px] top-0 w-[367.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container15 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_8113_2175)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #CD3642)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d="M7 4.66667V7" id="Vector_2" stroke="var(--stroke-0, #CD3642)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d="M7 9.33333H7.00583" id="Vector_3" stroke="var(--stroke-0, #CD3642)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2175">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#fff2f3] relative rounded-[8.75px] shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">First reply time increase</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[0] left-0 not-italic text-[#838384] text-[0px] text-[14px] top-[-0.5px] tracking-[-0.154px] w-[255px] whitespace-pre-wrap">
        <span className="leading-[20px]">{`This time was `}</span>
        <span className="font-['SF_Pro_Display:Bold',sans-serif] leading-[20px]">20 minutes</span>
        <span className="leading-[20px]">{` longer on average.`}</span>
      </p>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[330.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading4 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[63.688px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-black text-[14px] text-center tracking-[-0.0004px]">Investigate</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[112px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
      <Button5 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[149px] items-start left-[762.66px] pb-px pt-[18.5px] px-[18.5px] rounded-[12px] top-0 w-[367.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container19 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[149px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container14 />
      <Container18 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[21px] h-[218.25px] items-start left-[35px] top-[180px] w-[1130px]" data-name="Container">
      <Container6 />
      <Container9 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_8113_2217)" id="Icon">
          <path d={svgPaths.p115b3700} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.6667 1.75V4.08333" id="Vector_2" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.8333 2.91667H10.5" id="Vector_3" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 9.91667V11.0833" id="Vector_4" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.91667 10.5H1.75" id="Vector_5" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2217">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[18px] left-[141.5px] not-italic text-[#68737d] text-[14px] text-center top-[3.5px] tracking-[-0.08px]">What are the top customer pain points this week?</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[7px] h-[38.5px] items-center left-0 px-[11.5px] py-px rounded-[20px] top-0 w-[326.43px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Icon5 />
      <Text />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_8113_2217)" id="Icon">
          <path d={svgPaths.p115b3700} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.6667 1.75V4.08333" id="Vector_2" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.8333 2.91667H10.5" id="Vector_3" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 9.91667V11.0833" id="Vector_4" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.91667 10.5H1.75" id="Vector_5" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2217">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[18px] left-[126.5px] not-italic text-[#68737d] text-[14px] text-center top-[3.5px] tracking-[-0.08px]">Show me trending support topics by volume</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[7px] h-[38.5px] items-center left-[333.43px] px-[11.5px] py-px rounded-[20px] top-0 w-[296.07px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Icon6 />
      <Text1 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_8113_2217)" id="Icon">
          <path d={svgPaths.p115b3700} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.6667 1.75V4.08333" id="Vector_2" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.8333 2.91667H10.5" id="Vector_3" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 9.91667V11.0833" id="Vector_4" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.91667 10.5H1.75" id="Vector_5" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2217">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[18px] left-[152.5px] not-italic text-[#68737d] text-[14px] text-center top-[3.5px] tracking-[-0.08px]">Which metrics have the biggest changes this month?</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[7px] h-[38.5px] items-center left-[636.5px] px-[11.5px] py-px rounded-[20px] top-0 w-[348.625px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Icon7 />
      <Text2 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[38.5px] left-[35px] top-[426.25px] w-[1130px]" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 5.83333">
            <path d={svgPaths.p3c9800} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="flex-[1_0_0] h-[27px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-black top-[-0.5px]">KPI watchlist</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3cd50200} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[21px] left-[14.5px] not-italic text-[#68737d] text-[14px] text-center top-0">Filter</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[31.5px] relative rounded-[3.5px] shrink-0 w-[70.633px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center px-[10.5px] relative size-full">
        <Icon9 />
        <Text3 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[204.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Button9 />
        <Heading5 />
        <Button10 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.25px] px-[5.25px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Button11 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.0004px]">Avg Resolution Time</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[36px] relative shrink-0 w-[47.758px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[36px] left-0 not-italic text-[24px] text-black top-[-0.5px]">3.8h</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1caa1e00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p8fd7300} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[14px] top-[-0.5px] tracking-[-0.0004px]">-12%</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[49.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center relative size-full">
        <Icon11 />
        <Text4 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[36px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Container29 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px] w-[60px] whitespace-pre-wrap">Target: 4.0h</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[7px] h-[119px] items-start left-0 pb-px pt-[18.5px] px-[18.5px] rounded-[8px] top-0 w-[367.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Paragraph5 />
      <Container28 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.0004px]">Escalation Rate</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[55.328px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[36px] left-0 not-italic text-[24px] text-black top-[-0.5px]">6.8%</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1caa1e00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p8fd7300} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[14px] top-[-0.5px] tracking-[-0.0004px]">-15%</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[49.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center relative size-full">
        <Icon12 />
        <Text5 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex h-[36px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph9 />
      <Container32 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px] w-[62px] whitespace-pre-wrap">Target: 7.5%</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[7px] h-[119px] items-start left-[381.33px] pb-px pt-[18.5px] px-[18.5px] rounded-[8px] top-0 w-[367.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Paragraph8 />
      <Container31 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.0004px]">BSAT Score</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[36px] relative shrink-0 w-[55.453px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[36px] left-0 not-italic text-[24px] text-black top-[-0.5px]">4.2/5</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[14px] top-[-0.5px] tracking-[-0.0004px]">+5%</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[46.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center relative size-full">
        <Icon13 />
        <Text6 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex h-[36px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph12 />
      <Container35 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px] w-[64px] whitespace-pre-wrap">Target: 4.0/5</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[7px] h-[119px] items-start left-[762.66px] pb-px pt-[18.5px] px-[18.5px] rounded-[8px] top-0 w-[367.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Paragraph11 />
      <Container34 />
      <Paragraph13 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.0004px]">First Contact Resolution</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[36px] relative shrink-0 w-[48.258px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[36px] left-0 not-italic text-[24px] text-black top-[-0.5px]">78%</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[14px] top-[-0.5px] tracking-[-0.0004px]">+3%</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[16px] relative shrink-0 w-[46.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center relative size-full">
        <Icon14 />
        <Text7 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[36px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph15 />
      <Container38 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px] w-[60px] whitespace-pre-wrap">Target: 75%</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[7px] h-[119px] items-start left-0 pb-px pt-[18.5px] px-[18.5px] rounded-[8px] top-[133px] w-[367.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Paragraph14 />
      <Container37 />
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.0004px]">Active Tickets</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[36px] relative shrink-0 w-[41.414px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[36px] left-0 not-italic text-[24px] text-black top-[-0.5px]">247</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#e7000b] text-[14px] top-[-0.5px] tracking-[-0.0004px]">+8%</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[16px] relative shrink-0 w-[46.539px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center relative size-full">
        <Icon15 />
        <Text8 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex h-[36px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph18 />
      <Container41 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px] w-[58px] whitespace-pre-wrap">Target: 200</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[7px] h-[119px] items-start left-[381.33px] pb-px pt-[18.5px] px-[18.5px] rounded-[8px] top-[133px] w-[367.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Paragraph17 />
      <Container40 />
      <Paragraph19 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.0004px]">SLA Compliance</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[36px] relative shrink-0 w-[69.375px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[36px] left-0 not-italic text-[24px] text-black top-[-0.5px]">94.2%</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[14px] top-[-0.5px] tracking-[-0.0004px]">+2%</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[46.008px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center relative size-full">
        <Icon16 />
        <Text9 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex h-[36px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph21 />
      <Container44 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px] w-[61px] whitespace-pre-wrap">Target: 90%</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[7px] h-[119px] items-start left-[762.66px] pb-px pt-[18.5px] px-[18.5px] rounded-[8px] top-[133px] w-[367.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Paragraph20 />
      <Container43 />
      <Paragraph22 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[252px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container30 />
      <Container33 />
      <Container36 />
      <Container39 />
      <Container42 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] h-[297.5px] items-start left-[35px] top-[498.75px] w-[1130px]" data-name="Container">
      <Container24 />
      <Container26 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 5.83333">
            <path d={svgPaths.p3c9800} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="flex-[1_0_0] h-[27px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-black top-[-0.5px]">Recommendations</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[27px] relative shrink-0 w-[173.242px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Button12 />
        <Heading6 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 2.91667">
            <path d={svgPaths.p3b0af300} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="flex-[1_0_0] h-[31.5px] min-h-px min-w-px relative rounded-[8.75px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7px] px-[7px] relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 size-[31.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button13 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Route specific tickets to assignee: EMEA Group</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Resolution time could improve by 2h 25min</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[rgba(31,115,183,0.08)] h-[19.5px] left-0 rounded-[3.5px] top-0 w-[54.398px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#1f73b7] text-[12px] top-[1.25px] tracking-[-0.0004px]">Triggers</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[rgba(104,115,125,0.08)] h-[19.5px] left-[61.4px] rounded-[3.5px] top-0 w-[120.43px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#68737d] text-[12px] top-[1.25px] tracking-[-0.0004px]">Workflow automation</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] h-[69.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading7 />
        <Paragraph23 />
        <Container53 />
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-[100.43px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[7px] relative size-full">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-black text-[14px] text-center">View details</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex h-[69.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Button14 />
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-white h-[106.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container51 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Change ticket status for intent: Unsolicited marketing</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Resolution time could improve by 1h 05min</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[rgba(3,129,83,0.08)] h-[19.5px] left-0 rounded-[3.5px] top-0 w-[68.898px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#038153] text-[12px] top-[1.25px] tracking-[-0.0004px]">Auto assist</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[rgba(104,115,125,0.08)] h-[19.5px] left-[75.9px] rounded-[3.5px] top-0 w-[77.984px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#68737d] text-[12px] top-[1.25px] tracking-[-0.0004px]">Optimization</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[rgba(104,115,125,0.08)] h-[19.5px] left-[160.88px] rounded-[3.5px] top-0 w-[110.375px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#68737d] text-[12px] top-[1.25px] tracking-[-0.0004px]">Previously declined</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Container">
      <Text12 />
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container56() {
  return (
    <div className="flex-[1_0_0] h-[69.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading8 />
        <Paragraph24 />
        <Container57 />
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-[100.43px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[7px] relative size-full">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-black text-[14px] text-center">View details</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex h-[69.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Button15 />
    </div>
  );
}

function Container54() {
  return (
    <div className="bg-white h-[106.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container55 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Turn on suggested macros</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Resolution time could improve by 50min</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[rgba(95,79,209,0.08)] h-[19.5px] left-0 rounded-[3.5px] top-0 w-[51.188px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#5f4fd1] text-[12px] top-[1.25px] tracking-[-0.0004px]">Macros</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[rgba(104,115,125,0.08)] h-[19.5px] left-[58.19px] rounded-[3.5px] top-0 w-[105.781px]" data-name="Text">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[7px] not-italic text-[#68737d] text-[12px] top-[1.25px] tracking-[-0.0004px]">Agent productivity</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Container60() {
  return (
    <div className="flex-[1_0_0] h-[69.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading9 />
        <Paragraph25 />
        <Container61 />
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[35px] relative rounded-[6.75px] shrink-0 w-[100.43px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[7px] relative size-full">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-black text-[14px] text-center">View details</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex h-[69.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Button16 />
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-white h-[106.5px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container59 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[340.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container54 />
      <Container58 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[21px] h-[393px] items-start left-[35px] top-[824.25px] w-[1130px]" data-name="Container">
      <Container46 />
      <Container49 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 5.83333">
            <path d={svgPaths.p3c9800} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="flex-[1_0_0] h-[27px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-black top-[-0.5px]">Recent</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[27px] relative shrink-0 w-[84.648px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Button17 />
        <Heading10 />
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="flex-[1_0_0] h-[35px] min-h-px min-w-px relative rounded-[6.75px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[7px] relative size-full">
          <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-black text-[14px] text-center">View all</p>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[35px] relative shrink-0 w-[73.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button18 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex h-[35px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.pdf40b00} id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.58px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 1.16667">
            <path d="M0.583333 0.583333H11.0833" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_12.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container69 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Resolution Time Monitoring</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[58.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Sarah Chen</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon21 />
      <Text17 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.133px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">2 hours ago</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon22 />
      <Text18 />
    </div>
  );
}

function Container70() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading11 />
        <Container71 />
        <Container72 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Container70 />
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#f8f9f9] col-[1] justify-self-stretch relative rounded-[12px] row-[1] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container67 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p1c524e00} id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-3/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 5.83333">
            <path d="M0.583333 5.25V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_45.83%_29.17%_54.17%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_66.67%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-33.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 2.91667">
            <path d="M0.583333 2.33333V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container75 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Weekly Performance Summary</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[77.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Mike Rodriguez</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon24 />
      <Text19 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[47.727px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">1 day ago</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon25 />
      <Text20 />
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading12 />
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container74 />
      <Container76 />
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-[#f8f9f9] col-[2] justify-self-stretch relative rounded-[12px] row-[1] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container73 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 11.0833">
            <path d={svgPaths.p640dbc0} id="Vector" stroke="var(--stroke-0, #1F73B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container81 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">AI Performance Metrics</p>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[43.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Alex Kim</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon27 />
      <Text21 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[16px] relative shrink-0 w-[54.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">2 days ago</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon28 />
      <Text22 />
    </div>
  );
}

function Container82() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading13 />
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container80 />
      <Container82 />
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-[#f8f9f9] col-[3] justify-self-stretch relative rounded-[12px] row-[1] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container79 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p1c524e00} id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-3/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 5.83333">
            <path d="M0.583333 5.25V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_45.83%_29.17%_54.17%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_66.67%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-33.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 2.91667">
            <path d="M0.583333 2.33333V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container87 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Escalation Analysis</p>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[16px] relative shrink-0 w-[68.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Emma Wilson</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon30 />
      <Text23 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[16px] relative shrink-0 w-[55.086px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">3 days ago</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon31 />
      <Text24 />
    </div>
  );
}

function Container88() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading14 />
        <Container89 />
        <Container90 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <Container88 />
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-[#f8f9f9] col-[4] justify-self-stretch relative rounded-[12px] row-[1] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container85 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.pdf40b00} id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.58px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 1.16667">
            <path d="M0.583333 0.583333H11.0833" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_12.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container93 />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Real-time Monitoring</p>
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[16px] relative shrink-0 w-[61.211px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Noah Parker</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon33 />
      <Text25 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[16px] relative shrink-0 w-[55.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">1 week ago</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon34 />
      <Text26 />
    </div>
  );
}

function Container94() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading15 />
        <Container95 />
        <Container96 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Container94 />
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-[#f8f9f9] col-[1] justify-self-stretch relative rounded-[12px] row-[2] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container91 />
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.pdf40b00} id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.58px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 1.16667">
            <path d="M0.583333 0.583333H11.0833" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_12.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon35 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container99 />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Customer Satisfaction Trends</p>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[16px] relative shrink-0 w-[58.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Sarah Chen</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon36 />
      <Text27 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[16px] relative shrink-0 w-[55.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">1 week ago</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon37 />
      <Text28 />
    </div>
  );
}

function Container100() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading16 />
        <Container101 />
        <Container102 />
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container98 />
      <Container100 />
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-[#f8f9f9] col-[2] justify-self-stretch relative rounded-[12px] row-[2] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container97 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p1c524e00} id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-3/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 5.83333">
            <path d="M0.583333 5.25V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_45.83%_29.17%_54.17%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_66.67%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-33.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 2.91667">
            <path d="M0.583333 2.33333V0.583333" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon38 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container105 />
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Q4 Performance Analysis</p>
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[77.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Mike Rodriguez</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon39 />
      <Text29 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[62.742px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">2 weeks ago</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon40 />
      <Text30 />
    </div>
  );
}

function Container106() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading17 />
        <Container107 />
        <Container108 />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container104 />
      <Container106 />
    </div>
  );
}

function Button25() {
  return (
    <div className="bg-[#f8f9f9] col-[3] justify-self-stretch relative rounded-[12px] row-[2] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container103 />
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.pdf40b00} id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.58px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 1.16667">
            <path d="M0.583333 0.583333H11.0833" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_12.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 8.16667">
            <path d="M0.583333 7.58333V0.583333" id="Vector" stroke="var(--stroke-0, #5F4FD1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon41 />
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container111 />
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-black top-[-0.5px] tracking-[-0.154px]">Agent Productivity Dashboard</p>
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2141)" id="Icon">
          <path d={svgPaths.p19300900} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p2f2800} id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p4ab3860} id="Vector_3" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3798fb60} id="Vector_4" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2141">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[43.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Alex Kim</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon42 />
      <Text31 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g clipPath="url(#clip0_8113_2102)" id="Icon">
          <path d={svgPaths.p36d47780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M5.25 2.625V5.25L7 6.125" id="Vector_2" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2102">
            <rect fill="white" height="10.5" width="10.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[62.742px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">2 weeks ago</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex gap-[5.25px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon43 />
      <Text32 />
    </div>
  );
}

function Container112() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Heading18 />
        <Container113 />
        <Container114 />
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[88.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container110 />
      <Container112 />
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-[#f8f9f9] col-[4] justify-self-stretch relative rounded-[12px] row-[2] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[17.5px] px-[17.5px] relative size-full">
        <Container109 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="gap-[14px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] grid-rows-[repeat(2,_minmax(0,_1fr))] h-[261.5px] relative shrink-0 w-full" data-name="Container">
      <Button19 />
      <Button20 />
      <Button21 />
      <Button22 />
      <Button23 />
      <Button24 />
      <Button25 />
      <Button26 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[21px] h-[317.5px] items-start left-[35px] top-[1245.25px] w-[1130px]" data-name="Container">
      <Container63 />
      <Container66 />
    </div>
  );
}

function Icon44() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 5.83333">
            <path d={svgPaths.p3c9800} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon44 />
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="flex-[1_0_0] h-[27px] min-h-px min-w-px relative" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-black top-[-0.5px]">{`What's new`}</p>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="h-[27px] relative shrink-0 w-[120.508px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Button27 />
        <Heading19 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[1009.492px] relative size-full">
          <Container117 />
        </div>
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[21px] left-0 not-italic text-[14px] text-black top-0">Announcements</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Oct 31, 2024</p>
    </div>
  );
}

function Icon45() {
  return (
    <div className="absolute left-[278.44px] size-[10.5px] top-[4.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Icon">
          <path d="M6.5625 1.3125H9.1875V3.9375" id="Vector" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M4.375 6.125L9.1875 1.3125" id="Vector_2" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p35b87a0} id="Vector_3" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-black text-[14px] top-[-0.5px] tracking-[-0.154px]">Announcing the Authenticated SMTP Connector</p>
      <Icon45 />
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] h-[39.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph26 />
      <Link />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Oct 31, 2024</p>
    </div>
  );
}

function Icon46() {
  return (
    <div className="absolute left-[324.42px] size-[10.5px] top-[4.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Icon">
          <path d="M6.5625 1.3125H9.1875V3.9375" id="Vector" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M4.375 6.125L9.1875 1.3125" id="Vector_2" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p35b87a0} id="Vector_3" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-black text-[14px] top-[-0.5px] tracking-[-0.154px]">Announcing CSAT public API and updates to CSAT email</p>
      <Icon46 />
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] h-[39.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph27 />
      <Link1 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Oct 31, 2024</p>
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-[189.72px] size-[10.5px] top-[4.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Icon">
          <path d="M6.5625 1.3125H9.1875V3.9375" id="Vector" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M4.375 6.125L9.1875 1.3125" id="Vector_2" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p35b87a0} id="Vector_3" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-black text-[14px] top-[-0.5px] tracking-[-0.154px]">Announcing Department Spaces</p>
      <Icon47 />
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] h-[39.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph28 />
      <Link2 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] tracking-[-0.0004px]">Oct 28, 2024</p>
    </div>
  );
}

function Icon48() {
  return (
    <div className="absolute left-[320.45px] size-[10.5px] top-[4.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Icon">
          <path d="M6.5625 1.3125H9.1875V3.9375" id="Vector" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d="M4.375 6.125L9.1875 1.3125" id="Vector_2" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p35b87a0} id="Vector_3" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-black text-[14px] top-[-0.5px] tracking-[-0.154px]">Announcing user suspension for the messaging channel</p>
      <Icon48 />
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] h-[39.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph29 />
      <Link3 />
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[200px] items-start relative shrink-0 w-full" data-name="Container">
      <Container121 />
      <Container122 />
      <Container123 />
      <Container124 />
    </div>
  );
}

function Container119() {
  return (
    <div className="bg-white col-[1] justify-self-stretch relative rounded-[8px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[14px] items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Heading20 />
        <Container120 />
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
        <g id="Icon">
          <path d={svgPaths.p2a6d1550} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p116d0080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Container127() {
  return (
    <div className="bg-[#6b5dd3] relative rounded-[16777200px] shrink-0 size-[35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon49 />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[516px]" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-0.5px]">New project: AI Agent Automation ROI</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[42.25px] left-0 top-[31px] w-[516px]" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[21.125px] left-0 not-italic text-[#717182] text-[13px] top-[0.5px] w-[436px] whitespace-pre-wrap">See the ROI of your AI agent automation with automation potential prediction and comprehensive analytics.</p>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute bg-white h-[31.5px] left-0 rounded-[6.75px] top-[87.25px] w-[96.344px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[17.5px] left-[48.5px] not-italic text-[#6b5dd3] text-[12.25px] text-center top-[7.5px]">Open project</p>
    </div>
  );
}

function Container128() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading21 />
        <Paragraph30 />
        <Button28 />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[164.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container127 />
      <Container128 />
    </div>
  );
}

function Container125() {
  return (
    <div className="col-[2] justify-self-stretch relative rounded-[8px] row-[1] self-stretch shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(169.53deg, rgb(255, 255, 255) 8.534%, rgb(234, 232, 255) 41.707%, rgb(252, 252, 252) 65.55%, rgb(230, 230, 250) 91.466%)" }}>
      <div className="content-stretch flex flex-col items-start pt-[21px] px-[21px] relative size-full">
        <Container126 />
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="gap-[14px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[272px] relative shrink-0 w-full" data-name="Container">
      <Container119 />
      <Container125 />
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[21px] h-[320px] items-start left-[35px] top-[1590.75px] w-[1130px]" data-name="Container">
      <Container116 />
      <Container118 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[1959.75px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
      <Container22 />
      <Container23 />
      <Container45 />
      <Container62 />
      <Container115 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[824px] items-start left-[56px] overflow-clip px-[97.5px] top-0 w-[1395px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83333 8.02083">
            <path d={svgPaths.p8f85480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.34%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 15.3121">
            <path d={svgPaths.p120b7000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="bg-black relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon50 />
      </div>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute content-stretch flex h-[38.5px] items-center justify-center left-0 top-0 w-[56px]" data-name="Button">
      <Container130 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5834">
            <path d={svgPaths.p202e6f00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon51 />
      </div>
    </div>
  );
}

function Button30() {
  return (
    <div className="absolute content-stretch flex h-[38.5px] items-center justify-center left-0 top-[38.5px] w-[56px]" data-name="Button">
      <Container131 />
    </div>
  );
}

function Container132() {
  return <div className="absolute bg-[rgba(0,0,0,0.1)] h-px left-[14px] top-[84px] w-[28px]" data-name="Container" />;
}

function Icon52() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
            <path d={svgPaths.p3ba7ca00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.73px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 1.45833">
            <path d="M0.729167 0.729167H13.8542" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_12.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45833 10.2083">
            <path d="M0.729167 9.47917V0.729167" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="absolute content-stretch flex h-[38.5px] items-center justify-center left-0 top-[92px] w-[56px]" data-name="Button">
      <Container133 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 5.83333">
            <path d={svgPaths.p29ffaf00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 13.8542">
            <path d={svgPaths.p3bd49b80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[37.5%] left-[12.5%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-33.33%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 3.64583">
            <path d={svgPaths.p3cca30c0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon53 />
      </div>
    </div>
  );
}

function Button32() {
  return (
    <div className="absolute content-stretch flex h-[38.5px] items-center justify-center left-0 top-[130.5px] w-[56px]" data-name="Button">
      <Container134 />
    </div>
  );
}

function Icon54() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.609 16.0417">
            <path d={svgPaths.p2f927600} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83333 5.83333">
            <path d={svgPaths.p34204e00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[24.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon54 />
      </div>
    </div>
  );
}

function Button33() {
  return (
    <div className="absolute content-stretch flex h-[38.5px] items-center justify-center left-0 top-[169px] w-[56px]" data-name="Button">
      <Container135 />
    </div>
  );
}

function Button34() {
  return <div className="absolute h-[14px] left-0 top-[207.5px] w-[56px]" data-name="Button" />;
}

function Navigation() {
  return (
    <div className="h-[221.5px] relative shrink-0 w-[56px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button29 />
        <Button30 />
        <Container132 />
        <Button31 />
        <Button32 />
        <Button33 />
        <Button34 />
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute bg-[#f8f9f9] content-stretch flex flex-col h-[824px] items-start left-0 pt-[14px] top-0 w-[56px]" data-name="Container">
      <Navigation />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white h-[824px] left-0 overflow-clip top-[56px] w-[1451px]" data-name="Container">
      <Container1 />
      <Container129 />
    </div>
  );
}

function Section() {
  return <div className="absolute h-0 left-0 top-[880px] w-[1451px]" data-name="Section" />;
}

function Container139() {
  return <div className="absolute left-[132.96px] size-0 top-[14px]" data-name="Container" />;
}

function Icon55() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[10%_0_14.23%_0]" data-name="Icon">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 10.6077">
          <path clipRule="evenodd" d={svgPaths.p24145a00} fill="var(--fill-0, black)" fillRule="evenodd" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[14px] top-0" data-name="Container">
      <Icon55 />
    </div>
  );
}

function Container142() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container143 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[82.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#0a0a0a] text-[15px] top-[-1px]">Analytics</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute content-stretch flex gap-[32.25px] h-[22.5px] items-center left-0 top-0 w-[125.961px]" data-name="Container">
      <Container142 />
      <Text33 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 5.83333">
            <path d={svgPaths.p30b21080} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[108.46px] size-[17.5px] top-[2.5px]" data-name="Container">
      <Icon56 />
    </div>
  );
}

function Container140() {
  return (
    <div className="absolute h-[22.5px] left-0 top-[2.75px] w-[125.961px]" data-name="Container">
      <Container141 />
      <Container144 />
    </div>
  );
}

function Icon57() {
  return (
    <div className="absolute left-[8.75px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 2.91667V11.0833" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute h-[20px] left-[26.25px] top-[4px] w-[40.375px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[20px] left-[20.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[-0.5px]">Create</p>
    </div>
  );
}

function Button35() {
  return (
    <div className="absolute h-[28px] left-[139.96px] rounded-[6.75px] top-0 w-[75.375px]" data-name="Button">
      <Icon57 />
      <Text34 />
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[28px] relative shrink-0 w-[215.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container139 />
        <Container140 />
        <Button35 />
      </div>
    </div>
  );
}

function Icon59() {
  return (
    <div className="absolute contents inset-0" data-name="Icon">
      <div className="absolute inset-[68.75%_68.75%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.46875 5.46877">
          <path d={svgPaths.p22154880} fill="url(#paint0_linear_8113_2203)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8113_2203" x1="-1.86476" x2="17.5026" y1="-4.87981" y2="-5.2467">
              <stop stopColor="#DAC9FF" />
              <stop offset="0.420407" stopColor="#A33FE1" />
              <stop offset="1" stopColor="#6743E1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[0_0_6.25%_6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4063 16.4063">
          <path d={svgPaths.p29e39200} fill="url(#paint0_linear_8113_2117)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8113_2117" x1="-2.9585" x2="16.4089" y1="7.15144" y2="6.78455">
              <stop stopColor="#DAC9FF" />
              <stop offset="0.420407" stopColor="#A33FE1" />
              <stop offset="1" stopColor="#6743E1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon59 />
    </div>
  );
}

function Container146() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[10.5px] size-[17.5px] top-[5.25px]" data-name="Container">
      <Icon58 />
    </div>
  );
}

function Button36() {
  return (
    <div className="absolute h-[28px] left-[276.5px] rounded-[6.75px] top-[3.5px] w-[38.5px]" data-name="Button">
      <Container146 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[31.5px] left-0 rounded-[6.75px] top-0 w-[224px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[31.5px] pr-[10.5px] py-[3.5px] relative rounded-[inherit] size-full">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#717182] text-[12.25px]">Search analytics...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Icon60() {
  return (
    <div className="absolute left-[10.5px] size-[14px] top-[8.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p8cdb700} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 12.25L9.74167 9.74167" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container147() {
  return (
    <div className="absolute h-[31.5px] left-0 top-[1.75px] w-[224px]" data-name="Container">
      <TextInput />
      <Icon60 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="absolute left-[8.75px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p29efa600} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3042bc80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute bg-[#d4183d] left-[17.5px] rounded-[6.75px] size-[17.5px] top-[-3.5px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[10.5px] text-center text-white">2</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Button37() {
  return (
    <div className="absolute h-[28px] left-[234.5px] rounded-[6.75px] top-[3.5px] w-[31.5px]" data-name="Button">
      <Icon61 />
      <Text35 />
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p100e7280} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p38a00300} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container148() {
  return (
    <div className="absolute bg-[#e8eaec] content-stretch flex items-center justify-center left-[3.5px] rounded-[16777200px] size-[28px] top-[3.5px]" data-name="Container">
      <Icon62 />
    </div>
  );
}

function Button38() {
  return (
    <div className="absolute left-[325.5px] rounded-[16777200px] size-[35px] top-0" data-name="Button">
      <Container148 />
    </div>
  );
}

function Container145() {
  return (
    <div className="h-[35px] relative shrink-0 w-[360.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button36 />
        <Container147 />
        <Button37 />
        <Button38 />
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute content-stretch flex h-[56px] items-center justify-between left-0 px-[21px] top-0 w-[1451px]" data-name="Container">
      <Container138 />
      <Container145 />
    </div>
  );
}

function Container149() {
  return <div className="absolute bg-[#f8f9f9] h-px left-0 top-[55px] w-[56px]" data-name="Container" />;
}

function Container136() {
  return (
    <div className="absolute bg-[#f8f9f9] h-[56px] left-0 top-0 w-[1451px]" data-name="Container">
      <Container137 />
      <Container149 />
    </div>
  );
}

function PQ() {
  return (
    <div className="absolute bg-white h-[880px] left-0 overflow-clip top-0 w-[1451px]" data-name="pQ">
      <Container />
      <Section />
      <Container136 />
    </div>
  );
}

function Container150() {
  return <div className="absolute left-[1051px] opacity-40 size-[400px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(225deg, rgb(218, 201, 255) 0%, rgba(218, 201, 255, 0) 60%)" }} />;
}

function Container153() {
  return <div className="absolute h-[161px] left-[16px] rounded-[8.75px] top-[23px] w-[655px]" data-name="Container" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 655 161\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(65.5 2.2052 -102.59 53.006 -0.0000065741 138.95)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(232,244,255,1)\\' offset=\\'0.4\\'/><stop stop-color=\\'rgba(252,252,252,1)\\' offset=\\'0.6875\\'/><stop stop-color=\\'rgba(181,217,253,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>\')" }} />;
}

function Heading22() {
  return (
    <div className="absolute font-['SF_Pro_Display:Regular',sans-serif] h-[84px] left-[21px] not-italic top-[66.5px] w-[650px]" data-name="Heading 2">
      <p className="absolute leading-[42px] left-[22px] text-[28px] text-black top-[2px]">Analytics home,</p>
      <p className="absolute leading-[0] left-[22px] text-[28px] text-black top-[34px]">
        <span className="leading-[42px]">{`your way `}</span>
        <span className="leading-[42px] text-[#317ab5]">Leah</span>
      </p>
      <p className="absolute leading-[16px] left-[291px] text-[#545454] text-[14px] top-[14.5px] w-[305px] whitespace-pre-wrap">Choose a template that matches your role and customize the sections that appear on your home view.</p>
    </div>
  );
}

function Paragraph31() {
  return <div className="absolute h-[21px] left-[21px] top-[157.5px] w-[650px]" data-name="Paragraph" />;
}

function Heading23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[24px] left-0 not-italic text-[#2f3941] text-[16px] top-[-0.5px]">{`Persona & Purpose`}</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[18px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px]">Select a template based on your role</p>
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-[180.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Heading23 />
        <Paragraph32 />
      </div>
    </div>
  );
}

function Icon63() {
  return (
    <div className="absolute left-[9.75px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3cd50200} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button39() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6.75px] shrink-0 w-[66.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon63 />
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[17.5px] left-[44.25px] not-italic text-[#0a0a0a] text-[12.25px] text-center top-[5.75px]">Filter</p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="content-stretch flex h-[60.5px] items-center justify-between pt-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container156 />
      <Button39 />
    </div>
  );
}

function Icon64() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0417 16.0417">
            <path d={svgPaths.p91fb600} id="Vector" stroke="var(--stroke-0, #1F73B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 10.2083">
            <path d={svgPaths.p1d5c4700} id="Vector" stroke="var(--stroke-0, #1F73B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.375 4.375">
            <path d={svgPaths.p7530500} id="Vector" stroke="var(--stroke-0, #1F73B7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon64 />
      </div>
    </div>
  );
}

function Heading24() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[97.906px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">Support Manager</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading24 />
      </div>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] w-[256px] whitespace-pre-wrap">Focus on team performance, efficiency metrics, and strategic insights</p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <Container159 />
      <Container160 />
      <Paragraph33 />
    </div>
  );
}

function Button40() {
  return (
    <div className="bg-[rgba(61,161,241,0.1)] col-[1] justify-self-stretch relative rounded-[8px] row-[1] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[10.5px] px-[10.5px] relative size-full">
        <Container158 />
      </div>
    </div>
  );
}

function Icon65() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 5.83333">
            <path d={svgPaths.p29c83200} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.29167 7.29167">
            <path d={svgPaths.p265c9900} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.64601 5.73872">
            <path d={svgPaths.p10104500} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.65173 7.10973">
            <path d={svgPaths.p3a9dd180} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon65 />
      </div>
    </div>
  );
}

function Heading25() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[81.93px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">Support Agent</p>
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading25 />
      </div>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] w-[292px] whitespace-pre-wrap">Daily tasks, personal metrics, and quick actions for efficient ticket handling</p>
      </div>
    </div>
  );
}

function Container161() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <Container162 />
      <Container163 />
      <Paragraph34 />
    </div>
  );
}

function Button41() {
  return (
    <div className="bg-[#f8f9f9] col-[2] justify-self-stretch relative rounded-[8px] row-[1] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[10.5px] px-[10.5px] relative size-full">
        <Container161 />
      </div>
    </div>
  );
}

function Icon66() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0417 8.75">
            <path d={svgPaths.pe8cbff0} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83333 5.83333">
            <path d={svgPaths.p19c52e00} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container165() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon66 />
      </div>
    </div>
  );
}

function Heading26() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.266px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">Executive</p>
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading26 />
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] w-[279px] whitespace-pre-wrap">High-level overview, strategic KPIs, and business impact insights</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <Container165 />
      <Container166 />
      <Paragraph35 />
    </div>
  );
}

function Button42() {
  return (
    <div className="bg-[#f8f9f9] col-[1] justify-self-stretch relative rounded-[8px] row-[2] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[10.5px] px-[10.5px] relative size-full">
        <Container164 />
      </div>
    </div>
  );
}

function Icon67() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
            <path d={svgPaths.p3d6fef40} id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-3/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45833 7.29167">
            <path d="M0.729167 6.5625V0.729167" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_45.83%_29.17%_54.17%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45833 10.2083">
            <path d="M0.729167 9.47917V0.729167" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_66.67%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-33.33%_-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45833 3.64583">
            <path d="M0.729167 2.91667V0.729167" id="Vector" stroke="var(--stroke-0, #AC5918)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon67 />
      </div>
    </div>
  );
}

function Heading27() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[71.266px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">Data Analyst</p>
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading27 />
      </div>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px]">Deep dive into data, custom reports, and advanced analytics</p>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Container168 />
      <Container169 />
      <Paragraph36 />
    </div>
  );
}

function Button43() {
  return (
    <div className="bg-[#f8f9f9] col-[2] justify-self-stretch relative rounded-[8px] row-[2] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[20.5px] px-[10.5px] relative size-full">
        <Container167 />
      </div>
    </div>
  );
}

function Icon68() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
            <path d={svgPaths.p17e17c00} id="Vector" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-10%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9375 8.75">
            <path d={svgPaths.pbc923c0} id="Vector" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon68 />
      </div>
    </div>
  );
}

function Heading28() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[102.117px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">Quality Assurance</p>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading28 />
      </div>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] w-[234px] whitespace-pre-wrap">Monitor quality metrics, review cases, and track improvement trends</p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <Container171 />
      <Container172 />
      <Paragraph37 />
    </div>
  );
}

function Button44() {
  return (
    <div className="bg-[#f8f9f9] col-[1] justify-self-stretch relative rounded-[8px] row-[3] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[10.5px] px-[10.5px] relative size-full">
        <Container170 />
      </div>
    </div>
  );
}

function Icon69() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 5.83333">
            <path d={svgPaths.p29c83200} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.29167 7.29167">
            <path d={svgPaths.p265c9900} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.64601 5.73872">
            <path d={svgPaths.p10104500} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.65173 7.10973">
            <path d={svgPaths.p3a9dd180} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon69 />
      </div>
    </div>
  );
}

function Heading29() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[123.633px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">Supervisor monitoring</p>
      </div>
    </div>
  );
}

function Container177() {
  return <div className="bg-[#038153] rounded-[16777200px] shrink-0 size-[3.5px]" data-name="Container" />;
}

function Text36() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[15px] left-0 not-italic text-[#038153] text-[10px] top-[0.5px]">Real-time</p>
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="bg-[#e6f7f0] h-[18.5px] relative rounded-[16777200px] shrink-0 w-[59.508px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.5px] items-center px-[5.25px] relative size-full">
        <Container177 />
        <Text36 />
      </div>
    </div>
  );
}

function Container175() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Heading29 />
        <Container176 />
      </div>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] w-[259px] whitespace-pre-wrap">Monitor operations with live data and real-time team performance tracking</p>
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <Container174 />
      <Container175 />
      <Paragraph38 />
    </div>
  );
}

function Button45() {
  return (
    <div className="bg-[#f8f9f9] col-[2] justify-self-stretch relative rounded-[8px] row-[3] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[10.5px] px-[10.5px] relative size-full">
        <Container173 />
      </div>
    </div>
  );
}

function Icon70() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[66.67%] left-[33.33%] right-1/2 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.375 4.375">
            <path d={svgPaths.p22eb5f00} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_16.67%_16.67%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.125 10.2083">
            <path d={svgPaths.p3f5ece70} id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_83.33%_41.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-0.73px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 1.45833">
            <path d="M0.729167 0.729167H2.1875" id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_8.33%_41.67%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-0.73px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91667 1.45833">
            <path d="M0.729167 0.729167H2.1875" id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_37.5%_37.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45833 2.91667">
            <path d="M0.729167 0.729167V2.1875" id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_62.5%_37.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45833 2.91667">
            <path d="M0.729167 0.729167V2.1875" id="Vector" stroke="var(--stroke-0, #6743E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[281.25px] relative size-full">
        <Icon70 />
      </div>
    </div>
  );
}

function Heading30() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[50.664px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3941] text-[13px] top-px">AI Admin</p>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[298.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Heading30 />
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[298.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#68737d] text-[12px] top-[-0.5px] w-[298px] whitespace-pre-wrap">Oversee automated resolution and unlock the potential of AI agents</p>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[98px] items-start relative shrink-0 w-full" data-name="Container">
      <Container179 />
      <Container180 />
      <Paragraph39 />
    </div>
  );
}

function Button46() {
  return (
    <div className="bg-[#f8f9f9] col-[1] justify-self-stretch relative rounded-[8px] row-[4] self-stretch shrink-0" data-name="Button">
      <div className="content-stretch flex flex-col items-start pt-[10.5px] px-[10.5px] relative size-full">
        <Container178 />
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="gap-[10.5px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(4,_minmax(0,_1fr))] h-[507.5px] relative shrink-0 w-full" data-name="Container">
      <Button40 />
      <Button41 />
      <Button42 />
      <Button43 />
      <Button44 />
      <Button45 />
      <Button46 />
    </div>
  );
}

function Container154() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] h-[582px] items-start left-[21px] top-[199.5px] w-[650px]" data-name="Container">
      <Container155 />
      <Container157 />
    </div>
  );
}

function Container152() {
  return (
    <div className="bg-white h-[805.5px] relative shrink-0 w-[693px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container153 />
        <Heading22 />
        <Paragraph31 />
        <Container154 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon71() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button47() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[21px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon71 />
      </div>
    </div>
  );
}

function Icon72() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.25">
        <g id="Icon">
          <path d="M10 3.125L4.5 8.625L2 6.125" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center justify-center relative shrink-0 w-full" data-name="Primitive.span">
      <Icon72 />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-black relative rounded-[4px] shrink-0 size-[14px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function Heading31() {
  return (
    <div className="h-[21px] relative shrink-0 w-[87.938px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">Latest insights</p>
      </div>
    </div>
  );
}

function Container187() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[477.063px] relative size-full">
          <Heading31 />
        </div>
      </div>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">Show AI-powered insights about your support metrics</p>
    </div>
  );
}

function Container186() {
  return (
    <div className="flex-[1_0_0] h-[54.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Container187 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[54.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Button47 />
      <PrimitiveButton />
      <Container186 />
    </div>
  );
}

function Container184() {
  return (
    <div className="bg-white h-[84.5px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[15px] px-[15px] relative size-full">
        <Container185 />
      </div>
    </div>
  );
}

function Icon73() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button48() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[21px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon73 />
      </div>
    </div>
  );
}

function Icon74() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.25">
        <g id="Icon">
          <path d="M10 3.125L4.5 8.625L2 6.125" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center justify-center relative shrink-0 w-full" data-name="Primitive.span">
      <Icon74 />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-black relative rounded-[4px] shrink-0 size-[14px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <PrimitiveSpan1 />
      </div>
    </div>
  );
}

function Heading32() {
  return (
    <div className="h-[21px] relative shrink-0 w-[77.313px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">KPI watchlist</p>
      </div>
    </div>
  );
}

function Icon75() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1eaef80} id="Vector" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #000000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button49() {
  return (
    <div className="h-[24.5px] relative rounded-[6.75px] shrink-0 w-[31.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon75 />
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="content-stretch flex h-[24.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading32 />
      <Button49 />
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">{`Display key performance indicators you're tracking`}</p>
    </div>
  );
}

function Container194() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#68737d] text-[10px] top-[0.5px]">Ticket Volume</p>
    </div>
  );
}

function Container196() {
  return (
    <div className="h-[21px] relative shrink-0 w-[36.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">2,847</p>
      </div>
    </div>
  );
}

function Icon76() {
  return (
    <div className="absolute left-0 size-[8.75px] top-[3.13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
        <g clipPath="url(#clip0_8113_2240)" id="Icon">
          <path d={svgPaths.p4fe0cc0} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
          <path d={svgPaths.p1175ce00} id="Vector_2" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2240">
            <rect fill="white" height="8.75" width="8.75" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container197() {
  return (
    <div className="h-[15px] relative shrink-0 w-[35.164px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon76 />
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[15px] left-[10.5px] not-italic text-[#038153] text-[10px] top-[0.5px]">+12%</p>
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="content-stretch flex h-[21px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container196 />
      <Container197 />
    </div>
  );
}

function Container193() {
  return (
    <div className="bg-[#f9fafb] col-[1] justify-self-stretch relative rounded-[8.75px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="content-stretch flex flex-col gap-[1.75px] items-start pb-px pt-[8px] px-[8px] relative size-full">
        <Container194 />
        <Container195 />
      </div>
    </div>
  );
}

function Container199() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#68737d] text-[10px] top-[0.5px]">Avg Resolution Time</p>
    </div>
  );
}

function Container201() {
  return (
    <div className="h-[21px] relative shrink-0 w-[27.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">4.2h</p>
      </div>
    </div>
  );
}

function Icon77() {
  return (
    <div className="absolute left-0 size-[8.75px] top-[3.13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
        <g clipPath="url(#clip0_8113_2096)" id="Icon">
          <path d={svgPaths.p6573f00} id="Vector" stroke="var(--stroke-0, #D73E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
          <path d={svgPaths.p2d5dad00} id="Vector_2" stroke="var(--stroke-0, #D73E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2096">
            <rect fill="white" height="8.75" width="8.75" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container202() {
  return (
    <div className="h-[15px] relative shrink-0 w-[29.383px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon77 />
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[15px] left-[10.5px] not-italic text-[#d73e1e] text-[10px] top-[0.5px]">-8%</p>
      </div>
    </div>
  );
}

function Container200() {
  return (
    <div className="content-stretch flex h-[21px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container201 />
      <Container202 />
    </div>
  );
}

function Container198() {
  return (
    <div className="bg-[#f9fafb] col-[2] justify-self-stretch relative rounded-[8.75px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="content-stretch flex flex-col gap-[1.75px] items-start pb-px pt-[8px] px-[8px] relative size-full">
        <Container199 />
        <Container200 />
      </div>
    </div>
  );
}

function Container204() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#68737d] text-[10px] top-[0.5px]">CSAT Score</p>
    </div>
  );
}

function Container206() {
  return (
    <div className="h-[21px] relative shrink-0 w-[40.469px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">94.2%</p>
      </div>
    </div>
  );
}

function Icon78() {
  return (
    <div className="absolute left-0 size-[8.75px] top-[3.13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
        <g clipPath="url(#clip0_8113_2240)" id="Icon">
          <path d={svgPaths.p4fe0cc0} id="Vector" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
          <path d={svgPaths.p1175ce00} id="Vector_2" stroke="var(--stroke-0, #038153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2240">
            <rect fill="white" height="8.75" width="8.75" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container207() {
  return (
    <div className="h-[15px] relative shrink-0 w-[37.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon78 />
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[15px] left-[10.5px] not-italic text-[#038153] text-[10px] top-[0.5px]">+2.1%</p>
      </div>
    </div>
  );
}

function Container205() {
  return (
    <div className="content-stretch flex h-[21px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container206 />
      <Container207 />
    </div>
  );
}

function Container203() {
  return (
    <div className="bg-[#f9fafb] col-[1] justify-self-stretch relative rounded-[8.75px] row-[2] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="content-stretch flex flex-col gap-[1.75px] items-start pb-px pt-[8px] px-[8px] relative size-full">
        <Container204 />
        <Container205 />
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#68737d] text-[10px] top-[0.5px]">First Response Time</p>
    </div>
  );
}

function Container211() {
  return (
    <div className="h-[21px] relative shrink-0 w-[38.82px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">23min</p>
      </div>
    </div>
  );
}

function Icon79() {
  return (
    <div className="absolute left-0 size-[8.75px] top-[3.13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
        <g clipPath="url(#clip0_8113_2096)" id="Icon">
          <path d={svgPaths.p6573f00} id="Vector" stroke="var(--stroke-0, #D73E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
          <path d={svgPaths.p2d5dad00} id="Vector_2" stroke="var(--stroke-0, #D73E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.729167" />
        </g>
        <defs>
          <clipPath id="clip0_8113_2096">
            <rect fill="white" height="8.75" width="8.75" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container212() {
  return (
    <div className="h-[15px] relative shrink-0 w-[33.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon79 />
        <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[15px] left-[10.5px] not-italic text-[#d73e1e] text-[10px] top-[0.5px]">-15%</p>
      </div>
    </div>
  );
}

function Container210() {
  return (
    <div className="content-stretch flex h-[21px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container211 />
      <Container212 />
    </div>
  );
}

function Container208() {
  return (
    <div className="bg-[#f9fafb] col-[2] justify-self-stretch relative rounded-[8.75px] row-[2] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="content-stretch flex flex-col gap-[1.75px] items-start pb-px pt-[8px] px-[8px] relative size-full">
        <Container209 />
        <Container210 />
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="gap-[7px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(2,_minmax(0,_1fr))] h-[114.5px] relative shrink-0 w-full" data-name="Container">
      <Container193 />
      <Container198 />
      <Container203 />
      <Container208 />
    </div>
  );
}

function Container190() {
  return (
    <div className="flex-[1_0_0] h-[183px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Container191 />
        <Paragraph41 />
        <Container192 />
      </div>
    </div>
  );
}

function Container189() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[183px] items-start relative shrink-0 w-full" data-name="Container">
      <Button48 />
      <PrimitiveButton1 />
      <Container190 />
    </div>
  );
}

function Container188() {
  return (
    <div className="bg-white h-[213px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[15px] px-[15px] relative size-full">
        <Container189 />
      </div>
    </div>
  );
}

function Icon80() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button50() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[21px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon80 />
      </div>
    </div>
  );
}

function Icon81() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.25">
        <g id="Icon">
          <path d="M10 3.125L4.5 8.625L2 6.125" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center justify-center relative shrink-0 w-full" data-name="Primitive.span">
      <Icon81 />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="bg-black relative rounded-[4px] shrink-0 size-[14px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <PrimitiveSpan2 />
      </div>
    </div>
  );
}

function Heading33() {
  return (
    <div className="h-[21px] relative shrink-0 w-[113.734px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">Recommendations</p>
      </div>
    </div>
  );
}

function Container216() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[451.266px] relative size-full">
          <Heading33 />
        </div>
      </div>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">AI-powered suggestions to improve your workflow</p>
    </div>
  );
}

function Container215() {
  return (
    <div className="flex-[1_0_0] h-[54.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Container216 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container214() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[54.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Button50 />
      <PrimitiveButton2 />
      <Container215 />
    </div>
  );
}

function Container213() {
  return (
    <div className="bg-white h-[84.5px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[15px] px-[15px] relative size-full">
        <Container214 />
      </div>
    </div>
  );
}

function Icon82() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button51() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[21px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon82 />
      </div>
    </div>
  );
}

function Icon83() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.25">
        <g id="Icon">
          <path d="M10 3.125L4.5 8.625L2 6.125" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center justify-center relative shrink-0 w-full" data-name="Primitive.span">
      <Icon83 />
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="bg-black relative rounded-[4px] shrink-0 size-[14px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <PrimitiveSpan3 />
      </div>
    </div>
  );
}

function Heading34() {
  return (
    <div className="h-[21px] relative shrink-0 w-[42.695px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">Recent</p>
      </div>
    </div>
  );
}

function Container220() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[522.305px] relative size-full">
          <Heading34 />
        </div>
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">Quick access to recently viewed dashboards and reports</p>
    </div>
  );
}

function Container219() {
  return (
    <div className="flex-[1_0_0] h-[54.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Container220 />
        <Paragraph43 />
      </div>
    </div>
  );
}

function Container218() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[54.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Button51 />
      <PrimitiveButton3 />
      <Container219 />
    </div>
  );
}

function Container217() {
  return (
    <div className="bg-white h-[84.5px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[15px] px-[15px] relative size-full">
        <Container218 />
      </div>
    </div>
  );
}

function Icon84() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.33333 2.33333">
            <path d={svgPaths.p1e3f9780} id="Vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button52() {
  return (
    <div className="relative rounded-[3.5px] shrink-0 size-[21px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.5px] px-[3.5px] relative size-full">
        <Icon84 />
      </div>
    </div>
  );
}

function Icon85() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.25">
        <g id="Icon">
          <path d="M10 3.125L4.5 8.625L2 6.125" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center justify-center relative shrink-0 w-full" data-name="Primitive.span">
      <Icon85 />
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="bg-black relative rounded-[4px] shrink-0 size-[14px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <PrimitiveSpan4 />
      </div>
    </div>
  );
}

function Heading35() {
  return (
    <div className="h-[21px] relative shrink-0 w-[107.789px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">Analytics updates</p>
      </div>
    </div>
  );
}

function Container224() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[457.211px] relative size-full">
          <Heading35 />
        </div>
      </div>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">Latest announcements and product updates</p>
    </div>
  );
}

function Container223() {
  return (
    <div className="flex-[1_0_0] h-[54.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.5px] items-start relative size-full">
        <Container224 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Container222() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[54.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Button52 />
      <PrimitiveButton4 />
      <Container223 />
    </div>
  );
}

function Container221() {
  return (
    <div className="bg-white h-[84.5px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e8eaec] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[15px] px-[15px] relative size-full">
        <Container222 />
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[593px] items-start relative shrink-0 w-full" data-name="Container">
      <Container184 />
      <Container188 />
      <Container213 />
      <Container217 />
      <Container221 />
    </div>
  );
}

function Heading36() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[21px] left-0 not-italic text-[#2f3941] text-[14px] top-0">Custom filters</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#68737d] text-[13px] top-px">Add custom filters to refine your data when you load your home view</p>
    </div>
  );
}

function Container226() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading36 />
      <Paragraph45 />
    </div>
  );
}

function Icon86() {
  return (
    <div className="absolute left-[9.75px] size-[14px] top-[8.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 2.91667V11.0833" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button53() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6.75px] shrink-0 w-[97px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <Icon86 />
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[19.5px] left-[61.5px] not-italic text-[#0a0a0a] text-[13px] text-center top-[7px]">Add filter</p>
    </div>
  );
}

function Container225() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[86px] items-start relative shrink-0 w-full" data-name="Container">
      <Container226 />
      <Button53 />
    </div>
  );
}

function Container182() {
  return (
    <div className="h-[742px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[21px] items-start pt-[21px] px-[21px] relative size-full">
        <Container183 />
        <Container225 />
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="bg-[#f8f8f8] flex-[1_0_0] h-[805.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container182 />
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1386px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Container152 />
        <Container181 />
      </div>
    </div>
  );
}

function Button54() {
  return (
    <div className="bg-white h-[31.5px] relative rounded-[6.75px] shrink-0 w-[72.273px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[15px] py-[8px] relative size-full">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center">Cancel</p>
      </div>
    </div>
  );
}

function Button55() {
  return (
    <div className="bg-black h-[31.5px] relative rounded-[6.75px] shrink-0 w-[63.125px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[7px] relative size-full">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white">Apply</p>
      </div>
    </div>
  );
}

function Container227() {
  return (
    <div className="h-[74.5px] relative shrink-0 w-[1386px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-start justify-end pr-[21px] pt-[22px] relative size-full">
        <Button54 />
        <Button55 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[880px] items-start left-[64px] pl-px top-0 w-[1387px]" data-name="Primitive.div">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-l border-solid inset-0 pointer-events-none" />
      <Container151 />
      <Container227 />
    </div>
  );
}

export default function IaApproachA() {
  return (
    <div className="bg-white relative size-full" data-name="IA - Approach A">
      <PQ />
      <Container150 />
      <PrimitiveDiv />
    </div>
  );
}
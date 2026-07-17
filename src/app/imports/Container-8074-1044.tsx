import svgPaths from "./svg-zgz8vmk6it";

function Icon() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
        <g id="Icon">
          <path d={svgPaths.p1dc65200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M14.5833 2.1875V5.10417" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M16.0417 3.64583H13.125" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M2.91667 12.3958V13.8542" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d="M3.64583 13.125H2.1875" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#3b92ef] relative rounded-[16777200px] shrink-0 size-[35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[481.047px]" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-0.5px]">Upgrade to a Smarter Shipping Experience</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[42.25px] left-0 top-[31px] w-[481.047px]" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[21.125px] left-0 not-italic text-[#717182] text-[13px] top-[0.5px] w-[470px] whitespace-pre-wrap">Access powerful tools that enhance visibility, efficiency, and precision across your entire shipping workflow.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white h-[31.5px] left-0 rounded-[6.75px] top-[87.25px] w-[78.727px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Display:Medium',sans-serif] leading-[17.5px] left-[39.5px] not-italic text-[#717182] text-[12.25px] text-center top-[7.5px]">Search assets</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[502.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading />
        <Paragraph />
        <Button />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10.5px] h-[164.25px] items-start left-[21px] top-[21px] w-[502.047px]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative rounded-[8.75px] size-full" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 544.05 206.25\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(54.405 2.825 -85.209 67.903 -0.0000054605 178)\'><stop stop-color=\'rgba(255,255,255,1)\' offset=\'0\'/><stop stop-color=\'rgba(232,240,255,1)\' offset=\'0.4\'/><stop stop-color=\'rgba(252,252,252,1)\' offset=\'0.6875\'/><stop stop-color=\'rgba(181,204,253,1)\' offset=\'1\'/></radialGradient></defs></svg>')" }}>
      <Container1 />
    </div>
  );
}
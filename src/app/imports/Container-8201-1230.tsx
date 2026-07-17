function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[481.047px]" data-name="Heading 3">
      <p className="absolute font-['SF_Pro_Display:Semibold',sans-serif] leading-[24px] left-0 not-italic text-[19px] text-white top-[13.5px] w-[209px] whitespace-pre-wrap">Upgrade to a Smarter Shipping Experience</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[42px] left-0 top-[72.5px] w-[302px]" data-name="Paragraph">
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.5)] top-px w-[355px] whitespace-pre-wrap">Access powerful tools that enhance visibility, efficiency, and precision across your entire shipping workflow.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[502.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[164.25px] items-start left-[21px] top-[21px] w-[502.047px]" data-name="Container">
      <Container2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative rounded-[31.75px] size-full" data-name="Container" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 544.05 206.25\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(50.8 31.6 -83.355 134 -0.000080325 -78)\\'><stop stop-color=\\'rgba(93,138,198,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(92,100,180,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(90,62,161,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>\')" }}>
      <Container1 />
    </div>
  );
}
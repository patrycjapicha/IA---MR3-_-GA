function Container() {
  return <div className="absolute h-[161px] left-0 rounded-[8.75px] top-0 w-[655px]" data-name="Container" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 655 161\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(65.5 2.2052 -102.59 53.006 -0.0000065741 138.95)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(232,244,255,1)\\' offset=\\'0.4\\'/><stop stop-color=\\'rgba(252,252,252,1)\\' offset=\\'0.6875\\'/><stop stop-color=\\'rgba(181,217,253,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>\')" }} />;
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Container />
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[42px] left-[27px] not-italic text-[28px] text-black top-[45.5px]">Analytics home,</p>
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[0] left-[27px] not-italic text-[28px] text-black top-[77.5px]">
        <span className="leading-[42px]">{`your way `}</span>
        <span className="leading-[42px] text-[#317ab5]">Leah</span>
      </p>
      <p className="absolute font-['SF_Pro_Display:Regular',sans-serif] leading-[16px] left-[296px] not-italic text-[#545454] text-[14px] top-[58px] w-[305px] whitespace-pre-wrap">Choose a template that matches your role and customize the sections that appear on your home view.</p>
    </div>
  );
}
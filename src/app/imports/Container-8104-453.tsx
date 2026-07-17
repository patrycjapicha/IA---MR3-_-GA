function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[502.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10.5px] h-[164.25px] items-start left-[21px] top-[21px] w-[502.047px]" data-name="Container">
      <Container2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative rounded-[8.75px] size-full" data-name="Container" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 840 945\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(88.327 94.5 -858.45 311.42 -43.271 0.000010592)\\'><stop stop-color=\\'rgba(232,240,255,1)\\' offset=\\'0.14171\\'/><stop stop-color=\\'rgba(252,252,252,1)\\' offset=\\'0.61399\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>\')" }}>
      <Container1 />
    </div>
  );
}
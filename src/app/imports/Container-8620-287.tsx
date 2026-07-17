import svgPaths from "./svg-7oxcqc5bu5";

function Container1() {
  return <div className="absolute left-px size-[112px] top-[6px]" data-name="Container" />;
}

function Chart() {
  return (
    <div className="relative size-[87px]" data-name="chart 3">
      <div className="absolute inset-[0_-1.01%_-6.75%_-1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.7474 92.8764">
          <g id="chart 3">
            <circle cx="44.3737" cy="43.5028" fill="var(--fill-0, #6BCCFE)" id="Ellipse 21" opacity="0.1" r="27.1232" />
            <path d={svgPaths.p2e698a00} fill="url(#paint0_linear_8620_291)" id="Ellipse 20" />
            <path d={svgPaths.p2741e900} fill="url(#paint1_linear_8620_291)" id="Ellipse 19" />
            <path d={svgPaths.p3c0cc1c0} fill="url(#paint2_linear_8620_291)" id="Ellipse 17" />
            <g filter="url(#filter0_d_8620_291)" id="Ellipse 18">
              <circle cx="44.3737" cy="43.5028" fill="var(--fill-0, white)" r="19.3737" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="88.7474" id="filter0_d_8620_291" width="88.7474" x="0" y="4.12906">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="5" />
              <feGaussianBlur stdDeviation="12.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_8620_291" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_8620_291" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8620_291" x1="29.4759" x2="59.2659" y1="69.299" y2="17.7011">
              <stop stopColor="#7AD3FF" />
              <stop offset="1" stopColor="#4FBAF0" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8620_291" x1="60.2931" x2="28.4488" y1="71.0779" y2="15.9221">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_8620_291" x1="78.3657" x2="10.3817" y1="43.5028" y2="43.5028">
              <stop stopColor="#B09FFF" />
              <stop offset="1" stopColor="#8D79F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white overflow-clip relative rounded-[20px] size-full" data-name="Container">
      <Container1 />
      <div className="absolute flex items-center justify-center left-[15px] size-[87px] top-[13px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <Chart />
        </div>
      </div>
    </div>
  );
}
import svgPaths from "./svg-g3i8z0n4ht";

interface InPagePromptProps {
  text?: string;
}

function Sparkle12PxIcon() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Sparkle - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Sparkle - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p3e6c4500} fill="url(#paint0_linear_8143_2344)" />
            <path d={svgPaths.p7d9e400} fill="url(#paint1_linear_8143_2344)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8143_2344" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8143_2344" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
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

function Content({ text = "How to improve it" }: { text?: string }) {
  return (
    <div className="bg-[#F8F9F9] flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[20px] shrink-0 hover:bg-[#ECEEF0] transition-colors">
      <IconsSparkle />
      <p className="font-['SF_Pro_Display',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#000000] text-[13px] tracking-[-0.08px]">
        {text}
      </p>
    </div>
  );
}

export default function InPagePrompt({ text }: InPagePromptProps) {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative rounded-[20px] size-full" data-name="in page prompt">
      <Content text={text} />
    </div>
  );
}
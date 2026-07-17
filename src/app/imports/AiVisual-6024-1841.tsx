import svgPaths from "./svg-e7ssy0dfdi";

function Icon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
      <g id="icon">
        <g id="Vector">
          <path d={svgPaths.p28719c00} fill="var(--fill-0, #6A27B8)" />
          <path d={svgPaths.p11325800} fill="var(--fill-0, #6A27B8)" />
        </g>
      </g>
    </svg>
  );
}

function Sparkle16PxIcon() {
  return (
    <div className="absolute inset-[10%_10%_10%_10%]" data-name="Sparkle - 16px icon">
      <Icon />
    </div>
  );
}

export default function AiVisual() {
  return (
    <div className="relative size-full" data-name="AI visual">
      <div className="absolute inset-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Ellipse 2246"></g>
        </svg>
      </div>
      <Sparkle16PxIcon />
    </div>
  );
}
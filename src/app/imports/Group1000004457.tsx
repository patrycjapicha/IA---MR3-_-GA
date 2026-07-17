import svgPaths from "./svg-uk2oejg8s9";
import imgImage3007 from "figma:asset/5975116e0c918e2271bb4dd59a8ae69b87fc0e6d.png";
import { imgRectangle25549 } from "./svg-p100x";

function Group() {
  return (
    <div className="absolute inset-[17.25%_67.16%_80.75%_23.04%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7081 5.25">
        <g id="Group 626046">
          <ellipse cx="26.0983" cy="2.625" fill="var(--fill-0, white)" id="Ellipse 2232" rx="2.60983" ry="2.625" />
          <ellipse cx="2.60983" cy="2.625" fill="var(--fill-0, white)" id="Ellipse 2233" rx="2.60983" ry="2.625" />
        </g>
      </svg>
    </div>
  );
}

function Botty() {
  return (
    <div className="absolute contents inset-[10.27%_64.94%_75.48%_20.81%]" data-name="botty">
      <div className="absolute bg-[#16140c] inset-[10.27%_64.94%_75.48%_20.81%] rounded-[4px]" />
      <Group />
    </div>
  );
}

function Regular() {
  return null;
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[123.04px] top-[31px]" data-name="Mask group">
      <div className="absolute bg-[#545299] h-[24.107px] left-[121.44px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.594px_4.416px] mask-size-[161.996px_90px] top-[26.58px] w-[188.33px]" style={{ maskImage: `url('${imgRectangle25549}')` }} />
    </div>
  );
}

function AiSparkles() {
  return (
    <div className="absolute h-[12.054px] left-[133.35px] top-[57.69px] w-[11.571px]" data-name="AI sparkles">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5712 12.0536">
        <g id="AI sparkles">
          <g id="Enhance writing">
            <path d={svgPaths.p27846880} fill="var(--fill-0, #545299)" />
            <path d={svgPaths.p33aaa8c0} fill="var(--fill-0, #545299)" />
            <path d={svgPaths.p209c52f0} fill="var(--fill-0, #545299)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ChatBubble() {
  return (
    <div className="absolute contents left-[123.03px] top-[31px]" data-name="chat bubble">
      <div className="absolute bg-[#fcfcfc] h-[90px] left-[123.03px] rounded-[6.831px] top-[31px] w-[161.996px]" />
      <MaskGroup />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Vanilla_Sans:Regular',sans-serif] h-[33.595px] justify-center leading-[0] left-[134.03px] not-italic text-[#16140c] text-[13.677px] top-[92.8px] tracking-[-0.2599px] w-[120.419px]">
        <p className="leading-[1.32] whitespace-pre-wrap">Your new kicks are on the way!</p>
      </div>
      <p className="absolute font-['SF_Pro_Text:Regular',sans-serif] h-[9.974px] leading-[normal] left-[131.79px] not-italic text-[8.965px] text-white top-[35.65px] tracking-[-0.0008px] w-[89.141px] whitespace-pre-wrap">Order #201988</p>
      <AiSparkles />
      <p className="absolute bg-clip-text font-['SF_Pro_Text:Regular',sans-serif] h-[9.974px] leading-[normal] left-[149.15px] not-italic text-[8.965px] top-[58.27px] tracking-[-0.0008px] w-[104.78px] whitespace-pre-wrap" style={{ backgroundImage: "linear-gradient(111.915deg, rgb(78, 141, 187) 27.328%, rgb(84, 82, 153) 66.832%)", WebkitTextFillColor: "transparent" }}>
        Processing exchange
      </p>
    </div>
  );
}

function Sparkle16PxIcon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Sparkle - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0001 12.0001">
        <g id="Sparkle - 16px icon">
          <g id="Icon">
            <path d={svgPaths.pd6afe00} fill="var(--fill-0, #0A0D0E)" />
            <path d={svgPaths.p31cfd380} fill="var(--fill-0, #0A0D0E)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Avatar">
      <Sparkle16PxIcon />
    </div>
  );
}

function Label() {
  return (
    null
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[115px] top-0">
      <Regular />
      <ChatBubble />
      <Label />
    </div>
  );
}

export default function Group2() {
  return (
    null
  );
}
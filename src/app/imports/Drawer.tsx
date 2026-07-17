import svgPaths from "./svg-ldgzpht78m";

function Rationale2BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <ul className="block relative shrink-0 text-[0px] w-full">
      <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-[14px] whitespace-pre-wrap">{children}</li>
    </ul>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <g id="Icon">{children}</g>
          </svg>
        </div>
      </div>
    </div>
  );
}
type Rationale2BackgroundImageAndTextProps = {
  text: string;
};

function Rationale2BackgroundImageAndText({ text }: Rationale2BackgroundImageAndTextProps) {
  return (
    <ul className="block relative shrink-0 text-[14px] w-full">
      <li className="list-disc ms-[21px] whitespace-pre-wrap">
        <span className="leading-[20px]">{text}</span>
      </li>
    </ul>
  );
}
type RationaleBackgroundImageProps = {
  text: string;
  text1: string;
};

function RationaleBackgroundImage({ text, text1 }: RationaleBackgroundImageProps) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] relative shrink-0 w-full">{text}</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">{text1}</p>
    </div>
  );
}

function AnchorFocusDefaultBackgroundImage() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring">
        <div aria-hidden="true" className="absolute border-3 border-[#1f73b7] border-solid inset-[-3px] pointer-events-none rounded-[7px]" />
      </div>
      <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring separator">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[5px]" />
      </div>
    </div>
  );
}

function AnchorIconBackgroundImage() {
  return (
    <BackgroundImage>
      <path d={svgPaths.p31257000} fill="var(--fill-0, #68737D)" />
      <path d={svgPaths.p39e1da00} fill="var(--fill-0, #68737D)" />
    </BackgroundImage>
  );
}
type AnchorProps = {
  className?: string;
  external?: boolean;
  focus?: boolean;
  size?: "Default" | "Small";
  state?: "Default" | "Hover" | "Active";
  text?: string;
  theme?: "Default" | "Danger";
};

function Anchor({ className, external = false, focus = false, size = "Default", state = "Default", text = "Anchor link", theme = "Default" }: AnchorProps) {
  if (size === "Small" && state === "Default" && theme === "Danger") {
    return (
      <div className={className || "relative"} data-name="Size=Small, State=Default, Theme=Danger">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#cc3340] text-[12px] text-center tracking-[-0.0004px]">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Small" && state === "Hover" && theme === "Danger") {
    return (
      <div className={className || "relative"} data-name="Size=Small, State=Hover, Theme=Danger">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8c232c] text-[12px] text-center underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Small" && state === "Active" && theme === "Danger") {
    return (
      <div className={className || "relative"} data-name="Size=Small, State=Active, Theme=Danger">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#681219] text-[12px] text-center underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Default" && state === "Default" && theme === "Danger") {
    return (
      <div className={className || "relative"} data-name="Size=Default, State=Default, Theme=Danger">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#cc3340] text-[14px] text-center tracking-[-0.154px]">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Default" && state === "Hover" && theme === "Danger") {
    return (
      <div className={className || "relative"} data-name="Size=Default, State=Hover, Theme=Danger">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#8c232c] text-[14px] text-center tracking-[-0.154px] underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Default" && state === "Active" && theme === "Danger") {
    return (
      <div className={className || "relative"} data-name="Size=Default, State=Active, Theme=Danger">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#681219] text-[14px] text-center tracking-[-0.154px] underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Small" && state === "Active" && theme === "Default") {
    return (
      <div className={className || "relative"} data-name="Size=Small, State=Active, Theme=Default">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0f3554] text-[12px] text-center underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Small" && state === "Hover" && theme === "Default") {
    return (
      <div className={className || "relative"} data-name="Size=Small, State=Hover, Theme=Default">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#144a75] text-[12px] text-center underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Small" && state === "Default" && theme === "Default") {
    return (
      <div className={className || "relative"} data-name="Size=Small, State=Default, Theme=Default">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Default" && state === "Active" && theme === "Default") {
    return (
      <div className={className || "relative"} data-name="Size=Default, State=Active, Theme=Default">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f3554] text-[14px] text-center tracking-[-0.154px] underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  if (size === "Default" && state === "Hover" && theme === "Default") {
    return (
      <div className={className || "relative"} data-name="Size=Default, State=Hover, Theme=Default">
        <div className="content-stretch flex gap-[4px] items-start relative">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#144a75] text-[14px] text-center tracking-[-0.154px] underline">{text}</p>
          {external && <AnchorIconBackgroundImage />}
          {focus && <AnchorFocusDefaultBackgroundImage />}
        </div>
      </div>
    );
  }
  return (
    <div className={className || "relative"} data-name="Size=Default, State=Default, Theme=Default">
      <div className="content-stretch flex gap-[4px] items-start relative">
        <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">{text}</p>
        {external && (
          <BackgroundImage>
            <path d={svgPaths.p31257000} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p39e1da00} fill="var(--fill-0, #1F73B7)" />
          </BackgroundImage>
        )}
        {focus && <AnchorFocusDefaultBackgroundImage />}
      </div>
    </div>
  );
}

export default function Drawer() {
  return (
    <div className="bg-white relative size-full" data-name="Drawer">
      <div className="content-stretch flex flex-col items-start relative size-full">
        <div className="bg-white relative shrink-0 w-full" data-name="Default modal header">
          <div aria-hidden="true" className="absolute border-[#e9ebed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[20px] pr-[8px] py-[10px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Header">
                <p className="flex-[1_0_0] font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#2f3941] text-[14px] text-ellipsis tracking-[-0.154px] whitespace-nowrap">Recommendation details</p>
              </div>
              <div className="relative shrink-0" data-name="Icon button">
                <div className="content-stretch flex flex-col items-start relative">
                  <div className="content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[40px]" data-name="Container">
                    <div className="relative shrink-0 size-[16px]" data-name="Icon 16px">
                      <div className="absolute inset-[15.63%]" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9999 10.9999">
                          <path d={svgPaths.p1fdfd380} fill="var(--fill-0, #68737D)" id="Icon" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Content">
          <div className="bg-white relative shrink-0 w-full" data-name="Section">
            <div className="content-stretch flex flex-col gap-[32px] items-start pb-[32px] pt-[20px] px-[20px] relative w-full">
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Header">
                <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#2f3941] w-full whitespace-pre-wrap" data-name="Title">
                  <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] relative shrink-0 text-[18px] tracking-[-0.45px] w-full">Route specific tickets to assignee: EMEA Group</p>
                  <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] max-w-[690px] relative shrink-0 text-[14px] tracking-[-0.154px] w-full">Resolution time could improve by 2h 45min</p>
                </div>
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                  <div className="bg-[#f4f5fc] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag">
                    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[16px] shrink-0" data-name="Tag">
                      <div className="relative shrink-0 size-[16px]" data-name="Flow">
                        <div className="absolute inset-[6.25%_6.57%_8.33%_6.54%]" data-name="Icon">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9013 13.6667">
                            <g id="Icon">
                              <path d={svgPaths.p24ea8d80} fill="var(--fill-0, #4C67D3)" />
                              <path d={svgPaths.p2fbfaf80} fill="var(--fill-0, #4C67D3)" />
                              <path d={svgPaths.p218bf470} fill="var(--fill-0, #4C67D3)" />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4c67d3] text-[12px] text-center tracking-[-0.0004px]">Triggers</p>
                    </div>
                  </div>
                  <div className="relative rounded-[16px] shrink-0" data-name="Tag" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 245, 246) 0%, rgb(244, 245, 246) 100%), linear-gradient(90deg, rgb(248, 249, 249) 0%, rgb(248, 249, 249) 100%)" }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative">
                        <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#49545c] text-[12px] text-center tracking-[-0.0004px]">Workflow automation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RationaleBackgroundImage text="Rationale" text1="Tickets with some intents tend to be routed to the same agent." />
            </div>
          </div>
          <div className="bg-white relative shrink-0 w-full" data-name="Section">
            <div className="content-stretch flex flex-col gap-[12px] items-start pb-[32px] px-[20px] relative w-full">
              <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#2f3941] tracking-[-0.154px] w-full" data-name="Rationale">
                <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center relative shrink-0 text-[14px] w-[340px]">
                  <p className="leading-[20px] whitespace-pre-wrap">Supporting insights</p>
                </div>
                <div className="content-stretch flex flex-col font-['SF_Pro_Text:Regular',sans-serif] gap-[8px] items-start relative shrink-0 w-full" data-name="Rationale">
                  <Rationale2BackgroundImage>
                    <span className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic tracking-[-0.154px]">Detected intents:</span>
                    <span className="leading-[20px]">{` Sending documentation, Create new account, Signup issue, Recover account, Set up access if deceased, Account was hacked, Change phone number, Change social security number, Change tax number.`}</span>
                  </Rationale2BackgroundImage>
                  <Rationale2BackgroundImage>
                    <span className="leading-[20px]">{`Most of these tickets were routed to the same agent: `}</span>
                    <span className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic tracking-[-0.154px]">EMEA Group</span>
                    <span className="leading-[20px]">.</span>
                  </Rationale2BackgroundImage>
                  <Rationale2BackgroundImageAndText text="482 related tickets" />
                  <Rationale2BackgroundImageAndText text="Average manual triage time 2h 45min" />
                </div>
              </div>
              <Anchor className="relative shrink-0" external text="View related tickets" />
            </div>
          </div>
          <div className="bg-white relative shrink-0 w-full" data-name="Section">
            <div className="content-stretch flex flex-col items-start pb-[32px] px-[20px] relative w-full">
              <RationaleBackgroundImage text="Next step" text1="Automate this action with a trigger to reduce manual triage and help improve resolution time." />
            </div>
          </div>
          <div className="bg-white content-stretch flex flex-col items-start pb-[32px] px-[20px] relative shrink-0 w-[380px]" data-name="Section">
            <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px] w-full whitespace-pre-wrap">Based on a sample of 48,200 tickets from July 16, 2025 to July 23, 2025.</p>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[rgba(255,255,255,0)] h-[80px] overflow-clip relative shrink-0 to-[18.75%] to-white w-full" data-name="Default modal footer">
          <div className="absolute content-stretch flex gap-[20px] items-start right-[20px] top-[20px]" data-name="Button group">
            <div className="h-[40px] relative rounded-[4px] shrink-0" data-name="Medium basic button">
              <div className="content-stretch flex gap-[8px] h-full items-start px-[16px] py-[10px] relative">
                <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">Decline</p>
              </div>
            </div>
            <div className="relative shrink-0" data-name="Split button">
              <div className="content-stretch flex flex-col items-start relative">
                <div className="content-stretch flex items-start relative rounded-[4px] shrink-0" data-name="Container">
                  <div className="relative shrink-0" data-name="Button">
                    <div className="content-stretch flex gap-[8px] items-start relative">
                      <div className="bg-[#1f73b7] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Content">
                        <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.154px]">Review trigger</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white self-stretch shrink-0 w-px" data-name="Divider" />
                  <div className="relative shrink-0" data-name="Icon button">
                    <div className="content-stretch flex flex-col items-start relative">
                      <div className="bg-[#1f73b7] content-stretch flex items-center justify-center relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[40px]" data-name="Container">
                        <div className="relative shrink-0 size-[16px]" data-name="Icon 16px">
                          <div className="absolute inset-[34.37%_15.62%_34.38%_15.62%]" data-name="Icon">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 5.00002">
                              <path clipRule="evenodd" d={svgPaths.pb4b2500} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e9ebed] border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}
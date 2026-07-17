import svgPaths from "./svg-a9u3pj423l";
type GetHelpAdminCopilotInPagePromptIgnoreTextProps = {
  text: string;
};

function GetHelpAdminCopilotInPagePromptIgnoreText({ text }: GetHelpAdminCopilotInPagePromptIgnoreTextProps) {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] isolate items-center px-[16px] py-[8px] relative">
          <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] z-[4]">{text}</p>
          <div className="shrink-0 size-[12px] z-[3]" data-name="Icon - IGNORE" />
        </div>
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-between left-0 p-[12px] rounded-[48px] top-0 w-[800px]" data-name="Composer">
        <div aria-hidden="true" className="absolute border-[#ff7b5a] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[48px] shadow-[0px_0px_10px_0px_rgba(166,87,231,0.2)]" />
        <div className="absolute h-[18px] left-[47px] overflow-clip rounded-[8px] top-[15.5px] w-px" data-name="Indicator">
          <div className="absolute bg-black inset-0" />
        </div>
        <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-[475.5px]">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="content-stretch flex flex-col items-start relative" data-name="Icon button">
                <div className="bg-white content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[24px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border border-[#e9ebed] border-solid inset-[-1px] pointer-events-none rounded-[25px]" />
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-180">
                      <div className="overflow-clip relative size-[16px]" data-name="plus-large, add large">
                        <div className="absolute inset-[16.67%]" data-name="vector">
                          <div className="absolute inset-[-6.25%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                              <path d={svgPaths.p264b9300} id="vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeWidth="1.33333" />
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
          <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#68737d] text-[14px] tracking-[-0.154px]">Ask admin copilot anything</p>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <div className="content-stretch flex flex-col items-start relative" data-name="Icon button">
              <div className="bg-[#2f3941] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[32px]" data-name="Container">
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="-scale-y-100 flex-none rotate-180">
                    <div className="relative size-[16px]" data-name="arrow-down-right">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <g id="arrow-down-right">
                          <path d={svgPaths.p12e317e0} id="vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[4px] items-start left-0 top-[60px] w-[800px]" data-name="Get help - Admin copilot">
        <GetHelpAdminCopilotInPagePromptIgnoreText text="Route specific tickets to assignee" />
        <GetHelpAdminCopilotInPagePromptIgnoreText text="Create a view of pending status tickets" />
        <div className="bg-white content-stretch flex gap-[9px] isolate items-center justify-center p-[9px] relative rounded-[22.5px] shrink-0 size-[36px]" data-name="in page prompt">
          <div aria-hidden="true" className="absolute border-[#d8dcde] border-[1.125px] border-solid inset-0 pointer-events-none rounded-[22.5px]" />
          <div className="flex items-center justify-center relative shrink-0 z-[4]">
            <div className="-scale-y-100 flex-none">
              <div className="overflow-clip relative size-[16px]" data-name="arrow-rotate-right-left, repeat, refresh">
                <div className="absolute flex inset-[16.67%] items-center justify-center">
                  <div className="-scale-y-100 flex-none size-[10.667px]">
                    <div className="relative size-full" data-name="vector">
                      <div className="absolute inset-[-7.03%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1667 12.1667">
                          <path d={svgPaths.p3ecb6e80} id="vector" stroke="var(--stroke-0, #68737D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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
  );
}
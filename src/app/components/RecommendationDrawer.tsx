import React from 'react';
import { X } from '@/components/icons/flora';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';
import svgPaths from '../imports/svg-ldgzpht78m';

interface RecommendationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function Rationale2BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <ul className="block relative shrink-0 text-[0px] w-full">
      <li className="list-disc ms-[calc(var(--list-marker-font-size,0)*1.5*1)] text-base whitespace-pre-wrap">{children}</li>
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
    <ul className="block relative shrink-0 text-base w-full">
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
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-foreground text-base tracking-[-0.154px] w-full whitespace-pre-wrap">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] relative shrink-0 w-full">{text}</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">{text1}</p>
    </div>
  );
}

function AnchorIconBackgroundImage() {
  return (
    <BackgroundImage>
      <path d={svgPaths.p31257000} fill="var(--fill-0, #1F73B7)" />
      <path d={svgPaths.p39e1da00} fill="var(--fill-0, #1F73B7)" />
    </BackgroundImage>
  );
}

type AnchorProps = {
  className?: string;
  external?: boolean;
  text?: string;
};

function Anchor({ className, external = false, text = "Anchor link" }: AnchorProps) {
  return (
    <div className={className || "relative"} data-name="Size=Default, State=Default, Theme=Default">
      <div className="content-stretch flex gap-[4px] items-start relative">
        <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-base text-center tracking-[-0.154px]">{text}</p>
        {external && <AnchorIconBackgroundImage />}
      </div>
    </div>
  );
}

export function RecommendationDrawer({ open, onOpenChange }: RecommendationDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right" modal={false}>
      {/* Background overlay */}
      {open && (
        <div 
          className="fixed top-[48px] right-[8px] h-[calc(100vh-64px)] transition-all duration-300 z-40"
          style={{
            width: '412px',
            backgroundColor: '#F7F7F7'
          }}
        />
      )}
      
      <DrawerContent 
        className="fixed top-[48px] right-0 h-[calc(100vh-48px)] flex flex-col transition-all duration-300 z-50 border-l border-border bg-background rounded-[24px] overflow-hidden"
        style={{ width: '420px', maxWidth: '420px' }}
      >
        <DrawerHeader className="border-b border-border p-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-base font-semibold px-5 py-[10px]">Recommendation details</DrawerTitle>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-[10px] pr-2 hover:bg-gray-50 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <DrawerDescription className="sr-only">
            Details about the recommendation
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white relative w-full" data-name="Section">
            <div className="content-stretch flex flex-col gap-[32px] items-start pb-[32px] pt-[20px] px-[20px] relative w-full">
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Header">
                <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-foreground w-full whitespace-pre-wrap" data-name="Title">
                  <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] relative shrink-0 text-lg tracking-[-0.45px] w-full">Route specific tickets to assignee: EMEA Group</p>
                  <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] max-w-[690px] relative shrink-0 text-base tracking-[-0.154px] w-full">Resolution time could improve by 2h 45min</p>
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
                      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4c67d3] text-sm text-center tracking-[-0.0004px]">Triggers</p>
                    </div>
                  </div>
                  <div className="relative rounded-[16px] shrink-0" data-name="Tag" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 245, 246) 0%, rgb(244, 245, 246) 100%), linear-gradient(90deg, rgb(248, 249, 249) 0%, rgb(248, 249, 249) 100%)" }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative">
                        <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#49545c] text-sm text-center tracking-[-0.0004px]">Workflow automation</p>
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
              <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-foreground tracking-[-0.154px] w-full" data-name="Rationale">
                <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center relative shrink-0 text-base w-[340px]">
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
              <Anchor className="relative shrink-0 cursor-pointer hover:underline" external text="View related tickets" />
            </div>
          </div>
          <div className="bg-white relative shrink-0 w-full" data-name="Section">
            <div className="content-stretch flex flex-col items-start pb-[32px] px-[20px] relative w-full">
              <RationaleBackgroundImage text="Next step" text1="Automate this action with a trigger to reduce manual triage and help improve resolution time." />
            </div>
          </div>
          <div className="bg-white content-stretch flex flex-col items-start pb-[32px] px-[20px] relative w-full" data-name="Section">
            <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-muted-foreground text-sm tracking-[-0.0004px] w-full whitespace-pre-wrap">Based on a sample of 48,200 tickets from July 16, 2025 to July 23, 2025.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-[rgba(255,255,255,0)] h-[80px] overflow-clip relative shrink-0 to-[18.75%] to-white w-full border-t border-border" data-name="Default modal footer">
          <div className="absolute content-stretch flex gap-[20px] items-start right-[20px] top-[20px]" data-name="Button group">
            <div className="h-[40px] relative rounded-full shrink-0" data-name="Medium basic button">
              <button 
                className="content-stretch flex gap-[8px] h-full items-center px-[16px] py-[10px] relative rounded-full transition-colors border border-[#000000] hover:bg-gray-50"
                onClick={() => onOpenChange(false)}
              >
                <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#000000] text-base text-center tracking-[-0.154px]">Decline</p>
              </button>
            </div>
            <div className="relative shrink-0">
              <button className="bg-[#000000] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-full shrink-0 hover:bg-foreground transition-colors">
                <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-base text-center text-white tracking-[-0.154px]">Review trigger</p>
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
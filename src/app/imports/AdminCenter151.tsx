import svgPaths from "./svg-tovgo6wl69";
import imgImage from "figma:asset/8a7175f1afbbe0bef32423de69f4ea196eade2ac.png";

function Logo1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Logo">
          <path clipRule="evenodd" d={svgPaths.p25c72800} fill="var(--fill-0, #2F3941)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-[40px]" data-name="Logo">
      <Logo1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#2f3941] text-[14px] text-ellipsis tracking-[-0.154px]">Admin center</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron down">
          <path clipRule="evenodd" d={svgPaths.p14661380} fill="var(--fill-0, #68737D)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ComboboxField() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Combobox Field">
      <Frame />
      <ChevronDown />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[8px] shrink-0" data-name="Container">
      <ComboboxField />
    </div>
  );
}

function HeaderProductTrayAction() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[8px] shrink-0" data-name="🧭 Header product tray action">
      <Container />
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Left">
      <Logo />
      <HeaderProductTrayAction />
    </div>
  );
}

function HeaderSeparator() {
  return (
    <div className="h-[32px] relative shrink-0 w-[9px]" data-name="🧭 Header separator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 32">
        <g id="ð§­ Header separator">
          <path d="M4.5 27.5L4.5 4.5" id="Line" stroke="var(--stroke-0, #D8DCDE)" strokeLinecap="square" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[8px] shrink-0" data-name="Container">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#2f3941] text-[12px] text-ellipsis tracking-[-0.0004px]">Auro Audio</p>
    </div>
  );
}

function WorkspaceName() {
  return (
    <div className="content-stretch flex flex-col items-start px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="🧭 Workspace name">
      <Container1 />
    </div>
  );
}

function Environment() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Environment">
      <HeaderSeparator />
      <WorkspaceName />
    </div>
  );
}

function StartIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Start icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Start icon">
          <path d={svgPaths.p30e0b200} fill="var(--fill-0, #68737D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative" data-name="Label">
      <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] h-[20px] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#68737d] text-[14px] text-ellipsis tracking-[-0.154px] whitespace-nowrap">Search admin center...</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <StartIcon />
          <Label />
        </div>
      </div>
    </div>
  );
}

function HeaderSearchButton() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[320px]" data-name="🧭 Header search button">
      <Container2 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <HeaderSearchButton />
    </div>
  );
}

function HeaderAdminCopilot() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-center justify-between min-h-px min-w-px relative" data-name="_🧭 Header admin copilot">
      <Environment />
      <Actions />
    </div>
  );
}

function Sparkle16PxIcon() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Sparkle - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0001 16.0001">
        <g id="Sparkle - 16px icon">
          <g id="Icon">
            <path d={svgPaths.p179a5600} fill="url(#paint0_linear_8028_59959)" />
            <path d={svgPaths.p34ab1080} fill="url(#paint1_linear_8028_59959)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_59959" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_59959" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkleV() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons / sparkle v2">
      <Sparkle16PxIcon />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <IconsSparkleV />
    </div>
  );
}

function AdminCopilotGlobalNav() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Admin copilot / Global nav">
      <Container3 />
    </div>
  );
}

function RescueRing() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Rescue ring">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Rescue ring">
          <g id="Icon">
            <path d={svgPaths.p2ad05a00} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p2845a3f2} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p26d09580} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p2a87c280} fill="var(--fill-0, #68737D)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <RescueRing />
    </div>
  );
}

function HeaderIconButton() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="🧭 Header icon button">
      <Container4 />
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[668.08%] left-[-468.03%] max-w-none top-[-94.48%] w-[790.43%]" src={imgImage} />
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Avatar">
      <Image />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-center relative shrink-0" data-name="Avatar">
      <Avatar2 />
    </div>
  );
}

function Avatar() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Avatar">
      <Avatar1 />
    </div>
  );
}

function Right() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Right">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end pr-[4px] relative w-full">
          <HeaderAdminCopilot />
          <AdminCopilotGlobalNav />
          <HeaderIconButton />
          <Avatar />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#f8f9f9] h-[48px] relative shrink-0 w-full" data-name="🧭 Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] relative size-full">
          <Left />
          <Right />
        </div>
      </div>
    </div>
  );
}

function Gradient() {
  return <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(0,0,0,0)] h-[231px] left-0 right-0 to-[rgba(92,105,112,0.08)]" data-name="Gradient" />;
}

function Home() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Home">
          <path d={svgPaths.p1ca35700} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#293239] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <Home />
    </div>
  );
}

function NavItem() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container6 />
    </div>
  );
}

function Building() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Building">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Building">
          <path clipRule="evenodd" d={svgPaths.p351b0600} fill="var(--fill-0, #68737D)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <Building />
    </div>
  );
}

function NavItem1() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container7 />
    </div>
  );
}

function People() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="People">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="People">
          <g id="Icon">
            <path d={svgPaths.p3fd3b180} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p1a23de00} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p210f3680} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.pcce5f00} fill="var(--fill-0, #68737D)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <People />
    </div>
  );
}

function NavItem2() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container8 />
    </div>
  );
}

function PaperPlane() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Paper plane">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Paper plane">
          <path d={svgPaths.p1c592d40} fill="var(--fill-0, #68737D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <PaperPlane />
    </div>
  );
}

function NavItem3() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container9 />
    </div>
  );
}

function Sparkle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Sparkle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Sparkle">
          <g id="Icon">
            <path d={svgPaths.p2427af00} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p9b15d80} fill="var(--fill-0, #68737D)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <Sparkle />
    </div>
  );
}

function NavItem4() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container10 />
    </div>
  );
}

function Monitor() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Monitor">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Monitor">
          <g id="Icon">
            <path d={svgPaths.p1e59bff0} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.peccb2b0} fill="var(--fill-0, #68737D)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <Monitor />
    </div>
  );
}

function NavItem5() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container11 />
    </div>
  );
}

function Flow() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Flow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Flow">
          <g id="Icon">
            <path d={svgPaths.pb20ef80} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p3afacb00} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p2e18e280} fill="var(--fill-0, #68737D)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <Flow />
    </div>
  );
}

function NavItem6() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container12 />
    </div>
  );
}

function SquareGridCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Square grid circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Square grid circle">
          <g id="Icon">
            <path d={svgPaths.p3d144a00} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p10b7d7f1} fill="var(--fill-0, #68737D)" />
            <path d={svgPaths.p2dd4900} fill="var(--fill-0, #68737D)" />
            <path clipRule="evenodd" d={svgPaths.p10746700} fill="var(--fill-0, #68737D)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <SquareGridCircle />
    </div>
  );
}

function NavItem7() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-[56px]" data-name="🧭 Nav item">
      <Container13 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Sidebar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Sidebar">
          <path clipRule="evenodd" d={svgPaths.p2d7e3380} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#293239] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="Container">
      <Sidebar />
    </div>
  );
}

function IconButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[32px]" data-name="_🧭 Icon button">
      <Container14 />
    </div>
  );
}

function NavToggleButton() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="🧭 Nav toggle button">
      <IconButton />
    </div>
  );
}

function Bottom() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-end min-h-px min-w-px relative w-full" data-name="Bottom">
      <NavToggleButton />
    </div>
  );
}

function Nav() {
  return (
    <div className="bg-[#f8f9f9] content-stretch flex flex-col h-full items-center justify-between py-[12px] relative shrink-0 w-[56px]" data-name="🧭 Nav">
      <Gradient />
      <NavItem />
      <NavItem1 />
      <NavItem2 />
      <NavItem3 />
      <NavItem4 />
      <NavItem5 />
      <NavItem6 />
      <NavItem7 />
      <Bottom />
    </div>
  );
}

function NavSubnav() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0" data-name="🧭 Nav + Subnav">
      <Nav />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center not-italic relative shrink-0 w-full" data-name="Title">
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[32px] max-w-[560px] relative shrink-0 text-[#2f3941] text-[26px] tracking-[0.3536px]">Good morning</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[24px] max-w-[560px] relative shrink-0 text-[#68737d] text-[18px] tracking-[-0.45px]">Get help from admin copilot</p>
    </div>
  );
}

function Sparkle16PxIcon1() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Sparkle - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0001">
        <g id="Sparkle - 16px icon">
          <g id="Icon">
            <path d={svgPaths.p44c3600} fill="url(#paint0_linear_8028_23342)" />
            <path d={svgPaths.p179a5600} fill="url(#paint1_linear_8028_23342)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_23342" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_23342" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
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
    <div className="relative shrink-0 size-[16px]" data-name="Icons / sparkle">
      <Sparkle16PxIcon1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">What can copilot do?</p>
    </div>
  );
}

function InPagePrompt1() {
  return (
    <div className="content-stretch flex isolate items-center relative shrink-0" data-name="in page prompt 1">
      <Content1 />
    </div>
  );
}

function Sparkle16PxIcon2() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Sparkle - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0001">
        <g id="Sparkle - 16px icon">
          <g id="Icon">
            <path d={svgPaths.p44c3600} fill="url(#paint0_linear_8028_23342)" />
            <path d={svgPaths.p179a5600} fill="url(#paint1_linear_8028_23342)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_23342" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_23342" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkle1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons / sparkle">
      <Sparkle16PxIcon2 />
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle1 />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">Create a view of pending tickets</p>
    </div>
  );
}

function InPagePrompt2() {
  return (
    <div className="content-stretch flex isolate items-center relative shrink-0" data-name="in page prompt 2">
      <Content2 />
    </div>
  );
}

function Sparkle16PxIcon3() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Sparkle - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0001">
        <g id="Sparkle - 16px icon">
          <g id="Icon">
            <path d={svgPaths.p44c3600} fill="url(#paint0_linear_8028_23342)" />
            <path d={svgPaths.p179a5600} fill="url(#paint1_linear_8028_23342)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_23342" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_23342" x1="-1.70492" x2="16.0024" y1="6.53846" y2="6.20302">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkle2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icons / sparkle">
      <Sparkle16PxIcon3 />
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle2 />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">Learn about admin copilot</p>
    </div>
  );
}

function InPagePrompt3() {
  return (
    <div className="content-stretch flex isolate items-center relative shrink-0" data-name="in page prompt 3">
      <Content3 />
    </div>
  );
}

function OverflowToken() {
  return (
    <div className="relative size-[16px]" data-name="Overflow token">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="_Overflow vertical - 16px icon">
          <path clipRule="evenodd" d={svgPaths.p29d63700} fill="var(--fill-0, #68737D)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function InPagePrompt() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] isolate items-center justify-center p-[12px] relative rounded-[20px] shrink-0" data-name="in page prompt">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex items-center justify-center relative shrink-0 size-[16px] z-[1]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <OverflowToken />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-name="Input">
      <InPagePrompt1 />
      <InPagePrompt2 />
      <InPagePrompt3 />
      <InPagePrompt />
    </div>
  );
}

function Greetings() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[952px] relative shrink-0 w-full" data-name="Greetings">
      <Title />
      <Input />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] gap-[4px] items-start min-h-px min-w-px not-italic relative" data-name="Title">
      <p className="leading-[24px] relative shrink-0 text-[#2f3941] text-[18px] tracking-[-0.45px]">Latest insights</p>
      <p className="leading-[16px] relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Sep 20–Sep 28, 2025</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="Content">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">Give feedback</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Button">
      <Content4 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Header">
      <Title1 />
      <Button />
    </div>
  );
}

function CheckLg16PxIcon() {
  return (
    <div className="relative size-[16px]" data-name="Check lg - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check lg - 16px icon">
          <path clipRule="evenodd" d={svgPaths.p3c180700} fill="var(--fill-0, #1F73B7)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#edf7ff] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px]" data-name="Icon">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <CheckLg16PxIcon />
        </div>
      </div>
    </div>
  );
}

function TitleDescription() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Title + Description">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-ellipsis w-full">Full resolution time steady</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[0] relative shrink-0 w-full">
        <span className="leading-[20px]">{`8h32min on average, `}</span>
        <span className="leading-[20px]">which is the same as last week.</span>
      </p>
    </div>
  );
}

function NewWindow12PxIcon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon />
    </div>
  );
}

function Anchor() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">View dashboard</p>
      <Icon1 />
    </div>
  );
}

function Btn() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[32px] relative shrink-0 w-full" data-name="Btn">
      <Anchor />
    </div>
  );
}

function LatestInsights() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Latest insights 1">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon />
          </div>
        </div>
        <TitleDescription />
        <Btn />
      </div>
    </div>
  );
}

function ArrowTrending16PxIcon() {
  return (
    <div className="relative size-[16px]" data-name="Arrow trending - 16px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Arrow trending - 16px icon">
          <path clipRule="evenodd" d={svgPaths.p1f63bd80} fill="var(--fill-0, #AC5918)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="bg-[#fff3e4] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px]" data-name="Icon">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowTrending16PxIcon />
        </div>
      </div>
    </div>
  );
}

function TitleDescription1() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Title + Description">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-ellipsis w-full">Ticket volume increase</p>
      <div className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">
        <p className="mb-0">Your team is answering 13% more tickets.</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Sparkle12PxIcon() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Sparkle - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Sparkle - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p3e6c4500} fill="url(#paint0_linear_8028_44266)" />
            <path d={svgPaths.p7d9e400} fill="url(#paint1_linear_8028_44266)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkle3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icons / sparkle">
      <Sparkle12PxIcon />
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle3 />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2f3941] text-[12px] tracking-[-0.0004px]">High volume topics today</p>
    </div>
  );
}

function InPagePrompt4() {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative rounded-[20px] shrink-0" data-name="in page prompt">
      <Content5 />
    </div>
  );
}

function Btn1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[32px] relative shrink-0 w-full" data-name="Btn">
      <InPagePrompt4 />
    </div>
  );
}

function LatestInsights1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Latest insights 2">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon2 />
          </div>
        </div>
        <TitleDescription1 />
        <Btn1 />
      </div>
    </div>
  );
}

function AlertWarningToken() {
  return (
    <div className="relative size-[16px]" data-name="Alert warning  token">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="_Alert warning - 16px icon">
          <g id="Icon">
            <path d={svgPaths.p31f42200} fill="var(--fill-0, #CD3642)" />
            <path d={svgPaths.p28d63100} fill="var(--fill-0, #CD3642)" />
            <path clipRule="evenodd" d={svgPaths.p39470a00} fill="var(--fill-0, #CD3642)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="bg-[#fff2f3] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px]" data-name="Icon">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <AlertWarningToken />
        </div>
      </div>
    </div>
  );
}

function TitleDescription2() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Title + Description">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-ellipsis w-full">{`First reply time increase `}</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 w-full">This time was 20 minutes longer on average.</p>
    </div>
  );
}

function Sparkle12PxIcon1() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Sparkle - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Sparkle - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p3e6c4500} fill="url(#paint0_linear_8028_44266)" />
            <path d={svgPaths.p7d9e400} fill="url(#paint1_linear_8028_44266)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8028_44266" x1="-0.172131" x2="12.0016" y1="4.49523" y2="4.26461">
            <stop stopColor="#DAC9FF" />
            <stop offset="0.420407" stopColor="#A33FE1" />
            <stop offset="1" stopColor="#6743E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconsSparkle4() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icons / sparkle">
      <Sparkle12PxIcon1 />
    </div>
  );
}

function Content6() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[20px] shrink-0 z-[1]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#b0b8be] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconsSparkle4 />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2f3941] text-[12px] tracking-[-0.0004px]">How to improve it</p>
    </div>
  );
}

function InPagePrompt5() {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative rounded-[20px] shrink-0" data-name="in page prompt">
      <Content6 />
    </div>
  );
}

function Btn2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[32px] relative shrink-0 w-full" data-name="Btn">
      <InPagePrompt5 />
    </div>
  );
}

function LatestInsights2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Latest insights 3">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon3 />
          </div>
        </div>
        <TitleDescription2 />
        <Btn2 />
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative rounded-[12px] shrink-0 w-full" data-name="List">
      <LatestInsights />
      <LatestInsights1 />
      <LatestInsights2 />
    </div>
  );
}

function Digest() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[952px] relative rounded-[12px] shrink-0 w-full" data-name="Digest">
      <Header1 />
      <List />
    </div>
  );
}

function Anchor1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">View all recommendations</p>
    </div>
  );
}

function Headers() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Headers">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2f3941] text-[18px] tracking-[-0.45px]">Recommendations</p>
      <Anchor1 />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] max-w-[690px] not-italic relative shrink-0 text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Header">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#2f3941] text-ellipsis w-full">Route specific tickets to assignee: EMEA Group</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 text-[#68737d] w-full">Resolution time could improve by 2h 45min</p>
    </div>
  );
}

function Flow1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Flow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Flow">
          <g id="Icon">
            <path d={svgPaths.pd32b780} fill="var(--fill-0, #4C67D3)" />
            <path d={svgPaths.p36421200} fill="var(--fill-0, #4C67D3)" />
            <path d={svgPaths.p2535b380} fill="var(--fill-0, #4C67D3)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Tag1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[16px] shrink-0" data-name="Tag">
      <Flow1 />
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4c67d3] text-[12px] text-center tracking-[-0.0004px]">Triggers</p>
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#f4f5fc] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag">
      <Tag1 />
    </div>
  );
}

function Tag2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 245, 246) 0%, rgb(244, 245, 246) 100%), linear-gradient(90deg, rgb(248, 249, 249) 0%, rgb(248, 249, 249) 100%)" }}>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#49545c] text-[12px] text-center tracking-[-0.0004px]">Workflow automation</p>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Left">
      <Tag />
      <Tag2 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-center min-h-px min-w-px relative" data-name="Content">
      <Header2 />
      <Left1 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="Content">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">View details</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Button">
      <Content8 />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[20px] relative w-full">
          <Content7 />
          <Button1 />
          <div className="absolute bottom-[16px] right-0 top-[16px] w-[5px]" data-name="Highlight">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.pfa2b980} fill="var(--fill-0, #1F73B7)" id="Highlight" opacity="0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationList() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Recommendation / List">
      <Container15 />
      <div className="bg-[#e9ebed] h-px shrink-0 w-full" data-name="Divider" />
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] max-w-[690px] not-italic relative shrink-0 text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Header">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#2f3941] text-ellipsis w-full">Change ticket status for intent: Unsolicited marketing</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 text-[#68737d] w-full">Resolution time could improve by 1h 05min</p>
    </div>
  );
}

function BookOpen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Book open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Book open">
          <g id="Icon">
            <path d={svgPaths.p2dfe7000} fill="var(--fill-0, #037F52)" />
            <path d={svgPaths.p2a3aacf0} fill="var(--fill-0, #037F52)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Tag4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[16px] shrink-0" data-name="Tag">
      <BookOpen />
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#037f52] text-[12px] text-center tracking-[-0.0004px]">Auto assist</p>
    </div>
  );
}

function Tag3() {
  return (
    <div className="bg-[#eef8f4] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag">
      <Tag4 />
    </div>
  );
}

function Tag5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 245, 246) 0%, rgb(244, 245, 246) 100%), linear-gradient(90deg, rgb(248, 249, 249) 0%, rgb(248, 249, 249) 100%)" }}>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#49545c] text-[12px] text-center tracking-[-0.0004px]">Optimization</p>
    </div>
  );
}

function Tag6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 245, 246) 0%, rgb(244, 245, 246) 100%), linear-gradient(90deg, rgb(248, 249, 249) 0%, rgb(248, 249, 249) 100%)" }}>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#49545c] text-[12px] text-center tracking-[-0.0004px]">Previously declined</p>
    </div>
  );
}

function Left2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Left">
      <Tag3 />
      <Tag5 />
      <Tag6 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-center min-h-px min-w-px relative" data-name="Content">
      <Header3 />
      <Left2 />
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="Content">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">View details</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Button">
      <Content10 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[20px] relative w-full">
          <Content9 />
          <Button2 />
          <div className="absolute bottom-[16px] right-0 top-[16px] w-[5px]" data-name="Highlight">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.pfa2b980} fill="var(--fill-0, #1F73B7)" id="Highlight" opacity="0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationList1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Recommendation / List">
      <Container16 />
      <div className="bg-[#e9ebed] h-px shrink-0 w-full" data-name="Divider" />
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] max-w-[690px] not-italic relative shrink-0 text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap" data-name="Header">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#2f3941] text-ellipsis w-full">Turn on suggested macros</p>
      <p className="font-['SF_Pro_Text:Regular',sans-serif] relative shrink-0 text-[#68737d] w-full">Resolution time could improve by 50min</p>
    </div>
  );
}

function Monitor1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Monitor">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Monitor">
          <g id="Icon">
            <path d={svgPaths.p2a9b2a00} fill="var(--fill-0, #2770C3)" />
            <path d={svgPaths.p15da7d00} fill="var(--fill-0, #2770C3)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Tag8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[16px] shrink-0" data-name="Tag">
      <Monitor1 />
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2770c3] text-[12px] text-center tracking-[-0.0004px]">Macros</p>
    </div>
  );
}

function Tag7() {
  return (
    <div className="bg-[#eff7fe] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag">
      <Tag8 />
    </div>
  );
}

function Tag9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Tag" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 245, 246) 0%, rgb(244, 245, 246) 100%), linear-gradient(90deg, rgb(248, 249, 249) 0%, rgb(248, 249, 249) 100%)" }}>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#49545c] text-[12px] text-center tracking-[-0.0004px]">Agent productivity</p>
    </div>
  );
}

function Left3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Left">
      <Tag7 />
      <Tag9 />
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-center min-h-px min-w-px relative" data-name="Content">
      <Header4 />
      <Left3 />
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="Content">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] text-center tracking-[-0.154px]">View details</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Button">
      <Content12 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[20px] relative w-full">
          <Content11 />
          <Button3 />
          <div className="absolute bottom-[16px] right-0 top-[16px] w-[5px]" data-name="Highlight">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.pfa2b980} fill="var(--fill-0, #1F73B7)" id="Highlight" opacity="0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationList2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Recommendation / List">
      <Container17 />
    </div>
  );
}

function List1() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="List">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <RecommendationList />
        <RecommendationList1 />
        <RecommendationList2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Priorities() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[952px] relative shrink-0 w-[952px]" data-name="Priorities">
      <Headers />
      <List1 />
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="absolute h-[6px] left-0 right-0 top-0" data-name="Progress bar">
      <div className="absolute bg-[rgba(92,105,112,0.16)] inset-0 rounded-[6px]" data-name="Progress bar" />
      <div className="absolute bg-[#337fbd] inset-[0_11.67%_0_0] rounded-[6px]" data-name="Completed" />
    </div>
  );
}

function Progress() {
  return (
    <div className="h-[6px] relative shrink-0 w-full" data-name="Progress">
      <ProgressBar />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2f3941] text-[12px] tracking-[-0.0004px]">Ticket data storage</p>
      <Progress />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[0px] text-[14px] tracking-[-0.154px]">
        <span className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px]">2.4</span>
        <span className="leading-[20px]">{` of 20,000 MB used`}</span>
      </p>
    </div>
  );
}

function ProgressBar1() {
  return (
    <div className="absolute h-[6px] left-0 right-0 top-0" data-name="Progress bar">
      <div className="absolute bg-[rgba(92,105,112,0.16)] inset-0 rounded-[6px]" data-name="Progress bar" />
      <div className="absolute bg-[#337fbd] inset-[0_6.67%_0_0] rounded-[6px]" data-name="Completed" />
    </div>
  );
}

function Progress1() {
  return (
    <div className="h-[6px] relative shrink-0 w-full" data-name="Progress">
      <ProgressBar1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#2f3941] text-[12px] tracking-[-0.0004px]">File storage</p>
      <Progress1 />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2f3941] text-[0px] text-[14px] tracking-[-0.154px]">
        <span className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px]">4.2</span>
        <span className="leading-[20px]">{` of 510,000 MB used`}</span>
      </p>
    </div>
  );
}

function StorageUsage() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] self-stretch" data-name="Storage usage">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1f73b7] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap">Storage usage</p>
        <Frame6 />
        <Frame7 />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">429 errors</p>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">0% of requests</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Limit near-breaches</p>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">0</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Limit approaches</p>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">0</p>
    </div>
  );
}

function StorageUsage1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="Storage usage">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start not-italic p-[20px] relative w-full">
        <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[0] relative shrink-0 text-[#1f73b7] text-[14px] tracking-[-0.154px] w-full whitespace-pre-wrap">
          <span className="leading-[20px]">{`API usage `}</span>
          <span className="leading-[20px] text-[#2f3941]">(last 7 days)</span>
        </p>
        <Frame8 />
        <Frame9 />
        <Frame10 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Allowance usage</p>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[0] relative shrink-0 text-[#2f3941] text-[0px] text-[14px] tracking-[-0.154px]">
        <span className="leading-[20px]">{`0%    `}</span>
        <span className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px]">Overage allowed</span>
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Days elapsed</p>
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[0] relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">
        <span className="leading-[20px]">{`151 of 365    `}</span>
        <span className="leading-[20px] text-[#68737d]">41.4%</span>
      </p>
    </div>
  );
}

function StorageUsage2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] self-stretch" data-name="Storage usage">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start not-italic p-[20px] relative size-full">
        <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] min-w-full relative shrink-0 text-[#1f73b7] text-[14px] tracking-[-0.154px] w-[min-content] whitespace-pre-wrap">Automated resolutions usage</p>
        <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[20px] relative shrink-0 text-[#2f3941] text-[14px] tracking-[-0.154px]">2 of 9000</p>
        <Frame11 />
        <Frame12 />
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Cards">
      <StorageUsage />
      <StorageUsage1 />
      <StorageUsage2 />
    </div>
  );
}

function Usage() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[952px] relative shrink-0 w-full" data-name="Usage">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2f3941] text-[18px] tracking-[-0.45px]">Usage</p>
      <Cards />
    </div>
  );
}

function NewWindow12PxIcon1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon1 />
    </div>
  );
}

function Anchor2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1f73b7] text-[18px] text-center tracking-[-0.45px]">Zendesk updates</p>
      <Icon4 />
    </div>
  );
}

function HorizontalTab() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <div aria-hidden="true" className="absolute border-[#1f73b7] border-b-3 border-solid inset-0 pointer-events-none" />
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">Announcements</p>
    </div>
  );
}

function HorizontalTab1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] text-center tracking-[-0.0004px]">What’s new</p>
    </div>
  );
}

function HorizontalTab2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] text-center tracking-[-0.0004px]">Developer updates</p>
    </div>
  );
}

function HorizontalTab3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] text-center tracking-[-0.0004px]">Release notes</p>
    </div>
  );
}

function HorizontalTab4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] text-center tracking-[-0.0004px]">Service notifications</p>
    </div>
  );
}

function HorizontalTab5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[10px] px-[28px] relative shrink-0" data-name="Horizontal tab">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2f3941] text-[14px] text-center tracking-[-0.154px]">&nbsp;</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex h-[35px] items-start pb-px relative shrink-0 w-full" data-name="Tabs">
      <div aria-hidden="true" className="absolute border-[#d8dcde] border-b border-solid inset-0 pointer-events-none" />
      <HorizontalTab />
      <HorizontalTab1 />
      <HorizontalTab2 />
      <HorizontalTab3 />
      <HorizontalTab4 />
      <HorizontalTab5 />
    </div>
  );
}

function NewWindow12PxIcon2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon2 />
    </div>
  );
}

function Anchor3() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">Announcing the Authenticated SMTP Connector</p>
      <Icon5 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Oct 31, 2024</p>
      <Anchor3 />
    </div>
  );
}

function NewWindow12PxIcon3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon3 />
    </div>
  );
}

function Anchor4() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">Announcing CSAT public API and updates to CSAT email</p>
      <Icon6 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Oct 30, 2024</p>
      <Anchor4 />
    </div>
  );
}

function NewWindow12PxIcon4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon4 />
    </div>
  );
}

function Anchor5() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">Announcing Department Spaces</p>
      <Icon7 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Oct 31, 2024</p>
      <Anchor5 />
    </div>
  );
}

function NewWindow12PxIcon5() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon5 />
    </div>
  );
}

function Anchor6() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">Announcing user suspension for the messaging channel</p>
      <Icon8 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Oct 24, 2024</p>
      <Anchor6 />
    </div>
  );
}

function NewWindow12PxIcon6() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon6 />
    </div>
  );
}

function Anchor7() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">Advisory: Increase in phishing attempts to Zendesk accounts</p>
      <Icon9 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#68737d] text-[12px] tracking-[-0.0004px]">Oct 28, 2024</p>
      <Anchor7 />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[456px]" data-name="List">
      <Frame5 />
      <Frame4 />
      <Frame3 />
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function NewWindow12PxIcon7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="New window - 12px icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="New window - 12px icon">
          <g id="Icon">
            <path d={svgPaths.p256193c0} fill="var(--fill-0, #1F73B7)" />
            <path d={svgPaths.p2c85e500} fill="var(--fill-0, #1F73B7)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative self-stretch shrink-0 w-[12px]" data-name="Icon">
      <NewWindow12PxIcon7 />
    </div>
  );
}

function Anchor8() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Anchor">
      <p className="font-['SF_Pro_Text:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f73b7] text-[12px] text-center tracking-[-0.0004px]">View all announcements</p>
      <Icon10 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Table">
      <div aria-hidden="true" className="absolute border border-[#d8dcde] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[9px] items-start p-[20px] relative w-full">
        <Tabs />
        <List2 />
        <Anchor8 />
      </div>
    </div>
  );
}

function ZendeskUpdates() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[952px] relative shrink-0 w-full" data-name="Zendesk updates">
      <Anchor2 />
      <Table />
    </div>
  );
}

function Home1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Home">
      <div className="flex flex-col items-center overflow-x-clip overflow-y-auto size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[40px] py-[73px] relative w-full">
          <div className="absolute flex items-center justify-center right-[-127px] size-[400px] top-[-200px]">
            <div className="-scale-y-100 flex-none">
              <div className="blur-[98px] opacity-8 rounded-[10000px] size-[400px]" data-name="blob home" style={{ backgroundImage: "linear-gradient(88.9147deg, rgb(218, 201, 255) 9.3582%, rgb(163, 63, 225) 36.32%, rgb(103, 67, 225) 99.294%)" }} />
            </div>
          </div>
          <Greetings />
          <Digest />
          <Priorities />
          <Usage />
          <ZendeskUpdates />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[8px]" data-name="Main">
      <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <Home1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-tl-[8px] shadow-[0px_0px_4px_0px_rgba(10,13,14,0.16)]" />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <Main />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <NavSubnav />
      <Content />
    </div>
  );
}

export default function AdminCenter() {
  return (
    <div className="bg-[#f8f9f9] content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_20px_28px_0px_rgba(10,13,14,0.16)] size-full" data-name="admin center 151">
      <Header />
      <Container5 />
    </div>
  );
}
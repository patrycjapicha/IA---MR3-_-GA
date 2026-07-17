import svgPaths from "../svg-qmzevknmzt";

interface ContainerProps {
  className?: string;
}

export default function Container({ className }: ContainerProps) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] size-full" data-name="Container">
      <div className="relative shrink-0 size-[20px]" data-name="Line graph square">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <g id="Icon">
              <path d={svgPaths.pd147100} fill="currentColor" />
              <path d={svgPaths.p1514f00} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

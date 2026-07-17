export default function Tag() {
  return (
    <div className="flex gap-[4px] items-center justify-center px-2 py-1 relative rounded-[16px] w-fit" data-name="Tag">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[#885bb3] inset-0 rounded-[16px]" />
        <div className="absolute inset-0 mix-blend-overlay rounded-[16px]" style={{ backgroundImage: "linear-gradient(108.726deg, rgba(255, 255, 255, 0) 0%, rgba(79, 107, 191, 0.7) 100%)" }} />
      </div>
      <p className="font-['SF_Pro_Text',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-center text-white tracking-[-0.0004px] whitespace-nowrap text-[11px] px-1.5 py-0.5">Copilot answer</p>
    </div>
  );
}
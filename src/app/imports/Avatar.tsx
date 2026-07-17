import imgImage from "figma:asset/8a7175f1afbbe0bef32423de69f4ea196eade2ac.png";

function Avatar1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="relative shrink-0 size-[24px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[668.08%] left-[-468.03%] max-w-none top-[-94.48%] w-[790.43%]" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

export default function Avatar() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="Avatar">
      <div className="content-stretch flex flex-col h-[24px] items-center justify-center relative shrink-0" data-name="Avatar">
        <Avatar1 />
      </div>
    </div>
  );
}
import { ButtonProps } from "../types/button-props";

export default function Button({
  children,
  type,
  styleType,
  ...rest
}: ButtonProps) {
  const baseStyle = "font-extrabold hover:cursor-pointer";

  const style = {
    submit:
      "bg-purpleDark text-white hover:bg-gradient-to-b from-purpleMedium to-[#52377B] w-full px-4 py-[10px] rounded-[10px]",
    button: {
      parent:
        "bg-gradient-to-b from-purpleMedium to-[#52377B] p-[2px] rounded-[10px] h-[38px]",
      child:
        "bg-white text-purpleMedium w-full justify-center hover:bg-transparent hover:text-white py-[5px] rounded-[8px]",
    },
    search:
      "border-2 border-grayPrimary rounded-r-[15px] px-4 bg-white flex justify-center hover:bg-grayLight",
  };

  if (styleType === "button") {
    return (
      <button
        className={`${baseStyle} w-full justify-center ${style.button.parent}`}
        {...rest}
      >
        <span className={`${style.button.child} group flex items-center gap-2`}>
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      className={`${baseStyle} justify-center ${style[styleType]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

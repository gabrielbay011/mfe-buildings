import { useState } from "react";
import { InputProps } from "../types/input-types";
import eyeClose from "../../../public/images/icon-eye-close.svg";
import eyeOpen from "../../../public/images/icon-eye-open.svg";
import Button from "./button";
import iconSearch from "../../../public/images/icon-search.svg";

export default function Input({
  type,
  id,
  autoComplete,
  label,
  register,
  error,
  placeholder,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const searchStyle =
    "border-2 border-grayPrimary rounded-l-[15px] border-r-0 px-2 py-1.5 placeholder:text-grayPrimary text-[20px] w-full focus:outline-grayMedium";

  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold text-[16px]">
        {label}
      </label>
      <div className="relative flex">
        <input
          className={
            type == "search"
              ? searchStyle
              : "rounded-[10px] bg-white h-10 w-full pl-2 border-2 border-purpleMedium focus:outline-purpleDark"
          }
          type={inputType}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <img src={eyeClose} alt="Icone Olho Fechado" />
            ) : (
              <img src={eyeOpen} alt="Icone Olho Aberto" />
            )}
          </button>
        )}
        {type == "search" && (
          <Button type="submit" styleType="search">
            <img src={iconSearch} alt="Icone Pesquisar" className="w-[80%]" />
          </Button>
        )}
      </div>

      {type && type != "password" && <p className="text-red-600">{error}</p>}
    </div>
  );
}

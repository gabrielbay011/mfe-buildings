import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  styleType: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

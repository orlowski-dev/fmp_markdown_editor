import type { ForwardedRef, HTMLAttributes, ReactElement } from "react";
import { forwardRef } from "react";
import "./styles.css";

export type ButtonVariantProp = "normal" | "icon-only" | "icon-only-mobile";

export type ButtonColorProp = "orange" | "dark";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: string;
  variant?: ButtonVariantProp;
  color?: ButtonColorProp;
  startIcon?: ReactElement;
}

const Button = forwardRef(function Button(
  { children, variant, color, startIcon, ...rest }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...rest}
      ref={ref}
      className={`btn ${variant ?? "normal"} ${color ?? "orange"}`}
    >
      {startIcon ?? undefined}
      <span>{children}</span>
    </button>
  );
});

export default Button;

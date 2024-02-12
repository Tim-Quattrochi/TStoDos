import { ButtonHTMLAttributes, ReactNode } from "react";
import buttonStyles from "./button.module.css";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: () => void;
  hidden?: boolean;
  variant: "primary" | "secondary" | "success" | "warning" | "info";
  children: ReactNode;
}

const Button = ({
  onClick,
  variant,
  children,
  ...rest
}: ButtonProps) => {
  const buttonClass = `${buttonStyles.button} ${buttonStyles[variant]}`;
  return (
    <button onClick={onClick} className={buttonClass} {...rest}>
      {children}
    </button>
  );
};
export default Button;

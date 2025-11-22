import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface ActionButtonProps {
  buttonText: string | ReactNode;
  textSize?: string;
  outline?: boolean;
  link?: string;
  width?: string;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  loading?: boolean;
  fullyRounded?: boolean;
  paddingX?: string;
  borderless?: boolean;
  textColor?: string;
  backgroundColor?: string;
  outlineBgColor?: string;
  borderColor?: string;
  target?: string;
}

const ActionButton = ({
  buttonText,
  link,
  textSize,
  outline,
  width,
  attributes,
  loading = false,
  fullyRounded = false,
  paddingX = "px-3",
  borderless = false,
  textColor = "#ffffff",
  backgroundColor = "#F89822",
  outlineBgColor,
  borderColor,
  target = "_self",
}: ActionButtonProps) => {
  const sharedStyle = {
    width:
      width === "full" ? "100%" : width === "fit" ? "fit-content" : undefined,
    backgroundColor: outline || borderless ? outlineBgColor || "transparent" : backgroundColor,
    color: outline || borderless ? "#414651" : textColor,
    borderColor: borderColor || (outline && !borderless ? "#D5D7DA" : "transparent"),
  };

  const sharedClasses = `
    inline-flex justify-center items-center relative font-semibold capitalize
    ${paddingX}
    ${textSize ? "py-2.5 text-" + textSize : "py-3 md:py-2.5 text-xs md:text-sm"}
    ${fullyRounded ? "rounded-full" : "rounded-md"}
    ${outline && !borderless ? "border border-[#D5D7DA]" : ""}
    ${borderless ? "border-0" : ""}
    transition-all duration-200
  `;

  const content = (
    <>
      {loading ? (
        <span className="flex items-center gap-2 text-nowrap">
          {buttonText}
          <ClipLoader
            size={15}
            color={outline || borderless ? "#414651" : textColor}
          />
        </span>
      ) : (
        <span className="flex items-center gap-2 text-nowrap">{buttonText}</span>
      )}
    </>
  );

  return link ? (
    <Link
      to={link}
      style={sharedStyle}
      className={sharedClasses}
      target={target}
    >
      {content}
    </Link>
  ) : (
    <button
      {...attributes}
      style={sharedStyle}
      className={sharedClasses}
    >
      {content}
    </button>
  );
};

export default ActionButton;

import type { ReactNode } from "react";
import { useContent } from "@/providers/BlocksContext";

export type HeadingSize = "text-sm" | "text-base" | "text-4xl";
export type HeadingAlign = "text-left" | "text-center" | "text-right";
export type HeadingColorText = "text-black" | "text-white";

export type HeadingBlockProps = {
  title: string;
  titleKey: string; // empty string means "not bound"
  size: HeadingSize;
  align: HeadingAlign;
  colorText: HeadingColorText;
};

export default function HeadingBlockComponent({
  title,
  titleKey,
  size,
  align,
  colorText,
}: HeadingBlockProps) {
  const { content } = useContent();

  const isBound = titleKey && titleKey.trim().length > 0;
  const boundValue = isBound ? content[titleKey] : undefined;

  const resolved =
    isBound && boundValue && boundValue.trim().length > 0
      ? boundValue
      : title;

  return (
    <h1 className={`${size} ${align} ${colorText} font-bold`}>
      {resolved}
    </h1>
  );
}
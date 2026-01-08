import { ElementType, ReactNode } from "react";
import { mergeCls } from "@/lib/utils";

type TypographyVariant =
  | "largeHeading"
  | "heading"
  | "title"
  | "body"
  | "caption"
  | "label";

const TypographyClasses: Record<TypographyVariant, string> = {
  largeHeading:
    "font-bold text-7xl text-9xl leading-tight tracking-wide uppercase",
  heading: "font-bold text-5xl md:text-7xl leading-tight ",
  title: "text-xl lg:text-2xl leading-snug",
  body: "leading-relaxed text-subtle",
  caption: "text-sm text-subtle",
  label: "font-md text-base",
} as const;

const TypographyElements: Record<TypographyVariant, ElementType> = {
  largeHeading: "h1",
  heading: "h2",
  title: "h3",
  body: "p",
  caption: "span",
  label: "label",
} as const;

export function Typography({
  children,
  variant = "body",
  className,
}: {
  children: ReactNode;
  variant: TypographyVariant;
  className?: string;
}) {
  const Component = TypographyElements[variant];
  const typographyClass = TypographyClasses[variant];
  return (
    <Component className={mergeCls(typographyClass, className)}>
      {children}
    </Component>
  );
}

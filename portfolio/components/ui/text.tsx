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
  largeHeading: "font-extrabold text-7xl text-9xl tracking-wide uppercase",
  heading: "font-bold text-4xl lg:text-6xl uppercase",
  title: "font-bold text-2xl lg:text-3xl",
  body: "text-subtle text-md lg:text-lg",
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
  component,
}: {
  children: ReactNode;
  variant: TypographyVariant;
  className?: string;
  component?: ElementType;
}) {
  const Component = component ?? TypographyElements[variant];
  const typographyClass = TypographyClasses[variant];
  return (
    <Component className={mergeCls(typographyClass, className)}>
      {children}
    </Component>
  );
}

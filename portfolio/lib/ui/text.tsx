import { ElementType, ReactNode } from "react";
import { mergeCls } from "@/lib/utils";
import { ClassValue } from "clsx";

type TypographyVariant =
  | "largeHeading"
  | "heading"
  | "title"
  | "body"
  | "caption"
  | "label";

const TypographyClasses: Record<TypographyVariant, ClassValue> = {
  largeHeading: "font-bold text-7xl tracking-wide uppercase",
  heading: "font-bold text-5xl uppercase",
  title: "font-extrabold text-front text-2xl",
  body: "text-subtle text-md",
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

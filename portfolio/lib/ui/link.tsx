import { ExternalURL } from "@/lib/types";
import type { UrlObject } from "url";
import { ReactNode } from "react";
import { default as NextLink } from "next/link";
import { mergeCls } from "@/lib/utils";

type LinkProps = {
  url: ExternalURL | UrlObject | string;
  className?: string;
  newTab?: boolean;
  children: ReactNode;
};

export default function Link({ url, children, newTab, className }: LinkProps) {
  if (!url) {
    throw new Error("Link component requires a url prop");
  }
  const props = newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <NextLink
      href={url}
      replace={false}
      className={mergeCls(
        "text-subtle cursor-pointer hover:text-front transition-colors duration-300",
        className,
      )}
      aria-label={typeof url === "string" ? url : url.toString()}
      {...props}
    >
      {children}
    </NextLink>
  );
}

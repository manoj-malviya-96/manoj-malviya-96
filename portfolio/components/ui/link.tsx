import { ExternalURL } from "@/lib/types";
import type { UrlObject } from "url";
import { ReactNode } from "react";
import { default as NextLink } from "next/link";
import { mergeCls } from "@/lib/utils";

type LinkProps = {
  url: ExternalURL | UrlObject | string;
  className?: string;
  children: ReactNode;
};

export default function Link({ url, children, className }: LinkProps) {
  return (
    <NextLink
      href={url}
      className={mergeCls(
        "text-subtle text-sm cursor-pointer hover:text-front transition-colors duration-300",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}

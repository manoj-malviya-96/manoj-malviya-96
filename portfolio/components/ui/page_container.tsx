import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

export default function PageContainer({
  children,
  cover,
}: {
  children: ReactNode;
  cover: StaticImageData;
}) {
  return (
    <>
      <Image
        src={cover}
        alt={"Cover"}
        className="w-full object-cover h-16 md:h-32 lg:h-48"
      />
      {children}
    </>
  );
}

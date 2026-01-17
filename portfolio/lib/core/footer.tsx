import Icon from "@/lib/ui/icon";
import Link from "next/link";
import Image from "next/image";
import { SOCIAL } from "@/lib/about_me/profile";
import { UserAvatar } from "@/lib/assets";
import { Typography } from "@/lib/ui/text";

const quickLinks = [
  { label: "Work Experience", href: "#workex" },
  { label: "Projects & Blogs", href: "#showcase" },
  { label: "Resume PDF", href: "#" },
  { label: "Contact", href: "#contact" },
] as const;

function ProfileFooter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src={UserAvatar}
        alt={"Profile"}
        width={90}
        height={90}
        className="rounded-full mb-4"
      />
      <h3 className="text-lg mb-3">Manoj Malviya</h3>
    </div>
  );
}

function QuickLinks() {
  return (
    <span>
      <h3 className="text-lg mb-3">Quick Links</h3>
      <ul className="space-y-1.5">
        {quickLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-subtle hover:text-fg transition-all"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </span>
  );
}

function SocialLinks() {
  return (
    <span>
      <h3 className="text-lg mb-3">Connect</h3>
      <p className="text-subtle text-sm mb-3 leading-relaxed">
        Follow my work and connect with me
      </p>
      <div className="flex flex-wrap gap-2">
        {SOCIAL.map(({ icon, href, label }) => (
          <Link
            key={label}
            href={href}
            className="p-2.5 bg-bg rounded-lg glow-subtle"
          >
            <Icon icon={icon} className="w-4 h-4 icon" aria-label={label} />
          </Link>
        ))}
      </div>
    </span>
  );
}

function CopyRight() {
  return (
    <Typography variant="caption">
      &copy; 2025 Manoj Malviya. All rights reserved.
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer className="p-6 sm:p-8 lg:p-16" data-theme="light">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <ProfileFooter className="sm:col-span-2" />
        <QuickLinks />
        <SocialLinks />
      </div>
      <div className="border-t border-muted pt-4">
        <CopyRight />
      </div>
    </footer>
  );
}

import Icon from "@/components/ui/icon";
import Link from "@/components/ui/link";
import { PROFILE, SOCIAL } from "@/core/profile";
import { faMailForward } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const social = SOCIAL;
const quickLinks = [
  { label: "Work Experience", href: "#workex" },
  { label: "Projects & Blogs", href: "#showcase" },
  { label: "Resume PDF", href: "#" },
  { label: "Contact", href: "#contact" },
] as const;

const ProfilePicture = "https://avatars.githubusercontent.com/u/6278223?v=4";
function ProfileFooter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src={ProfilePicture}
        alt={"Profile"}
        width={90}
        height={90}
        className="rounded-full mb-4"
      />
      <h3 className="text-lg mb-3">{PROFILE.name}</h3>
      <p className="text-sm mb-3 leading-relaxed">{PROFILE.tagline}</p>
      <Link
        href={`mailto:${PROFILE.email}`}
        className="inline-flex items-center gap-1.5 text-sm text-fg hover:text-muted transition-all"
      >
        Get in touch
        <Icon icon={faMailForward} className="icon" />
      </Link>
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
        {social.map(({ icon, href, label }) => (
          <Link
            key={label}
            href={href}
            external
            className="p-2.5 bg-bg rounded-lg glow-subtle"
            label={label}
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
    <span className="text-subtle text-sm">
      &copy; 2025 Manoj Malviya. All rights reserved.
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="light p-6 sm:p-8 lg:p-16">
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

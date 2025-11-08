import {ComponentType} from "react";

export interface SocialLink {
    icon: ComponentType<{ className?: string }>;
    href: string;
    label: string;
}
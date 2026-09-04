import {assertNever} from "@manoj-malviya-96/atom";
import type {StaticImageData as LocalImage} from "next/image";
import type {ValuesOf} from "@/lib/helper";
import type {ExternalURL} from "@/lib/types";

export const ORGANIZATION_IDS = [
    "noah-labs",
    "flow-key",
    "form-labs",
    "penn-state",
    "iit-j",
] as const;

export type OrganizationId = ValuesOf<typeof ORGANIZATION_IDS>;

export type Organization = {
    name: string;
    url: ExternalURL;
    logo: LocalImage;
};

export function getOrganization(organization: OrganizationId): Organization {
    switch (organization) {
        case "noah-labs":
            return {
                name: "Noah Labs",
                url: "https://www.noah-labs.com/",
                logo: require("./noahlabs-logo.png"),
            };
        case "flow-key":
            return {
                name: "Flowkey",
                url: "https://www.flowkey.com/en",
                logo: require("./flowkey-dark.png"),
            };
        case "form-labs":
            return {
                name: "Formlabs",
                url: "https://formlabs.com/",
                logo: require("./formlabs-black.png"),
            };
        case "penn-state":
            return {
                name: "Penn State",
                url: "https://www.psu.edu/",
                logo: require("./pennstate-blue.png"),
            };
        case "iit-j":
            return {
                name: "IITJ",
                url: "https://www.iitj.ac.in/",
                logo: require("./iitj.png"),
            };
        default:
            return assertNever(organization);
    }
}

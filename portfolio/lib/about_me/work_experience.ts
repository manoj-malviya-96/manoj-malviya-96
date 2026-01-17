import type { StaticImageData as LocalImage } from "next/dist/shared/lib/get-img-props";
import { ExternalURL, MonthAndYear } from "@/lib/types";
import { FlowkeyLogo, FormlabsLogo, PennStateLogo } from "@/lib/assets";

export type WorkExperience = {
  company: string;
  logo: LocalImage;
  companyURL: ExternalURL;
  position: string;
  startDate: MonthAndYear;
  endDate?: MonthAndYear;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  role: string;
};

const FormlabsRD: WorkExperience = {
  company: "Formlabs",
  companyURL: "https://formlabs.com/",
  position: "R&D Software Engineer",
  startDate: "2021-01",
  endDate: "2023-08",
  location: "Somerville, MA",
  type: "Full-time",
  logo: FormlabsLogo,
  role: `Focused on computational design and optimization for 3D printing, 
          taking algorithms from research and experimentation 
          through production-ready engineering`,
} as const;

const FormlabsSE: WorkExperience = {
  company: "Formlabs",
  companyURL: "https://formlabs.com/",
  position: "Senior Software Engineer",
  startDate: "2023-08",
  endDate: "2025-03",
  location: "Budapest, Hungary",
  logo: FormlabsLogo,
  type: "Full-time",
  role: `Owned end-to-end delivery of CAD/CAM desktop features in PreForm
          leading UI architecture and performance while 
          coordinating across product, design, and hardware team`,
} as const;

const FlowkeySE: WorkExperience = {
  company: "Flowkey",
  companyURL: "https://www.flowkey.com/en",
  position: "Senior Software Engineer",
  startDate: "2025-04",
  endDate: "2025-09",
  location: "Berlin, Germany",
  logo: FlowkeyLogo,
  type: "Contract",
  role: `Worked on core product performance for music learning, 
          focusing on real-time rendering and ML-backed audio workflows 
          across the Apple ecosystem`,
} as const;

const PennStateGRA: WorkExperience = {
  company: "Penn State University",
  companyURL: "https://www.psu.edu/",
  position: "Graduate Research Assistant",
  startDate: "2018-08",
  endDate: "2020-12",
  location: "Berlin, Germany",
  logo: PennStateLogo,
  type: "Full-time",
  role: `Conducted research in computational design and digital manufacturing, 
          building prototypes and publishing work spanning optimization, 
          graphics, and machine learning`,
} as const;

export const WORK_EXPERIENCE: WorkExperience[] = [
  FormlabsRD,
  FormlabsSE,
  FlowkeySE,
  PennStateGRA,
] as const;

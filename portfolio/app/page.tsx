import dynamic from "next/dynamic";

const Landing = dynamic(() => import("@/screens/landing"), { ssr: true });
const AboutMe = dynamic(() => import("@/screens/about_me"), { ssr: true });
const ProjectShowcase = dynamic(() => import("@/screens/showcase"), {
  ssr: true,
});

const Thoughts = dynamic(() => import("@/screens/thoughts"), { ssr: true });

export default function App() {
  return (
    <>
      <Landing />
      <AboutMe />
      <ProjectShowcase />
      <Thoughts />
    </>
  );
}

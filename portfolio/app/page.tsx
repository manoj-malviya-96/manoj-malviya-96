import AboutMe from "@/components/home/about_me";
import Landing from "@/components/home/landing";
import ProjectShowcase from "@/components/home/showcase";
import Thoughts from "@/components/home/thoughts";

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
